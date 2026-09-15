# YSCC Platform — Product and UX documentation

Version 0.4 · 16 September 2026 · Aligned to the current interactive prototype

Eight separate documents expand the [revised combined baseline](../UX-Strategy-and-Requirements.md). They describe a proposed product and its current local interactive demonstration, not an approved clinical protocol or production system. U1/D-25 records the product owner’s mandatory-intake decision; other stakeholder approvals and full Slack-thread verification are not claimed.

## Documents

| Document | Purpose and canonical content |
| --- | --- |
| [01 — Product framing](01-product-framing.md) | Problem, product boundaries, scope, evidence register, open decision register. |
| [02 — Value Proposition Canvas](02-value-proposition-canvas.md) | Customer jobs, pains, gains, proposed value and fit hypotheses. VPC means Value Proposition Canvas. |
| [03 — Completed working personas](03-personas.md) | The 11 named CMDCS profiles across three groups, plus three supporting capabilities; draft hypotheses remain explicit. |
| [04 — Full user journey](04-full-user-journey.md) | End-to-end experience and service handoffs, including loops, pauses, exits, and continuing care. |
| [05 — Requirements and logic](05-requirements-and-logic.md) | Canonical FR-01 through FR-46, rule catalogue, state model, dependencies, and acceptance scenarios. |
| [06 — UX strategy](06-ux-strategy.md) | Experience priorities, research, measurement, design sequencing, and validation gates. |
| [07 — User flows](07-user-flows.md) | Screen/action sequences, decision branches, recovery, and interaction behaviour. |
| [08 — Full information architecture](08-information-architecture.md) | Domain relationships, staff/participant structures, screen inventory, labels, search, and wayfinding. |

Suggested reading order: framing → personas and VPC → journey → requirements → strategy → flows → IA. Design and engineering should use requirements, flows, and IA together.

## How to read the evidence

- **Reported:** Oli explicitly described the requirement in the captured Slack material, including confirmations attributed to Caroline. This is not direct stakeholder sign-off of this document set.
- **Provisional:** a direction discussed but still awaiting confirmation.
- **Reference:** a fact about the historical headspace extract/codebook, not automatically a YSCC requirement.
- **Confirmed product decision:** an explicit product-owner clarification recorded with its source and date, such as mandatory new-patient intake (U1/D-25). This does not approve unspecified clinical policy.
- **Proposed:** a product/design translation to review and validate.
- **Hypothesis:** a user need, pain, value claim, or design assumption requiring research.
- **Conditional scope:** included only if the product/clinical owners explicitly adopt it.

The full #ux discussion was not retrieved. The journey is a synthesis of the available material. Personas are complete as working artefacts, not research-validated descriptions of actual people. All illustrative policy behaviour must be labelled as sample behaviour in a prototype.

## Current prototype alignment — 16 September 2026

Every new patient must go through intake before the core assessment or ongoing-care pathway (U1/D-25). Registration alone does not complete intake. The prototype now demonstrates this gate with local sample data: registration opens owned intake; intake records its state, history and proceed/do-not-proceed outcome; a completed/proceed outcome enables an initial assessment plan; and referral activity retains separate sending, receipt, decision and handover states.

The same local prototype demonstrates a worklist, person/care-period context, collection through sample SMS, tablet and clinician-entry paths, review, correction history, follow-up planning, pause/close actions, a clinician-editable report and instrument administration. It uses browser-local storage, fictional people, sample policy/content and local role checks only. It does **not** prove production authentication or authorisation, external referral/SMS delivery, multi-user concurrency, clinical instruments/scoring, approved policy, or release readiness. The [requirements contract](05-requirements-and-logic.md#7-intake-and-onward-referral-contract), F-01/F-17, ST-27/ST-28 and AC-23–AC-29 remain the intended specification; D-26/D-27 retain remaining clinical/service decisions.

## Shared vocabulary

| Term | Meaning used throughout this set |
| --- | --- |
| Person | The person whose care record is being managed. A supporter is a separate actor. |
| Intake | Required entry process for every new patient, with its own progress, authorised outcome and owner; registration is not completion or admission. |
| Onward referral | An owned request to another service, with separate sending, receipt, decision and handover-resolution evidence. |
| Care episode | A variable-length period of engagement/care, with its own identity, dates, ownership, and closure. A review interval is not an episode. |
| Assessment instance | A core assessment and relevant conditional modules within an episode. One response is not the entire assessment. |
| Instrument / measure | The clinically governed question set and scoring definition. “Questionnaire” is proposed participant-facing wording where appropriate. |
| Collection point | A baseline or follow-up occurrence with its own schedule and actual events. |
| Assignment | A request for an eligible respondent to complete a pinned instrument version at a collection point. |
| Delivery attempt / session | One invitation attempt or collection session. Reissue does not create a new clinical time point. |
| Response | A draft or submitted answer record, with actual source, recorder, assistance, version, and timestamps. |
| Respondent | The person supplying answers; not necessarily the person typing them. |
| Recorder | The person entering answers. Their role does not replace the respondent's provenance. |
| Guardian authority | An approved decision-making authority; not inferred from being a parent, family respondent, or link recipient. |
| Disposition | An admission decision, separate from assessment completion, onward referral, and episode closure. |
| Correction | A traceable change to recorded information, not a new longitudinal response or automatic re-opening of collection. |

## Ownership and change control

The combined baseline remains a historical input. This set is its working expansion. Use document 05 as the canonical requirements catalogue within this set; do not maintain another competing list of FR wording. Source and decision ownership lives in document 01; screen IDs live in document 08. Other documents link to these owners.

IDs are stable: `P-xx` personas/supporting capabilities, `J-xx` care-journey phases, `SJ-xx` service/evidence journey phases, `FR-xx` baseline requirements, `CR-xx` persona-derived candidate requirements, `L-xx` rules, `AC-xx` acceptance scenarios, `F-xx` flows, `ST-xx` staff screens, `PT-xx` participant screens, `EX-xx` candidate expansion surfaces, and `D-xx` open decisions. These namespaces describe different things and are not interchangeable.

Before changing a rule, record its source/approval status and check its affected journey, flow, screen, and acceptance test. Supersede decisions explicitly; do not silently turn hypotheses into confirmed facts.

## Scope guardrails

All requirements except FR-15 and FR-39 form a **proposed** MVP baseline, subject to clinical/content/policy decisions. FR-15 satisfaction collection and FR-39 service logging are conditional. Detailed discharge content and historical migration/export are also unresolved scope decisions.

Account-free SMS, tablet self-entry, clinician entry, and appropriate family participation are reported launch capabilities. This does not mean every instrument supports every respondent or channel. Monthly collection is possible, not mandated. A support route is required; automated clinical escalation is not included without separate approval.

A local interactive prototype has been created and is documented above. No production application, clinical instrument, server-enforced permissions implementation, live delivery, or production compliance has been created or verified by this documentation work.

The supplied persona PDF expands the product horizon beyond collection to service improvement and system evidence. Its Stage 2 self-report statement conflicts with the captured Slack MVP requirement; D-21 tracks that conflict. Wider dashboards, care recording, reporting, integration, and research are visible candidate scope (CR-01–CR-08), not hidden omissions or new launch commitments.
