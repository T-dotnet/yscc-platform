# YSCC Platform — UX strategy

Version 0.6 · 18 September 2026 · Strategy aligned to the current local prototype

[Document index](README.md) · [Product framing](01-product-framing.md) · [Requirements and logic](05-requirements-and-logic.md)

## 1. Strategic direction

Design around a trustworthy, understandable contribution to a continuous care record. Staff should know the current episode, available evidence, outstanding work, and next responsible action. People and supporters should understand the request and complete an eligible task with suitable help and accurate feedback.

The initial design priority is **safe participation and correct interpretation**, followed by operational efficiency and longitudinal insight. A shorter flow is not a success if it hides visibility, loses provenance, or makes incomplete care look complete.

This strategy does not assume the shared-core model, instruments, consent policy, or scheduling rules are approved. Decisions are tracked in product framing. CP1 adds 11 named personas across Care Delivery, Service Improvement, and System Evidence; D-20–D-24 track naming, phase conflicts, wider workflows, and governance.

**Current prototype as a validation instrument:** The local prototype has progressed the experience from static specification into testable tasks: work prioritisation, person/care-period selection, mandatory intake and referral follow-through, sample collection across channels, purpose-specific consent requests, policy-dependent review/correction, follow-up, episode actions and a Report with care context, question-level trends and answer-level comparison. It gives the team a shared, fictional-data artefact for usability, content and operational walkthroughs. It is not itself validation: browser-local persistence and sample role/policy behaviour do not establish identity or authority, real access enforcement or delivery, approved consent/review rules, clinical content/scoring, production accessibility conformance, external handover or service/system reporting. Use the existing acceptance criteria and dated UX/UI audit as inputs to structured testing rather than treating a working demo as evidence of user understanding or release readiness.

## 2. Experience principles and design decisions

| Principle                                     | Concrete design direction                                                                                                 | What to test                                                                                           |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Keep the care context visible.                | Persistent person/episode identity; explicit episode switch; dated allocation and history.                                | Can staff identify and resume the right care period without guessing?                                  |
| Give each status one meaning.                 | Separate assignment, delivery, response, review, disposition, and closure; show a relevant next action.                   | Can staff interpret partial assessment and expired-link combinations?                                  |
| Respect the person's participation context.   | Eligible channel/assistance selection; plain purpose/visibility information; support route; no private-device assumption. | Can participants explain the request and choose/ask for a suitable way to complete it?                 |
| Preserve source and history.                  | Pinned versions; visible respondent/recorder/assistance; correction audit; comparison limitations.                        | Can staff distinguish self-report, transcription, joint completion, and unsupported score comparisons? |
| Explain the reason for additional work.       | Visible conditional-module rationale and intentional clinician additions.                                                 | Can staff understand why a module is present and what evidence is still needed?                        |
| Protect work without overstating persistence. | Distinct unsaved/saving/saved/submitted states; safe retry and approved resume.                                           | Can users recover without lost input, duplicate fulfilment, or false success?                          |
| Make handover actionable.                     | Owner, next action, due window, blocker, and explicit pending-work reconciliation.                                        | Can another authorised staff member continue without reconstructing the task?                          |
| Limit access by task and context.             | Stable staff navigation with capability-based destinations; narrowly scoped participant surfaces.                         | Do search, counts, deep links, and tablet back navigation respect the same boundaries?                 |

## 3. Prioritisation model

| Priority                      | Design focus                                                                                                           | Why it comes first                                                                               | Main requirements                                    |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------- |
| 1 — Safety and integrity      | Correct person/episode; authority/visibility; eligible modes; source/version; save/submission truth; tablet isolation. | Failures can undermine privacy, record interpretation, or the validity of collection.            | FR-01, FR-05, FR-08–FR-14, FR-16–FR-29, FR-44–FR-46. |
| 2 — Complete operational loop | Intake, clinical review, incomplete exits, routing, ownership, corrections, handover, closure.                         | Collection is useful only when people can act on it appropriately.                               | FR-02–FR-04, FR-30–FR-38.                            |
| 3 — Longitudinal continuity   | Approved review cadence, reminders, trends, source gaps, operational queues.                                           | Enables repeated care without overwriting or misreading earlier data.                            | FR-06–FR-07, FR-19, FR-35–FR-36.                     |
| Conditional                   | Satisfaction, services, full discharge, migration/export.                                                              | Adds design/content/data work only after explicit scope.                                         | FR-15, FR-39; D-15–D-16.                             |
| Expanded phase to decide      | Personal progress, wider care recording, centre/fidelity dashboards, reporting, exchange, and research.                | CP1 adds these jobs; phase/governance decisions prevent an unreviewed whole-platform commitment. | CR-01–CR-08; D-20–D-24.                              |
| Later proposal                | Richer workflow administration and additional languages.                                                               | Basic configuration and launch language/accessibility decisions remain mandatory.                | Product prioritisation after baseline validation.    |

