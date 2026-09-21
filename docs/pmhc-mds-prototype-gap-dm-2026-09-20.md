# DM draft: PMHC-MDS MVP gaps in the current prototype

Hi — I have compared the current YSCC prototype with the proposed PMHC-MDS MVP direction. It is useful for testing the care-period, assessment, review and contextual-event experience, but it does not yet demonstrate the reporting-operational loop we would need for MVP.

Could we confirm the following scope and data questions before we treat the prototype as a basis for PMHC-MDS delivery?

## Current prototype: what we have and what is missing

| Area | What the prototype currently demonstrates | What is missing for the proposed MVP |
| --- | --- | --- |
| Care period | Episode identity, owner, start/end, pause/close action, history and outstanding-assessment reconciliation | Agreed discharge/closure data contract, structured reason, actual discharge date and completion rules |
| Appointments / service contacts | Follow-up assessment planning and a sample questionnaire about appointment preferences | A structured planned/actual contact record: date/time, attendance, cancellation/no-show, duration, practitioner/service and delivery mode |
| Assessments and measures | Fictional demo/check-in instruments; a fictional K10 raw-total display in Report | Approved measure set, governed instruments and versions, scoring, respondents, baseline/review/discharge timing, and missing-data rules |
| Events | Episode-scoped contextual events with date, factual summary and optional source/impact/notes | Decision on which events are operational or PMHC-MDS data; no appointment, formal risk, diagnosis, medication-chart or outcome-record model |
| Referral and next care | Referral activity and a free-text next care step with named owner | Confirmed handover/discharge destination, receiving-service responsibility and rules for unresolved referrals |
| Reporting / data quality | Report timeline, response history and browser-local change history | PMHC-MDS field mapping, completeness rules, validation issue queue, accountable reconciliation workflow and durable audit/access controls |
| Submission | No implementation | Approved VPN hand-off, submission package, prepared/submitted/accepted/rejected/unknown states, receipt/reference and safe retry/reconciliation |

1. **Appointments / service contacts:** are appointments or service contacts part of the data we need to submit? The prototype can record care events and plan follow-up questionnaires, but it does not currently record an appointment/contact as a structured record: planned versus actual date/time, attendance, cancellation/no-show, duration, practitioner/service, or delivery mode. The “Practical support” sample questionnaire asks about appointment preferences; it is not an appointment record.

2. **Measures and outcomes:** which exact measures are required for this service and PMHC-MDS extension? Current assessment instruments are fictional demo/check-in content, not governed clinical instruments. The Report can show hard-coded fictional outcomes for K10+, K5, SDQ, IAR-DST, WHO-5 and SIDAS, but it does not demonstrate administering any of them as a real instrument. The extra outcome, symptom, risk, activity and programme panels in the Jordan fixture are visual experiments, not connected operational data. We need the approved measure list, version/scoring rules, eligible respondents, collection points (for example baseline, review and discharge), and missing/incomplete-response rules.

3. **Events:** the prototype does collect episode-scoped contextual events: harm to self or others, inpatient admission, medication adverse event, housing instability, care/service transition and other events. Each has an event date, factual summary and optional source/impact/notes. That is not an appointment/service-contact model, a formal risk assessment, medication chart, diagnosis record or clinical outcome record. We should decide which of those belong in MVP and which remain extension data.

4. **Care-period closure / discharge:** today, closing a care period records a free-text reason, next care step and named owner; it automatically sets the end date, cancels unsubmitted collections and revokes active links. Before this can represent discharge reporting, do we also need a structured closure/discharge reason, actual discharge date, destination or receiving service, handover confirmation, remaining follow-up owner, final required measures, and a clear status for any incomplete or outstanding reporting data? We should also decide whether unresolved referrals or required discharge measures block closure, create a reconciliation task, or may be recorded as explicitly missing.

5. **Core data and submission:** the prototype has no PMHC-MDS field map, completeness validation, validation-issue queue, export/submission package, VPN hand-off, receipt/reference, accepted/rejected/outcome-unknown state, or reconciliation/retry workflow. It also uses fictional browser-local data, so it is not evidence of production persistence, access control or an integration.

My suggestion is to treat the immediate next step as a short **PMHC-MDS MVP data contract**: confirm the current required core and extension fields, the measures and timing, the service-contact and closure rules, and the approved submission process. We can then map each field to one of: already demonstrated, needs a prototype addition, or deferred. I would avoid assuming that the earlier example list of measures is complete until the applicable PMHC-MDS specification and VPN submission process are confirmed.

## Evidence from the current local prototype

- **Events:** episode-scoped factual contextual-event form; not a broader clinical or appointment record. `prototype/src/careEvents.js`.
- **Closure:** free-text reason, next step and owner; automatic end date and cancellation/revocation of outstanding collection work. `prototype/src/components/Forms.jsx` and `prototype/src/model.js`.
- **Measures:** current instruments are explicitly sample content; the K10 display is a fictional Report fixture and not approval of K10 collection/scoring. `prototype/src/instruments.js`, `prototype/src/k10.js`, and `docs/prototype-longitudinal-report-status-2026-09-19.md`.
- **Submission:** the product documentation records the PMHC-MDS operational loop as deferred, including completeness, validation, VPN preparation, submission states, receipt and reconciliation. `docs/prototype-improvements-from-clinical-feedback-2026-09-18.md`.

## Framing note

This is a prototype-gap assessment, not a statement of the current PMHC-MDS specification. The exact required fields, measures, schemas and submission controls need confirmation with the responsible data/reporting owner and the current approved PMHC-MDS materials.
