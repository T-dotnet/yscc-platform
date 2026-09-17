import IntakeWorkspace, { IntakePanel } from "./Intake";
import Referrals from "./Referrals";
import { intakeFor, canAssess } from "../intake";
import { overviewNextStep } from "../overview";
import {
  currentCollection,
  compareCollections,
  isOutstanding,
  safeReturnTo,
} from "../workflow";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Plus, ChevronDown, FileText } from "lucide-react";
import { useStore } from "../store";
import Progress from "./Progress";
import CareEvents from "./CareEvents";
import Timeline from "../components/ActivityTimeline";
import { getInstrument } from "../instruments";
import {
  age,
  formatDate,
  collectionStatus,
  clinicalReviewStatus,
  collectionActorIdentity,
  formatTimestamp,
  currentStaff,
  noClinicalReviewRequired,
} from "../model";
import {
  Button,
  Avatar,
  Badge,
  Panel,
  Select,
  Notice,
  Continuity,
  TextLink,
  Empty,
  Tabs,
  PersonIdentity,
} from "../components/UI";

export default function Person({ id, navigate, openModal }) {
  const { state } = useStore();
  const p = state.people.find((p) => p.id === id);
  const searchParams = useSearchParams();
  const allTabs = [
    "Overview",
    "Assessment",
    "Events",
    "Report",
    "Consent & respondents",
    "History",
  ];
  // Existing worklist links open these workflows outside the record tab bar.
  const contextualView = ["Intake", "Referrals"].find(
    (view) => view.toLowerCase() === searchParams.get("tab"),
  );
  const setTab = (value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "Overview") params.delete("tab");
    else params.set("tab", value.toLowerCase());
    navigate(`/people/${p.id}${params.size ? `?${params}` : ""}`, {
      scroll: false,
    });
  };
  const episodeId = searchParams.get("episode");
  if (!p)
    return (
      <Empty title="Person record unavailable">
        <Button onClick={() => navigate("/people")}>Back to people</Button>
      </Empty>
    );
  const selectedEpisode =
    p.episodes.find((e) => e.id === episodeId) || p.episodes[0];
  if (!selectedEpisode?.collections.length)
    return (
      <IntakeWorkspace person={p} navigate={navigate} openModal={openModal} />
    );
  const e = selectedEpisode,
    c =
      e.collections.find((col) => col.id === searchParams.get("collection")) ||
      currentCollection(e),
    nextStep = overviewNextStep(p, e, c, currentStaff(state));
  const assessmentAvailable = canAssess(p, e);
  const tabs = assessmentAvailable
    ? allTabs
    : allTabs.filter((item) => item !== "Assessment");
  const requestedTab =
    contextualView ||
    (searchParams.get("tab") === "progress" ? "Report" : null) ||
    tabs.find((t) => t.toLowerCase() === searchParams.get("tab")) ||
    "Overview";
  const tab =
    requestedTab === "Assessment" && !assessmentAvailable
      ? "Overview"
      : requestedTab;
  const returnTo = safeReturnTo(searchParams.get("returnTo"));
  const returnLabel =
    returnTo.split("?")[0] === "/"
      ? "My work"
      : returnTo.split("?")[0] === "/quality"
        ? "Data quality"
        : "people";
  const orderedCollections = [...e.collections].sort(
    (a, b) =>
      (a.id === searchParams.get("collection")
        ? -1
        : b.id === searchParams.get("collection")
          ? 1
          : 0) || compareCollections(a, b),
  );
  const context = { personId: p.id, episodeId: e.id, collectionId: c.id };
  const modal = (type) => openModal({ type, ...context });
  const consentRequests = p.consentRequests || [];
  const reviewed =
    c.response === "Submitted" &&
    (noClinicalReviewRequired(c) ||
      (c.review === "Reviewed" && !c.needsReview));
  return (
    <>
      <button className="back-link" onClick={() => navigate(returnTo)}>
        <ArrowLeft size={17} />
        Back to {returnLabel}
      </button>
      <div className="person-heading">
        <Avatar name={p.name} large />
        <div>
          <h1 className="person-name-heading">
            <span>{p.name}</span>
            <small>Patient</small>
          </h1>
          <p>
            {p.id}
            <span>·</span>
            {p.dob ? `${age(p.dob)} years` : "Date of birth unknown"}
            <span>·</span>
            {p.pronouns}
          </p>
        </div>
        <div className="actions">
          <Button
            variant="primary"
            disabled={e.status !== "Active" || !canAssess(p, e)}
            onClick={() => modal("plan")}
          >
            Plan follow-up
          </Button>
          <Button
            disabled={e.status === "Closed"}
            onClick={() => modal("episode")}
          >
            Episode actions
            <ChevronDown size={16} />
          </Button>
        </div>
      </div>
      <div className="episode-bar">
        <div className="episode-context">
          {p.episodes.length > 1 ? (
            <>
              <label htmlFor="care-period">Care period</label>
              <Select
                id="care-period"
                label="Care period"
                value={e.id}
                onChange={(ev) => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.set("episode", ev.target.value);
                  params.delete("collection");
                  navigate(`/people/${p.id}?${params}`, { scroll: false });
                }}
              >
                {p.episodes.map((ep) => (
                  <option key={ep.id} value={ep.id}>
                    {formatDate(ep.start)} –{" "}
                    {ep.end
                      ? formatDate(ep.end)
                      : ep.status === "Closed"
                        ? "end not recorded"
                        : "present"}{" "}
                    · {ep.status}
                  </option>
                ))}
              </Select>
              <small>
                Overview, progress, assessments and history for this period.
              </small>
            </>
          ) : (
            <>
              <strong>
                {e.status === "Active" ? "Current care" : `${e.status} care`}
              </strong>
              <span>
                Started {formatDate(e.start)}
                {e.end ? ` · Ended ${formatDate(e.end)}` : ""}
              </span>
            </>
          )}
        </div>
        <Badge>{e.status}</Badge>
        <div>
          <small>Care owner</small>
          <span>{p.owner}</span>
        </div>
        <div>
          <small>Location</small>
          <span>Northside Centre</span>
        </div>
      </div>
      {contextualView ? (
        <div className="section-toolbar">
          <h2 id="person-context-heading">{contextualView}</h2>
          <Button onClick={() => setTab("Overview")}>
            <ArrowLeft size={16} aria-hidden="true" /> Back to overview
          </Button>
        </div>
      ) : (
        <Tabs
          id="person"
          label="Person record"
          className="person-tabs"
          items={tabs}
          value={tab}
          onChange={setTab}
        />
      )}
      <div
        role={contextualView ? "region" : "tabpanel"}
        id="person-panel"
        aria-labelledby={
          contextualView
            ? "person-context-heading"
            : `person-tab-${tabs.indexOf(tab)}`
        }
      >
        {!canAssess(p, e) && (
          <Notice tone="amber">
            Intake must be reviewed before further assessment work.{" "}
            <button className="inline-link" onClick={() => setTab("Intake")}>
              Open intake
            </button>
          </Notice>
        )}
        {tab === "Intake" && (
          <IntakePanel
            key={`${intakeFor(p, e)?.id}:${intakeFor(p, e)?.revision}`}
            person={p}
            intake={intakeFor(p, e) || p.intakes[0]}
            navigate={navigate}
          />
        )}
        {tab === "Referrals" && (
          <Referrals
            person={p}
            episode={e}
            intake={intakeFor(p, e)}
            openModal={openModal}
          />
        )}
        {e.status !== "Active" && (
          <Notice tone="amber">
            {e.status === "Closed"
              ? `This period of care is closed${e.end ? ` as of ${formatDate(e.end)}` : ""}. Submitted responses and reviews remain available.`
              : "This care episode is paused. Outstanding collections are paused and their links are revoked. Submitted responses remain in the record."}
          </Notice>
        )}
        {tab === "Overview" && (
          <>
            <Panel className="overview-assessment">
              <header className="overview-assessment-heading">
                <p className="overview-assessment-label">
                  {e.status === "Closed"
                    ? "Latest assessment in this period"
                    : "Current assessment"}
                </p>
                <div className="overview-assessment-title">
                  <h2>{c.label}</h2>
                  <Badge>{nextStep.badge}</Badge>
                </div>
                <p className="overview-assessment-context">
                  {nextStep.dueText}
                </p>
              </header>
              <div className="panel-body">
                <div className="overview-assessment-layout">
                  <section className="next-step" aria-label="Next step">
                    <p className="next-step-label">Next step</p>
                    <h3>{nextStep.title}</h3>
                    <p>{nextStep.description}</p>
                    <div className="actions">
                      <Button
                        variant="primary"
                        aria-haspopup={
                          nextStep.primary.modal ? "dialog" : undefined
                        }
                        onClick={() =>
                          nextStep.primary.modal
                            ? modal(nextStep.primary.modal)
                            : setTab(nextStep.primary.tab)
                        }
                      >
                        {nextStep.primary.label}
                      </Button>
                      <TextLink onClick={() => setTab("Assessment")}>
                        View assessment
                      </TextLink>
                    </div>
                  </section>
                  <section
                    className="overview-assessment-details"
                    aria-label="Assessment details"
                  >
                    <dl className="metadata">
                      <div>
                        <dt>Assessment</dt>
                        <dd>
                          <Badge>{c.assessmentProgress || "In progress"}</Badge>
                        </dd>
                      </div>
                      <div>
                        <dt>Response</dt>
                        <dd>
                          <Badge>{c.response}</Badge>
                        </dd>
                      </div>
                      <div>
                        <dt>Clinical review</dt>
                        <dd>
                          <Badge>{clinicalReviewStatus(c)}</Badge>
                        </dd>
                      </div>
                      <div>
                        <dt>Instrument</dt>
                        <dd>{c.version}</dd>
                      </div>
                    </dl>
                    <div className="assessment-preview-action">
                      <Button
                        aria-haspopup="dialog"
                        onClick={() => modal("questionnaire-preview")}
                      >
                        Preview questionnaire
                      </Button>
                    </div>
                    <Notice>
                      {noClinicalReviewRequired(c)
                        ? "The response is complete; no separate clinical review is required."
                        : reviewed
                          ? "The response and its clinical review are retained separately."
                          : "A submitted response still needs clinical review."}
                    </Notice>
                  </section>
                </div>
              </div>
            </Panel>
            <div className="person-grid">
              <Panel
                title="Care timeline"
                action={
                  <TextLink onClick={() => setTab("History")}>
                    View all history
                  </TextLink>
                }
              >
                <Timeline episode={e} person={p} audit={state.audit} />
              </Panel>
              <Panel title="People involved">
                <div className="panel-body">
                  <div className="involved">
                    <Avatar name={p.owner} />
                    <PersonIdentity name={p.owner} descriptor="Care owner" />
                  </div>
                  <div className="involved">
                    <Avatar name={p.name} />
                    <PersonIdentity name={p.name} descriptor="Patient" />
                  </div>
                  {p.family && (
                    <div className="involved">
                      <Avatar name={p.family} tone="blue" />
                      <PersonIdentity
                        name={p.family}
                        descriptor="Family carer"
                      />
                    </div>
                  )}
                  <p className="footnote">
                    Family participation is separate from guardian authority.
                  </p>
                </div>
              </Panel>
            </div>
            <Continuity person />
          </>
        )}
        {tab === "Assessment" && (
          <div className="stack">
            <div className="section-toolbar">
              <div>
                <h2>Assessment & collection plan</h2>
                <p>
                  Separate collection points within care episode {e.number}.
                </p>
              </div>
            </div>
            <p className="muted">
              Outstanding work appears first. Earlier reviewed responses remain
              available below.
            </p>
            {orderedCollections.map((col) => {
              const isPrior =
                !isOutstanding(col) &&
                col.id !== searchParams.get("collection");
              const respondent = collectionActorIdentity(p, col, "respondent");
              const card = (
                <Panel
                  key={col.id}
                  className={
                    col.id === searchParams.get("collection")
                      ? "selected-collection"
                      : ""
                  }
                  title={isPrior ? undefined : col.label}
                  action={
                    isPrior ? undefined : <Badge>{collectionStatus(col)}</Badge>
                  }
                >
                  <div className="panel-body">
                    {isPrior ? (
                      <div className="prior-collection-context">
                        <div>
                          <small>Respondent</small>
                          <PersonIdentity
                            name={respondent.name}
                            descriptor={respondent.role}
                          />
                        </div>
                        <p className="muted">
                          {getInstrument(col.version)?.questions.length ||
                            "Version-specific"}{" "}
                          sample questions · no clinical score
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="assignment-grid">
                          <div className="measure-title">
                            <span className="measure-icon">
                              <FileText size={24} />
                            </span>
                            <div>
                              <h3>{col.version}</h3>
                              <p>
                                {getInstrument(col.version)?.questions.length ||
                                  "Version-specific"}{" "}
                                sample questions · no clinical score
                              </p>
                            </div>
                          </div>
                          <div>
                            <small>Respondent</small>
                            <PersonIdentity
                              name={respondent.name}
                              descriptor={respondent.role}
                            />
                          </div>
                          <div>
                            <small>Due date</small>
                            <strong>{formatDate(col.due)}</strong>
                          </div>
                          <div>
                            <small>Collection method</small>
                            <strong>{col.channel || "Not set up"}</strong>
                          </div>
                        </div>
                        <div className="assignment-status">
                          <span>
                            Assignment <Badge>{col.assignment}</Badge>
                          </span>
                          <span>
                            Response <Badge>{col.response}</Badge>
                          </span>
                          <span>
                            Review <Badge>{clinicalReviewStatus(col)}</Badge>
                          </span>
                        </div>
                      </>
                    )}
                    <div className="assignment-footer">
                      {!isPrior && (
                        <span className="muted">
                          {col.attempts.length} delivery{" "}
                          {col.attempts.length === 1 ? "attempt" : "attempts"} ·
                          version pinned at assignment
                        </span>
                      )}
                      <div className="actions">
                        {col.response === "Submitted" &&
                          !noClinicalReviewRequired(col) && (
                            <Button
                              onClick={() =>
                                openModal({
                                  type: "review",
                                  personId: p.id,
                                  episodeId: e.id,
                                  collectionId: col.id,
                                })
                              }
                            >
                              {col.needsReview
                                ? "Review updated answers"
                                : col.review === "Reviewed"
                                  ? "Review recorded"
                                  : "Review responses"}
                            </Button>
                          )}
                        {col.response !== "Submitted" && (
                          <Button
                            aria-haspopup="dialog"
                            onClick={() =>
                              openModal({
                                type: "questionnaire-preview",
                                personId: p.id,
                                episodeId: e.id,
                                collectionId: col.id,
                              })
                            }
                          >
                            Preview questionnaire
                          </Button>
                        )}
                        <Button
                          aria-haspopup="dialog"
                          onClick={() =>
                            openModal({
                              type: "collection-details",
                              personId: p.id,
                              episodeId: e.id,
                              collectionId: col.id,
                            })
                          }
                          variant="primary"
                        >
                          View details
                        </Button>
                      </div>
                    </div>
                  </div>
                </Panel>
              );
              return !isPrior ? (
                card
              ) : (
                <details key={col.id} className="prior-collection">
                  <summary>
                    <span>
                      <strong>{col.label}</strong>
                      <small>
                        {formatDate(col.due)} · {col.version}
                      </small>
                    </span>
                    <Badge>{collectionStatus(col)}</Badge>
                    <ChevronDown size={18} aria-hidden="true" />
                  </summary>
                  {card}
                </details>
              );
            })}
            <Notice>
              Sample instrument and collection rules. Clinical content,
              eligibility, cadence, and completion criteria require approval
              before live use.
            </Notice>
          </div>
        )}
        {tab === "Events" && (
          <CareEvents
            episode={e}
            openModal={(eventModal) =>
              openModal({ ...eventModal, personId: p.id })
            }
          />
        )}
        {tab === "Report" && (
          <Progress key={e.id} person={p} episode={e} openModal={openModal} />
        )}
        {tab === "Consent & respondents" && (
          <div className="stack">
            <div className="section-toolbar">
              <div>
                <h2>Consent & respondents</h2>
                <p>
                  Select a purpose, send a request, and keep every decision in
                  its own history.
                </p>
              </div>
              <Button onClick={() => modal("consent-send")}>
                Send consent request
              </Button>
            </div>
            <Notice>
              Illustrative sample policy only. A sent request is not consent;
              accept, decline and withdrawal remain purpose-specific.
            </Notice>
            {consentRequests.map((request) => (
              <details key={request.id} className="consent-request-accordion">
                <summary>
                  <span>
                    <strong>{request.title}</strong>
                    <small>
                      {request.version} · {request.scope}
                    </small>
                  </span>
                  <Badge>{request.status}</Badge>
                  <ChevronDown size={18} aria-hidden="true" />
                </summary>
                <Panel className="consent-request-panel">
                  <div className="panel-body">
                    <dl className="metadata">
                      <div>
                        <dt>Version</dt>
                        <dd>{request.version}</dd>
                      </div>
                      <div>
                        <dt>Scope</dt>
                        <dd>{request.scope}</dd>
                      </div>
                      <div>
                        <dt>Delivery</dt>
                        <dd>
                          {request.channel} ·{" "}
                          {request.sentAt
                            ? formatDate(request.sentAt)
                            : "Not sent"}
                        </dd>
                      </div>
                      <div>
                        <dt>Current decision</dt>
                        <dd>{request.status}</dd>
                      </div>
                      {request.decisionMaker && (
                        <div>
                          <dt>Decision maker</dt>
                          <dd>{request.decisionMaker}</dd>
                        </div>
                      )}
                    </dl>
                    <div className="assignment-footer">
                      <span className="muted">
                        {request.status === "Sent"
                          ? "Waiting for the patient’s decision."
                          : "Open request history and the permitted next action."}
                      </span>
                      <div className="actions">
                        <Button
                          variant="secondary"
                          onClick={() =>
                            openModal({
                              ...context,
                              type: "consent-detail",
                              consentRequestId: request.id,
                            })
                          }
                        >
                          View request
                        </Button>
                      </div>
                    </div>
                  </div>
                </Panel>
              </details>
            ))}
            <Panel title="Contact and participant context">
              <div className="panel-body">
                <dl className="metadata">
                  <div>
                    <dt>Name</dt>
                    <dd>
                      <PersonIdentity name={p.name} descriptor="Patient" />
                    </dd>
                  </div>
                  <div>
                    <dt>Contact suitability</dt>
                    <dd>{p.contact}</dd>
                  </div>
                  <div>
                    <dt>Guardian authority</dt>
                    <dd>Not established</dd>
                  </div>
                  <div>
                    <dt>Research participation</dt>
                    <dd>Not recorded · separate purpose</dd>
                  </div>
                  {p.family && (
                    <div>
                      <dt>Family respondent</dt>
                      <dd>
                        <PersonIdentity
                          name={p.family}
                          descriptor="Family carer"
                        />
                        <span className="identity-suffix">
                          own contribution only
                        </span>
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </Panel>
          </div>
        )}
        {tab === "History" && (
          <Panel
            title="History & change log"
            action={<span className="muted">Care episode {e.number}</span>}
          >
            <Timeline episode={e} person={p} audit={state.audit} full />
          </Panel>
        )}
      </div>
    </>
  );
}
