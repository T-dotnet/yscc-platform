import { useState } from "react";
import { Field, Modal, Notice, Button, ValidatedForm } from "./UI";
import { CARE_EVENT_TYPES, careEventType } from "../careEvents";
import { formatDate, TODAY } from "../model";

const formValues = (event) =>
  Object.fromEntries(new FormData(event.currentTarget));

export default function CareEventForm({
  episode,
  event: existingEvent,
  error,
  onClose,
  onSave,
}) {
  const [eventType, setEventType] = useState(
    CARE_EVENT_TYPES.some((type) => type.value === existingEvent?.eventType)
      ? existingEvent.eventType
      : "care-transition",
  );
  const latestDate = episode.end && episode.end < TODAY ? episode.end : TODAY;
  const selectedType = careEventType(eventType);

  return (
    <Modal
      title={existingEvent ? "Correct event" : "Record an event"}
      subtitle={`Care period ${episode.number} · ${formatDate(episode.start)}–${episode.end ? formatDate(episode.end) : "present"}`}
      onClose={onClose}
    >
      <ValidatedForm
        onSubmit={(event) => {
          event.preventDefault();
          onSave({ type: "ADD_CARE_EVENT", ...formValues(event) });
        }}
      >
        <div className="form-body care-event-form">
          <Notice>
            Record contextual events only. This does not replace a safety plan,
            medication chart or source clinical record.
          </Notice>
          <div className="form-grid">
            <Field label="Event type">
              <select
                name="eventType"
                value={eventType}
                onChange={(event) => setEventType(event.target.value)}
                required
              >
                {CARE_EVENT_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Event date" hint="The date the event happened.">
              <input
                type="date"
                name="eventDate"
                defaultValue={existingEvent?.eventDate || latestDate}
                min={episode.start}
                max={latestDate}
                required
              />
            </Field>
          </div>
          <p className="event-type-description">
            {selectedType?.description || "Choose an event type."}
          </p>
          <div className="care-event-fields">
            {eventType === "medication-adverse" && (
              <Field label="Medication name">
                <input
                  name="medicationName"
                  autoFocus
                  defaultValue={existingEvent?.fields?.medicationName || ""}
                  required
                />
              </Field>
            )}
            <Field label="Factual event summary">
              <input
                name="summary"
                autoFocus={eventType !== "medication-adverse"}
                defaultValue={existingEvent?.title?.replace(/^Correction: /, "") || ""}
                placeholder="Describe what happened without interpreting its cause"
                required
              />
            </Field>
            <Field
              label="Source or observer (optional)"
              hint="For example, person, treating clinician, hospital update or documented source."
            >
              <input
                name="source"
                defaultValue={existingEvent?.fields?.source || ""}
              />
            </Field>
            <Field label="Impact on care or coordination (optional)">
              <textarea
                name="impact"
                rows="3"
                defaultValue={existingEvent?.fields?.impact || ""}
              />
            </Field>
            <Field label="Notes (optional)">
              <textarea
                name="notes"
                rows="3"
                defaultValue={existingEvent?.fields?.notes || ""}
              />
            </Field>
            {existingEvent && (
              <Field label="Reason for correction">
                <textarea name="correctionReason" rows="2" required />
              </Field>
            )}
          </div>
        </div>
        <div className="modal-footer">
          {error && (
            <p className="field-error form-save-error" role="alert">
              {error}
            </p>
          )}
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {existingEvent ? "Add correction" : "Add to timeline"}
          </Button>
        </div>
      </ValidatedForm>
    </Modal>
  );
}
