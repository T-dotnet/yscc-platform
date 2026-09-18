# Future report visualisations

## Purpose and status

This is a future-work brief for improving how longitudinal care and outcomes evidence is visualised in the YSCC prototype. It records directions inspired by the accompanying hand-drawn sketch. It does not authorise product or prototype changes by itself.

The visualisation work should help a clinician prepare for a review by answering three distinct questions:

1. What has been recorded, and when?
2. What has changed in each valid repeated measure?
3. What needs attention now?

It must not imply that a questionnaire response, event or line direction proves clinical improvement, deterioration, causality, risk level or treatment effectiveness.

### Implemented prototype baseline — 18 September 2026

The local prototype now has a deliberately limited Report implementation to validate the reading path. It shows a sample **Care coordination context** block with Risk and status history and Goals and functioning before the questionnaire selector; a Question-level Likert accordion; and an open **Questionnaire comparison and details** accordion for selected instruments with non-Likert questions. Risk categories show dated recorded events or **Not recorded**, which is not a finding of no concern. Goals are dated structured milestones, not a functioning score.

The Likert accordion currently includes an on-screen **Overall questionnaire score** calculated by normalising valid Likert positions to 0–100 and averaging them within the selected version. It excludes qualitative answers and is a prototype-only descriptive calculation, not an approved clinical score, threshold or interpretation. This implementation must not be taken as approval of the label, calculation, data contract or future score display. The [implementation status](prototype-report-and-responsive-status-2026-09-18.md) records the exact local behaviour, including responsive reflow for care-context cards, Likert cards and the answer comparison.

## Existing product decisions to preserve

- A care episode is the actual course of care. A 90-day review and its responses happen within that episode; they do not create another episode.
- Keep the report heading and purpose as **Report**. Do not reintroduce a Care journey or Review preparation section into Report.
- Keep repeated Likert answers as question-level trends. The prototype's current normalised aggregate is descriptive only; do not treat it as an approved clinical score or extend it into a clinical score display without the approvals in [Scored instruments such as K10](#scored-instruments-such-as-k10).
- **Questionnaire comparison and details** remains the detailed response-comparison surface. It should continue to show its change count and open by default.
- The review pack stays on Overview and uses progressive disclosure in a modal.
- Care events are factual context only. Their timing must not be shown as evidence that they caused a response change.
- Every displayed data point must preserve inspectable provenance: questionnaire and version, respondent and role, recorder where relevant, response date, selected episode, and review state.

## Visualisation strategy

Use a small set of purpose-specific visuals rather than a dense dashboard. The primary pattern is a shared, date-based care context timeline, with detailed trends and source evidence available on demand.

| Visual | Primary question | Recommended location | Detail on demand |
| --- | --- | --- | --- |
| Care context timeline | What was recorded and when? | Overview summary, expanded in the review-pack modal | Event/response detail modal or source record |
| Question-level outcome trends | How did each repeatable answer change? | Report | Existing questionnaire comparison and source response views |
| Context status history | Which documented contextual matters were active or recorded over time? | Sample Report context block for prototype validation; review-pack modal when governed data exists | Event history and amendments |
| Service involvement timeline | What care was planned or delivered, and for how long? | Review-pack modal | Care/service record |
| Goals and functioning milestones | What was agreed or recorded about function and goals? | Sample Report context block for prototype validation; review-pack modal or later care-plan surface when governed | Source note or goal record |

The sketch's event dots, programme bands, medication changes, outcome line and review markers are therefore parts of one coherent visual language, not five unrelated chart types.

## 1. Care context timeline

### Job to be done

Give the key clinician and multidisciplinary team a neutral chronological orientation before a session or 90-day review. It answers: *what information was recorded between the previous and current review?*

### Shape

Use one horizontal date axis for the selected care episode. The compact Overview version should show only the most relevant markers and the next scheduled action. The fuller version belongs inside the **View review pack** modal, not as a replacement for the Report.

Recommended lanes, shown only when data exists:

| Lane | Mark type | Record source | Rules |
| --- | --- | --- | --- |
| Questionnaire responses | Dated circle or short labelled tick | Submitted response | Use a distinct shape for submitted, awaiting review and reviewed. Do not plot drafts as completed evidence. |
| Scheduled reviews and follow-up | Labelled milestone | Collection/review record | Distinguish due/planned from completed. |
| Care delivery and setting | Horizontal duration bar | Approved care/service record | Show actual and planned periods differently. Do not fabricate duration when only one date is known. |
| Contextual events | Dated marker | Care event record | Use the governed event type and actual occurrence date. Markers indicate timing only. |
| Medication context | Dated marker or duration bar | Approved medication-context record | Show only verified factual changes such as start, stop or adverse event. Do not graph dose, adherence or effectiveness unless those data models and permissions are approved. |
| Care transition | Labelled milestone | Episode/service transition record | Examples include step-up, step-down, transfer or discharge. Display the factual recorded label. |

### Interaction and progressive disclosure

