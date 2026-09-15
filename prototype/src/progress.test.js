import { createSampleAnswers } from "./sampleQuestionnaires.js";
import { DEMO_INSTRUMENT, setQuestionAnswer } from "./instruments.js";
import test from "node:test";
import assert from "node:assert/strict";
import { createSeed, reducer, TODAY } from "./model.js";
import {
  patientProgress,
  questionnaireProgress,
  compareResponses,
  responseDate,
} from "./progress.js";

function scenario() {
  const state = createSeed();
  const person = state.people.find((p) => p.name === "Zoe Patel");
  const episode = person.episodes[0];
  return {
    state,
    person,
    episode,
    before: episode.collections[0],
    latest: episode.collections[1],
  };
}

test("progress compares original submitted dates and stays within the selected episode", () => {
  const { person, episode, before, latest } = scenario();
  before.due = "2027-01-01";
  episode.collections.reverse();
  const result = patientProgress(person, episode);
  assert.equal(result.latest.id, latest.id);
  assert.equal(result.baseline.id, before.id);
  assert.equal(result.responses.length, 2);
  assert.equal(result.pendingReviews.length, 1);
  assert.equal(result.latestReview.id, before.id);
  assert.equal(compareResponses(person, before, latest).comparable, 13);
  const historical = patientProgress(person, person.episodes[1]);
  assert.equal(historical.latest.label, "Discharge check-in");
  assert.equal(historical.pendingReviews.length, 0);
  assert.ok(historical.responses.every((c) => c.id.includes("history")));
});

test("changes are per answer and never convert nonresponse or invalid data into a trend", () => {
  const { person, before, latest } = scenario();
  latest.answers = [
    "On my own device",
    "Prefer not to answer",
    "invalid answer",
  ];
  const result = compareResponses(person, before, latest);
  assert.equal(result.changed, 1);
  assert.equal(result.comparable, 1);
  assert.deepEqual(
    result.rows.map((r) => r.change),
    ["Changed", ...Array(23).fill("Not comparable")],
  );
  before.answers[0] = undefined;
  latest.answers[1] = before.answers[1] = "Prefer not to answer";
  assert.equal(compareResponses(person, before, latest).comparable, 0);
});

test("unknown dates are explicit and never replaced by due dates", () => {
  const { person, episode, before, latest } = scenario();
  delete latest.submittedAt;
  const result = patientProgress(person, episode);
  assert.equal(result.latest.id, before.id);
  assert.equal(result.undated[0].id, latest.id);
  assert.match(
    compareResponses(person, before, latest).reason,
    /date is missing/,
  );
  assert.equal(responseDate({ submittedAt: "2026-02-31" }), null);
  assert.equal(responseDate({ submittedAt: "bad" }), null);
  assert.equal(responseDate({ submittedAt: "2026-09-15T12:31:00Z" }), TODAY);
});

test("different versions, identities and respondent roles cannot be compared", () => {
  const { person, before, latest } = scenario();
  assert.match(
    compareResponses(person, before, { ...latest, version: "Unknown" }).reason,
    /versions/,
  );
  assert.match(
    compareResponses(person, before, {
      ...latest,
      respondent: "Family respondent",
    }).reason,
    /respondents/,
  );
  assert.match(
    compareResponses(person, before, {
      ...latest,
      respondentName: "Another person",
    }).reason,
    /respondents/,
  );
  assert.match(
    compareResponses(
      person,
      { ...before, respondent: null },
      { ...latest, respondent: null },
    ).reason,
    /respondents/,
  );
  assert.match(
    compareResponses(
      person,
      { ...before, respondent: "Family respondent", respondentName: null },
      { ...latest, respondent: "Family respondent", respondentName: null },
    ).reason,
    /respondents/,
  );
});

test("the default baseline uses the earliest comparable response from the same respondent", () => {
  const { person, episode, before, latest } = scenario();
  episode.collections.push({
    ...before,
    id: "other-perspective",
    submittedAt: "2026-05-01",
    respondent: "Family respondent",
    respondentName: "A family member",
  });
  const result = patientProgress(person, episode);
  assert.equal(result.baseline.id, before.id);
  assert.equal(result.latest.id, latest.id);
});

test("same-date responses do not imply a longitudinal trend and drafts cannot be compared", () => {
  const { person, before, latest } = scenario();
  assert.match(
    compareResponses(person, before, {
      ...latest,
      submittedAt: before.submittedAt,
    }).reason,
    /earlier date/,
  );
  assert.match(
    compareResponses(person, before, { ...latest, response: "Draft" }).reason,
    /submitted/,
  );
  assert.match(
    compareResponses(person, null, latest).reason,
    /second submitted response/,
  );
});

test("next collection uses the earliest outstanding due date and excludes cancelled work", () => {
  const { person, episode, latest } = scenario();
  for (const [id, due, assignment] of [
    ["later", "2026-11-01", "Planned"],
    ["cancelled", "2026-08-01", "Cancelled"],
    ["next", "2026-09-12", "Active"],
  ]) {
    episode.collections.push({
      ...latest,
      id,
      due,
      assignment,
      response: "Not started",
      answers: [],
      review: "Pending",
    });
  }
  const result = patientProgress(person, episode);
  assert.equal(result.open[0].id, "next");
  assert.equal(result.open.length, 2);
  assert.equal(result.overdue.length, 1);
  assert.equal(result.responses.length, 2);
  episode.status = "Closed";
  assert.equal(patientProgress(person, episode).open.length, 0);
  episode.status = "Paused";
  assert.equal(patientProgress(person, episode).open.length, 0);
});

