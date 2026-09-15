import { useState } from "react";
import { ArrowRight, ClipboardCheck, MessagesSquare } from "lucide-react";
import { getInstrument } from "../instruments";
import SubmittedAnswers from "../components/SubmittedAnswers";
import {
  formatDate,
  collectionActor,
  clinicalReviewStatus,
  collectionStatus,
} from "../model";
import {
  compareResponses,
  questionnaireProgress,
  responseDate,
} from "../progress";
import {
  Badge,
  Button,
  Notice,
  Panel,
  Select,
  TextLink,
} from "../components/UI";

const dateLabel = (c) =>
  responseDate(c)
    ? formatDate(responseDate(c))
    : "Submission date not recorded";

export default function QuestionnaireEvidence({ person, episode, openModal }) {
  const [questionnaireVersion, setQuestionnaireVersion] = useState(null);
  const [latestId, setLatestId] = useState(null);
  const [questionSearch, setQuestionSearch] = useState("");
  const [sectionFilter, setSectionFilter] = useState("all");
  const [changesOnly, setChangesOnly] = useState(false);
  const progress = questionnaireProgress(
    person,
    episode,
    questionnaireVersion,
    latestId,
  );
  const {
    latest,
    earlier,
    baseline,
    pendingReviews,
    open,
    latestReview,
    undated,
  } = progress;
  const [earlierId, setEarlierId] = useState(null);
  const selected = earlier.find((c) => c.id === earlierId) || baseline;
  const comparison = compareResponses(person, selected, latest);
  const instrument = getInstrument(latest?.version);
  const comparisonRows = comparison.rows.filter(
    (row) =>
      (sectionFilter === "all" || sectionFilter === row.section) &&
      (!changesOnly || row.change === "Changed") &&
      `${row.question} ${row.before} ${row.after}`
        .toLowerCase()
        .includes(questionSearch.toLowerCase()),
  );
  const show = (type, collection) =>
    openModal({
      type,
      personId: person.id,
      episodeId: episode.id,
      collectionId: collection?.id,
    });
  return (
    <div className="stack patient-progress">
      <Panel
        title="Questionnaire details"
        action={
          latest && (
            <Button onClick={() => show("review", latest)}>
              View latest response
            </Button>
          )
        }
      >
        <div className="panel-body progress-comparison">
          {progress.questionnaires.length > 0 && (
            <label className="progress-compare-control questionnaire-picker">
              <span>Questionnaire</span>
              <Select
                label="Questionnaire"
                value={progress.version}
                onChange={(event) => {
                  setQuestionnaireVersion(event.target.value);
                  setLatestId(null);
                  setEarlierId(null);
                  setQuestionSearch("");
                  setSectionFilter("all");
                  setChangesOnly(false);
                }}
              >
                {progress.questionnaires.map((version) => (
                  <option key={version} value={version}>
                    {version || "Questionnaire version not recorded"}
                  </option>
                ))}
              </Select>
            </label>
          )}
          {latest ? (
            <>
              <div className="progress-comparison-heading">
                <div>
                  <p className="muted">
                    {collectionActor(person, latest, "respondent")} ·{" "}
                    {latest.respondent || "Respondent role not recorded"}
                  </p>
                </div>
                {progress.latestOptions.length > 1 && (
                  <label className="progress-compare-control">
                    <span>Response on latest date</span>
                    <Select
                      label="Response on latest date"
                      value={latest.id}
                      onChange={(event) => {
                        setLatestId(event.target.value);
                        setEarlierId(null);
                      }}
                    >
                      {progress.latestOptions.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.label} · {collectionActor(person, c, "respondent")}
                        </option>
                      ))}
                    </Select>
                  </label>
                )}
                {earlier.length > 0 && (
                  <label className="progress-compare-control">
                    <span>Compare latest with</span>
                    <Select
                      label="Compare latest with"
                      value={selected?.id || ""}
                      onChange={(event) => setEarlierId(event.target.value)}
                    >
                      {earlier.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.label} · {dateLabel(c)}
                        </option>
                      ))}
                    </Select>
                  </label>
                )}
              </div>
              {progress.latestOptions.length > 1 && (
                <Notice>
                  Multiple responses share the latest submission date. Their
                  order within that day is not established. Choose which
                  response to view above.
                </Notice>
              )}
              {comparison.reason ? (
                <>
                  <Notice>{comparison.reason}</Notice>
                  <SubmittedAnswers
                    key={latest.id}
                    person={person}
                    collection={latest}
                  />
                  {selected && (
                    <TextLink onClick={() => show("review", selected)}>
                      View earlier response
                    </TextLink>
                  )}
                </>
              ) : (
                <>
                  <div className="answer-tools comparison-tools">
                    <label>
                      Find a question
                      <input
                        type="search"
                        placeholder="Search questions or answers"
                        value={questionSearch}
                        onChange={(event) =>
                          setQuestionSearch(event.target.value)
                        }
                      />
                    </label>
                    <label>
                      Section
                      <select
                        value={sectionFilter}
                        onChange={(event) =>
                          setSectionFilter(event.target.value)
                        }
                      >
                        <option value="all">All sections</option>
                        {instrument?.sections.map((section) => (
                          <option key={section.id} value={section.id}>
                            {section.title}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="check-field">
                      <input
                        type="checkbox"
                        checked={changesOnly}
                        onChange={(event) =>
                          setChangesOnly(event.target.checked)
                        }
                      />
                      Changed answers only
                    </label>
                  </div>
                  <p className="muted">
                    Showing {comparisonRows.length} of {comparison.rows.length}{" "}
                    questions. Questions not asked on both paths are not
                    comparable.
                  </p>
                  <div
                    className="progress-table-scroll"
                    role="region"
                    aria-label="Questionnaire response comparison"
                    tabIndex={0}
                  >
                    <table className="progress-table">
                      <caption className="sr-only">
                        {selected.label} compared with {latest.label}. Changes
                        describe answers, not a clinical score.
                      </caption>
                      <thead>
                        <tr>
                          <th scope="col">Question</th>
                          <th scope="col">
                            <span>{selected.label}</span>
                            <small>{dateLabel(selected)}</small>
                          </th>
                          <th scope="col">
                            <span>{latest.label}</span>
                            <small>{dateLabel(latest)} · Latest</small>
                          </th>
                          <th scope="col">Change</th>
                        </tr>
                      </thead>
                      <tbody>
                        {comparisonRows.map((row) => (
                          <tr key={row.question}>
                            <th scope="row">{row.question}</th>
                            <td>{row.before}</td>
                            <td
                              className={
                                row.change === "Changed"
                                  ? "progress-answer-changed"
                                  : ""
                              }
                            >
                              {row.after}
                            </td>
                            <td>
                              <span
                                className={`progress-change ${row.change === "Changed" ? "changed" : ""}`}
                              >
                                {row.change === "Changed" && (
                                  <ArrowRight size={14} aria-hidden="true" />
                                )}
                                {row.change}
                              </span>
                            </td>
                          </tr>
                        ))}
                        {!comparisonRows.length && (
                          <tr>
                            <td colSpan={4}>
                              No questions match these filters.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="progress-comparison-footer">
                    <span className="muted">
                      {comparison.comparable < comparison.rows.length
                        ? "Questions not asked, missing, declined or invalid answers are excluded from change counts."
                        : "Changes are shown per answer; there is no combined clinical score."}
                    </span>
                    <TextLink onClick={() => show("review", selected)}>
                      View earlier response
                    </TextLink>
                  </div>
                  {(selected.channel !== latest.channel ||
                    selected.assistance !== latest.assistance) && (
                    <p className="progress-source-note">
                      Collection context changed:{" "}
                      {selected.channel || "Method not recorded"} /{" "}
                      {selected.assistance || "Assistance not recorded"} →{" "}
                      {latest.channel || "Method not recorded"} /{" "}
                      {latest.assistance || "Assistance not recorded"}. Consider
                      this when reviewing responses.
                    </p>
                  )}
                </>
              )}
              {(latest.needsReview || selected?.needsReview) && (
                <Notice tone="amber">
                  Answers changed after clinical review. This view uses the
                  current saved answers; re-review is required.
                </Notice>
              )}
              {undated.length > 0 && (
                <Notice>
                  {undated.length} submitted{" "}
                  {undated.length === 1 ? "response has" : "responses have"} no
                  recorded submission date and{" "}
                  {undated.length === 1 ? "is" : "are"} excluded from the
                  comparison. See the history below.
                </Notice>
              )}
            </>
          ) : (
            <div className="progress-empty">
              <MessagesSquare size={26} aria-hidden="true" />
              <h3>
                {progress.responses.length
                  ? "Dates are needed to show change"
                  : "A starting point for understanding progress"}
              </h3>
              <p>
                {progress.responses.length
                  ? "You can still open each submitted response in the history below."
                  : "Once the first questionnaire is submitted, its answers will appear here. Follow-ups will add new points for comparison."}
              </p>
            </div>
          )}
        </div>
      </Panel>

      <div className="progress-detail-grid">
        <Panel title="Latest clinician review">
          <div className="panel-body">
            {latestReview ? (
              <>
                <div className="progress-review-meta">
                  <Badge>{clinicalReviewStatus(latestReview)}</Badge>
                  <span className="muted">
                    {latestReview.reviewDate
                      ? formatDate(latestReview.reviewDate)
                      : "Review date not recorded"}
                  </span>
                </div>
                <p className="progress-review-note">
                  {latestReview.reviewNote || "No review note recorded."}
                </p>
                <p className="muted">
                  {latestReview.reviewActor || "Reviewer not recorded"} ·{" "}
                  {latestReview.label}
                </p>
                {latestReview.needsReview && (
                  <Notice tone="amber">
                    This note relates to earlier answers. A new review is
                    required.
                  </Notice>
                )}
                {!latestReview.needsReview && pendingReviews.length > 0 && (
                  <Notice>
                    There are submitted responses awaiting review. This note
                    does not cover them.
                  </Notice>
                )}
                <TextLink onClick={() => show("review", latestReview)}>
                  Read review and responses
                </TextLink>
              </>
            ) : (
              <div className="progress-empty">
                <ClipboardCheck size={26} aria-hidden="true" />
                <h3>No clinical review recorded</h3>
                <p>
                  Review notes will provide the clinician’s interpretation and
                  next care step alongside the questionnaire responses.
                </p>
              </div>
            )}
          </div>
        </Panel>
        <Panel title="Response & follow-up history">
          <ol className="progress-history">
            {[
              ...open.map((c) => ({ c, kind: "open" })),
              ...[...progress.dated]
                .reverse()
                .map((c) => ({ c, kind: "response" })),
              ...undated.map((c) => ({ c, kind: "response" })),
              ...progress.collections
                .filter((c) => c.response !== "Submitted" && !open.includes(c))
                .map((c) => ({ c, kind: "inactive" })),
            ].map(({ c, kind }) => (
              <li key={c.id} className={kind === "response" ? "received" : ""}>
                <div className="progress-history-line">
                  <strong>{c.label}</strong>
                  <Badge>
                    {kind === "response"
                      ? clinicalReviewStatus(c)
                      : collectionStatus(c)}
                  </Badge>
                </div>
                <p>
                  {kind === "response"
                    ? `Submitted · ${dateLabel(c)}`
                    : `Due · ${c.due ? formatDate(c.due) : "Date not recorded"}`}
                </p>
                <small>
                  {collectionActor(person, c, "respondent")} ·{" "}
                  {c.version || "Version not recorded"}
                </small>
                <TextLink
                  onClick={() =>
                    show(
                      kind === "response" ? "review" : "collection-details",
                      c,
                    )
                  }
                >
                  {kind === "response"
                    ? "View response & review"
                    : "View collection"}
                </TextLink>
              </li>
            ))}
          </ol>
          {progress.collections.length === 0 && (
            <div className="panel-body">
              <p>No collections recorded in this care period.</p>
            </div>
          )}
        </Panel>
      </div>
    </div>
  );
}
