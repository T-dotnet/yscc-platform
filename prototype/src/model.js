import { sampleAnswersFor } from "./sampleQuestionnaires.js";
import { careChanges, recordFieldChanges } from "./activity.js";
import {
  applyIntakeAction,
  canAssess,
  intakeTasks,
  newIntake,
} from "./intake.js";
import {
  DEMO_INSTRUMENT,
  INSTRUMENTS,
  LEGACY_INSTRUMENT,
  getInstrument,
  questionnaireState,
  answerLabel,
} from "./instruments.js";

import {
  REPORT_FIELDS,
  reportChanges,
  reportEditError,
  reportSources,
} from "./report.js";

export const TODAY = "2026-09-15";
export const VERSION = DEMO_INSTRUMENT.version;
export const STORAGE_KEY = "yscc-prototype-v1";
export const DEMO_STAFF = [
  { id: "jess", name: "Jess Taylor", role: "Clinician" },
  { id: "ananya", name: "Ananya", role: "Data Manager" },
];
export const currentStaff = (state) =>
  DEMO_STAFF.find((staff) => staff.id === (state.staffId ?? "jess"));
export const canEditResponses = (state) =>
  ["Clinician", "Data Manager"].includes(currentStaff(state)?.role);
export const formatTimestamp = (timestamp) =>
  new Date(timestamp).toLocaleString("en-GB", { timeZoneName: "short" });
export const uid = () => globalThis.crypto.randomUUID();
export const formatDate = (date) =>
  new Date(date + "T12:00:00")
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .replace("Sept", "Sep");
export const initials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
export const age = (dob) => {
  if (!dob) return "Unknown";
  const d = new Date(dob);
  return 2026 - d.getFullYear() - (dob.slice(5) > "09-15" ? 1 : 0);
};

const seeds = [
  [
    "Kai Thompson",
    "2009-04-18",
    "They/them",
    "90-day review",
    "2026-09-12",
    "Draft",
    "Expired",
  ],
  [
    "Amelia Chen",
    "2007-02-06",
    "She/her",
    "Initial assessment",
    TODAY,
    "Submitted",
    "Ended",
  ],
  [
    "Noah Williams",
    "2010-07-12",
    "He/him",
    "Initial assessment",
    TODAY,
    "Not started",
    "Not sent",
  ],
  [
    "Zoe Patel",
    "2008-11-23",
    "She/her",
    "90-day review",
    TODAY,
    "Submitted",
    "Ended",
  ],
  [
    "Oliver James",
    "2006-06-08",
    "He/him",
    "Initial assessment",
    "2026-09-14",
    "Not started",
    "Active",
  ],
  [
    "Mia Robinson",
    "2009-01-30",
    "She/her",
    "90-day review",
    TODAY,
    "Not started",
    "Not sent",
  ],
];

function previousZoeEpisode() {
  return {
    id: "EP-1027-history-01",
    number: "01",
    status: "Closed",
    start: "2025-02-10",
    end: "2025-06-16",
    disposition: "Discharged",
    reason: "Planned course of support completed in June 2025.",
    collections: [
      ["baseline", "Initial assessment", "2025-02-10", "2025-02-12"],
      ["discharge", "Discharge check-in", "2025-06-12", "2025-06-16"],
    ].map(([key, label, due, reviewDate]) => ({
      id: `A-3-history-${key}`,
      label,
      due,
      version: VERSION,
      assignment: "Fulfilled",
      response: "Submitted",
      review: "Reviewed",
      assessmentProgress: "Completed",
      reviewNote: "Sample responses reviewed during the 2025 course of care.",
      reviewDate,
      answers: sampleAnswersFor(3, key === "baseline" ? "baseline" : "current"),
      attempts: [],
      link: "Ended",
      respondent: "Person",
      recorder: "Person",
      assistance: "Independent",
      channel: "Clinic tablet",
    })),
    events: [
      {
        id: "E-3-history-closed",
        date: "2025-06-16",
        title: "Care episode closed",
        detail: "Planned course of support completed · discharge recorded",
      },
      {
        id: "E-3-history-started",
        date: "2025-02-10",
        title: "Care episode started",
        detail: "First course of care · initial assessment planned",
      },
    ],
  };
}

