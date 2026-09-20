# Superseded prototype report and responsive implementation status

18 September 2026 · Historical local-prototype record · Superseded by [the 19 September longitudinal Report status](prototype-longitudinal-report-status-2026-09-19.md)

## Purpose and scope

This note records the earlier questionnaire-dashboard Report implementation. It is retained as a historical record only. The local prototype has since moved to a selected-episode longitudinal Report; use [the current status note](prototype-longitudinal-report-status-2026-09-19.md) for present behaviour.

It covers the Report dashboard, care-context cards, questionnaire evidence and the responsive refinements completed on 18 September. It does not alter the dated stakeholder discussion questions or executive documents, which remain records of their original review context.

## Current Report composition

For the selected care episode, Report renders:

1. a dashboard summary of submitted responses, questionnaire series, charted Likert questions and recorded contextual events;
2. a **Care coordination context** block when the episode has at least one configured risk/status event or goal milestone;
3. a questionnaire/version selector and the selected series' respondent and date range;
4. the selected series' open **Likert score and changes over time** accordion where it contains Likert items; and
5. open **Questionnaire comparison and details** where the selected instrument contains non-Likert questions.

The context block contains two independent cards when their source data exists:

- **Risk and status history** lists four sample event categories: safety-related event, housing instability, medication adverse event and inpatient admission. A category with no matching event reads **Not recorded**. That absence is explicitly not a finding of no concern.
- **Goals and functioning** lists dated structured milestones and their recorded status. It is not a continuous score or an inferred functional trajectory.

Both cards use fictional episode data. Their category definitions, source standards, access rules and participant/supporter visibility remain unapproved.

## Questionnaire evidence and normalised Likert display

Each Likert question is shown as a separate card with its full question, authored verbal scale, first/latest answer, all valid dated points, response count and a `Changed` or `Unchanged` label where a valid comparison exists. Contextual-event markers communicate recorded timing only.

The current prototype also renders an **Overall questionnaire score** in the Likert accordion when valid Likert answers are present. It normalises each valid authored ordinal position to 0–100, averages the valid Likert items within the selected questionnaire version, rounds the result and, where possible, shows the difference from the baseline response. It excludes qualitative answers and unavailable/nonresponse points.

Despite the on-screen word “score”, this is a prototype-only descriptive normalisation. It is not an approved clinical score, severity band, threshold, diagnosis, measure validation or claim of improvement, deterioration, treatment response or risk. Any production score display requires a pinned approved scoring rule, missing-data rule, interpretation language and clinical/data-governance approval.

For non-Likert questionnaires, **Questionnaire comparison and details** provides the answer-level evidence. It keeps the comparison open by default, identifies the selected earlier/latest dated response, offers question/section/changed-answer filters and exposes the literal prior and latest answers. Questions not asked on both adaptive paths remain **Not comparable** and are excluded from change counts. The component also makes single responses, undated records and same-date ordering limits explicit.

## Responsive behaviour implemented

The current CSS adapts the Report without hiding the evidence needed to interpret it:

| Surface | Implemented responsive behaviour |
| --- | --- |
| Questionnaire comparison | Below 700px, filters use the available width and the desktop comparison table becomes labelled answer cards. The table's headers remain available to assistive technology; desktop retains the tabular layout. |
| Care coordination context | Below 900px, Risk and status history stacks above Goals and functioning. Below 700px, each risk category label sits above its timeline and mobile gutters/card padding reduce. |
| Likert question cards | The card grid only keeps multiple columns when each card can be at least 500px wide. At narrower available widths it uses one card per row; the heading can wrap rather than shrink the question into word-by-word lines. The existing small-phone layout remains one column. |

The Report route was checked locally with fictional data at a 375px viewport after these changes. This is a visual regression check, not an accessibility conformance result or validation with staff, young people or supporters.

## Boundaries that remain unchanged

- Report is read-only in this prototype; response detail opens through the existing review view.
- Submitted-response history, clinician-authored narrative, Clinical notes and editable report change history remain outside Report.
- Browser-local data, fictional roles and sample state do not demonstrate authentication, authorisation, multi-user concurrency, retention, external delivery or production persistence.
- No current Report element establishes clinical meaning from a questionnaire answer, an event date, a status category, a milestone or the normalised Likert value.

## Related documents

- [Documentation index](README.md)
- [Requirements and logic](05-requirements-and-logic.md#9-clinician-progress-report)
- [User flows](07-user-flows.md)
- [Information architecture](08-information-architecture.md)
- [UX principles and UI guidelines](09-ux-principles-and-ui-guidelines.md)
- [Future report visualisations brief](future-report-visualisations-brief-2026-09-18.md)
