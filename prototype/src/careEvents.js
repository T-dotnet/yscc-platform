export const CARE_EVENT_TYPES = [
  {
    value: "medication",
    label: "Medication change",
    description: "A medication was started, stopped, or changed.",
  },
  {
    value: "care-service",
    label: "Care or service change",
    description: "A change to care, support, service, or provider.",
  },
  {
    value: "life-event",
    label: "Significant life event",
    description: "A change at home, education, relationships, or daily life.",
  },
  {
    value: "other",
    label: "Other event",
    description: "Another event that may help explain the care journey.",
  },
];

export const MEDICATION_CHANGES = [
  "Started",
  "Stopped",
  "Dose changed",
  "Medication reviewed",
];

export const LIFE_EVENT_AREAS = [
  "Home",
  "Education",
  "Relationships",
  "Health",
  "Other",
];

export const careEventType = (value) =>
  CARE_EVENT_TYPES.find((type) => type.value === value);

export function careEventError(episode, action, today) {
  if (!episode) return "The selected care period is unavailable.";
  if (!careEventType(action.eventType)) return "Choose an event type.";
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(action.eventDate || "") ||
    !Number.isFinite(new Date(`${action.eventDate}T12:00:00`).getTime()) ||
    new Date(`${action.eventDate}T12:00:00`).toISOString().slice(0, 10) !==
      action.eventDate
  )
    return "Enter a valid event date.";
  if (action.eventDate < episode.start)
    return "The event date must be within this care period.";
  const latestDate = episode.end && episode.end < today ? episode.end : today;
  if (action.eventDate > latestDate)
    return "The event date cannot be after this care period or in the future.";

  if (action.eventType === "medication") {
    if (!action.medicationName?.trim()) return "Enter the medication name.";
    if (!MEDICATION_CHANGES.includes(action.medicationChange))
      return "Choose what changed about the medication.";
  }
  if (action.eventType === "care-service" && !action.summary?.trim())
    return "Describe the care or service change.";
  if (action.eventType === "life-event") {
    if (!action.summary?.trim()) return "Enter a title for the life event.";
    if (!LIFE_EVENT_AREAS.includes(action.lifeArea))
      return "Choose the area of life affected.";
  }
  if (action.eventType === "other" && !action.summary?.trim())
    return "Enter an event title.";
  return null;
}

const clean = (value) => value?.trim() || null;

export function careEventContent(action) {
  if (action.eventType === "medication") {
    const medicationName = action.medicationName.trim();
    const medicationChange = action.medicationChange;
    return {
      title:
        medicationChange === "Dose changed"
          ? `${medicationName} dose changed`
          : medicationChange === "Medication reviewed"
            ? `${medicationName} reviewed`
            : `${medicationName} ${medicationChange.toLowerCase()}`,
      detail: clean(action.notes) || `${medicationChange} recorded.`,
      fields: {
        medicationName,
        medicationChange,
        dose: clean(action.dose),
        reason: clean(action.reason),
        notes: clean(action.notes),
      },
    };
  }
  if (action.eventType === "care-service") {
    return {
      title: action.summary.trim(),
      detail:
        clean(action.notes) ||
        clean(action.serviceName) ||
        "Care or service change recorded.",
      fields: {
        serviceName: clean(action.serviceName),
        change: action.summary.trim(),
        reason: clean(action.reason),
        notes: clean(action.notes),
      },
    };
  }
  if (action.eventType === "life-event") {
    return {
      title: action.summary.trim(),
      detail: clean(action.impact) || "Significant life event recorded.",
      fields: {
        area: action.lifeArea,
        impact: clean(action.impact),
        notes: clean(action.notes),
      },
    };
  }
  return {
    title: action.summary.trim(),
    detail: clean(action.notes) || "Other event recorded.",
    fields: { notes: clean(action.notes) },
  };
}

export function careEventDetails(event) {
  const fields = event.fields ?? {};
  if (event.eventType === "medication")
    return [
      ["Medication", fields.medicationName],
      ["Change", fields.medicationChange],
      ["Dose", fields.dose],
      ["Reason", fields.reason],
      ["Notes", fields.notes],
    ].filter(([, value]) => value);
  if (event.eventType === "care-service")
    return [
      ["Service or provider", fields.serviceName],
      ["Change", fields.change],
      ["Reason", fields.reason],
      ["Notes", fields.notes],
    ].filter(([, value]) => value);
  if (event.eventType === "life-event")
    return [
      ["Area", fields.area],
      ["Impact", fields.impact],
      ["Notes", fields.notes],
    ].filter(([, value]) => value);
  return [["Notes", fields.notes]].filter(([, value]) => value);
}

export function recordedCareEvents(episode) {
  return (episode?.events ?? [])
    .filter((event) => event.actionType === "ADD_CARE_EVENT")
    .toSorted(
      (a, b) =>
        (b.eventDate || b.date || "").localeCompare(
          a.eventDate || a.date || "",
        ) || (b.timestamp || "").localeCompare(a.timestamp || ""),
    );
}