// Known fictional histories only. Never infer dates from a user's due-date edits.
const sampleHistories = {
  "A-1-current": ["SMS link", "2026-09-14", "2026-09-15"],
  "A-3-current": ["SMS link", "2026-09-14", "2026-09-15"],
  "A-0-baseline": ["Clinic tablet", "2026-06-15", "2026-06-15"],
  "A-3-baseline": ["Clinic tablet", "2026-06-15", "2026-06-15"],
  "A-5-baseline": ["Clinic tablet", "2026-06-15", "2026-06-15"],
  "A-3-history-baseline": ["Clinic tablet", "2025-02-10", "2025-02-10"],
  "A-3-history-discharge": ["Clinic tablet", "2025-06-12", "2025-06-12"],
};

const LEGACY_PARTICIPANT_ROLE = "Young person";

function updateParticipantRoles(value) {
  if (!value || typeof value !== "object") return;
  for (const [key, child] of Object.entries(value)) {
    if (
      ["respondent", "recorder"].includes(key) &&
      child === LEGACY_PARTICIPANT_ROLE
    )
      value[key] = "Person";
    else updateParticipantRoles(child);
  }
}

export function upgradeSampleData(state) {
  if (state.terminologyRevision !== 1) {
    state = structuredClone(state);
    updateParticipantRoles(state);
    state.terminologyRevision = 1;
  }
  const hasOldQuestionnaire = state.people.some((person) =>
    person.episodes.some((episode) =>
      episode.collections.some(
        (collection) => collection.version === LEGACY_INSTRUMENT.version,
      ),
    ),
  );
  if (hasOldQuestionnaire) return createSeed();
  if (state.sampleRevision < 4 || !state.sampleRevision)
    return prepareSeed(structuredClone(state));
  return state.intakeRevision === 1
    ? state
    : prepareIntakes(structuredClone(state));
}

function prepareSeed(state) {
  const next = state;
  const zoe = next.people.find((p) => p.id === "YS-1027");
  const current = zoe?.episodes.find((e) => e.id === "EP-1027-01");
  if (current && !zoe.episodes.some((e) => e.id === "EP-1027-history-01")) {
    // Keep existing record IDs stable so saved responses and sessions still resolve.
    current.number = "02";
    zoe.episodes.push(previousZoeEpisode());
  }
  for (const person of next.people) {
    for (const episode of person.episodes) {
      for (const c of episode.collections) {
        const history = sampleHistories[c.id];
        if (
          history &&
          [LEGACY_INSTRUMENT.version, VERSION].includes(c.version) &&
          c.response === "Submitted" &&
          c.channel === history[0] &&
          c.respondent === "Person" &&
          c.recorder === "Person" &&
          c.assistance === "Independent" &&
          !c.submittedAt &&
          !c.attempts.length
        ) {
          const [channel, sentAt, submittedAt] = history;
          c.attempts.push({
            id: `${c.id}-sample-session`,
            date: sentAt,
            channel,
            status:
              channel === "SMS link"
                ? "Sent (sample)"
                : "Session started (sample)",
          });
          c.submittedAt = submittedAt;
          c.submittedAttemptId = c.attempts[0].id;
          c.respondentName ??= person.name;
          c.recorderName ??= person.name;
          if (c.review === "Reviewed") c.reviewActor ??= "Jess Taylor";
        }
        // An untouched, unsent sample request has no collection method yet.
        if (
          c.link === "Not sent" &&
          c.response === "Not started" &&
          !c.attempts.length &&
          c.channel === "SMS link"
        ) {
          c.channel = null;
        }
      }
    }
  }
  next.sampleRevision = 4;
  return prepareIntakes(next);
}