test("new, undated and single-response episodes have honest empty states", () => {
  const { person, episode, before } = scenario();
  episode.collections = [];
  let result = patientProgress(person, episode);
  assert.equal(result.latest, null);
  assert.equal(result.responses.length, 0);
  episode.collections = [{ ...before, submittedAt: undefined }];
  result = patientProgress(person, episode);
  assert.equal(result.latest, null);
  assert.equal(result.undated.length, 1);
  episode.collections = [before];
  assert.equal(patientProgress(person, episode).baseline, null);
});

test("same-day submissions stay selectable without implying their within-day order", () => {
  const { person, episode, latest, before } = scenario();
  episode.collections.push({
    ...latest,
    id: "same-day-followup",
    label: "Another check-in",
    answers: setQuestionAnswer(
      DEMO_INSTRUMENT,
      before.answers,
      23,
      "Let me ask any final questions",
    ),
  });
  const selected = patientProgress(person, episode, "same-day-followup");
  assert.equal(selected.latestOptions.length, 2);
  assert.equal(selected.latest.id, "same-day-followup");
  assert.equal(selected.baseline.id, before.id);
  assert.equal(
    compareResponses(person, selected.baseline, selected.latest).changed,
    1,
  );
  assert.equal(
    patientProgress(person, episode, latest.id).latest.id,
    latest.id,
  );
});

test("editing a reviewed response changes the comparison, retains the date, and requires re-review", () => {
  let { state, person, episode, latest } = scenario();
  const context = {
    personId: person.id,
    episodeId: episode.id,
    collectionId: latest.id,
  };
  state = reducer(state, {
    type: "REVIEW",
    ...context,
    note: "Discussed next steps.",
  });
  state = reducer(state, {
    type: "EDIT_RESPONSE",
    ...context,
    expectedRevision: 0,
    answers: setQuestionAnswer(
      DEMO_INSTRUMENT,
      latest.answers,
      23,
      "Let me ask any final questions",
    ),
    reason: "Corrected against sample source.",
  });
  person = state.people.find((p) => p.id === person.id);
  episode = person.episodes[0];
  const result = patientProgress(person, episode);
  assert.equal(result.latest.submittedAt, latest.submittedAt);
  assert.equal(result.latest.needsReview, true);
  assert.equal(result.pendingReviews.length, 1);
  assert.equal(
    compareResponses(
      person,
      { ...latest, id: "prior-latest", submittedAt: "2026-09-13" },
      result.latest,
    ).changed,
    1,
  );
});

test("questionnaire selection scopes responses, comparisons, reviews and follow-ups by version", () => {
  const { person, episode, before, latest } = scenario();
  const other = {
    ...before,
    id: "other-questionnaire",
    version: "Another questionnaire v1.0",
    submittedAt: "2026-09-16",
    reviewDate: "2026-09-16",
  };
  const pending = {
    ...latest,
    id: "other-follow-up",
    version: other.version,
    response: "Not started",
    review: "Pending",
  };
  const undated = { ...other, id: "other-undated", submittedAt: null };
  episode.collections.push(other, pending, undated);
  const result = questionnaireProgress(person, episode, latest.version);
  assert.deepEqual(result.questionnaires, [latest.version, other.version]);
  assert.equal(result.latest.id, latest.id);
  assert.equal(result.baseline.id, before.id);
  assert.equal(result.latestReview.id, before.id);
  assert.equal(result.responses.length, 2);
  assert.equal(result.undated.length, 0);
  assert.equal(result.open.length, 0);
  const switched = questionnaireProgress(
    person,
    episode,
    other.version,
    latest.id,
  );
  assert.equal(switched.latest.id, other.id);
  assert.equal(switched.baseline, null);
  assert.equal(switched.latestReview.id, other.id);
  assert.deepEqual(
    switched.open.map((c) => c.id),
    [pending.id],
  );
  assert.deepEqual(
    switched.undated.map((c) => c.id),
    [undated.id],
  );
  assert.equal(questionnaireProgress(person, episode).version, other.version);
  assert.equal(
    questionnaireProgress(person, episode, "Unavailable").version,
    other.version,
  );
});

test("questionnaire selection supports draft-only and unknown-version collections", () => {
  const { person, episode, latest } = scenario();
  episode.collections.push({
    ...latest,
    id: "draft-only",
    version: "Upcoming questionnaire v1.0",
    response: "Draft",
  });
  const draft = questionnaireProgress(
    person,
    episode,
    "Upcoming questionnaire v1.0",
  );
  assert.equal(draft.latest, null);
  assert.equal(draft.responses.length, 0);
  assert.equal(draft.open[0].id, "draft-only");
  episode.collections.push({
    ...latest,
    id: "unknown-version",
    version: null,
    submittedAt: null,
  });
  const unknown = questionnaireProgress(person, episode, "");
  assert.equal(unknown.latest, null);
  assert.equal(unknown.undated[0].id, "unknown-version");
  assert.equal(unknown.collections.length, 1);
  const empty = questionnaireProgress(person, { ...episode, collections: [] });
  assert.deepEqual(empty.questionnaires, []);
  assert.equal(empty.latest, null);
});