These priorities sequence risk reduction; they do not remove any proposed baseline FR or turn conditional scope into an implicit exclusion.

## 4. Research programme

### Track A — Confirm the service and decision model

Review the full #ux context with Caroline/Assessment Team, walk through the proposed journey, and resolve the distinction between assessment completion, admission, referral, and episode boundaries. Use real process descriptions but synthetic records in artefacts unless authorised data handling is in place.

U1/D-25 has settled mandatory intake for every new patient; research now validates how intake, waiting and external referral follow-through work, not whether that step exists. Test a partial registration, missing contact, triage wait, authorised proceed outcome and unsuccessful external handover (AC-23–AC-29).

Outputs: validated/changed journey steps; clinical content inventory; ownership matrix; D-01/D-02/D-08–D-11 decisions; explicit record of uncertainty. Do not accept general agreement with the document as approval of every rule.

### Track B — Understand participant and supporter contexts

Research P-01/P-02 and the P-03 pathway with appropriately approved consent/assent and safeguarding procedures. Explore language, device access, assistance, contact suitability, visibility expectations, and the meaning of submission/next steps.

Use teach-back and task observation, not only preference questions. Do not require clinical disclosure to test a navigation or saving interaction. Include shared devices, supported completion, assistive technology, and varying digital confidence; sample size and recruitment are agreed with research/clinical owners rather than invented here.

CP1 explicitly calls for Aboriginal and Torres Strait Islander people and diverse backgrounds to shape co-design authentically. Work with appropriate community/lived-experience partners and culturally safe methods; do not infer Kai's identity from a name or portrait, or use a digital-native trait as a recruitment shortcut.

Outputs: evidence-backed persona revisions; comprehension findings; assistance/content requirements; safe-contact and support design constraints. Guardian-pathway testing depends on an approved policy, not an assumed age threshold.

### Track C — Validate staff mental models and information architecture

With Jess, Tom, Ananya, Rachel, Sam, and supporting facilitator/administrator capabilities, collect the words and task groupings staff use. Test the current prototype labels “Assessment,” “Report,” “Consent & respondents,” “History,” and “Data quality,” including whether staff understand review not required as distinct from reviewed. Separately investigate care, fidelity, and reporting vocabulary; the source's three persona groups are an actor model, not automatically three navigation labels.

Sequence: task/content inventory → small card-sorting exercise where labels/groupings are uncertain → tree testing of the IA → first-click testing on wireframes → task-based prototype testing. Restrict tasks to each participant's proposed responsibilities; do not teach an incorrect permission model just to make a test possible.

Outputs: vocabulary changes, findability evidence, validated task homes, scoped navigation variants, and D-12–D-14 decisions.

### Track D — Exercise failure and recovery

Run the AC scenarios in document 05 with synthetic records: expired link plus draft; uncertain submission; two attempts; partial clinical review; unsupported score comparison; verified/no-source correction; tablet reset; purpose-specific refusal; episode closure with pending requests.

Record what users think happened, the action they choose, and whether the outcome is correct. Escalate privacy exposure, wrong-person/episode actions, silent data loss/duplication, and false completion as release-blocking findings until fixed and retested; agree the final severity framework with product/clinical/security owners.

## 5. Design and delivery sequence

| Stage                             | Design work and artefacts                                                                                                             | Exit condition                                                                                                     |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| 1. Align foundation               | Source/decision register; domain model; working personas; core journey; capability/purpose matrix; content inventory.                 | Accountable owners named; initial scope explicit; assumptions labelled.                                            |
| 2. Structure the experience       | IA, screen inventory, main task flows, state model, core and conditional assignment rules.                                            | Clinical/operational review resolves major model conflicts; candidate labels ready for findability testing.        |
| 3. Prototype the clinical loop    | Intake, episode context, assignment setup, staff entry, review, disposition, incomplete exits, basic queues.                          | Staff can explain the next action and distinguish response submission from clinical progress.                      |
| 4. Prototype participant channels | Mobile SMS, tablet handover/reset, supporter contributions, policy-approved authority path, draft/expiry/retry.                       | Participants understand purpose/visibility and recovery; no simulated cross-role exposure.                         |
| 5. Prototype ongoing operations   | Repeat collection, reminders, history, correction, resolution, handover/closure; conditional features if in scope.                    | Applicable AC scenarios covered with visible owners and edge states.                                               |
| 6. Specify and implement          | Approved content/rules; component/state annotations; server-side permission/persistence requirements; test fixtures and traceability. | All affected production decisions resolved or workflows explicitly excluded; implementation verification underway. |
| 7. Validate release and learn     | Implemented end-to-end tests, access/security checks, accessibility review, clinical/content sign-off, operational support readiness. | Relevant rules and integrations verified in the implemented environment, not inferred from a prototype.            |