- Default to the selected episode and latest completed review period.
- The compact summary should expose no more than two or three lanes plus an explicit count for hidden context.
- Selecting a marker opens a detail modal or existing detail view with the record's exact date, source, recorder and clinical-review state.
- Filters should be optional and initially hidden behind **Show timeline filters**. Available filters can include lane, date range and response/review status.
- The visible key must explain every shape and status. Never rely on colour alone.
- When a lane has no records, omit it from the compact view. In the full view, show a clear empty state such as “No recorded contextual events in this care episode,” not a blank line that could be read as “no concerns.”

### Important wording

Place this note below the full timeline:

> Markers show when records were made or events were recorded. They do not show that one event caused a change in an answer or outcome.

## 2. Question-level outcome trends

### Job to be done

Let a clinician see literal changes in repeatable questionnaire answers without concealing question wording, response dates or the questionnaire's authored scale.

### Recommended pattern

Continue using small multiples: one chart per Likert question, with direct date and answer labels. The current **Likert changes over time** accordion is the correct starting point.

- Keep one stable vertical scale per question, using the authored ordinal labels.
- Show every valid submitted time point rather than interpolating a clinical trajectory.
- Retain the direct `Changed` / `Unchanged` label and response count on each card.
- Keep the questionnaire name and version at the series level, not repeated inside every chart card.
- Use the existing search, section and changed/unchanged controls when a series has many questions.
- Keep contextual-event markers optional and explain that they show timing only.

### Scored instruments such as K10

A separate overall score trend may be considered only when all of the following are true:

1. the instrument's scoring method and version are pinned and valid for the selected responses;
2. the service has approved any threshold bands, labels and interpretation language;
3. missing answers and changed versions have an explicit, honest handling rule; and
4. the display has an accessible text alternative containing the score, date, scale and any missingness.

Until then, do not add a K10-style overall line, severity band or red/amber/green clinical interpretation. Existing question-level trend charts remain the faithful fallback.

## 3. Context status history

### Job to be done

Show the documented timing of important contextual matters—such as safety-related event, housing instability, inpatient admission or medication adverse event—without collapsing them into a synthetic risk score.

### Recommended pattern

Use a categorical dot plot or compact timeline table. Each row is an approved event category; each dot is a dated, factual event. The current event taxonomy and source-of-record determine what can appear.

Avoid an unlabelled “risk” graph. A row can only be called a risk or status category after its definition, evidence standard, permissions and participant visibility have been approved.

| Display state | Meaning |
| --- | --- |
| Recorded event | A factual event was recorded on the shown date. |
| Current concern recorded | A current state has been explicitly recorded and its review date is visible. |
| Not recorded | No relevant record is available to display. This does not mean no concern exists. |
| Resolved or superseded | A later approved record says this, with source and date visible. |

No colour should carry clinical urgency alone. Pair colours with labels, shapes and accessible text.

## 4. Care delivery and service involvement

### Job to be done

Help the review team distinguish the care that was planned from the care that was delivered, and see periods such as inpatient admission, group programme or outreach in their time context.

### Recommended pattern

Use horizontal duration bars on the same date axis as the care context timeline. Each bar represents a verified start and end date. Use patterned or outlined bars for planned care and solid bars for delivered care.

Do not make a duration bar when the source has only a single event date. Use a point marker instead. Do not infer attendance, engagement, attendance quality or intervention dose from a booking, referral or activity record.

## 5. Goals and functioning milestones

### Job to be done

Make goals and functional context available to a review team without claiming precision that the data does not support.

### Recommended pattern

Use a dated milestone sequence for structured goal records: agreed, started, reviewed, progressed, paused, completed or superseded. Use a line chart only if a repeatable, approved numeric measure exists and each point has clear provenance.

An “activity pace” line should not be added from free text, sporadic observations or subjective clinician interpretation. In those cases, a source-linked milestone list is the truthful visual.

## Placement and reading path

### Overview

Keep Overview focused on the immediate clinical task:

1. current assessment/review state and next action;
2. a compact care-context timeline strip when there are enough records to make it useful; and
3. **View review pack** to open the progressive-detail modal.

Do not add a standalone Care journey card or duplicate the Report's questionnaire evidence here.

### View review pack modal

The review-pack modal is the appropriate place for a chronological preparation view:

1. review due state, incomplete/awaiting-review work and owner;
2. compact care context timeline;
3. selected question-level trends and factual event context;
4. links to the raw response, event or care record; and
5. review follow-up actions.

Start with the evidence most likely to be discussed. Reveal filters, all lanes, source metadata and literal answer histories only when requested.

### Report

Report remains the evidence-inspection surface:

- the prototype-only Care coordination context block when its sample event/goal data exists;
- `Likert changes over time` for repeat-answer trends;
- `Questionnaire comparison and details` for direct answer comparison and provenance; and
- response/detail views for source evidence.

Do not generalise the current compact cards into a full care timeline here unless testing shows clinicians cannot otherwise connect the Report's evidence to its documented time context. The review pack remains the proposed home for a fuller chronological preparation view.

