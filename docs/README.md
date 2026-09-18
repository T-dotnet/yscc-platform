# YSCC Platform — Product and UX documentation

Version 0.7 · 18 September 2026 · Aligned to the current interactive prototype

Nine separate documents expand the [revised combined baseline](../UX-Strategy-and-Requirements.md). They describe a proposed product and its current local interactive demonstration, not an approved clinical protocol or production system. U1/D-25 records the product owner’s mandatory-intake decision; other stakeholder approvals and full Slack-thread verification are not claimed.

The Markdown files in this folder are canonical. The [dated generated HTML copies](../output/htlm/README.html) are retained for historical stakeholder review and are not automatically updated with later prototype-alignment changes.

## Documents

| Document                                                             | Purpose and canonical content                                                                                          |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| [01 — Product framing](01-product-framing.md)                        | Problem, product boundaries, scope, evidence register, open decision register.                                         |
| [02 — Value Proposition Canvas](02-value-proposition-canvas.md)      | Customer jobs, pains, gains, proposed value and fit hypotheses. VPC means Value Proposition Canvas.                    |
| [03 — Completed working personas](03-personas.md)                    | The 11 named CMDCS profiles across three groups, plus three supporting capabilities; draft hypotheses remain explicit. |
| [04 — Full user journey](04-full-user-journey.md)                    | End-to-end experience and service handoffs, including loops, pauses, exits, and continuing care.                       |
| [05 — Requirements and logic](05-requirements-and-logic.md)          | Canonical FR-01 through FR-46, rule catalogue, state model, dependencies, and acceptance scenarios.                    |
| [06 — UX strategy](06-ux-strategy.md)                                | Experience priorities, research, measurement, design sequencing, and validation gates.                                 |
| [07 — User flows](07-user-flows.md)                                  | Screen/action sequences, decision branches, recovery, and interaction behaviour.                                       |
| [08 — Full information architecture](08-information-architecture.md) | Domain relationships, staff/participant structures, screen inventory, labels, search, and wayfinding.                  |
| [09 — UX principles and UI guidelines](09-ux-principles-and-ui-guidelines.md) | Cross-cutting principles and practical UI rules for hierarchy, content, accessibility, evidence and validation. |

Suggested reading order: framing → personas and VPC → journey → requirements → strategy → flows → IA → UX principles and UI guidelines. Design and engineering should use requirements, flows, IA and the cross-cutting guide together.

For stakeholder review, start with the concise [stakeholder discussion questions](stakeholder-validation-questions-2026-09-17.md). Its [dated HTML copy](../output/htlm/stakeholder-validation-questions-2026-09-17.html) and the earlier [detailed validation set](stakeholder-validation-questions-2026-09-16.md) preserve their original review context. Neither is an additional approved requirements document.

## How to read the evidence

- **Reported:** Oli explicitly described the requirement in the captured Slack material, including confirmations attributed to Caroline. This is not direct stakeholder sign-off of this document set.
- **Provisional:** a direction discussed but still awaiting confirmation.
- **Reference:** a fact about the historical headspace extract/codebook, not automatically a YSCC requirement.
- **Confirmed product decision:** an explicit product-owner clarification recorded with its source and date, such as mandatory new-patient intake (U1/D-25). This does not approve unspecified clinical policy.
- **Proposed:** a product/design translation to review and validate.
- **Hypothesis:** a user need, pain, value claim, or design assumption requiring research.
- **Conditional scope:** included only if the product/clinical owners explicitly adopt it.

The full #ux discussion was not retrieved. The journey is a synthesis of the available material. Personas are complete as working artefacts, not research-validated descriptions of actual people. All illustrative policy behaviour must be labelled as sample behaviour in a prototype.

## Current prototype alignment — 18 September 2026

Every new patient must go through intake before the core assessment or ongoing-care pathway (U1/D-25). Registration alone does not complete intake. The prototype now demonstrates this gate with local sample data: registration opens owned intake; intake records its state, history and proceed/do-not-proceed outcome; a completed/proceed outcome enables an initial assessment plan; and referral activity retains separate sending, receipt, decision and handover states.

