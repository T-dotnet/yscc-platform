import {
  CalendarDays,
  ChartNoAxesCombined,
  ChevronDown,
  ClipboardCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { formatDate } from "../model";
import {
  questionnaireDashboardGroups,
  reportEvidence,
  responseDate,
} from "../progress";
import { recordedCareEvents } from "../careEvents";
import { Badge, Select } from "./UI";
import LikertTrendCard from "./LikertTrendCard";
import CareContextVisuals from "./CareContextVisuals";
import ReportEvidenceCard from "./ReportEvidenceCard";

export default function ProgressDashboard({
  person,
  episode,
  selectedVersion,
  onSelectedVersionChange,
  details,
}) {
  const [likertQuestionSearch, setLikertQuestionSearch] = useState("");
  const [likertSectionFilter, setLikertSectionFilter] = useState("all");
  const [likertChangeFilter, setLikertChangeFilter] = useState("all");
  const evidence = reportEvidence(person, episode);
  const questionnaireGroups = questionnaireDashboardGroups(evidence);
  const contextualEvents = recordedCareEvents(episode);
  const questionnaireOptions = Array.from(
    new Map(
      questionnaireGroups.map((group) => [group.version, group.instrumentName]),
    ),
  ).map(([version, name]) => ({ version, name }));
  const activeVersion = questionnaireOptions.some(
    (option) => option.version === selectedVersion,
  )
    ? selectedVersion
    : questionnaireOptions.at(-1)?.version || "";
  const visibleQuestionnaireGroups = questionnaireGroups.filter(
    (group) => group.version === activeVersion,
  );
  const hasVisibleLikertQuestions = visibleQuestionnaireGroups.some(
    (group) => group.likertQuestions.length > 0,
  );
  useEffect(() => {
    setLikertQuestionSearch("");
    setLikertSectionFilter("all");
    setLikertChangeFilter("all");
  }, [person.id, episode.id, activeVersion]);
  const likertQuestionCount = questionnaireGroups.reduce(
    (total, group) => total + group.likertTrends.length,
    0,
  );
  return (
    <section className="report-dashboard" aria-label="Patient report">
      <div className="dashboard-metrics" aria-label="Dashboard summary">
        <article>
          <ClipboardCheck size={18} aria-hidden="true" />
          <strong>{evidence.responses.length}</strong>
          <span>Submitted responses</span>
        </article>
        <article>
          <CalendarDays size={18} aria-hidden="true" />
          <strong>{questionnaireGroups.length}</strong>
          <span>Questionnaire series</span>
        </article>
        <article>
          <ChartNoAxesCombined size={18} aria-hidden="true" />
          <strong>{likertQuestionCount}</strong>
          <span>Likert questions charted</span>
        </article>
        <article>
          <CalendarDays size={18} aria-hidden="true" />
          <strong>{contextualEvents.length}</strong>
          <span>Recorded contextual events</span>
        </article>
      </div>

      <CareContextVisuals episode={episode} />

      {questionnaireOptions.length > 0 && (
        <div className="dashboard-questionnaire-selector">
          <label className="dashboard-questionnaire-picker">
            <span>Questionnaire</span>
            <Select
              label="Choose questionnaire"
              value={activeVersion}
              onChange={(event) =>
                onSelectedVersionChange?.(event.target.value)
              }
            >
              {questionnaireOptions.map((option) => (
                <option key={option.version} value={option.version}>
                  {option.name === option.version
                    ? option.name
                    : `${option.name} · ${option.version}`}
                </option>
              ))}
            </Select>
          </label>
        </div>
      )}

      <div className="questionnaire-dashboard-groups">
        {visibleQuestionnaireGroups.length ? (
          visibleQuestionnaireGroups.map((group) => {
            const firstDate = responseDate(group.first);
            const lastDate = responseDate(group.last);
            const likertSections = Array.from(
              new Map(
                group.likertTrends.map((trend) => [
                  trend.section?.id,
                  trend.section?.title || "Question",
                ]),
              ),
            );
            const visibleLikertTrends = group.likertTrends.filter((trend) => {
              const change = trend.comparison?.change || "Not comparable";
              return (
                (likertSectionFilter === "all" ||
                  trend.section?.id === likertSectionFilter) &&
                (likertChangeFilter === "all" ||
                  change.toLowerCase() === likertChangeFilter) &&
                `${trend.question} ${trend.section?.title || ""}`
                  .toLowerCase()
                  .includes(likertQuestionSearch.toLowerCase())
              );
            });
            return (
              <section className="questionnaire-dashboard-group" key={group.id}>
                <header className="questionnaire-series-header">
                  <div>
                    <h4>{group.version || group.instrumentName}</h4>
                    <p>
                      {group.respondent} · {formatDate(firstDate)} to{" "}
                      {formatDate(lastDate)}
                    </p>
                  </div>
                  <Badge>
                    {group.points.length} response
                    {group.points.length === 1 ? "" : "s"}
                  </Badge>
                </header>

                {group.qualitativeQuestions.length > 0 && details}

                {group.likertQuestions.length > 0 && (
                  <details
                    className="report-accordion questionnaire-likert-panel"
                    open
                  >
                    <summary>
                      <span>Likert score and changes over time</span>
                      <Badge>
                        {group.likertQuestions.length} question
                        {group.likertQuestions.length === 1 ? "" : "s"}
                      </Badge>
                      <ChevronDown size={18} aria-hidden="true" />
                    </summary>
                    <div className="panel-body">
                      <ReportEvidenceCard
                        variant="score"
                        title="Overall questionnaire score"
                        metric={
                          <div
                            className="report-evidence-metric score"
                            aria-label={`Overall Likert score ${group.likertScore?.latest.value} out of 100`}
                          >
                            <strong>{group.likertScore?.latest.value}</strong>
                            <span>/100</span>
                            <small>Latest response</small>
                            {group.likertScore?.change !== null && (
                              <span className="report-evidence-change">
                                {group.likertScore.change >= 0 ? "+" : ""}
                                {group.likertScore.change} points since baseline
                              </span>
                            )}
                          </div>
                        }
                      >
                        Based on {group.likertScore?.latest.answered} of{" "}
                        {group.likertScore?.latest.total} scored questions in
                        the latest response.
                      </ReportEvidenceCard>
                      {group.likertTrends.length > 0 && (
                        <>
                          <div className="answer-tools comparison-tools">
                            <label>
                              Find a question
                              <input
                                type="search"
                                placeholder="Search Likert questions"
                                value={likertQuestionSearch}
                                onChange={(event) =>
                                  setLikertQuestionSearch(event.target.value)
                                }
                              />
                            </label>
                            <label>
                              Section
                              <select
                                value={likertSectionFilter}
                                onChange={(event) =>
                                  setLikertSectionFilter(event.target.value)
                                }
                              >
                                <option value="all">All sections</option>
                                {likertSections.map(([id, title]) => (
                                  <option key={id} value={id}>
                                    {title}
                                  </option>
                                ))}
                              </select>
                            </label>
                            <label>
                              Change
                              <select
                                value={likertChangeFilter}
                                onChange={(event) =>
                                  setLikertChangeFilter(event.target.value)
                                }
                              >
                                <option value="all">All questions</option>
                                <option value="changed">Changed</option>
                                <option value="unchanged">Unchanged</option>
                              </select>
                            </label>
                          </div>
                          <div className="likert-results-header">
                            <p className="muted">
                              Showing {visibleLikertTrends.length} of{" "}
                              {group.likertTrends.length} Likert questions.
                            </p>
                            <details className="chart-information">
                              <summary>How to read these charts</summary>
                              <div>
                                <p>
                                  Each chart tracks one question across
                                  submitted responses.
                                </p>
                                {contextualEvents.length > 0 && (
                                  <p className="likert-context-key">
                                    <span aria-hidden="true" />
                                    Contextual events appear on the date they
                                    were recorded. They show timing only and do
                                    not imply that an event caused a response to
                                    change.
                                  </p>
                                )}
                              </div>
                            </details>
                          </div>
                          <div className="likert-trend-grid">
                            {visibleLikertTrends.map((trend) => (
                              <LikertTrendCard
                                key={trend.id}
                                trend={trend}
                                events={contextualEvents}
                              />
                            ))}
                            {!visibleLikertTrends.length && (
                              <p className="dashboard-empty">
                                No Likert questions match these filters.
                              </p>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </details>
                )}
              </section>
            );
          })
        ) : (
          <p className="dashboard-empty dashboard-empty-wide">
            No dated submitted questionnaire responses are available yet.
          </p>
        )}
      </div>

      {hasVisibleLikertQuestions && (
        <footer className="dashboard-method-note">
          Likert positions are normalised to a 0–100 score and averaged within
          each questionnaire version. The score is not combined with qualitative
          responses and does not infer clinical meaning.
        </footer>
      )}
    </section>
  );
}
