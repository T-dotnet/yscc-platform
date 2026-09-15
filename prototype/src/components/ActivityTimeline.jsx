import { activityEntries, activityChangeDetails } from "../activity";
import { formatDate, formatTimestamp, personEventText } from "../model";

const displayValue = (value) =>
  value === true
    ? "Yes"
    : value === false
      ? "No"
      : value == null || value === ""
        ? "Not recorded."
        : String(value);

export default function ActivityTimeline({
  episode,
  person,
  full = false,
  audit = [],
}) {
  const entries = activityEntries(person, episode, audit);
  return (
    <ol
      className={`timeline${full ? " activity-history" : ""}`}
      aria-label={full ? "History and change log" : "Recent care activity"}
    >
      {(full ? entries : entries.slice(0, 4)).map((entry) => {
        const changes = activityChangeDetails(entry);
        return (
          <li key={entry.id}>
            <span className="timeline-dot" />
            <time dateTime={entry.timestamp || entry.date || undefined}>
              {entry.timestamp
                ? full
                  ? formatTimestamp(entry.timestamp)
                  : formatDate(entry.timestamp.slice(0, 10))
                : entry.date
                  ? formatDate(entry.date)
                  : "Date not recorded"}
            </time>
            <div>
              <strong>{entry.title}</strong>
              <p>{personEventText(person, entry.detail)}</p>
              {(full || entry.actor) && (
                <small>
                  {entry.actor || "Editor not recorded"}
                  {entry.role ? ` · ${entry.role}` : ""}
                  {entry.scope ? ` · ${entry.scope}` : ""}
                  {full && !entry.timestamp ? " · Exact time not recorded" : ""}
                </small>
              )}
              {full && entry.occurredAt && (
                <p>Event occurred: {formatTimestamp(entry.occurredAt)}</p>
              )}
              {full && entry.reason && <p>Reason: {entry.reason}</p>}
              {full && entry.source && <p>Source: {entry.source}</p>}
              {full && changes.length > 0 && (
                <details className="activity-change-details">
                  <summary>View changes · {changes.length}</summary>
                  {changes.map((change) => (
                    <section key={change.key}>
                      <h3>{change.label}</h3>
                      <dl className="history-answer-comparison report-wording-comparison">
                        <div>
                          <dt>Before</dt>
                          <dd>{displayValue(change.before)}</dd>
                        </div>
                        <div>
                          <dt>After</dt>
                          <dd>{displayValue(change.after)}</dd>
                        </div>
                      </dl>
                    </section>
                  ))}
                </details>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