function prepareIntakes(next) {
  for (const person of next.people) {
    person.referrals ??= [];
    if (person.intakes) continue;
    const seedIndex = seeds.findIndex(
      (s, index) => person.id === `YS-${1024 + index}` && person.name === s[0],
    );
    if (seedIndex >= 0) {
      // Explicit fictional fixture provenance, not inferred completion for arbitrary saved people.
      person.intakes = person.episodes.map((ep) => ({
        ...newIntake({
          id: `IN-${ep.id}`,
          owner: person.owner,
          today: TODAY,
          actor: "Sample fixture",
          timestamp: ep.start + "T09:00:00",
          episodeId: ep.id,
        }),
        status: "Completed",
        outcome: "Proceed",
        identityChecked: true,
        permissionChecked: true,
        supportChecked: true,
        triageChecked: true,
        checkEvidence:
          "Fictional continuing-care fixture; completed intake supplied for the demo.",
        summary: "Sample intake reviewed before this care period.",
        decisionBy: "Jess Taylor",
        decisionAt: ep.start + "T09:00:00",
        assessmentOwner: person.owner,
        history: [
          {
            id: `IN-${ep.id}-fixture`,
            timestamp: ep.start + "T09:00:00",
            actor: "Sample fixture",
            title: "Completed intake · fictional history",
            detail: "Explicit demo fixture, not a recovered clinical decision.",
          },
        ],
      }));
    } else {
      const intake = newIntake({
        id: `IN-${person.id}-migration`,
        owner: person.owner || "Jess Taylor",
        today: TODAY,
        actor: "Prototype migration",
        timestamp: new Date().toISOString(),
        episodeId:
          person.episodes.find((ep) => ep.status === "Active")?.id || null,
      });
      intake.status = "Awaiting information";
      intake.waitingReason =
        "Earlier registration did not record an intake decision.";
      intake.waitingOn = intake.owner;
      intake.nextAction =
        "Review the intake evidence before further assessment work";
      person.intakes = [intake];
    }
  }
  next.intakeRevision = 1;
  return next;
}

export function createSeed() {
  return prepareSeed({
    schema: 1,
    terminologyRevision: 1,
    people: seeds.map((s, i) => ({
      id: `YS-${1024 + i}`,
      name: s[0],
      dob: s[1],
      pronouns: s[2],
      owner: "Jess Taylor",
      consent: "Recorded",
      contact: "Suitable",
      family: i === 0 ? "Deb Thompson" : null,
      episodes: [
        {
          id: `EP-${1024 + i}-01`,
          number: "01",
          status: "Active",
          start: s[3] === "90-day review" ? "2026-06-15" : "2026-09-08",
          disposition: i === 0 ? "Admitted" : "Undecided",
          collections: [
            ...(s[3] === "90-day review"
              ? [
                  {
                    id: `A-${i}-baseline`,
                    label: "Initial assessment",
                    due: "2026-06-15",
                    version: VERSION,
                    assignment: "Fulfilled",
                    response: "Submitted",
                    review: "Reviewed",
                    reviewNote: "Sample baseline review recorded.",
                    reviewDate: "2026-06-20",
                    answers: sampleAnswersFor(i, "baseline"),
                    attempts: [],
                    respondent: "Person",
                    recorder: "Person",
                    assistance: "Independent",
                    channel: "Clinic tablet",
                  },
                ]
              : []),
            {
              id: `A-${i}-current`,
              label: s[3],
              due: s[4],
              version: VERSION,
              assignment: s[5] === "Submitted" ? "Fulfilled" : "Active",
              response: s[5],
              review: "Pending",
              link: s[6],
              attempts: ["Expired", "Active"].includes(s[6])
                ? [
                    {
                      id: `D-${i}`,
                      date: i === 4 ? "2026-09-09" : "2026-09-05",
                      channel: "SMS link",
                      status:
                        s[6] === "Expired" ? "Link expired" : "Sent (sample)",
                    },
                  ]
                : [],
              answers: s[5] === "Submitted" ? sampleAnswersFor(i) : [],
              respondent: "Person",
              recorder: "Person",
              assistance: "Independent",
              channel: "SMS link",
            },
          ],
          events: [
            {
              id: `E-${i}`,
              date: s[3] === "90-day review" ? "2026-06-15" : "2026-09-08",
              title: "Care episode started",
              detail: "Initial assessment · baseline collection planned",
            },
          ],
        },
      ],
    })),
    issues: [
      {
        id: "DQ-001",
        personId: "YS-1024",
        title: "Confirm date of birth",
        field: "dob",
        status: "Open",
        detail:
          "The referral and person record contain different dates. Check a verified source before making a correction.",
      },
      {
        id: "DQ-002",
        personId: "YS-1028",
        title: "Review contact suitability",
        field: "contact",
        status: "Open",
        detail:
          "Confirm the current contact arrangement with the care team before further invitations.",
      },
    ],
    audit: [],
  });
}