The same prototype demonstrates a worklist, person/care-period context, collection through sample SMS, tablet and clinician-entry paths, purpose-specific consent requests with accept/decline/withdraw history, channel-dependent review handling, correction history, follow-up planning, pause/close actions, a questionnaire-based Progress dashboard, clinician report versions, append-only annotations, a provisional Events tab and instrument administration. Report now shows a sample **Care coordination context** block before the questionnaire selector: Risk and status history uses dated event categories and explicitly labels an empty category **Not recorded**; Goals and functioning shows dated structured milestones. Repeated Likert answers appear as question-level dated line charts, and the current prototype also renders a normalised 0–100 descriptive value from valid Likert items in one selected questionnaire version. It excludes qualitative answers and is not an approved clinical score, threshold or interpretation. **Questionnaire comparison and details** remains open by default where non-Likert questions apply; changed answers retain literal prior/latest wording, and contextual markers show timing only. The Report adapts its comparison, care-context cards and Likert cards to narrow viewports without concealing source labels. Clinical notes are hidden from Report and annotations remain available through History. Its sample rule marks clinician entry and supported tablet completion **Review not required** while SMS and independent tablet responses remain pending review. It uses browser-local storage, fictional people, sample policy/content and local role checks only. A hosted prototype still does **not** prove identity/authority, production authentication or authorisation, external referral/SMS/consent delivery, multi-user concurrency, clinical instruments/scoring, approved consent/review policy, or release readiness. The [prototype report and responsive implementation status](prototype-report-and-responsive-status-2026-09-18.md) records the exact local behaviour. The [requirements contract](05-requirements-and-logic.md#7-intake-and-onward-referral-contract), F-01/F-10/F-17, ST-11/ST-27–ST-31 and the AC catalogue remain the intended specification; D-04–D-10, D-26–D-29 retain remaining policy, clinical and service decisions. Report and Events are explicitly provisional and require stakeholder validation before production sign-off.

## Shared vocabulary

| Term                        | Meaning used throughout this set                                                                                                                                                    |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Person                      | The person whose care record is being managed. A supporter is a separate actor.                                                                                                     |
| Intake                      | Required entry process for every new patient, with its own progress, authorised outcome and owner; registration is not completion or admission.                                     |
| Onward referral             | An owned request to another service, with separate sending, receipt, decision and handover-resolution evidence.                                                                     |
| Care episode                | A variable-length period of engagement/care, with its own identity, dates, ownership, and closure. A review interval is not an episode.                                             |
| Assessment instance         | A core assessment and relevant conditional modules within an episode. One response is not the entire assessment.                                                                    |
| Instrument / measure        | The clinically governed question set and scoring definition. “Questionnaire” is proposed participant-facing wording where appropriate.                                              |
| Collection point            | A baseline or follow-up occurrence with its own schedule and actual events.                                                                                                         |
| Assignment                  | A request for an eligible respondent to complete a pinned instrument version at a collection point.                                                                                 |
| Delivery attempt / session  | One invitation attempt or collection session. Reissue does not create a new clinical time point.                                                                                    |
| Response                    | A draft or submitted answer record, with actual source, recorder, assistance, version, and timestamps.                                                                              |
| Clinical review requirement | Whether a submitted response needs a separate clinician review under the approved instrument/mode/assistance rule. Not required is not the same as reviewed or assessment complete. |
| Respondent                  | The person supplying answers; not necessarily the person typing them.                                                                                                               |
| Recorder                    | The person entering answers. Their role does not replace the respondent's provenance.                                                                                               |
| Consent request             | A versioned, purpose- and scope-specific request with delivery, accept/decline and withdrawal history. Sent is not accepted; one purpose does not decide another.                   |
| Guardian authority          | An approved decision-making authority; not inferred from being a parent, family respondent, or link recipient.                                                                      |
| Disposition                 | An admission decision, separate from assessment completion, onward referral, and episode closure.                                                                                   |
| Correction                  | A traceable change to recorded information, not a new longitudinal response or automatic re-opening of collection.                                                                  |

## Ownership and change control

The combined baseline remains a historical input. This set is its working expansion. Use document 05 as the canonical requirements catalogue within this set; do not maintain another competing list of FR wording. Source and decision ownership lives in document 01; screen IDs live in document 08. Other documents link to these owners.

IDs are stable: `P-xx` personas/supporting capabilities, `J-xx` care-journey phases, `SJ-xx` service/evidence journey phases, `FR-xx` baseline requirements, `CR-xx` persona-derived candidate requirements, `L-xx` rules, `AC-xx` acceptance scenarios, `F-xx` flows, `ST-xx` staff screens, `PT-xx` participant screens, `EX-xx` candidate expansion surfaces, and `D-xx` open decisions. These namespaces describe different things and are not interchangeable.

Before changing a rule, record its source/approval status and check its affected journey, flow, screen, and acceptance test. Supersede decisions explicitly; do not silently turn hypotheses into confirmed facts.

## Scope guardrails

All requirements except FR-15 and FR-39 form a **proposed** MVP baseline, subject to clinical/content/policy decisions. FR-15 satisfaction collection and FR-39 service logging are conditional. Detailed discharge content and historical migration/export are also unresolved scope decisions.

Account-free SMS, tablet self-entry, clinician entry, and appropriate family participation are reported launch capabilities. This does not mean every instrument supports every respondent or channel. Monthly collection is possible, not mandated. A support route is required; automated clinical escalation is not included without separate approval.

A local interactive prototype has been created and is documented above. No production application, clinical instrument, server-enforced permissions implementation, live delivery, or production compliance has been created or verified by this documentation work.

The supplied persona PDF expands the product horizon beyond collection to service improvement and system evidence. Its Stage 2 self-report statement conflicts with the captured Slack MVP requirement; D-21 tracks that conflict. The staff questionnaire-based Progress dashboard is current prototype/product direction; participant progress access, centre/service dashboards, wider care recording, reporting, integration, and research remain visible candidate scope (CR-01–CR-08), not hidden omissions or new launch commitments.
