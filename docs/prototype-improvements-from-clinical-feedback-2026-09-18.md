# Prototype improvements from clinical feedback

18 September 2026 · Proposed prototype direction · Not an approved clinical, privacy or technical specification

## Purpose

This document translates the clinical feedback provided in response to the early stakeholder questions into a later prototype-change brief. It does not settle the outstanding terminology, clinical-policy, access-control, PMHC-MDS or integration decisions. It should be used alongside the canonical requirements and logic, user flows and information architecture before implementation work begins.

The central shift is that the clinician's first view should support care coordination through the **Current assessment** and an on-demand 90-day review pack. Questionnaire trends and answer-level comparison remain important evidence, but should not be the first orientation point.

## Current prototype implementation — 18 September 2026

The local prototype now includes a deliberately limited **Care coordination context** block in Report. It contains sample Risk and status history and Goals and functioning cards, both derived from fictional episode records. A missing status is labelled **Not recorded**, not “no concern”; goals are dated milestones, not a continuous score or trajectory. This is implementation evidence for the reading path, not approval of categories, data sources, access rules or clinical use.

Report also now shows a version-scoped descriptive normalisation of valid Likert answers: it maps ordinal positions to 0–100 and averages valid Likert items for the selected version. It excludes qualitative/nonresponse values and is not an overall clinical score, threshold, severity band or clinical interpretation. The current answer-level **Questionnaire comparison and details** remains open for non-Likert questions and has responsive labelled records on narrow screens; the context and Likert cards likewise reflow without hiding source labels.

These implemented sample states do not resolve the proposed directions below. In particular, they do not establish a review-pack workflow, governed event taxonomy, functional measure, clinical scoring rule, correction policy or production access model. See the factual [prototype Report and responsive implementation status](prototype-report-and-responsive-status-2026-09-18.md) for the exact current behaviour.

## Feedback distilled

- Care begins with assessment and ends only when the person is fully discharged and the care team no longer has clinical responsibility. The eventual name for this period is still under discussion.
- The care team needs to see whether the person is under care, the key clinician or case manager, and their current stage of care need.
- Returns, transfers and re-referrals require a case-by-case determination: a recent return may reopen the existing journey; a longer absence may require reassessment.
- Important events include harm to self or others, inpatient admission, adverse medication events, and housing instability or homelessness.
- Treating clinicians should be able to record and see events from other treating clinicians. The minimum event data set and correction policy are still to be defined.
- The original stakeholder response suggested beginning clinician management with a care journey. The subsequent prototype decision is to keep **Report** as the report and place review preparation on **Overview** instead. Repeated measures should be understood chiefly as trends.
- Every data point needs respondent, questionnaire/version, date and care-period context. There will not be concurrent care episodes.
- A 90-day review is led by the case manager with a multidisciplinary team; clinicians should read the summary beforehand and use it in that review.
- MVP must include PMHC-MDS extension data, core operational/key outcome data, and submission through the approved VPN process. Wider components can wait.
- Role-based access is required. Patient name, date of birth, address and Medicare number should not be broadly available. Permission detail remains unresolved.

## Proposed prototype changes

### P0 Current assessment as the clinician landing view

Use the selected care-period **Overview** to begin with **Current assessment**, its status, current due date, next action and assessment details. Keep **Care period** as the neutral current UI label while the service decides the underlying terminology.

Do **not** show a separate Care journey summary on Overview or Report. Existing care-period status, key clinician and chronological context stay available in the record header, timeline and people-involved areas rather than being repeated in a new landing block.

### P0 Review preparation workflow

Provide a review-preparation path from **Overview** for the key clinician:

1. Read the Current assessment and its next action.
2. See what is due, incomplete, awaiting review, or needs multidisciplinary discussion.
3. Open a **90-day review pack** containing selected trends, relevant changed answers and contextual events.
4. Record or plan the follow-up arising from the review.

The review pack is progressively disclosed from an explicit **Open 90-day review pack** control and should bring the revealed content into view. It must distinguish observed data from clinician interpretation. It must not calculate an overall clinical score or present an event marker as the cause of a questionnaire change. Do not imply an MDT-discussion status until the service defines a recordable source for it.

### P0 Report outcomes and answer detail

Retain the existing questionnaire comparison capability in **Report**. Keep the Report heading and purpose unchanged; do not introduce Care journey, Review preparation, or a separate Qualitative answer changes area there.

The current prototype keeps answer-level comparison in that scope and adds only compact, source-limited context cards. Treat their current placement and labels as validation material, not a decision to promote Report into a care-journey or review-preparation surface.

Use progressive disclosure so the review-preparation view remains easy to scan. Show a compact trend or changed-answer summary first; open the full response provenance, literal answer history and raw questionnaire detail only on request, for example in a response-detail modal or expandable panel. Do not place every provenance field or all raw answers on the main care-journey screen.

For every displayed response or answer, make the following provenance easy to inspect:

- questionnaire and pinned version;
- respondent and respondent role;
- recorder, where different from the respondent;
- event/collection, submission and review dates as applicable;
- collection channel and approved assistance/joint-completion context;
- selected care period; and
- review state.

Lead repeated measures with neutral question-level trends. Preserve literal previous-to-new wording for qualitative responses and retain the exact dates. Do not reinterpret a changed answer as improvement, deterioration or clinical meaning.

### P0 Event timeline and event form

Replace the provisional generic event taxonomy with a validation-oriented set that reflects the clinician feedback:

- harm to self or others;
- inpatient admission;
- medication adverse event;
- housing instability or homelessness;
- major care-package or service transition, including step-up/step-down; and
- other clinically relevant contextual event.