Neutral wireframes can proceed before branding. Final UI sign-off needs the agreed Orygen/YSCC assets and language/content decisions. Basic configuration and versioning belong in foundation, not a later “admin polish” phase.

## 6. Content and interaction strategy

- Use stable staff nouns for objects and specific action verbs: “Submit response,” “Record review,” “Record disposition,” “Request correction,” and “Close episode.” Do not use one generic “Complete” button for different events.
- Explain why a module appears, who supplies answers, who enters them, and who may see them. Participant wording uses clinically approved plain-language terms rather than raw data-code labels.
- Validate item errors in context and again on submission; keep entered values visible. Approved skip/prefer-not-to-answer choices are not treated as system errors.
- Show success only when the relevant operation is confirmed. “Saved as a draft” and “Submitted” must remain visually and verbally distinct.
- Every blocked/error/unavailable state needs a safe next action. Explain authority or permission requirements only to the extent allowed without disclosing protected facts.
- For the staff **Report** tab, lead with a questionnaire-based Progress dashboard: preserve the summary, then show a sample care-context block where recorded events or structured milestones exist, followed by a separate questionnaire/version selector above question-level charts labelled by respondent/version/date range. The selector scopes dated answer-level evidence in the full content column. The local prototype also displays a normalised average of valid Likert positions for one selected version; it must be described as non-clinical and never used to imply a threshold, direction, improvement or deterioration. Hide Submitted response history, **Clinical notes**, the clinician-authored narrative, editing controls and visible report change log. See the [prototype implementation status](prototype-report-and-responsive-status-2026-09-18.md).
- In participant consent requests, show one pinned purpose/version/scope with explicit Accept and Decline actions and an approved support route. Keep sent, accepted, declined and withdrawn distinct; never imply that one purpose decides another.
- Use progressive disclosure for conditional modules and detailed audit. Do not hide the active episode, outstanding work, or core permission context.
- Use motion only to clarify state; support reduced motion. Avoid decorative progress animations or time estimates unsupported by actual operations.
- Do not copy instrument items, change scoring wording, or create translations directly from the codebook without approved content and rights.

## 7. Accessibility and inclusion

FR-41 sets WCAG 2.2 AA as the proposed target; it is not a claim that the product already conforms. Design and test keyboard access, logical focus, semantic headings/forms, screen-reader feedback, contrast, non-colour state cues, zoom/reflow, touch usability, and accessible validation.

Use clinically reviewed plain language and approved translations. Test meaningful timeout warnings and permitted extension/recovery options, while meeting shared-device session policy. Do not assume no assistance is required or that assistance always invalidates self-report; instrument-specific rules decide.

Include people using assistive technology and people completing with approved support. Document limitations and remediation before release; an automated accessibility scan alone does not establish usable or conformant workflows.

## 8. Measurement framework

No baselines or numerical targets have been established. Definitions below are proposals to agree with clinical/operations/data owners. Use a defined cohort and observation period, report missingness and small samples, and stratify only where appropriate for privacy and interpretation.

