import test from "node:test";
import assert from "node:assert/strict";
import { createSeed, reducer } from "./model.js";
import { createSampleAnswers } from "./sampleQuestionnaires.js";
import { activityEntries, activityChangeDetails } from "./activity.js";

const context = {
  personId: "YS-1024",
  episodeId: "EP-1024-01",
  collectionId: "A-0-current",
};
const episode = (state) => state.people[0].episodes[0];
const latest = (state) => episode(state).events[0];
const history = (state) =>
  activityEntries(state.people[0], episode(state), state.audit);
const act = (state, type, values = {}) =>
  reducer(state, { ...context, type, ...values });
const deliver = (state) =>
  act(state, "DELIVER", {
    channel: "SMS link",
    respondent: "Person",
    assistance: "Independent",
  });
const submit = (state) =>
  act(state, "SUBMIT", {
    answers: createSampleAnswers({
      participation: "In person",
      support: "A little support",
      next: "My next steps",
    }),
  });

test("new follow-ups retain their collection, version, due date, editor and time in history", () => {
  const state = createSeed();
  const saved = act(state, "PLAN", {
    label: "October review",
    due: "2026-10-15",
  });
  const event = latest(saved);
  assert.equal(event.actorId, "jess");
  assert.equal(event.role, "Clinician");
  assert.ok(Number.isFinite(Date.parse(event.timestamp)));
  assert.equal(event.collectionId, episode(saved).collections.at(-1).id);
  assert.ok(
    event.changes.some(
      (change) =>
        change.label.endsWith("Due date") &&
        change.before === null &&
        change.after === "2026-10-15",
    ),
  );
  assert.ok(
    event.changes.some((change) =>
      change.label.endsWith("Questionnaire version"),
    ),
  );
  assert.equal(
    history(saved).filter((entry) => entry.id === event.id).length,
    1,
  );
  assert.ok(!history(saved).some((entry) => entry.id.endsWith("-due")));
  assert.deepEqual(episode(saved).events.slice(1), episode(state).events);
});

test("delivery, response, corrections and review are recorded once with accurate attribution", () => {
  let state = deliver(createSeed());
  const delivery = latest(state);
  assert.equal(
    history(state).filter((entry) => entry.id === delivery.attemptId).length,
    0,
  );
  assert.equal(
    history(state).filter((entry) => entry.id === delivery.id).length,
    1,
  );
  state = submit(state);
  const submission = latest(state);
  assert.equal(submission.actor, "Kai Thompson");
  assert.equal(submission.role, "Person");
  assert.equal(submission.actorId, null);
  assert.ok(
    submission.changes.some((change) => change.key.includes("answer-")),
  );
  state = act(state, "REVIEW", { note: "Initial sample review." });
  const firstReview = structuredClone(latest(state));
  state = act({ ...state, staffId: "ananya" }, "EDIT_RESPONSE", {
    expectedRevision: 0,
    answers: createSampleAnswers({
      participation: "On my own device",
      support: "A little support",
      next: "My next steps",
    }),
    reason: "Correct the sample transcription",
    source: "Original sample response",
  });
  const edit = state.audit[0];
  assert.equal(edit.role, "Data Manager");
  assert.equal(
    history(state).filter((entry) => entry.id === edit.id).length,
    1,
  );
  assert.equal(
    history(state).filter((entry) => entry.auditId === edit.id).length,
    0,
  );
  assert.ok(
    activityChangeDetails(edit).some(
      (change) =>
        change.before === "In person" && change.after === "On my own device",
    ),
  );
  state = act({ ...state, staffId: "jess" }, "REVIEW", {
    note: "Re-reviewed the corrected response.",
  });
  assert.equal(latest(state).role, "Clinician");
  assert.ok(
    latest(state).changes.some(
      (change) =>
        change.before === "Initial sample review." &&
        change.after === "Re-reviewed the corrected response.",
    ),
  );
  assert.deepEqual(
    history(state).find((entry) => entry.id === firstReview.id),
    firstReview,
  );
  assert.equal(
    history(state).filter((entry) => entry.actionType === "REVIEW").length,
    2,
  );
  const reloaded = JSON.parse(JSON.stringify(state));
  assert.deepEqual(history(reloaded), history(state));
});