export function collectionStatus(c) {
  if (c.assignment === "Cancelled") return "Cancelled";
  if (c.assignment === "Paused") return "Paused";
  if (c.needsReview) return "Ready for review";
  if (c.review === "Reviewed") return "Reviewed";
  if (c.response === "Submitted") return "Ready for review";
  if (c.due < TODAY) return "Overdue";
  if (c.due === TODAY) return "Due today";
  return "Scheduled";
}
export const clinicalReviewStatus = (c) =>
  c.needsReview
    ? "Re-review required"
    : c.response !== "Submitted"
      ? "Awaiting response"
      : c.review || "Pending";

export function collectionActor(person, c, actor) {
  const role = c[actor];
  const name = c[`${actor}Name`] || (role === "Person" ? person?.name : null);
  if (role === "Person" || role === "Family respondent") {
    return name || "Name not recorded";
  }
  return name || role || "Not recorded";
}
export const personEventText = (person, detail = "") =>
  detail
    .split(" · ")
    .map((part) =>
      part === "Person" || part === LEGACY_PARTICIPANT_ROLE
        ? person.name
        : part === "Family respondent"
          ? "Respondent name not recorded"
          : part,
    )
    .join(" · ");
export function nextAction(c) {
  if (c.response === "Submitted") return "Review responses";
  if (c.link === "Expired") return "Reissue questionnaire";
  if (c.attempts.length) return "Follow up collection";
  return "Set up collection";
}
export function getTasks(state) {
  return [
    ...intakeTasks(state, TODAY),
    ...state.people.flatMap((p) =>
      p.episodes
        .filter((e) => e.status === "Active" && canAssess(p, e))
        .flatMap((e) =>
          e.collections
            .filter(
              (c) =>
                !["Cancelled", "Paused"].includes(c.assignment) &&
                (c.review !== "Reviewed" || c.needsReview),
            )
            .map((c) => ({
              person: p,
              episode: e,
              collection: c,
              status: collectionStatus(c),
              action: nextAction(c),
            })),
        ),
    ),
  ];
}
export function reducer(state, action) {
  if (action.type === "RESET") return createSeed();
  if (action.type === "UPGRADE_QUESTIONNAIRE_SAMPLES")
    return upgradeSampleData(state);
  if (
    [
      "ADD_PERSON",
      "SAVE_INTAKE",
      "START_ASSESSMENT",
      "ADD_REFERRAL",
      "REFERRAL_EVENT",
    ].includes(action.type)
  )
    return applyIntakeAction(state, action, {
      staff: currentStaff(state),
      uid,
      today: TODAY,
      version: VERSION,
    });
  const next = structuredClone(state);
  const p = next.people.find((p) => p.id === action.personId);
  const e = p?.episodes.find((e) => e.id === action.episodeId);
  const c = e?.collections.find((c) => c.id === action.collectionId);
  const recordedAt = new Date().toISOString();
  const staff = currentStaff(state);
  const priorPerson = state.people.find((person) => person.id === p?.id);
  const priorEpisode = priorPerson?.episodes.find(
    (episode) => episode.id === e?.id,
  );
  const event = (title, detail, context = {}) => {
    if (!e) return;
    const isRespondent =
      action.type === "SUBMIT" && c.channel !== "Clinician entry";
    e.events.unshift({
      id: uid(),
      date: recordedAt.slice(0, 10),
      timestamp: recordedAt,
      title,
      detail,
      actionType: action.type,
      personId: p.id,
      episodeId: e.id,
      actor: isRespondent
        ? collectionActor(p, c, "recorder")
        : staff?.name || "Not recorded",
      actorId: isRespondent ? null : staff?.id || null,
      role: isRespondent ? c.recorder : staff?.role || null,
      collectionId: c?.id || null,
      changes: careChanges(priorEpisode, e),
      ...context,
    });
  };
  switch (action.type) {
    case "SAVE_PROGRESS_REPORT": {
      const staff = currentStaff(state);
      if (reportEditError(e, staff?.role, action)) return state;
      const previous = e.progressReport;
      const timestamp = recordedAt;
      const content = Object.fromEntries(
        REPORT_FIELDS.map(({ key }) => [key, action.content[key].trim()]),
      );
      const changes = reportChanges(previous?.content, content);
      e.progressReportHistory ??= [];
      if (previous) e.progressReportHistory.unshift(previous);
      e.progressReport = {
        revision: (previous?.revision ?? 0) + 1,
        content,
        changes,
        actor: staff.name,
        actorId: staff.id,
        role: staff.role,
        timestamp,
        sources: reportSources(e),
      };
      event(
        "Progress report saved",
        `${staff.name} · version ${e.progressReport.revision} · ${
          !previous
            ? "Initial report saved"
            : changes.length
              ? changes.map(({ label }) => label).join(", ")
              : "Evidence updated; narrative unchanged"
        }`,
      );
      break;
    }
    case "SWITCH_STAFF":
      if (!DEMO_STAFF.some((staff) => staff.id === action.staffId))
        return state;
      next.staffId = action.staffId;
      break;
    case "EDIT_RESPONSE": {
      if (responseEditError(state, action)) return state;
      const staff = currentStaff(state);
      const timestamp = recordedAt;
      const priorAnswers = [...c.answers];
      const instrument = getInstrument(c.version);
      const priorPath = questionnaireState(instrument, priorAnswers);
      const nextPath = questionnaireState(instrument, action.answers);
      const changes = nextPath.answers.flatMap((value, index) =>
        value === priorAnswers[index]
          ? []
          : [
              {
                itemIndex: index,
                question:
                  c.respondent === "Family respondent"
                    ? instrument.questions[index].family ||
                      instrument.questions[index].title
                    : instrument.questions[index].title,
                priorValue: priorAnswers[index] ?? null,
                newValue: value,
                priorDisplay: answerLabel(priorPath.entries[index]),
                newDisplay: answerLabel(nextPath.entries[index]),
              },
            ],
      );
      const priorRevision = c.revision ?? 0;
      c.originalAnswers ??= priorAnswers;
      c.answers = nextPath.answers;
      c.revision = priorRevision + 1;
      c.needsReview = c.review === "Reviewed" || !!c.needsReview;
      next.audit.unshift({
        id: uid(),
        type: "response-edit",
        timestamp,
        date: timestamp.slice(0, 10),
        personId: p.id,
        episodeId: e.id,
        collectionId: c.id,
        title: `${c.label} — responses edited`,
        detail: changes
          .map(
            (change) =>
              `${change.question}: ${change.priorDisplay} → ${change.newDisplay}`,
          )
          .join("; "),
        actorId: staff.id,
        actor: staff.name,
        role: staff.role,
        reason: action.reason.trim(),
        source: action.source?.trim() || null,
        respondent: c.respondent,
        recorder: c.recorder,
        respondentName: c.respondentName,
        recorderName: c.recorderName,
        version: c.version,
        priorRevision,
        revision: c.revision,
        changes,
      });
      event(
        "Responses edited",
        `${c.label} · ${staff.name} · revision ${c.revision}${c.needsReview ? " · re-review required" : ""}`,
        { auditId: next.audit[0].id, revision: c.revision },
      );
      break;
    }
    case "PLAN":
      if (
        !canAssess(p, e) ||
        !e ||
        e.status !== "Active" ||
        !action.label?.trim() ||
        !INSTRUMENTS.some(
          (instrument) => instrument.version === (action.version ?? VERSION),
        ) ||
        !/^\d{4}-\d{2}-\d{2}$/.test(action.due || "") ||
        action.due < TODAY
      )
        return state;
      e.collections.push({
        id: uid(),
        label: action.label.trim(),
        due: action.due,
        version: action.version ?? VERSION,
        assignment: "Planned",
        response: "Not started",
        review: "Pending",
        link: "Not sent",
        attempts: [],
        answers: [],
        respondent: "Person",
        recorder: "Person",
        assistance: "Independent",
      });
      event(
        "Follow-up planned",
        `${action.label} · due ${formatDate(action.due)} · same care episode`,
        { collectionId: e.collections.at(-1).id },
      );
      break;
    case "DELIVER":
      if (
        !canAssess(p, e) ||
        !c ||
        e.status !== "Active" ||
        p.consent !== "Recorded" ||
        p.contact !== "Suitable" ||
        !getInstrument(c.version) ||
        c.response === "Submitted" ||
        ["Paused", "Cancelled"].includes(c.assignment)
      )
        return state;
      if (
        !["SMS link", "Clinic tablet", "Clinician entry"].includes(
          action.channel,
        ) ||
        !getInstrument(c.version).respondents.includes(action.respondent)
      )
        return state;
      if (
        !(
          action.channel === "Clinician entry"
            ? ["Transcribed", "Joint completion"]
            : ["Independent", "Supported"]
        ).includes(action.assistance)
      )
        return state;
      if (action.respondent === "Family respondent" && !p.family) return state;
      if (
        action.channel === "Clinician entry" &&
        currentStaff(state)?.role !== "Clinician"
      )
        return state;
      c.assignment = "Active";
      c.link = "Active";
      c.respondent = action.respondent;
      c.respondentName = action.respondent === "Person" ? p.name : p.family;
      c.channel = action.channel;
      c.assistance = action.assistance;
      c.recorder =
        action.channel === "Clinician entry"
          ? currentStaff(state)?.name || "Staff member"
          : action.respondent;
      c.recorderName =
        action.channel === "Clinician entry" ? c.recorder : c.respondentName;
      c.recorderId =
        action.channel === "Clinician entry" ? currentStaff(state).id : null;
      c.attempts.push({
        id: uid(),
        date: TODAY,
        channel: action.channel,
        respondent: c.respondent,
        respondentName: c.respondentName,
        recorderName: c.recorderName,
        recorderId: c.recorderId,
        assistance: c.assistance,
        status:
          action.channel === "SMS link"
            ? "Prepared (sample; not sent)"
            : "Session started (sample)",
      });
      event(
        action.channel === "SMS link"
          ? "Questionnaire link prepared"
          : "Collection session started",
        `${c.respondentName} · ${action.channel} · simulated`,
        { attemptId: c.attempts.at(-1).id },
      );
      break;
    case "SUBMIT":
      if (
        !canAssess(p, e) ||
        !c ||
        e.status !== "Active" ||
        c.response === "Submitted" ||
        c.assignment !== "Active" ||
        c.link !== "Active"
      )
        return state;
      if (
        (action.attemptId && action.attemptId !== c.attempts.at(-1)?.id) ||
        (action.channel && action.channel !== c.channel) ||
        (c.channel === "Clinician entry" &&
          (currentStaff(state)?.role !== "Clinician" ||
            currentStaff(state)?.id !== c.recorderId ||
            action.attemptId !== c.attempts.at(-1)?.id))
      )
        return state;
      if (
        !Array.isArray(action.answers) ||
        !questionnaireState(getInstrument(c.version), action.answers).complete
      )
        return state;
      c.answers = questionnaireState(
        getInstrument(c.version),
        action.answers,
      ).answers;
      c.response = "Submitted";
      c.assignment = "Fulfilled";
      c.link = "Ended";
      c.submittedAt = TODAY;
      c.submittedTimestamp = recordedAt;
      c.submittedAttemptId = c.attempts.at(-1)?.id;
      c.review = "Pending";
      event(
        "Questionnaire response received",
        `${c.label} · ${collectionActor(p, c, "respondent")} · clinical review pending`,
      );
      break;
    case "REVIEW":
      if (
        currentStaff(state)?.role !== "Clinician" ||
        !c ||
        c.response !== "Submitted" ||
        (c.review === "Reviewed" && !c.needsReview) ||
        !action.note?.trim()
      )
        return state;
      if (c.review === "Reviewed") {
        c.reviewHistory ??= [];
        c.reviewHistory.push({
          note: c.reviewNote,
          date: c.reviewDate,
          actor: c.reviewActor || "Not recorded",
          revision: c.reviewRevision ?? 0,
        });
      }
      c.review = "Reviewed";
      c.needsReview = false;
      c.reviewRevision = c.revision ?? 0;
      c.reviewActor = currentStaff(state).name;
      c.reviewNote = action.note.trim();
      c.reviewDate = TODAY;
      event(
        "Clinical review recorded",
        `${c.label} · ${c.reviewActor} · ${c.version}`,
        { reviewRevision: c.reviewRevision },
      );
      break;
    case "CONSENT":
      if (
        !p ||
        !["Recorded", "Not recorded", "Withdrawn"].includes(action.consent) ||
        !["Suitable", "Not confirmed", "Unsuitable"].includes(action.contact)
      )
        return state;
      const priorParticipation = { consent: p.consent, contact: p.contact };
      p.consent = action.consent;
      p.contact = action.contact;
      p.participationRecord = {
        source: action.source?.trim() || null,
        reason: action.reason?.trim() || null,
        actor: currentStaff(state)?.name || "Staff member",
        timestamp: recordedAt,
        scope:
          "Assessment participation and contact suitability · sample settings",
      };
      if (p.consent !== "Recorded" || p.contact !== "Suitable")
        p.episodes.forEach((ep) =>
          ep.collections.forEach((col) => {
            if (col.response !== "Submitted" && col.link === "Active")
              col.link = "Revoked";
          }),
        );
      next.audit.unshift({
        id: uid(),
        date: TODAY,
        personId: p.id,
        title: "Sample participation settings updated",
        detail: `Permission: ${p.consent}; contact: ${p.contact}`,
        ...p.participationRecord,
        prior: priorParticipation,
        actorId: staff?.id,
        role: staff?.role,
        changes: [
          ...recordFieldChanges(priorParticipation, p, [
            ["consent", "Assessment participation"],
            ["contact", "Contact suitability"],
          ]),
          ...p.episodes.flatMap((episode) =>
            careChanges(
              priorPerson.episodes.find((prior) => prior.id === episode.id),
              episode,
            ),
          ),
        ],
      });
      break;
    case "EPISODE":
      if (
        !e ||
        e.status !== "Active" ||
        !["Paused", "Closed"].includes(action.status) ||
        !action.reason?.trim()
      )
        return state;
      e.status = action.status;
      if (action.status === "Closed") e.end = TODAY;
      e.reason = action.reason;
      e.nextCareStep = action.nextCareStep?.trim() || null;
      e.nextCareOwner = action.nextCareOwner?.trim() || p.owner || null;
      e.collections.forEach((c) => {
        if (c.response !== "Submitted") {
          c.assignment = action.status === "Paused" ? "Paused" : "Cancelled";
          c.link = "Revoked";
        }
      });
      event(
        `Care episode ${action.status.toLowerCase()}`,
        `${action.reason} · Next care step: ${e.nextCareStep || "Not recorded"} · Owner: ${e.nextCareOwner || "Not assigned"} · outstanding collections ${action.status === "Paused" ? "paused" : "cancelled"}; links revoked`,
      );
      break;
    case "RESOLVE_ISSUE":
    case "CORRECT": {
      const resolution =
        action.type === "CORRECT" ? "Corrected value" : action.resolution;
      if (qualityResolutionError(state, { ...action, resolution }))
        return state;
      const issue = next.issues.find((i) => i.id === action.issueId);
      const prior = p[issue.field];
      if (resolution === "Corrected value")
        p[issue.field] = action.value.trim();
      issue.status = resolution === "Needs investigation" ? "Open" : "Resolved";
      issue.outcome = resolution;
      issue.reason = action.reason.trim();
      issue.owner = currentStaff(state)?.name || p.owner;
      issue.nextStep =
        resolution === "Needs investigation" ? action.nextStep.trim() : null;
      if (
        resolution === "Corrected value" &&
        issue.field === "contact" &&
        action.value !== "Suitable"
      )
        p.episodes.forEach((ep) =>
          ep.collections.forEach((col) => {
            if (col.response !== "Submitted" && col.link === "Active")
              col.link = "Revoked";
          }),
        );
      next.audit.unshift({
        id: uid(),
        date: TODAY,
        personId: p.id,
        title: `${issue.title} · ${resolution.toLowerCase()}`,
        detail:
          resolution === "Corrected value"
            ? `${prior} → ${action.value}`
            : `${prior} · ${resolution === "Confirmed unchanged" ? "Value confirmed without a change" : `Issue remains open. Next step: ${issue.nextStep}`}`,
        reason: action.reason.trim(),
        source: action.source.trim(),
        priorValue: prior,
        newValue: p[issue.field],
        actor: currentStaff(state)?.name || "Staff member",
        timestamp: recordedAt,
        actorId: staff?.id,
        role: staff?.role,
        changes: [
          ...recordFieldChanges(priorPerson, p, [[issue.field, issue.title]]),
          ...recordFieldChanges(
            state.issues.find((item) => item.id === issue.id),
            issue,
            [
              ["status", "Issue status"],
              ["outcome", "Outcome"],
              ["owner", "Issue owner"],
              ["nextStep", "Next investigation step"],
            ],
          ),
          ...p.episodes.flatMap((episode) =>
            careChanges(
              priorPerson.episodes.find((prior) => prior.id === episode.id),
              episode,
            ),
          ),
        ],
      });
      break;
    }
    default:
      return state;
  }
  return next;
}

