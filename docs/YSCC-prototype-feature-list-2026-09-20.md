# YSCC prototype feature list

**Version reviewed:** current local working tree, 20 September 2026  
**Prototype boundary:** fictional, browser-local demonstration data. This is a feature inventory of implemented prototype behaviour, not a statement of production readiness, clinical approval, regulatory compliance, or live service delivery.

## Workspace and caseload

- **My work queue** with derived tasks across intake, assessments and referral follow-up; filters for overdue/review work, collection point and search; direct navigation into the relevant record.
- **People directory** with status and due-date summaries, priority ordering, search and episode/status filtering.
- **Person workspace** showing identity, care owner, location, required-data completeness, current care status and next actions.
- **Care-period model** that keeps assessments, reports, events and history within a selected care period. People with multiple periods can switch between current and historical care.
- **Role demonstration** for sample staff profiles, including clinician and data-manager paths.
- **Responsive interface** with a collapsible workspace navigation and mobile-aware record layouts.

## Intake, care episodes and onward referral

- **New-person registration** with duplicate-name warning and an owned intake before a care episode or assessment is created.
- **Intake workspace** for referral origin, identity source, contact suitability, permission/authority references, support needs, required checks, triage, ownership and next step.
- **Saved intake updates and history** with actor, timestamp, reason and field snapshot; partial, waiting and final decision states are represented.
- **Assessment-plan gating**: a care period and initial assessment are created only after the sample intake decision and plan are completed.
- **Care-period actions** to pause or close a period with recorded reason and impact; outstanding sample collections are reconciled and active links revoked.
- **Onward referrals** with draft, sending, verification, receipt, acceptance/decline, follow-up, handover and resolution events. Unknown delivery is kept distinct from verified receipt.

## Assessment collection and questionnaires

- **Assessment and collection plan** with separate collection points inside a care period, version-pinned questionnaires, respondents, due dates, channels, delivery attempts, response state and review state.
- **Plan follow-up** to add a new collection point within the existing care period and select an instrument/version.
- **Collection setup** supporting sample SMS link, clinic-tablet, clinician-entry, supported/joint completion and staff-transcription paths.
- **Sample invitation preview and reissue flow**; reissuing creates another attempt for the same assignment.
- **Participant questionnaire experience** with an introduction, support/exit route, section-based adaptive questions, permitted nonresponse, back/change, progress, searchable review and one-time submission.
- **Conditional question logic** that adds/removes dependent questions and clears no-longer-applicable answers; practice and staff-review flows use the same rules.
- **Questionnaire preview** from relevant staff surfaces and a standalone sample participant preview, without changing the care record.
- **Clinician completion** that records the respondent and clinician recorder separately and applies the prototype’s distinct “review not required” path where applicable.
- **Instrument library** with eight original, nonclinical sample questionnaires, search/topic browsing and preview.

## Response review, corrections and consent

- **Clinical review record** that keeps a submitted response, its provenance and its separate review state together.
- **Answer editing** with a required reason, before/after review, response-edit history and re-review flagging after changes.
- **Data-quality correction audit** retaining changed items, prior/new values, editor identity and role, timestamp, reason and optional source.
- **Purpose-specific consent requests** using sample SMS or clinic-tablet delivery; request status, scope, version and history are shown per purpose.
- **Participant consent view** for accept/decline, followed by purpose-specific withdrawal where permitted. Participation withdrawal affects active sample collection links.
- **Contact and respondent context** that keeps family contribution separate from guardian authority and separate purposes (for example research participation) explicit.

## Care record, appointments and timeline

- **Unified care timeline** that combines appointments, structured records and contextual events in date order.
- **Timeline filters** for record category, type, date range and free-text search.
- **Contextual events** for safety, inpatient, medication-adverse, housing, care transition, medication, care/service and other events, with append-only correction of an earlier event.
- **Structured records** for risk, diagnosis, medication and outcome information.
- **Appointment/service-contact records** with planned and actual date/time/duration, delivery mode, clinician/service, location, attendance, notes, outcome details, recorder and timestamp.
- **Appointment outcomes and follow-up actions**: record attendance for planned contacts; add an outcome measure or schedule follow-up from recorded contacts.
- **Appointment grouping and filtering**: overdue planned, upcoming planned and recorded contacts are separate accordions; search, status and date filters are available; overdue contacts receive an alert.
- **Appointment-card summary** of session objective, note preview, linked risk, outcome measures, tasks and next appointment, with expandable detail.

## Longitudinal report and outcome measures

- **Read-only longitudinal report** scoped to the selected care period.
- **Interactive care timeline** with expandable/collapsible presentation and source-record detail.
- **Longitudinal visualisations** for recorded observations, treatment/programme periods, goals and progress, activity rating, outcome measures, risk history and medication periods when fixture data is available.
- **Configured outcome-measure cards** and a comparison dialog for up to three measures by recorded assessment date.
- **Empty-state handling** that makes absent structured observations, goals, risk reviews, measures and medication courses explicit rather than drawing unsupported graphs.
- **Questionnaire evidence/analysis components** remain available in the prototype codebase for version- and respondent-scoped Likert trends, descriptive aggregates and answer-level comparison; the current primary Report surface is the longitudinal care record.

## Data quality and administration

- **Data-quality dashboard** with a validation-issue queue, organisation/clinician/status/severity/submission-period filtering and issue-management actions.
- **Submission-readiness check** that blocks the sample preparation action until active blocking issues are resolved.
- **Record-completeness view** with required-field percentage, search and completeness filtering, plus direct navigation back to the person record.
- **Administration area** for sample instrument library, rules/schedules, message preview, organisation/access context and resetting the sample workspace.
- **Help and guidance** with walkthrough links for overdue reviews, submitted-response review, follow-up planning and participant questionnaire preview.

## Deliberate prototype limits

- Data is stored locally in the browser; it is not a shared or server-authorised record.
- The prototype does not send SMS, verify identity or guardian authority, authenticate real staff, enforce production permissions, integrate with external services, or provide multi-user concurrency guarantees.
- Instruments and questions are original sample content; no approved clinical instrument, clinical score, diagnosis, threshold, automated escalation or clinical interpretation is implemented.
- Consent, referral, audit and submission behaviours demonstrate interaction and record-keeping patterns only; they do not establish legal wording, policy compliance, reporting reconciliation or a live submission pathway.
- The appointment component is implemented and is referenced by appointment-related quality actions, but the current visible person-tab list does not include an **Appointments** tab. It should therefore be treated as implemented work requiring navigation integration before being presented as an accessible end-to-end feature.

## Source basis

This inventory was derived from the current implementation under `prototype/src`, including the active uncommitted work for appointments, structured care records, outcome measures, data quality and the longitudinal report. It intentionally distinguishes implemented demonstration behaviour from external integrations, policy decisions and clinical/compliance claims.