test("legacy reviews remain visible after a new review and unknown dates remain unknown", () => {
  const state = createSeed();
  const collection = episode(state).collections[0];
  delete collection.reviewDate;
  delete collection.submittedAt;
  const entries = history(state);
  assert.equal(
    entries.find((entry) => entry.id === `${collection.id}-review`).date,
    undefined,
  );
  assert.equal(
    entries.find((entry) => entry.id === `${collection.id}-submitted`).date,
    undefined,
  );
  collection.reviewHistory = [
    {
      note: "Earlier preserved note",
      date: "2026-06-19",
      actor: "Jess Taylor",
      revision: 0,
    },
  ];
  episode(state).events.unshift({
    id: "new-review",
    actionType: "REVIEW",
    collectionId: collection.id,
    reviewRevision: 1,
    date: "2026-09-16",
  });
  assert.ok(
    history(state).some((entry) => entry.detail === "Earlier preserved note"),
  );
});

test("care closure and participation changes retain effects on every affected collection", () => {
  const state = deliver(createSeed());
  const closed = act(state, "EPISODE", {
    status: "Closed",
    reason: "Sample care completed",
    nextCareStep: "Agreed next contact",
  });
  assert.ok(
    latest(closed).changes.some(
      (change) =>
        change.label === "Care status" &&
        change.before === "Active" &&
        change.after === "Closed",
    ),
  );
  assert.ok(
    latest(closed).changes.some(
      (change) =>
        change.label.endsWith("Link or session status") &&
        change.after === "Revoked",
    ),
  );
  const withdrawn = act(state, "CONSENT", {
    consent: "Withdrawn",
    contact: "Suitable",
    reason: "Updated preference",
    source: "Sample discussion",
  });
  assert.equal(withdrawn.audit[0].actorId, "jess");
  assert.ok(
    withdrawn.audit[0].changes.some(
      (change) =>
        change.label === "Assessment participation" &&
        change.before === "Recorded" &&
        change.after === "Withdrawn",
    ),
  );
  assert.ok(
    withdrawn.audit[0].changes.some((change) => change.after === "Revoked"),
  );
});

test("history isolates care-period records while keeping person-wide updates explicit", () => {
  const state = createSeed();
  const person = state.people.find((p) => p.id === "YS-1027");
  const [current, previous] = person.episodes;
  const audit = [
    {
      id: "current-audit",
      personId: person.id,
      episodeId: current.id,
      timestamp: "2026-09-16T11:00:00Z",
    },
    {
      id: "previous-audit",
      personId: person.id,
      episodeId: previous.id,
      timestamp: "2026-09-16T12:00:00Z",
    },
    {
      id: "person-audit",
      personId: person.id,
      timestamp: "2026-09-16T10:00:00Z",
    },
  ];
  person.referrals = [
    {
      id: "old-referral",
      episodeId: previous.id,
      destination: "Sample service",
      history: [{ id: "old-referral-event" }],
    },
  ];
  const entries = activityEntries(person, current, audit);
  assert.ok(
    !entries.some((entry) =>
      ["previous-audit", "old-referral-event"].includes(entry.id),
    ),
  );
  assert.equal(
    entries.find((entry) => entry.id === "person-audit").scope,
    "Person record",
  );
  assert.equal(entries[0].id, "current-audit");
});

test("rejected and repeated submissions produce no new activity", () => {
  const state = submit(deliver(createSeed()));
  const before = structuredClone(history(state));
  assert.equal(submit(state), state);
  assert.equal(act(state, "PLAN", { label: "", due: "2026-10-15" }), state);
  assert.equal(act(state, "REVIEW", { note: "" }), state);
  assert.deepEqual(history(state), before);
});
