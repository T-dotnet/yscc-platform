# YSCC Platform — Product framing

Version 0.5 · 16 September 2026 · Aligned to the current interactive prototype

[Document index](README.md) · Owns scope, source register, and open decisions

## 1. Product statement

YSCC is a proposed longitudinal youth assessment and outcomes platform. It connects assessment planning, appropriate person/family contributions, clinician review, follow-up collection, and traceable data correction within an identifiable care episode.

The central product promise is continuity: the right person can understand what information is needed, provide it through an eligible channel, and see an appropriate next step; authorised staff can understand the record and continue the work without confusing delivery activity with clinical progress.

The supplied CMDCS persona draft adds a broader product ambition: connect **Care Delivery → Service Improvement → System Evidence → learning returned to services**. The collection/assessment baseline is one part of that ambition. Expanded care recording, dashboards, commissioning, national data exchange, and research access are now documented as candidate capabilities, not silently included in the MVP.

The platform supports clinical work. It does not independently diagnose, decide admission, establish guardian authority, or invent treatment pathways. Confirm whether CMDCS names the platform, a component, or a programme relationship to YSCC under D-20.

**Confirmed entry rule (U1/D-25): Every new patient must go through intake.** Registration creates a person/intake record; it does not start the core assessment or establish admission. A recorded completed/proceed intake and receiving assessment owner are required to progress. Intake waiting and onward-referral follow-up remain owned work. The field/state/ownership specification is in [requirements section 7](05-requirements-and-logic.md#7-intake-and-onward-referral-contract).

## 2. Problem and opportunity

The sources describe a need for multi-channel collection, separate longitudinal responses, scoped access, and accountable corrections. The following operational problems are **hypotheses to validate**, not measured findings:

| Problem hypothesis | Consequence to investigate | Product response to test |
| --- | --- | --- |
| Collection work is fragmented across people, channels, and time points. | Staff may duplicate entry or be unsure which response belongs to which review. | Shared episode context and distinct assignments, attempts, and responses. |
| People and supporters may not understand why a measure is requested or who sees it. | Participation may be delayed, unsafe in context, or less informed. | Purpose/visibility explanation and suitable channel/assistance choices before collection. |
| “Complete” may refer to several different events. | Teams may mistake a sent link or submitted response for a clinically complete assessment. | Independent delivery, response, assessment, and review states. |
| Changes to records or instrument versions may obscure interpretation. | Staff may compare unlike scores or lose confidence in history. | Pinned versions, provenance, explicit comparison limits, and correction history. |
| Follow-up ownership may become unclear at transfer, pause, or closure. | Requests can be missed or continue after they should stop. | Named owner, next action, and explicit reconciliation of pending work. |

Do not claim quantified efficiency gains, current-process failure rates, or improved clinical outcomes before baseline research and evaluation.

## 3. Who the product serves

Primary beneficiaries are people contributing to their care and the Assessment Team managing assessment and review. Family/supporter respondents contribute in their own role; an authorised guardian may additionally have a distinct decision-making role. Operational users include facilitators, Data Officers, Orygen Data Managers, service leads, and system administrators.

The [persona document](03-personas.md) now adopts all 11 named profiles from the supplied CMDCS draft: Jess, Kai, Deb, Rachel, Tom, Ananya, Sam, Priya, David, Maya, and Helen. It retains guardian, facilitator, and configuration-administrator responsibilities as supporting capabilities, not replacement personas. The draft adds commissioning, policy, implementation, national integration, and research stakeholders. These remain hypotheses, not approved RBAC roles, verified governance assignments, or demographic evidence. Procurement requirements, commercial model, and rollout scale are not established.

## 4. Outcomes and boundaries

| Intended outcome | Observable product behaviour | Boundary |
| --- | --- | --- |
| Manage one coherent care history. | Person → episode → assessment/collection history is identifiable; changes and gaps are visible. | A review does not create a new episode; import gaps cannot be reconstructed. |
| Reduce avoidable collection effort. | Author an instrument version once and reuse it across its approved modes. | Reuse does not permit self-report for a clinician-only instrument. |
| Enable informed participation. | Explain purpose, role, visibility, support, and next step in context. | Do not promise private devices, independent completion, or automatic guardian access. |
| Support appropriate review and routing. | Clinicians see relevant evidence, incomplete work, and a distinct disposition decision. | Referral source does not automatically select a different core; core model is provisional. |
| Preserve trustworthy records. | Submitted values and corrections are traceable under approved retention rules. | Retention, withdrawal, and disposal need policy; correction is not deletion. |
| Make ongoing work accountable. | Relevant queues show owner, due window, blocker, and next action. | Not every role gets a queue or unrestricted clinical detail. |

Primary evaluation measures are specified in [UX strategy](06-ux-strategy.md). There are no approved numerical targets yet.

## 5. Product scope

### Current prototype boundary

The local prototype now demonstrates the proposed care-collection foundation with fictional people and a fixed sample date: new-person registration and mandatory intake; intake decisions and referral follow-through; a care-period workspace and worklist; version-pinned sample questionnaires; SMS/tablet/clinician-entry collection; purpose-specific consent requests with accept/decline/withdraw history; submitted-response review, correction and audit; channel-dependent review handling; follow-up planning; pause/close actions; and a Progress dashboard with clinician report versions, annotations and source evidence. The prototype is useful evidence of the interaction model, not a production implementation or approval of clinical policy.

It deliberately remains browser-local. Its local storage, sample staff roles, sample permission/contact/review rules, referral and consent-request event recording and questionnaire content do not establish real identity or decision-making authority, server-side access enforcement, external sending, clinical scoring, official content, data retention, interoperability or multi-user safety. The proposed baseline below remains the target for approved delivery.

### Proposed MVP baseline

| Capability | Requirement IDs | Qualification |
| --- | --- | --- |
| Person and episode workspace; intake, assessment plan, and clinical review | FR-01–FR-05, FR-09, FR-13, FR-36–FR-38 | Mandatory new-patient intake confirmed (D-25); include registration, owned waiting/triage, onward-referral tracking and incomplete exits. Clinical criteria and local ownership remain D-26/D-27. |
| Distinct baseline and repeated collections with interpretable history | FR-06–FR-14 | Cadence, scoring, dates, and comparison rules must be approved. Monthly is conditional on instrument/cadence approval. |
| Clinician, SMS, and tablet collection, including eligible family participation | FR-16–FR-21 | Eligibility, recipient verification, shared-device suitability, and assistance are action-specific. |
| Purpose-specific consent requests, authority, privacy, and support | FR-22–FR-29 | Consent is selected from an approved library, sent as a distinct request, and retains its accept, decline, withdrawal and delivery history. Production rules and responsible owners must be settled before enabling the activity. |
| Corrections, audit, data resolution, work queues, and handover | FR-30–FR-38, FR-46 | Scopes and correction/resolution authority require approval. |
| Accessible, reliable collection and communication | FR-40–FR-45 | Language, content, save/resume, and notification rules need sign-off. |

All non-conditional FRs are included in the proposed baseline; the table groups overlapping capabilities rather than creating additional requirements.

### Explicit scope decisions

| Item | Current status | Required decision |
| --- | --- | --- |
| Person and family satisfaction surveys | Conditional: FR-15 | Included / later / excluded; define instrument, respondent, cadence, visibility, and non-sending reasons. |
| Direct/indirect service logging | Conditional: FR-39 | Included / later / excluded; define event fields, cardinality, reporting, and ownership. |
| Detailed discharge questionnaire/code set | Unresolved | Adopt, adapt, or exclude. Basic episode closure remains in the proposed baseline. |
| Historical migration and export compatibility | Unresolved | Name actual datasets, formats, mapping owners, historical gaps, and acceptance contract. |
| Automated clinical escalation | Outside baseline unless separately approved | Define clinical governance, response ownership, operational coverage, and validation before activation. |
| Advanced analytics and richer administration | Previously proposed later; persona-driven phase now requires confirmation | The CMDCS draft emphasises centre dashboards and wider reporting. Resolve phase explicitly; basic rules/versioning remain baseline. |

New persona-derived candidate capabilities are captured as CR-01–CR-08 in [requirements and logic](05-requirements-and-logic.md): ongoing care recording, participant progress views, centre performance/fidelity, governed reporting, implementation learning, commissioning/oversight, national data exchange, and approved research access. These need explicit scope, ownership, and access decisions before build. They are distinct from the 46 baseline FRs.

Still not established: appointment booking, billing, telehealth, an unrestricted participant portal, a messaging inbox, a full EMR replacement, or autonomous clinical decisions. A proposed integration/reporting stakeholder does not establish a delivery contract.

## 6. Evidence register

This document set expands the [revised baseline](../UX-Strategy-and-Requirements.md) using previously captured sources. It is not a fresh retrieval of the full Slack discussion. [Evidence labels](README.md) apply throughout.

| ID | Source location | Supported information and limits |
| --- | --- | --- |
| U1 | Product-owner clarification in this task, 15 September 2026: “new patients need to go throught the intaken” | Every new patient must go through intake. Confirms the mandatory entry step; exact clinical fields/criteria, staffing and external handover agreements still need confirmation. |
| S1 | [Oli in #ux, 14 September 2026](https://project-yonder.slack.com/archives/C0C1F1FH1DK/p1789359608362949) | Reported launch collection modes/family participation, response history, corrections, and centre/cluster/system scopes. Monthly collection is described as possible, not fixed. |
| S2 | Previously captured #ux excerpt, 14 September 2026; full thread/permalink unavailable | Provisional shared eligibility/needs core, conditional modules, referral/triage relationship, admission/routing, purpose-specific consent, and forthcoming branding. Validate with Caroline/Assessment Team. |
| CP1 | [CMDCS Persona Draft v2.pdf](</Users/danielenicoletti/Downloads/CMDCS Persona Draft v2.pdf>), pp. 1–16; supplied by the user | Eleven named draft personas in three groups. Persona jobs, relationships, illustrative attributes, and broader platform ambitions; explicitly hypotheses for validation, not policy or scope sign-off. |
| CB1 | `Data extract supplementary info!B7:B15` | Stable extract IDs, research-consent filter, comma-delimited data caveats, nonresponse and invalid-data codes. |
| CB2 | `Data extract supplementary info!B17:B20` | Historical instrument substitution and MDS item/version changes. |
| CB3 | `Data extract supplementary info!B24:B33` | Current snapshots, episode-level referrals, stream transitions, and date derivations. |
| CB4 | `Data extract supplementary info!B36:B58` | Assessment/review/discharge/feedback/service record grain; date meanings; registered versus service centre. |
| CB5 | `Batch 2_Assessment!E126` and `E129` | Clinician/joint/person completion modes and reference incomplete-assessment outcomes. |
| CB6 | `Batch 3_90 Day Review!C106:F106`; `Batch 5_Client Satisfaction!A6`; `Batch 6_Family Satisfaction!A6` and `E16` | Separate satisfaction experiences, allowed skipping, reasons for not sending, and family relationships. |
| CB7 | `DataDisposal2025!A2` | Historical disposal limits; not authority to adopt that disposal policy in YSCC. |

CB references point to [headspace_EP_data_extract_codebook-2025.xlsx](/Users/danielenicoletti/Desktop/headspace_EP_data_extract_codebook-2025.xlsx), a historical extract/codebook through 30 June 2025 reflecting MDS 3.3.1, not the complete current YSCC specification or a licensed instrument library.

Source cautions:

- CP1 p. 5 places direct self-report in Stage 2 and a person dashboard in MVP; p. 6 also references Stage 2 family use. This conflicts with S1's reported MVP direct person/family collection. Retain S1 as the current reported collection baseline while making the phase conflict explicit under D-21; do not assume which source is newer or approved.
- CP1 p. 4's approximately 40% missing-data claim under hAPI and p. 16's 12-month-plus research delay are unverified draft assertions, not measured baselines. Persona ages, traits, influence ratings, and quotations are illustrative hypotheses, not interview evidence.
- CP1's DHDA stewardship, AIHW integration, PMHC-MDS/CQR reporting, National Research Office access, and future trial ambitions require governance and delivery confirmation. They do not grant individual-record access or establish current legal obligations.
- `Batch 4_Discharge!A3` and `Batch 5_Client Satisfaction!A2:A5` retain 2023 cutoff wording; reconcile with the 2025 supplementary information before import/export contracts.
- CB1's monitoring/evaluation/research consent filter does not define care, contact, family, or guardian permission.
- Code 998 denotes invalid/out-of-standard data, not “not applicable.” See L-05 in [requirements and logic](05-requirements-and-logic.md).
- Some historic profile answers were overwritten or records disposed of. Missing history is not evidence of no previous care.
- Historic ORS values in MyLifeTracker fields and instrument-version changes constrain comparability [CB2].

## 7. Decision register

D-25 below is **confirmed** by the product owner. Decisions in the open table remain **open**; none asks whether new patients can skip intake. Owners in that table are required roles, not confirmed individual assignments. Product must nominate an accountable person and record the decision, date, rationale, source, and affected artefacts. Do not infer approval from an owner being named here.

### Confirmed decision

| ID | Decision | Source / date | Remaining detail |
| --- | --- | --- | --- |
| D-25 | Every new patient must go through intake before the core assessment or ongoing-care pathway. Registration alone is insufficient. | U1, product owner, 15 September 2026. | Clinical intake content, authorised reviewer, detailed state/field rules and external handover agreements are D-26/D-27; the mandatory step is settled. |

### Open decisions

| ID | Decision needed | Owner needed | Main dependencies |
| --- | --- | --- | --- |
| D-01 | Validate the common core/conditional journey and reconcile the complete #ux discussion. | Caroline + Assessment Team | FR-02–FR-04; journey and flows. |
| D-02 | Approve core/modules, rule triggers, items, scoring, requiredness, and permitted nonresponse. | Clinical/content owners | FR-02–FR-05, FR-11–FR-13. |
| D-03 | Approve respondent, independent/assisted/joint completion, and channel eligibility per instrument. | Clinical measurement/content owners | FR-16–FR-21. |
| D-04 | Define the consent-request library, purposes, decision-making authority and approved person/guardian pathways. Confirm which purposes can be sent digitally, their content/version, expiry/reminder rules and the effect of accept, decline and withdrawal. | Legal/PIA + clinical leadership | FR-22–FR-25. |
| D-05 | Define answer visibility and permitted sharing for every participant/context. | Clinical + privacy/data governance | FR-27–FR-29. |
| D-06 | Define withdrawal consequences and retention/disposal of responses, drafts, audit, and imports. | Legal + data governance | FR-07, FR-24, FR-32, FR-46. |
| D-07 | Approve contact suitability, recipient verification, SMS copy, expiry, and reminder/opt-out rules. | Clinical operations + security/legal | FR-18–FR-19, FR-40. |
| D-08 | Set review instruments, cadence, anchor, due windows, late/missed handling, and any monthly collection. | Clinical operations | FR-06, FR-10, FR-19. |
| D-09 | Define new/reopened/transferred episode boundaries and dated ownership. | Clinical operations + data lead | FR-01, FR-14, FR-38. |
| D-10 | Approve assessment completion/review criteria, including which instrument/channel/assistance combinations require a separate clinical review and how “not required” is recorded; approve disposition, incomplete-exit codes, and referral actions. | Assessment Team + clinical operations | FR-08, FR-36–FR-38. |
| D-11 | Define pending-work treatment on pause, withdrawal, referral, and closure. | Clinical operations + data governance | FR-18–FR-19, FR-24, FR-38, FR-44. |
| D-12 | Approve role capabilities and centre/cluster/system access, including cross-centre care. | Operations + security/data governance | FR-14, FR-28–FR-29, FR-35, FR-46. |
| D-13 | Name verified correction sources, correction authority, and re-review/rescoring procedure. | Data governance + clinical/technical leads | FR-13, FR-30, FR-32–FR-33. |
| D-14 | Define centre support, duplicate-resolution approvals, and recoverable resolution procedure. | Orygen data governance + centre leads | FR-31, FR-34. |
| D-15 | Decide satisfaction, service logging, detailed discharge, and migration/export scope separately. | Product + clinical/data leads | FR-15, FR-39; conditional flows and IA. |
| D-16 | Approve source mappings, conflicting dates, unknown versions, and valid score comparisons. | Data owner + clinical measurement lead | FR-07, FR-09–FR-14. |
| D-17 | Confirm launch languages, accessibility/content approach, and Orygen/YSCC visual assets. | Design/brand + clinical/content owners | FR-41–FR-43. |
| D-18 | Define draft storage, session timeout, safe resume, and mode-switch/concurrent-attempt behaviour. | Product/security + clinical operations | FR-18, FR-20, FR-44–FR-45. |
| D-19 | Approve participant support route, staffing expectations, and any separately scoped escalation. | Clinical governance + operations | FR-26, FR-40. |
| D-20 | Confirm the CMDCS/YSCC naming and product/component relationship and adopt the three-group persona model. | Product + programme leadership | CP1; framing, personas, IA. |
| D-21 | Reconcile MVP versus Stage 2 self-report/family participation and decide participant-dashboard scope/access. | Product + Caroline/clinical leadership | S1 versus CP1 pp. 5–6; FR-16–FR-21; CR-02. |
| D-22 | Scope wider treating-clinician, Engagement Team, specialist, centre-lead, and implementation workflows. | Clinical/operations + product | CP1 pp. 4, 8–11; CR-01, CR-03–CR-05. |
| D-23 | Confirm stewardship, reporting recipients, metric definitions, person/aggregate access, linkage, and disclosure controls. | Programme governance + data/security leads | CP1 pp. 10–15; CR-04–CR-07. |
| D-24 | Define approved research requests, consent/ethics/authority, National Research Office workflow, and future trial boundaries. | Research/data governance + clinical/product leads | CP1 p. 16; CR-08. |
| D-26 | Finalise intake fields/matching, approved triage criteria, waiting reasons/review dates, responsible intake/Engagement Team and assessment handoff; align pre-episode intake linkage with D-09. | Clinical operations + Assessment Team + data/product leads | D-25 confirmed; FR-01, FR-09, FR-35–FR-38; L-27/L-28, F-01, ST-27, AC-23–AC-25/AC-28–AC-29. |
| D-27 | Confirm onward-referral destinations, sharing channels/system of record, receipt/decision evidence, follow-up windows, external responsibilities and handover/alternative-resolution conditions. | Clinical operations + privacy/data governance + receiving-service owners | FR-09–FR-10, FR-22–FR-24, FR-35–FR-38; L-29, F-17, ST-28, AC-26–AC-27. |
| D-28 | Validate the Report tab’s purpose, audience, evidence hierarchy, questionnaire/version selector, comparison rules, event markers and whether interpretation or annotation belongs there. | Clinical leadership + Assessment Team + product/UX + data governance | ST-13/ST-29; report requirements section 9; current Report implementation is a provisional prototype direction. |
| D-29 | Validate the Events tab’s purpose, event taxonomy, required fields, authorisation, relationship to the care plan and History, and which events may be shown as context in Report charts. | Clinical operations + Assessment Team + privacy/data governance + product/UX | CR-01/FR-39; provisional ST-31; current Events implementation is a provisional prototype direction. |

## 8. Readiness and next decision

This framing is ready for structured review and neutral wireframes. It is not ready to authorise production collection. First validate D-01, reconcile the CP1/S1 phase conflict in D-21, and appoint clinical, permission, and operational decision owners. Decide D-28 and D-29 with the same care as the underlying assessment and consent rules: the current Report and Events tabs are interaction hypotheses, not stakeholder-approved workflows. Decide the four D-15 scope items and the CR-01–CR-08 broader-platform phases explicitly. Sample rules can support prototype testing, but unresolved rules must be approved or their affected production workflow explicitly excluded before launch.

Changes to these decisions must be traced into [requirements and logic](05-requirements-and-logic.md), then into the journey, flows, IA, and test scenarios. See [UX strategy](06-ux-strategy.md) for the delivery and research sequence.
