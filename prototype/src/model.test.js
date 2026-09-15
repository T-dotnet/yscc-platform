import { createSampleAnswers } from "./sampleQuestionnaires.js";
import test from "node:test";
import assert from "node:assert/strict";
import {
  createSeed,
  reducer,
  getTasks,
  VERSION,
  TODAY,
  upgradeSampleData,
  responseEditError,
  clinicalReviewStatus,
  collectionActor,
  personEventText,
} from "./model.js";
const ctx = {
  personId: "YS-1024",
  episodeId: "EP-1024-01",
  collectionId: "A-0-current",
};
const collection = (s) => s.people[0].episodes[0].collections.at(-1);
const deliver = (s) =>
  reducer(s, {
    ...ctx,
    type: "DELIVER",
    channel: "SMS link",
    respondent: "Person",
    assistance: "Independent",
  });
const submit = (s) =>
  reducer(s, {
    ...ctx,
    type: "SUBMIT",
    answers: createSampleAnswers({
      participation: "In person",
      support: "A little support",
      next: "My next steps",
    }),
  });
test("seed worklist counts represent actual open collection and review work", () => {
  const tasks = getTasks(createSeed());
  assert.equal(tasks.length, 6);
  assert.equal(tasks.filter((t) => t.status === "Overdue").length, 2);
  assert.equal(tasks.filter((t) => t.status === "Ready for review").length, 2);
});
test("Zoe has distinct current and closed care periods without adding historical work to the queue", () => {
  const seed = createSeed();
  const zoe = seed.people.find((p) => p.id === "YS-1027");
  const [current, previous] = zoe.episodes;
  assert.equal(current.number, "02");
  assert.equal(current.status, "Active");
  assert.equal(previous.number, "01");
  assert.equal(previous.status, "Closed");
  assert.ok(previous.end < current.start);
  assert.ok(
    previous.collections.every(
      (c) => c.response === "Submitted" && c.review === "Reviewed",
    ),
  );
  assert.equal(
    getTasks(seed).some((t) => t.episode.id === previous.id),
    false,
  );
  assert.equal(seed.people[0].episodes.length, 1);
});
test("older mock data is replaced once with the refreshed branching scenarios", () => {
  const old = createSeed();
  old.sampleRevision = 3;
  old.people[0].name = "Old mock";
  old.people[0].episodes[0].collections[0].version = "Demo check-in v1.0";
  old.audit.push({ id: "old-edit" });
  const before = structuredClone(old);
  const updated = upgradeSampleData(old);
  assert.deepEqual(old, before);
  assert.equal(updated.people[0].name, "Kai Thompson");
  assert.equal(updated.sampleRevision, 4);
  assert.equal(
    updated.audit.some((item) => item.id === "old-edit"),
    false,
  );
  assert.equal(upgradeSampleData(updated), updated);
});
test("a follow-up adds a pinned collection in the existing episode and preserves baseline answers", () => {
  const seed = createSeed();
  const next = reducer(seed, {
    ...ctx,
    type: "PLAN",
    label: "October review",
    due: "2026-10-15",
  });
  assert.equal(next.people[0].episodes.length, 1);
  assert.equal(next.people[0].episodes[0].collections.length, 3);
  assert.equal(collection(next).version, VERSION);
  assert.deepEqual(
    next.people[0].episodes[0].collections[0],
    seed.people[0].episodes[0].collections[0],
  );
});
test("reissue adds an attempt without creating another assignment or deleting the draft", () => {
  const seed = createSeed(),
    next = deliver(seed);
  assert.equal(collection(next).attempts.length, 2);
  assert.equal(next.people[0].episodes[0].collections.length, 2);
  assert.equal(collection(next).response, "Draft");
});
test("submission is accepted once and does not complete a clinical review or alter disposition", () => {
  const sent = deliver(createSeed()),
    next = submit(sent);
  assert.equal(collection(next).response, "Submitted");
  assert.equal(collection(next).assignment, "Fulfilled");
  assert.equal(collection(next).review, "Pending");
  assert.equal(next.people[0].episodes[0].disposition, "Admitted");
  assert.deepEqual(submit(next), next);
});
test("withdrawal revokes active links and prevents later delivery or submission", () => {
  let s = deliver(createSeed());
  s = reducer(s, {
    ...ctx,
    type: "CONSENT",
    consent: "Withdrawn",
    contact: "Suitable",
  });
  assert.equal(collection(s).link, "Revoked");
  assert.deepEqual(deliver(s), s);
  assert.deepEqual(submit(s), s);
});
test("episode closure cancels outstanding work and preserves historical responses", () => {
  const seed = deliver(createSeed());
  const closed = reducer(seed, {
    ...ctx,
    type: "EPISODE",
    status: "Closed",
    reason: "Sample handover completed",
  });
  assert.equal(collection(closed).assignment, "Cancelled");
  assert.equal(closed.people[0].episodes[0].end, TODAY);
  assert.equal(collection(closed).link, "Revoked");
  assert.deepEqual(
    closed.people[0].episodes[0].collections[0],
    seed.people[0].episodes[0].collections[0],
  );
  assert.equal(
    getTasks(closed).some((t) => t.person.id === ctx.personId),
    false,
  );
  assert.deepEqual(submit(closed), closed);
});
test("correction retains provenance and does not reopen any collection", () => {
  const seed = submit(deliver(createSeed()));
  const corrected = reducer(seed, {
    type: "CORRECT",
    personId: ctx.personId,
    issueId: "DQ-001",
    value: "2009-04-19",
    source: "Verified sample referral",
    reason: "Transcription correction",
  });
  assert.equal(corrected.people[0].dob, "2009-04-19");
  assert.equal(corrected.issues[0].status, "Resolved");
  assert.match(corrected.audit[0].detail, /2009-04-18 → 2009-04-19/);
  assert.deepEqual(corrected.people[0].episodes, seed.people[0].episodes);
});
test("unknown participation and inappropriate family roles block collection", () => {
  const seed = createSeed();
  seed.people[0].consent = "Not recorded";
  assert.deepEqual(deliver(seed), seed);
  const next = createSeed();
  assert.deepEqual(
    reducer(next, {
      type: "DELIVER",
      personId: "YS-1026",
      episodeId: "EP-1026-01",
      collectionId: "A-2-current",
      channel: "SMS link",
      respondent: "Family respondent",
      assistance: "Independent",
    }),
    next,
  );
});
test("clinical review requires a submitted response and a review note", () => {
  let seed = createSeed();
  assert.deepEqual(
    reducer(seed, { ...ctx, type: "REVIEW", note: "Premature review" }),
    seed,
  );
  seed = submit(deliver(seed));
  assert.deepEqual(reducer(seed, { ...ctx, type: "REVIEW", note: " " }), seed);
  const reviewed = reducer(seed, {
    ...ctx,
    type: "REVIEW",
    note: "Sample response reviewed; discuss at next contact.",
  });
  assert.equal(collection(reviewed).review, "Reviewed");
  assert.equal(collection(reviewed).response, "Submitted");
});

