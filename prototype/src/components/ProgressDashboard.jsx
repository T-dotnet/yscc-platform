import {
  CalendarDays,
  ChartNoAxesCombined,
  ChevronDown,
  ClipboardCheck,
  MessageSquareText,
} from "lucide-react";
import { useEffect, useState } from "react";
import { formatDate } from "../model";
import {
  questionnaireDashboardGroups,
  reportEvidence,
  responseDate,
} from "../progress";
import { Badge, Panel, Select } from "./UI";
import LikertTrendCard from "./LikertTrendCard";
import QualitativeChangeCard from "./QualitativeChangeCard";

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
  useEffect(() => {
    setLikertQuestionSearch("");
    setLikertSectionFilter("all");
    setLikertChangeFilter("all");
  }, [person.id, episode.id, activeVersion]);
  const likertQuestionCount = questionnaireGroups.reduce(
    (total, group) => total + group.likertTrends.length,
    0,
  );
  const qualitativeChangeCount = questionnaireGroups.reduce(
    (total, group) => total + group.qualitativeChanges.length,
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
          <MessageSquareText size={18} aria-hidden="true" />
          <strong>{qualitativeChangeCount}</strong>
          <span>Qualitative changes</span>
        </article>
      </div>

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
            const questionnaire = {
              name: group.instrumentName,
              version: group.version,
              firstDate,
              lastDate,
            };
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

                {group.likertTrends.length > 0 && (
                  <details
                    className="report-accordion questionnaire-likert-panel"
                    open
                  >
                    <summary>
                      <span>Likert changes over time</span>
                      <ChevronDown size={18} aria-hidden="true" />
                    </summary>
                    <div className="panel-body">
                      <p className="questionnaire-likert-panel-copy">
                        One chart per question. Each line connects the same
                        question across submitted questionnaire responses.
                      </p>
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
                      <p className="muted">
                        Showing {visibleLikertTrends.length} of{" "}
                        {group.likertTrends.length} Likert questions.
                      </p>
                      <div className="likert-trend-grid">
                        {visibleLikertTrends.map((trend) => (
                          <LikertTrendCard
                            key={trend.id}
                            questionnaire={questionnaire}
                            trend={trend}
                            events={episode.events}
                          />
                        ))}
                        {!visibleLikertTrends.length && (
                          <p className="dashboard-empty">
                            No Likert questions match these filters.
                          </p>
                        )}
                      </div>
                    </div>
                  </details>
                )}

                {group.qualitativeChanges.length > 0 && (
                  <details
                    className="report-accordion questionnaire-change-panel"
                    open
                  >
                    <summary>
                      <span>Likert question changes</span>
                      <Badge>{group.qualitativeChanges.length} changed</Badge>
                      <ChevronDown size={18} aria-hidden="true" />
                    </summary>
                    <div className="panel-body">
                      <p className="questionnaire-change-panel-copy">
                        Changed answers between the first and latest comparable
                        response. Wording is shown exactly as recorded.
                      </p>
                      <div className="qualitative-change-grid">
                        {group.qualitativeChanges.map((change) => (
                          <QualitativeChangeCard
                            key={change.id}
                            questionnaire={questionnaire}
                            change={change}
                          />
                        ))}
                      </div>
                    </div>
                  </details>
                )}

                {!group.likertTrends.length && details}

                {!group.likertTrends.length &&
                  !group.qualitativeChanges.length && (
                    <p className="dashboard-empty">
                      A second comparable response is needed before this
                      questionnaire can show change over time.
                    </p>
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

      <footer className="dashboard-method-note">
        Likert positions represent their questionnaire&rsquo;s labelled ordinal
        choices only. The dashboard does not calculate a combined score or infer
        improvement, deterioration or clinical meaning.
      </footer>
    </section>
  );
}
