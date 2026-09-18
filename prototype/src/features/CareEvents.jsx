import {
  CalendarDays,
  ClipboardList,
  House,
  HeartHandshake,
  Hospital,
  Pill,
  Plus,
  ShieldAlert,
} from "lucide-react";
import {
  careEventDetails,
  careEventType,
  recordedCareEvents,
} from "../careEvents";
import { formatDate, formatTimestamp } from "../model";
import { Button, Panel } from "../components/UI";

const EVENT_ICONS = {
  harm: ShieldAlert,
  inpatient: Hospital,
  "medication-adverse": Pill,
  housing: House,
  "care-transition": HeartHandshake,
  medication: Pill,
  "care-service": HeartHandshake,
  other: ClipboardList,
};

export default function CareEvents({ episode, openModal, eventId }) {
  const events = recordedCareEvents(episode);
  const recordEvent = () =>
    openModal({ type: "care-event", episodeId: episode.id });

  return (
    <div className="stack care-events">
      <div className="section-toolbar">
        <div>
          <h2>Events</h2>
          <p>Contextual changes recorded during this care period.</p>
        </div>
        <Button variant="primary" onClick={recordEvent}>
          <Plus size={17} aria-hidden="true" /> Record event
        </Button>
      </div>

      {events.length === 0 ? (
        <Panel>
          <div className="care-events-empty">
            <CalendarDays size={30} aria-hidden="true" />
            <h3>No events recorded</h3>
            <p>
              Add a safety, inpatient, medication, housing, care-transition or
              other contextual event to start this timeline.
            </p>
            <Button onClick={recordEvent}>
              <Plus size={17} aria-hidden="true" /> Record first event
            </Button>
          </div>
        </Panel>
      ) : (
        <ol className="care-event-timeline" aria-label="Care events">
          {events.map((event) => {
            const type = careEventType(event.eventType);
            const Icon = EVENT_ICONS[event.eventType] || ClipboardList;
            const details = careEventDetails(event);
            return (
              <li key={event.id}>
                <time dateTime={event.eventDate || event.date}>
                  {formatDate(event.eventDate || event.date)}
                </time>
                <span className="care-event-marker" aria-hidden="true">
                  <Icon size={17} />
                </span>
                <article
                  className={event.id === eventId ? "care-event-selected" : ""}
                  id={`event-${event.id}`}
                >
                  <header>
                    <div>
                      <span className="care-event-type">{type?.label}</span>
                      <h3>{event.title}</h3>
                    </div>
                  </header>
                  {details.length > 0 && (
                    <dl>
                      {details.map(([label, value]) => (
                        <div key={label}>
                          <dt>{label}</dt>
                          <dd>{value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  {event.correctedEventId && (
                    <p className="care-event-correction">
                      This is an append-only correction of an earlier event.
                    </p>
                  )}
                  <footer>
                    <span>
                      Recorded by {event.actor || "Staff member"}
                      {event.role ? ` · ${event.role}` : ""}
                      {event.timestamp
                        ? ` · ${formatTimestamp(event.timestamp)}`
                        : ""}
                    </span>
                    <Button
                      variant="secondary"
                      onClick={() =>
                        openModal({
                          type: "correct-care-event",
                          episodeId: episode.id,
                          eventId: event.id,
                        })
                      }
                    >
                      Correct event
                    </Button>
                  </footer>
                </article>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
