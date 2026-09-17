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

const timelineTimestamp = (timestamp) => {
  const value = new Date(timestamp);
  const timeParts = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  }).formatToParts(value);
  return {
    date: value
      .toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      .replace("Sept", "Sep"),
    time: timeParts
      .filter(({ type }) =>
        ["hour", "minute", "second", "literal"].includes(type),
      )
      .map(({ value: part }) => part)
      .join("")
      .trim(),
    zone: timeParts.find(({ type }) => type === "timeZoneName")?.value || "",
  };
};

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
        const entryTimestamp =
          entry.timestamp || (entry.date?.includes("T") ? entry.date : null);
        const timestampParts = entryTimestamp
          ? timelineTimestamp(entryTimestamp)
          : null;
        const attemptDetails = entry.collectionLabel
          ? [
              ["Collection", entry.collectionLabel],
              ["Respondent", personEventText(person, entry.attemptRespondent)],
              ["Channel", entry.attemptChannel],
              ["Status", entry.attemptStatus],
            ].filter(([, value]) => value)
          : [];
        const historyDetails = [
          ...(attemptDetails.length
            ? attemptDetails
            : changes.length === 0 && entry.detail
              ? [["Details", personEventText(person, entry.detail)]]
              : []),
          [
            "Recorded by",
            `${entry.actor || "Editor not recorded"}${entry.role ? ` - ${entry.role}` : ""}`,
          ],
          ...(entry.scope ? [["Scope", entry.scope]] : []),
          ...(entry.occurredAt
            ? [["Event occurred", formatTimestamp(entry.occurredAt)]]
            : []),
          ...(entry.eventDate
            ? [["Event date", formatDate(entry.eventDate)]]
            : []),
          ...(entry.reason ? [["Reason", entry.reason]] : []),
          ...(entry.source ? [["Source", entry.source]] : []),
          ...(!entryTimestamp ? [["Time", "Exact time not recorded"]] : []),
        ];
        return (
          <li key={entry.id}>
            <span className="timeline-dot" />
            <time dateTime={entryTimestamp || entry.date || undefined}>
              {full && timestampParts ? (
                <>
                  <strong>{timestampParts.date}</strong>
                  <span>{timestampParts.time}</span>
                  {timestampParts.zone && <small>{timestampParts.zone}</small>}
                </>
              ) : (
                <strong>
                  {entryTimestamp
                    ? formatDate(entryTimestamp.slice(0, 10))
                    : entry.date
                      ? formatDate(entry.date.slice(0, 10))
                      : "Date not recorded"}
                </strong>
              )}
            </time>
            <div>
              <strong>{entry.title}</strong>
              {full ? (
                <dl className="activity-entry-details">
                  {historyDetails.map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              ) : changes.length === 0 ? (
                <p>{personEventText(person, entry.detail)}</p>
              ) : null}
              {!full && entry.actor && (
                <small>
                  {entry.actor}
                  {entry.role ? ` · ${entry.role}` : ""}
                  {entry.scope ? ` · ${entry.scope}` : ""}
                </small>
              )}
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
