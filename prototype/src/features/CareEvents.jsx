import {
  CalendarDays,
  ClipboardList,
  HeartHandshake,
  Pill,
  Plus,
  Sparkles,
} from "lucide-react";
import {
  careEventDetails,
  careEventType,
  recordedCareEvents,
} from "../careEvents";
import { formatDate, formatTimestamp } from "../model";
import { Button, Panel } from "../components/UI";

const EVENT_ICONS = {
  medication: Pill,
  "care-service": HeartHandshake,
  "life-event": Sparkles,
  other: ClipboardList,
};

export default function CareEvents({ episode, openModal }) {
  const events = recordedCareEvents(episode);
  const recordEvent = () =>
    openModal({ type: "care-event", episodeId: episode.id });

  return (
    <div className="stack care-events">
      <div className="section-toolbar">
        <div>
          <h2>Events</h2>
          <p>
            Contextual changes recorded during care episode {episode.number}.
          </p>
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
              Add a medication, care or service, significant life, or other
              event to start this timeline.
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
                <article>
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
                  <footer>
                    Recorded by {event.actor || "Staff member"}
                    {event.role ? ` · ${event.role}` : ""}
                    {event.timestamp
                      ? ` · ${formatTimestamp(event.timestamp)}`
                      : ""}
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