const editAction = (overrides = {}) => ({
  ...ctx,
  type: "EDIT_RESPONSE",
  expectedRevision: 0,
  answers: createSampleAnswers({
    participation: "On my own device",
    support: "A little support",
    next: "My next steps",
  }),
  reason: "Correct a transcription error",
  source: "Sample source",
  ...overrides,
});
test("both staff roles edit with complete immutable provenance and audit records", () => {
  for (const staffId of ["jess", "ananya"]) {
    const seed = { ...submit(deliver(createSeed())), staffId };
    const before = structuredClone(seed);
    const edited = reducer(seed, editAction());
    assert.deepEqual(seed, before);
    const c = collection(edited),
      original = collection(seed),
      log = edited.audit[0];
    assert.equal(c.answers[0], "On my own device");
    assert.deepEqual(c.originalAnswers, original.answers);
    for (const key of [
      "respondent",
      "recorder",
      "assistance",
      "version",
      "submittedAt",
      "response",
      "assignment",
      "link",
      "attempts",
    ])
      assert.deepEqual(c[key], original[key]);
    assert.equal(log.actorId, staffId);
    assert.equal(log.role, staffId === "jess" ? "Clinician" : "Data Manager");
    assert.ok(log.actor);
    assert.ok(!Number.isNaN(Date.parse(log.timestamp)));
    assert.equal(log.personId, ctx.personId);
    assert.equal(log.episodeId, ctx.episodeId);
    assert.equal(log.collectionId, ctx.collectionId);
    assert.equal(log.reason, "Correct a transcription error");
    assert.equal(log.source, "Sample source");
    assert.equal(log.respondent, original.respondent);
    assert.equal(log.recorder, original.recorder);
    assert.equal(log.changes.length, 2);
    assert.equal(log.changes[1].newValue, "Yes");
    assert.equal(log.changes[0].priorValue, "In person");
    assert.equal(log.changes[0].newValue, "On my own device");
    assert.equal(log.priorRevision, 0);
    assert.equal(log.revision, 1);
  }
});
test("successive edits preserve original answers and all earlier audit events", () => {
  const seed = submit(deliver(createSeed()));
  const first = reducer(seed, editAction());
  const second = reducer(
    first,
    editAction({
      expectedRevision: 1,
      answers: createSampleAnswers({
        participation: "Prefer not to answer",
        support: "A little support",
        next: "My next steps",
      }),
    }),
  );
  assert.deepEqual(
    collection(second).originalAnswers,
    collection(seed).answers,
  );
  assert.deepEqual(second.audit[1], first.audit[0]);
  assert.equal(second.audit[0].changes[0].priorValue, "On my own device");
  assert.equal(second.audit[0].revision, 2);
});
test("invalid, unchanged, stale, missing-reason and unauthorised edits change nothing", () => {
  const seed = submit(deliver(createSeed()));
  for (const action of [
    editAction({ reason: "  " }),
    editAction({ answers: collection(seed).answers }),
    editAction({ answers: ["invalid", "A little support", "My next steps"] }),
    editAction({ answers: [] }),
    editAction({ answers: null }),
    editAction({ expectedRevision: 7 }),
    editAction({ personId: "unknown" }),
  ]) {
    assert.ok(responseEditError(seed, action));
    assert.equal(reducer(seed, action), seed);
  }
  const denied = { ...seed, staffId: "participant" };
  assert.equal(reducer(denied, editAction()), denied);
  const draft = createSeed();
  assert.equal(reducer(draft, editAction()), draft);
  const unknownVersion = structuredClone(seed);
  collection(unknownVersion).version = "Unavailable version";
  assert.equal(reducer(unknownVersion, editAction()), unknownVersion);
});
test("two editors cannot silently save over the same response revision", () => {
  const first = reducer(submit(deliver(createSeed())), editAction());
  const secondEditor = { ...first, staffId: "ananya" };
  assert.match(responseEditError(secondEditor, editAction()), /changed/);
  assert.equal(reducer(secondEditor, editAction()), secondEditor);
});
test("edited reviewed answers re-enter review work while keeping prior clinical evidence", () => {
  const reviewed = reducer(submit(deliver(createSeed())), {
    ...ctx,
    type: "REVIEW",
    note: "Original review",
  });
  const edited = reducer(reviewed, editAction());
  assert.equal(collection(edited).review, "Reviewed");
  assert.equal(collection(edited).reviewNote, "Original review");
  assert.equal(collection(edited).needsReview, true);
  assert.ok(
    getTasks(edited).some(
      (task) =>
        task.collection.id === ctx.collectionId &&
        task.status === "Ready for review",
    ),
  );
  const reviewAction = {
    ...ctx,
    type: "REVIEW",
    note: "Re-reviewed corrected answers",
  };
  const manager = { ...edited, staffId: "ananya" };
  assert.equal(reducer(manager, reviewAction), manager);
  const rereviewed = reducer(edited, reviewAction);
  assert.equal(collection(rereviewed).needsReview, false);
  assert.equal(collection(rereviewed).reviewRevision, 1);
  assert.equal(collection(rereviewed).reviewHistory[0].note, "Original review");
  assert.equal(collection(rereviewed).reviewHistory[0].revision, 0);
  assert.deepEqual(rereviewed.audit, edited.audit);
});
test("historical submitted responses can be corrected without reopening closed care", () => {
  const seed = createSeed(),
    person = seed.people.find((p) => p.id === "YS-1027"),
    episode = person.episodes[1],
    c = episode.collections[0];
  const edited = reducer(
    seed,
    editAction({
      personId: person.id,
      episodeId: episode.id,
      collectionId: c.id,
    }),
  );
  const history = edited.people.find((p) => p.id === person.id).episodes[1];
  assert.equal(history.status, "Closed");
  assert.equal(history.collections[0].response, "Submitted");
  assert.equal(history.collections[0].assignment, "Fulfilled");
  assert.equal(history.collections[0].answers[0], "On my own device");
  assert.equal(
    getTasks(edited).some((task) => task.episode.id === episode.id),
    false,
  );
});

