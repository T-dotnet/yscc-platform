import { useState } from "react";
import { Field, Modal, Notice, Button, ValidatedForm } from "./UI";
import {
  CARE_EVENT_TYPES,
  LIFE_EVENT_AREAS,
  MEDICATION_CHANGES,
  careEventType,
} from "../careEvents";
import { formatDate, TODAY } from "../model";

const formValues = (event) =>
  Object.fromEntries(new FormData(event.currentTarget));

export default function CareEventForm({ episode, error, onClose, onSave }) {
  const [eventType, setEventType] = useState("medication");
  const [medicationChange, setMedicationChange] = useState("Started");
  const latestDate = episode.end && episode.end < TODAY ? episode.end : TODAY;
  const selectedType = careEventType(eventType);

  return (
    <Modal
      title="Record an event"
      subtitle={`Care episode ${episode.number} · ${formatDate(episode.start)}–${episode.end ? formatDate(episode.end) : "present"}`}
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
            Record contextual events only. This does not prescribe medication or
            replace the source clinical record.
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
                defaultValue={latestDate}
                min={episode.start}
                max={latestDate}
                required
              />
            </Field>
          </div>
          <p className="event-type-description">{selectedType.description}</p>

          {eventType === "medication" && (
            <div className="care-event-fields" key="medication">
              <div className="form-grid">
                <Field label="Medication name">
                  <input name="medicationName" autoFocus required />
                </Field>
                <Field label="What changed">
                  <select
                    name="medicationChange"
                    value={medicationChange}
                    onChange={(event) =>
                      setMedicationChange(event.target.value)
                    }
                    required
                  >
                    {MEDICATION_CHANGES.map((change) => (
                      <option key={change}>{change}</option>
                    ))}
                  </select>
                </Field>
              </div>
              {!["Stopped", "Medication reviewed"].includes(
                medicationChange,
              ) && (
                <Field
                  label={
                    medicationChange === "Dose changed"
                      ? "New dose (optional)"
                      : "Dose (optional)"
                  }
                >
                  <input name="dose" placeholder="For example, 25 mg daily" />
                </Field>
              )}
              <Field label="Reason (optional)">
                <input name="reason" />
              </Field>
              <Field label="Notes (optional)">
                <textarea name="notes" rows="3" />
              </Field>
            </div>
          )}

          {eventType === "care-service" && (
            <div className="care-event-fields" key="care-service">
              <Field label="What changed">
                <input
                  name="summary"
                  autoFocus
                  placeholder="For example, family support started"
                  required
                />
              </Field>
              <Field label="Service or provider (optional)">
                <input name="serviceName" />
              </Field>
              <Field label="Reason (optional)">
                <input name="reason" />
              </Field>
              <Field label="Notes (optional)">
                <textarea name="notes" rows="3" />
              </Field>
            </div>
          )}

          {eventType === "life-event" && (
            <div className="care-event-fields" key="life-event">
              <div className="form-grid">
                <Field label="Event title">
                  <input name="summary" autoFocus required />
                </Field>
                <Field label="Area of life">
                  <select name="lifeArea" defaultValue="Home" required>
                    {LIFE_EVENT_AREAS.map((area) => (
                      <option key={area}>{area}</option>
                    ))}
                  </select>
                </Field>
              </div>
              <Field label="Impact on wellbeing or care (optional)">
                <textarea name="impact" rows="3" />
              </Field>
              <Field label="Notes (optional)">
                <textarea name="notes" rows="3" />
              </Field>
            </div>
          )}

          {eventType === "other" && (
            <div className="care-event-fields" key="other">
              <Field label="Event title">
                <input name="summary" autoFocus required />
              </Field>
              <Field label="Description (optional)">
                <textarea name="notes" rows="4" />
              </Field>
            </div>
          )}
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
            Add to timeline
          </Button>
        </div>
      </ValidatedForm>
    </Modal>
  );
}