## Data and provenance contract

No visual should render a data point unless it can carry these fields, either directly or through its opened detail:

| Data type | Minimum evidence |
| --- | --- |
| Response point | Questionnaire name and version, question ID/wording, respondent and role, submission date, selected episode, review state |
| Score point | All response-point evidence plus approved scoring rule/version, missingness state and calculation timestamp if calculated |
| Event marker | Event type, occurrence date/time precision, factual title/description, source/observer when known, recorder and recording timestamp, selected episode, amendment state |
| Service bar | Service/care setting label, actual/planned status, start/end precision, source, selected episode |
| Medication-context marker | Approved factual change label, date/time precision, source, recorder, selected episode, access classification |
| Goal milestone | Goal ID/label, status, date, source/recording clinician, selected episode |

Unknown, unavailable and not applicable are separate states. Never replace an unknown date with a due date, a latest date or a visual estimate.

## Accessibility and responsive behaviour

- Every graph needs a structured text alternative: title, timeframe, included records, values/statuses and stated caveat.
- Do not require hover. Touch, keyboard and screen-reader users need an equivalent way to inspect a point or bar.
- Maintain visible dates and key values on the chart or immediately below it.
- Use shapes, labels and patterns as well as colour. Verify contrast in default, high-contrast and grayscale views.
- On narrow screens, preserve the date order and vertically stack lanes. Let wide timelines scroll horizontally only when labels would otherwise become unreadable; keep the lane labels pinned where feasible.
- Reflow Likert cards to one column before a card's question, status, dates or answers become too narrow. Keep the heading/status row and labelled scale attached to its chart.
- On narrow Report layouts, retain the comparison table's headings for assistive technology while exposing each dated answer as a visible labelled record; stack context cards and risk-row labels instead of shrinking their content.
- Avoid animation that changes the apparent order or meaning of records. Respect reduced-motion preferences.

## Clinical safety and scope guardrails

- These are care-coordination and outcomes visuals, not a medication chart, risk-management system, treatment plan or system of record.
- Do not use colour, line slope or event proximity to infer causality, severity, risk level, treatment response or clinical recommendation.
- Do not present sample/local data as production persistence, authenticated access, governed clinical data or integration with an external system.
- Medication, safety, housing and admission information may be especially sensitive. Their access, source, redaction and participant/supporter visibility require role and policy decisions before implementation.
- Corrections must remain append-only. Visuals should identify an amended or superseded item without erasing its audited history.
- A chart does not replace reading the source record, clinical judgement or the multidisciplinary review process.

## Proposed implementation sequence

### Phase 1 — Validate the visual language with fictional records

1. Define a shared timeline data adapter using existing responses, review milestones and recorded care events.
2. Design the compact Overview strip and full review-pack timeline as static/prototype states.
3. Test the reading path with case managers: can they find the latest response, pending review, relevant event and source record without misreading a causal relationship?
4. Retain the current individual Likert trend cards and questionnaire comparison as the outcome evidence layer.

### Phase 2 — Add verified lanes

1. Add care-delivery bars only after a source model supports actual/planned periods.
2. Validate the current sample contextual-status history against event governance and category definitions before promoting it beyond prototype reading-path tests.
3. Add medication-context markers only after source, scope, role access and safety review.
4. Validate the current sample goal milestones against a structured, episode-linked source before promoting them beyond prototype reading-path tests.

### Phase 3 — Consider validated scores

Add scored-instrument trends only after scoring, thresholds, missing-data behaviour and interpretation wording are explicitly approved.

## Open decisions to resolve before implementation

1. Which event categories and status labels may appear in a clinician-facing visual?
2. What is the authoritative source for care-delivery periods, medication context and goals?
3. Who may view each lane and each marker's detail?
4. Which date should be shown when occurrence, recording and review dates differ?
5. What counts as a current concern, resolved state or superseded event?
6. Which questionnaires have approved score calculation and threshold display rules?
7. Does the review team need a printable/exportable view, and how will source/provenance and sensitive information be handled?
8. Which information is essential in the compact Overview view versus the review-pack modal?

## Acceptance criteria for future prototype work

The implementation is ready for clinician validation when, using fictional records, a case manager can:

1. identify the selected episode, latest submitted response, next review action and key clinician;
2. read the sequence of submitted responses, review milestones and recorded events without interpreting proximity as causality;
3. open any plotted item and inspect its source, date, recorder and episode context;
4. distinguish planned from delivered care and recorded from unknown/not-recorded status;
5. use question-level Likert charts and the comparison table without being shown an invented overall score; and
6. complete the same tasks with keyboard navigation and on a narrow viewport.

Record misunderstandings, unsafe assumptions, missing data and access concerns as research findings. Approval of a visual design is not approval of the clinical policy, data governance or production system behind it.

## Reference

The direction is based on the hand-drawn exploratory sketch supplied on 18 September 2026. The sketch is a conceptual reference, not a UI specification. Its ideas should be transformed into the product's established visual language and validated with clinicians before implementation.