test("submitted sample records have a coherent delivery and submission history", () => {
  for (const p of createSeed().people) {
    for (const episode of p.episodes) {
      for (const c of episode.collections.filter(
        (c) => c.response === "Submitted",
      )) {
        const attempt = c.attempts.find((a) => a.id === c.submittedAttemptId);
        assert.ok(attempt, c.id);
        assert.equal(attempt.channel, c.channel);
        assert.ok(episode.start <= attempt.date);
        assert.ok(attempt.date <= c.submittedAt);
        if (c.reviewDate) assert.ok(c.submittedAt <= c.reviewDate);
        assert.equal(collectionActor(p, c, "respondent"), p.name);
        assert.equal(collectionActor(p, c, "recorder"), p.name);
      }
    }
  }
});

test("reset mock responses all use the current questionnaire and coherent sample history", () => {
  const saved = createSeed();
  saved.sampleRevision = 2;
  const upgraded = upgradeSampleData(saved);
  for (const person of upgraded.people)
    for (const episode of person.episodes)
      for (const response of episode.collections) {
        assert.equal(response.version, VERSION);
        if (response.response === "Submitted") {
          assert.equal(response.answers.length, 24);
          assert.ok(response.submittedAt);
        }
      }
});

test("new collections retain named respondents and the staff member who entered answers", () => {
  const seed = { ...createSeed(), staffId: "jess" };
  const started = reducer(seed, {
    ...ctx,
    type: "DELIVER",
    channel: "Clinician entry",
    respondent: "Family respondent",
    assistance: "Transcribed",
  });
  assert.equal(collection(started).respondentName, "Deb Thompson");
  assert.equal(collection(started).recorderName, "Jess Taylor");
  assert.equal(collection(started).recorder, "Jess Taylor");
  const completed = reducer(started, {
    ...ctx,
    type: "SUBMIT",
    answers: createSampleAnswers({}),
    channel: "Clinician entry",
    attemptId: collection(started).attempts.at(-1).id,
  });
  assert.equal(
    collection(completed).submittedAttemptId,
    collection(completed).attempts.at(-1).id,
  );
  const edited = reducer({ ...completed, staffId: "ananya" }, editAction());
  assert.equal(collection(edited).respondentName, "Deb Thompson");
  assert.equal(collection(edited).recorderName, "Jess Taylor");
});

