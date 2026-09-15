import { formatDate, clinicalReviewStatus, collectionActor } from "../model";
import { canAssess } from "../intake";
import { collectionSetupLabel } from "../overview";
import { Modal, Button, Badge, Notice, Empty } from "./UI";

export default function CollectionDetails({
  person,
  episode,
  collection,
  onClose,
  onAction,
  canCompleteAsClinician = false,
}) {
  const c = collection;
  const submitted = c.response === "Submitted";
  const collectionOpen =
    episode.status === "Active" &&
    !["Paused", "Cancelled"].includes(c.assignment) &&
    canAssess(person, episode);

  return (
    <Modal
      title={c.label}
      subtitle={`${person.name} · Care episode ${episode.number}`}
      onClose={onClose}
    >
      <div className="form-body collection-details">
        <section aria-label="Collection information">
          <h3>Collection details</h3>
          <dl className="metadata">
            <div>
              <dt>Instrument</dt>
              <dd>{c.version}</dd>
            </div>
            <div>
              <dt>Due date</dt>
              <dd>{formatDate(c.due)}</dd>
            </div>
            <div>
              <dt>Assignment</dt>
              <dd>
                <Badge>{c.assignment}</Badge>
              </dd>
            </div>
            <div>
              <dt>Response</dt>
              <dd>
                <Badge>{c.response}</Badge>
              </dd>
            </div>
            {!submitted && (
              <div>
                <dt>Link / session</dt>
                <dd>{c.link || "Not recorded"}</dd>
              </div>
            )}
            {submitted && (
              <div>
                <dt>Submitted on</dt>
                <dd>
                  {c.submittedAt ? formatDate(c.submittedAt) : "Not recorded"}
                </dd>
              </div>
            )}
            <div>
              <dt>Clinical review</dt>
              <dd>
                <Badge>{clinicalReviewStatus(c)}</Badge>
              </dd>
            </div>
            <div>
              <dt>Respondent</dt>
              <dd>{collectionActor(person, c, "respondent")}</dd>
            </div>
            {!submitted && (
              <>
                <div>
                  <dt>Participation</dt>
                  <dd>{person.consent}</dd>
                </div>
                <div>
                  <dt>Contact suitability</dt>
                  <dd>{person.contact}</dd>
                </div>
              </>
            )}
            <div>
              <dt>Recorder</dt>
              <dd>
                {submitted || c.attempts.length
                  ? collectionActor(person, c, "recorder")
                  : "Not recorded"}
              </dd>
            </div>
            <div>
              <dt>Assistance</dt>
              <dd>
                {submitted || c.attempts.length
                  ? c.assistance || "Not recorded"
                  : "Not recorded"}
              </dd>
            </div>
            <div>
              <dt>Channel</dt>
              <dd>
                {c.channel || (submitted ? "Not recorded" : "Not selected")}
              </dd>
            </div>
          </dl>
        </section>
        {!submitted && (
          <Empty
            title={
              c.response === "Draft"
                ? "A draft is in progress"
                : "No submitted response yet"
            }
          >
            {c.response === "Draft"
              ? "No response has been submitted. This sample draft cannot be resumed; check the collection arrangements before starting another attempt."
              : "Check delivery activity and contact arrangements before deciding whether another attempt is needed."}
          </Empty>
        )}
        <section aria-label="Delivery attempts">
          <h3>Delivery attempts</h3>
          {c.attempts.length ? (
            c.attempts.map((a, i) => (
              <div className="attempt" key={a.id}>
                <div>
                  <strong>
                    Attempt {i + 1} · {a.channel}
                  </strong>
                  <small>{formatDate(a.date)}</small>
                </div>
                <Badge>{a.status}</Badge>
              </div>
            ))
          ) : (
            <p className="muted">
              {submitted
                ? "Delivery history was not recorded for this response."
                : "No delivery attempts recorded."}
            </p>
          )}
          <Notice>
            Reissuing a link adds an attempt to this assignment. It does not
            create a new time point.
          </Notice>
        </section>
      </div>
      <div className="modal-footer">
        <Button onClick={onClose}>Close</Button>
        {!submitted && collectionOpen && (
          <>
            {canCompleteAsClinician && (
              <Button
                disabled={
                  episode.status !== "Active" ||
                  ["Paused", "Cancelled"].includes(c.assignment)
                }
                onClick={() => onAction("clinician-entry")}
              >
                Complete as clinician
              </Button>
            )}
            <Button variant="primary" onClick={() => onAction("collection")}>
              {collectionSetupLabel(c)}
            </Button>
          </>
        )}
      </div>
    </Modal>
  );
}