| ID / measure                              | Proposed definition                                                                                                                                                                                                   | Interpretation and guardrail                                                                                                                                                                             |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| M-01 — Required baseline fulfilment       | Required baseline assignments fulfilled by cohort cutoff ÷ required baseline assignments due by that cutoff.                                                                                                          | Report cancellations, declines, pauses, missing dates, and not-yet-due work separately. Do not silently remove difficult cases. Decide authorised exclusions in advance. Stratify by instrument/channel. |
| M-02 — Time to complete core assessment   | Median elapsed time from defined intake event to approved core-completion event among completed instances; also report open/incomplete counts and time open.                                                          | Freeze event definitions and observation window. Completed-only median must not hide unfinished assessments. Paused time treatment must be explicit.                                                     |
| M-03 — On-time follow-up                  | Eligible due assignments with accepted submission within approved window ÷ eligible assignments whose due window ended in the observation period.                                                                     | Report cancellation/withdrawal/missed-review categories separately. Split by instrument/cadence; due date is not submission date.                                                                        |
| M-04 — Staff entry effort                 | Median observed active staff entry time per comparable task/assignment, against a measured current-process baseline.                                                                                                  | Distinguish clinician rating from transcription and facilitation; do not claim savings from unmatched task mixes.                                                                                        |
| M-05 — Correction traceability            | Committed corrections containing all applicable prior/new/actor/time/reason/source fields ÷ committed corrections reviewed in the period.                                                                             | Missing required audit is a defect, not a normal optimisation tradeoff. Source applicability follows correction policy.                                                                                  |
| M-06 — Self-report progression and expiry | For each presented item, proportion with no recorded onward progress/submission by a defined cutoff; separately, invitations expiring before submission ÷ eligible issued invitations with a completed expiry window. | Track presentation/version/attempt and distinguish return later, permitted skip, stop, and technical failure. Do not infer why someone stopped from telemetry alone.                                     |
| M-07 — Comprehension and findability      | Correct teach-back responses and unassisted task success ÷ evaluated tasks; report first-click path and time-to-find from observed tests.                                                                             | Record critical misunderstandings and assistance. A small qualitative sample is not a population prevalence estimate.                                                                                    |
| M-08 — Recovery correctness               | Tested failures recovered without false success, unintended loss, duplicate fulfilment, or access leakage ÷ applicable recovery scenarios executed.                                                                   | Report each failure type; privacy and integrity failures cannot be averaged away by successful easy tasks.                                                                                               |

Recommended reporting cadence and accountable metric owners are still to be set. Set improvement targets after baseline collection and stakeholder agreement, not from generic benchmarks.

### Measurement data contract

Candidate operational events: intake received/saved/state changed/decision recorded; referral prepared/transmission outcome/receipt confirmed/receiving decision/handover resolved; assignment created/activated/paused/cancelled; delivery dispatched/failed; link opened where actually observed; draft saved; submission accepted/rejected/unknown then resolved; review recorded; correction committed; episode closure reconciled. Each needs a defined event meaning, allowed actor/context, timestamp semantics, and retention/access policy.

Do not put clinical answer text, raw phone numbers, identifiable search queries, or invitation tokens into general product analytics. Operational audit and product analytics have different purposes and access rules. Prefer permitted pseudonymous identifiers/aggregates and record provenance. Event instrumentation itself requires privacy review; these are proposed definitions, not existing telemetry.

## 9. Quality and approval gates

| Gate                     | Required evidence                                                                                                        | Not sufficient                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| Model validity           | Clinical/operational decisions linked to source and affected rules.                                                      | A visually coherent journey with unresolved clinical logic.          |
| User understanding       | Observed task success, teach-back, and documented accessibility/support needs.                                           | Preference feedback or completion rate alone.                        |
| Interaction completeness | Applicable F flows, all core/conditional AC scenarios, and error/empty/loading/blocked states.                           | A happy-path clickable prototype.                                    |
| Privacy/integrity        | Implemented role/scope/action checks, provenance, retry/concurrency, tablet reset, and audit tests.                      | Hidden navigation or simulated permissions.                          |
| Production readiness     | Approved policy/content, configured rules, operational support, implemented end-to-end verification, and scope sign-off. | Sample policies, untested SMS delivery, or a document saying “must.” |

## 10. Working rhythm and ownership

### Additional source-led research track

Validate the full Jess/Engagement Team/specialist workflow; Rachel's operational-versus-clinical split; Tom's registration grants; and Ananya/Sam's person-versus-aggregate access. Interview Priya, David, Maya, and Helen's actual role holders to establish data products, approval responsibilities, and whether a governed output is sufficient without a new interface. D-23/D-24 require actual reporting/research contracts before detailed exchange design.

Resolve the CP1/S1 self-report phase conflict before the release plan is signed off. Validate Kai's progress comprehension and Deb's appropriate visibility separately from task submission. Verify the draft's approximately 40% missing-data and 12-month-plus delay claims before using either in measurement. For broader reporting, define quality, timeliness, interpretability, and returned improvement actions after scope approval; the baseline M metrics do not measure the whole learning system.

Maintain one decision log in product framing and one canonical FR/rule catalogue. Review changes with the affected clinical, operational, data, security/privacy, and design owners. Update the relevant persona hypothesis, journey phase, flow, screen, and acceptance test together.

For each research round, record method, participant contexts, synthetic scenario, observed behaviour, severity, proposed change, and retest result. For each implementation handoff, attach approved content/rules and explicitly list any excluded conditional feature. The next useful design output is a validated low-fidelity clinician/participant prototype, not a claim that this strategy is already validated.