test("review labels follow the current answers through editing and re-review", () => {
  assert.equal(
    clinicalReviewStatus(collection(createSeed())),
    "Awaiting response",
  );
  const submitted = submit(deliver(createSeed()));
  assert.equal(clinicalReviewStatus(collection(submitted)), "Pending");
  const reviewed = reducer(submitted, {
    ...ctx,
    type: "REVIEW",
    note: "Earlier review",
  });
  const edited = reducer(reviewed, editAction());
  assert.equal(clinicalReviewStatus(collection(edited)), "Re-review required");
  const completed = reducer(edited, {
    ...ctx,
    type: "REVIEW",
    note: "Reviewed current answers",
  });
  assert.equal(clinicalReviewStatus(collection(completed)), "Reviewed");
  assert.equal(collection(completed).reviewHistory[0].note, "Earlier review");
});

test("record displays resolve actual names while preserving recorded notes", () => {
  const person = createSeed().people[0];
  assert.equal(
    collectionActor(person, { respondent: "Person" }, "respondent"),
    "Kai Thompson",
  );
  assert.equal(
    collectionActor(
      person,
      { respondent: "Family respondent", respondentName: "Deb Thompson" },
      "respondent",
    ),
    "Deb Thompson",
  );
  assert.equal(
    personEventText(
      person,
      "Initial assessment · Person · clinical review pending",
    ),
    "Initial assessment · Kai Thompson · clinical review pending",
  );
  assert.equal(
    personEventText(
      person,
      "Note: Person was the wording on the original form.",
    ),
    "Note: Person was the wording on the original form.",
  );
});

test("stored participant roles upgrade without losing saved responses or authored reports", () => {
  const state = createSeed();
  delete state.terminologyRevision;
  const c = collection(state);
  c.respondent = c.recorder = "Young person";
  state.people[0].episodes[0].progressReport = {
    revision: 2,
    content: { summary: "Saved clinician summary" },
    sources: [
      {
        respondent: c.respondent,
        recorder: c.recorder,
        answers: [...c.answers],
      },
    ],
  };
  const upgraded = upgradeSampleData(state);
  assert.equal(collection(upgraded).respondent, "Person");
  assert.equal(collection(upgraded).recorder, "Person");
  assert.deepEqual(collection(upgraded).answers, c.answers);
  const report = upgraded.people[0].episodes[0].progressReport;
  assert.equal(report.revision, 2);
  assert.equal(report.content.summary, "Saved clinician summary");
  assert.equal(report.sources[0].respondent, "Person");
  assert.equal(report.sources[0].recorder, "Person");
  assert.equal(c.respondent, "Young person");
  assert.equal(upgradeSampleData(upgraded), upgraded);
});