The initial prototype form should test a minimum record containing:

- type;
- when it occurred;
- factual title and narrative description;
- source or observer when known;
- impact on care/coordination;
- recording clinician and recording timestamp; and
- link to the selected care period.

Show these events in a newest-first timeline. Event entries provide date context only, never evidence of causality. Add a visible **Correct event** path that creates an append-only amendment with reason, actor and timestamp rather than overwriting the initial event. Do not add a delete flow until retention and correction policy is approved.

### P0 Return transfer and reassessment decision

**Deferred — do not implement in the current prototype work.** Retain this section as a later direction only.

Expand the current episode-action pattern with a guided **Return to service** determination. It should offer three explicitly non-automatic paths:

- reopen a recent care period;
- begin reassessment and a new care period; or
- record transfer/handover into the service.

Require the responsible clinician, decision rationale and supporting context. The prototype should say that the determination is case-by-case until the clinical service agrees the time threshold, ownership and evidence rules. Do not permit concurrent active care periods in the sample logic.

### P0 Representative role and privacy states

**Deferred — do not implement in the current prototype work.** Retain this section as a later direction only.

Add prototype-only role scenarios for at least:

- key clinician/case manager;
- treating clinician;
- assessment or data-quality staff; and
- limited operational user.

Use these to test minimum-necessary identity and care information. Outside the treating-team scenarios, sensitive identifiers should be masked or unavailable by default. A hidden navigation item or disabled button is only a prototype cue; it must not be represented as implemented access control.

### P0 PMHC-MDS operational loop

**Deferred — do not implement in the current prototype work.** Retain this section as a later direction only.

Add a clearly separate operational surface for the first-release reporting loop:

- PMHC-MDS extension and core-field completeness;
- validation issue queue and accountable owner;
- preparation for approved VPN submission;
- distinct prepared, submitted, accepted, rejected and outcome-unknown states;
- receipt/reference, actual timestamp and reconciliation work; and
- safe retry/recovery behaviour.

Do not assume an API endpoint, recipient schema, VPN workflow or a successful handover from a user-interface action. Those dependencies need confirmation before implementation.

## Proposed information architecture

For the selected care period, use the following hierarchy:

| Surface | Primary job | Contents |
| --- | --- | --- |
| **Overview / Current assessment** | Orient before a session or review | Current assessment state, due date, next action, care-period header, timeline and people involved |
| **90-day review pack** | Prepare and conduct the 90-day multidisciplinary review | Due, incomplete and awaiting-review work; selected trends, changed answers, relevant events and follow-up actions |
| **Assessment detail** | Inspect raw questionnaire evidence | Questionnaire/version, response and review provenance, trends, literal answer comparison |
| **Events** | Record and correct contextual care events | Event timeline, source, impact, amendment history |
| **History** | Audit what changed and who acted | Append-only activity, corrections, review and handover history |
| **PMHC-MDS operations** | Prepare and reconcile first-release reporting | Completeness, validation, submission outcome and owned reconciliation |

## Explicitly unresolved decisions

The prototype should expose, rather than hide, these decisions during validation:

1. **Terminology and boundary:** whether the service calls the period an episode, care period or care journey; what constitutes a major care-package interruption; and how reopening, new assessment and transfer are decided.
2. **Care stage:** the approved care-stage/need/recovery terminology and who may change it.
3. **Event governance:** final event taxonomy, minimum fields, evidence standard, permissions, participant/supporter visibility, correction/retraction, retention and links to the clinical record.
4. **Report/review scope:** whether clinician interpretation, narrative, annotation, export and meeting records belong in the care-review surface, assessment record or history.
5. **Access and sensitive data:** roles, care-team membership, field classifications, approval paths and actual enforcement model.
6. **PMHC-MDS contract:** extension fields, output version, validation rules, secure submission workflow, acknowledgement/rejection handling and accountable owners.

## Scope guardrails

- This is a care-coordination and outcomes prototype, not a medication chart, risk-management system, clinical treatment plan or hospital-admission system of record.
- Record external or clinical-system facts only as permitted contextual evidence; do not represent an event as proof that an external service action occurred.
- Do not infer clinical progress from answer changes, trend direction or event timing.
- Do not turn a scheduled 90-day review into a new care period.
- Do not claim browser-local data, simulated roles or sample submission states are production persistence, authentication, authorisation, clinical governance or PMHC-MDS integration.

## Later implementation acceptance checks

When this work is taken forward, validate the prototype with a case manager and multidisciplinary clinicians using fictional records. They should be able to:

1. identify the active care period, key clinician and next action from Overview without opening raw assessments;
2. prepare for a 90-day review by opening the review pack, then moving to relevant trends and source answers;
3. distinguish a questionnaire response, a review state, a contextual event and a care transition;
4. record and amend a relevant event while retaining who recorded what and when;
5. make and explain a case-by-case return-to-service decision without creating concurrent periods; and
6. identify incomplete/invalid PMHC-MDS data, prepare a submission and correctly interpret its outcome state.

Record misunderstandings, unsafe assumptions, missing data and role/visibility concerns as validation findings. Approval of a screen is not approval of the clinical policy or production implementation behind it.

## Related documents

- [Stakeholder discussion questions](stakeholder-validation-questions-2026-09-17.md)
- [Requirements and logic](05-requirements-and-logic.md)
- [UX strategy](06-ux-strategy.md)
- [Full information architecture](08-information-architecture.md)
- [User flows](07-user-flows.md)
