import {
  DEMO_INSTRUMENT,
  questionnaireState,
  setQuestionAnswer,
} from "./instruments.js";

// Fictional fixture generation only. Never used to complete participant answers.
export function createSampleAnswers(overrides = {}) {
  let answers = [];
  DEMO_INSTRUMENT.questions.forEach((question, index) => {
    if (
      questionnaireState(DEMO_INSTRUMENT, answers).entries[index].status ===
      "visible"
    ) {
      const value = question.options.includes(overrides[question.id])
        ? overrides[question.id]
        : question.options[0];
      answers = setQuestionAnswer(DEMO_INSTRUMENT, answers, index, value);
    }
  });
  return answers;
}

const profiles = [
  {
    participation: "In person",
    pace: "Short sections with breaks",
    support: "A little support",
    "support-kind": "Explaining the answer options",
    activities: "Managing my routine",
    connection: "Yes",
    who: "A family member",
    next: "My next steps",
  },
  {
    participation: "On my own device",
    device: "Sometimes",
    "device-help": "A device at the centre",
    pace: "Short sections with breaks",
    support: "A little support",
    "support-kind": "Reading the questions together",
    activities: "Learning or work",
    connection: "I’m not sure",
    next: "Support available to me",
  },
  {
    participation: "In person",
    support: "I’m comfortable on my own",
    activities: "Nothing for now",
    connection: "Not right now",
    next: "How taking part works",
  },
  {
    participation: "On my own device",
    device: "Yes",
    support: "A little support",
    "support-kind": "Explaining the answer options",
    activities: "Hobbies and free time",
    connection: "Not right now",
    next: "My next steps",
    takeaway: "A summary to look back at",
  },
  {
    participation: "Together with a staff member",
    pace: "Decide as I go",
    support: "I’d like someone alongside me",
    activities: "Managing my routine",
    connection: "Yes",
    who: "A staff member",
    next: "Support available to me",
  },
  {
    participation: "In person",
    pace: "Short sections with breaks",
    support: "Prefer not to answer",
    activities: "Hobbies and free time",
    connection: "I’m not sure",
    next: "How taking part works",
    ending: "Let me ask any final questions",
  },
];

export function sampleAnswersFor(
  personIndex,
  phase = "current",
  legacyAnswers,
) {
  const profile = {
    ...profiles[(personIndex + profiles.length) % profiles.length],
  };
  if (phase === "baseline")
    Object.assign(profile, {
      participation: "In person",
      support: "A little support",
      activities: "Learning or work",
      connection: "Yes",
      who: "A family member",
      next: "How taking part works",
      takeaway: "One clear next step",
    });
  if (legacyAnswers) {
    for (const [index, id] of ["participation", "support", "next"].entries()) {
      if (legacyAnswers[index]) profile[id] = legacyAnswers[index];
    }
  }
  return createSampleAnswers(profile);
}
