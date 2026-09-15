import { useRef, useState } from "react";
import { Pencil, Check, FileText } from "lucide-react";
import { useStore } from "../store";
import { currentStaff, formatDate, formatTimestamp } from "../model";
import { suggestedReport } from "../progress";
import { REPORT_FIELDS, reportEditError, reportSourceKey } from "../report";
import { Badge, Button, Notice } from "../components/UI";
import QuestionnaireEvidence from "./QuestionnaireEvidence";
import ReportHistory from "../components/ReportHistory";

// Keep the stored report fields intact while selecting the visible sections.
const REPORT_SECTIONS = REPORT_FIELDS.filter(({ key }) => key !== "changes");

export default function Progress({ person, episode, openModal }) {
  const { state, commit, storageError } = useStore();
  const [editor, setEditor] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const editButton = useRef(null);
  const report = episode.progressReport;
  const content = report?.content || suggestedReport(person, episode);
  const sourceKey = reportSourceKey(episode);
  const stale = !!report && JSON.stringify(report.sources) !== sourceKey;
  const canEdit = currentStaff(state)?.role === "Clinician";
  const startEditing = () => {
    setEditor({
      content: { ...content },
      expectedRevision: report?.revision ?? 0,
      expectedSources: sourceKey,
    });
    setError("");
    setMessage("");
  };
  const finishEditing = () => {
    setEditor(null);
    setError("");
    requestAnimationFrame(() => editButton.current?.focus());
  };
  const save = (event) => {
    event.preventDefault();
    const action = {
      type: "SAVE_PROGRESS_REPORT",
      personId: person.id,
      episodeId: episode.id,
      ...editor,
    };
    const issue = reportEditError(episode, currentStaff(state)?.role, action);
    if (issue) {
      setError(issue);
      return;
    }
    const result = commit(action);
    if (result.error) {
      setError(result.error);
      return;
    }
    finishEditing();
    setMessage("Report saved. Changes recorded in the report change log.");
  };

  return (
    <div className="stack patient-progress">
      <div className="section-toolbar report-toolbar">
        <div>
          <h2>Progress report</h2>
          <p>
            Questionnaire findings, clinician interpretation and next steps.
          </p>
        </div>
        {!editor && canEdit && (
          <Button ref={editButton} variant="primary" onClick={startEditing}>
            <Pencil size={16} aria-hidden="true" />
            Edit report
          </Button>
        )}
      </div>
      <div role="status" aria-live="polite" className="report-save-status">
        {message && !storageError && (
          <span>
            <Check size={16} aria-hidden="true" />
            {message}
          </span>
        )}
      </div>
      {stale && (
        <Notice tone="amber">
          Questionnaire evidence has changed since version {report.revision}.
          The saved report is preserved. Review the questionnaire details and
          clinical reviews below, then edit the report to bring it up to date.
        </Notice>
      )}
      {storageError && (
        <Notice tone="amber">
          Changes could not be saved to this browser. Keep this page open;
          reloading may lose your report.
        </Notice>
      )}

      <article
        className="progress-report"
        aria-label="Progress report document"
      >
        <header className="report-document-header">
          <div className="report-document-title">
            <FileText size={21} aria-hidden="true" />
            <h3>{person.name} · Progress report</h3>
          </div>
          <p>
            Care period beginning {formatDate(episode.start)}
            {episode.end ? ` · Ended ${formatDate(episode.end)}` : ""}
          </p>
          <div className="report-document-meta">
            <Badge>
              {editor
                ? "Editing · unsaved"
                : report
                  ? stale
                    ? "Update needed"
                    : "Clinician edited"
                  : "Suggested draft"}
            </Badge>
            <span>
              {report
                ? `Version ${report.revision} · ${report.actor} · ${formatTimestamp(report.timestamp)}`
                : "Prepared from questionnaires · awaiting clinician input"}
            </span>
          </div>
        </header>

        {editor ? (
          <form className="report-editor" onSubmit={save}>
            <p className="muted">
              Use Questionnaire details and clinical reviews below to check the
              evidence while editing. Save before leaving this tab. Saving a
              report does not complete a response’s clinical review. Each saved
              change records the previous and new wording, editor and time.
            </p>
            {REPORT_SECTIONS.map(({ key, label }, index) => (
              <label className="field" key={key}>
                <span>
                  {label}
                  {key === "summary" ? " (required)" : ""}
                </span>
                <textarea
                  autoFocus={index === 0}
                  required={key === "summary"}
                  maxLength={20000}
                  rows={4}
                  value={editor.content[key]}
                  onChange={(event) =>
                    setEditor({
                      ...editor,
                      content: { ...editor.content, [key]: event.target.value },
                    })
                  }
                />
              </label>
            ))}
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <div className="report-editor-actions">
              <Button type="submit" variant="primary" disabled={!canEdit}>
                Save report
              </Button>
              <Button type="button" onClick={finishEditing}>
                Cancel
              </Button>
              <span className="muted">Saved as a new version</span>
            </div>
          </form>
        ) : (
          <div className="report-narrative">
            {REPORT_SECTIONS.map(({ key, label }) => (
              <section key={key}>
                <h3>{label}</h3>
                {content[key] ? (
                  <div className="report-prose">
                    {content[key].split(/\n\s*\n/).map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                ) : (
                  <p className="muted report-placeholder">
                    {key === "interpretation"
                      ? "No clinician interpretation added yet."
                      : key === "nextSteps"
                        ? "No next steps added yet."
                        : "No detail added."}
                  </p>
                )}
              </section>
            ))}
          </div>
        )}
        <footer className="report-document-footer">
          Sample questionnaires describe preferences and support needs. Clinical
          scores and improvement are not inferred.{" "}
          {canEdit
            ? "The clinician can edit every narrative section."
            : "Only clinicians can edit the report."}
        </footer>
      </article>

      <ReportHistory episode={episode} />
      <QuestionnaireEvidence
        person={person}
        episode={episode}
        openModal={openModal}
      />
    </div>
  );
}
