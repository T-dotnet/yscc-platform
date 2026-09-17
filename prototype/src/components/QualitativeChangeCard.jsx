import { ArrowRight } from "lucide-react";
import { formatDate } from "../model";

export default function QualitativeChangeCard({ questionnaire, change }) {
  return (
    <article className="qualitative-change-card">
      <header>
        <span>{change.section?.title || "Question"}</span>
        <strong>Qualitative change</strong>
      </header>
      <dl className="qualitative-question-context">
        <div>
          <dt>Questionnaire</dt>
          <dd>{questionnaire.version}</dd>
        </div>
        <div>
          <dt>Question</dt>
          <dd>{change.question}</dd>
        </div>
      </dl>
      <div className="qualitative-value-change">
        <div>
          <span>Previous · {formatDate(questionnaire.firstDate)}</span>
          <strong>{change.comparison.before}</strong>
        </div>
        <ArrowRight size={20} aria-hidden="true" />
        <span className="sr-only">changed to</span>
        <div>
          <span>New · {formatDate(questionnaire.lastDate)}</span>
          <strong>{change.comparison.after}</strong>
        </div>
      </div>
    </article>
  );
}