export function qualityResolutionError(state, action) {
  const person = state.people.find((p) => p.id === action.personId);
  const issue = state.issues.find(
    (i) => i.id === action.issueId && i.personId === action.personId,
  );
  if (!person || !issue || issue.status !== "Open")
    return "This issue is no longer open for this person.";
  if (
    !["Confirmed unchanged", "Corrected value", "Needs investigation"].includes(
      action.resolution,
    )
  )
    return "Choose an outcome.";
  if (!action.source?.trim() || !action.reason?.trim())
    return "Record the source checked and the reason for this outcome.";
  if (action.resolution === "Needs investigation" && !action.nextStep?.trim())
    return "Add the next investigation step.";
  if (action.resolution === "Corrected value") {
    if (!action.value?.trim() || action.value === person[issue.field])
      return "The value is unchanged. Choose Confirm unchanged or enter a different value.";
    if (
      issue.field === "contact" &&
      !["Suitable", "Not confirmed", "Unsuitable"].includes(action.value)
    )
      return "Choose a valid contact status.";
    if (
      issue.field === "dob" &&
      (!/^\d{4}-\d{2}-\d{2}$/.test(action.value) ||
        action.value > TODAY ||
        !Number.isFinite(new Date(action.value).getTime()) ||
        new Date(action.value).toISOString().slice(0, 10) !== action.value)
    )
      return "Enter a valid date of birth on or before the sample date.";
  }
  return null;
}

// Shared by the form and reducer so rejected edits never report a successful save.
export function responseEditError(state, action) {
  const person = state.people.find((p) => p.id === action.personId);
  const episode = person?.episodes.find((e) => e.id === action.episodeId);
  const response = episode?.collections.find(
    (c) => c.id === action.collectionId,
  );
  if (!canEditResponses(state)) return "Your role cannot edit responses.";
  if (!response || response.response !== "Submitted")
    return "Only submitted responses can be edited.";
  const instrument = getInstrument(response.version);
  if (!instrument)
    return "The questionnaire version is unavailable for editing.";
  if (action.expectedRevision !== (response.revision ?? 0))
    return "This response has changed. Reopen the editor to review the latest answers.";
  if (!action.reason?.trim()) return "Enter a reason for this edit.";
  if (
    !Array.isArray(action.answers) ||
    !questionnaireState(instrument, action.answers).complete
  )
    return "Choose a valid answer for every applicable question, including any newly shown follow-ups.";
  if (
    questionnaireState(instrument, action.answers).answers.every(
      (value, index) => value === response.answers?.[index],
    )
  )
    return "Change at least one answer before saving.";
  return null;
}
