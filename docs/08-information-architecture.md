# YSCC Platform — Full information architecture

Version 0.6 · 18 September 2026 · Architecture aligned to the current local prototype

[Document index](README.md) · [User flows](07-user-flows.md) · [Requirements and logic](05-requirements-and-logic.md)

## 1. Purpose and architecture boundaries

This IA covers organisation, labels, navigation, search, and the underlying content relationships. It is a proposed logical architecture, not an approved database schema, deployed route map, or access-control configuration.

CP1's three persona groups—Care Delivery, Service Improvement, System Evidence—explain who creates/uses data. They are **not automatically three navigation menus**. Daily care work, scoped operational work, and governed external evidence need different surfaces and access boundaries.

Baseline staff navigation is **My work, People, Data quality, Administration**, with Help & guidance as a utility destination. Participants use narrowly scoped collection and consent-decision surfaces. Services/Feedback are conditional on D-15. The staff longitudinal Report is current local prototype evidence; a participant-facing personal progress view, wider care, service learning, reporting/exchange, and research remain candidate extensions CR-01–CR-08 with phase/governance decisions still open. A governed external output can satisfy a stakeholder need without a new portal.

**Current prototype navigation:** The local prototype realises the core staff navigation above, then person-level tabs **Overview**, **Assessment**, **Report**, **Consent & respondents**, and **History**. Assessment is hidden until the intake/proceed gate is met. **Intake** and **Referrals** are contextual workflows opened from My work or the person record, not peer tabs. A care-period selector appears where a person has more than one episode; current and historical records stay distinct. Questionnaire completion, consent decisions and questionnaire preview are intentionally focused participant/practice experiences rather than a reduced staff workspace. These are local prototype surfaces, not a production sitemap or access contract: the app uses fictional records and browser-local state, while real route authorisation, participant authentication/authority, token protection, delivery, persistent back-end data, broader centre/reporting workspaces and candidate research/exchange areas remain outside the demonstrated implementation.

## 2. Domain and content relationships

```text
Person
├── Person-level identity/contact facts (authorised scope; actual history/source)
├── Intake records [mandatory entry for each new patient; episode link when established]
│   └── Registration/source, checks, triage outcome, waiting state, owner and history
├── Onward referrals [linked to intake/episode context; independent follow-up]
│   └── Preparation, attempts, receipt, decision, external evidence and resolution owner
├── Respondent relationships and separately established authority
├── Consent requests [person and episode scope where applicable]
│   └── Approved library item/version, delivery attempts, decision/withdrawal history and current status
└── Care episodes [one person can have many]
    ├── Episode identity, dates, referral context, status and ownership
    ├── Dated stream/team allocations
    ├── Assessment instances and clinical review records
    │   └── Core/conditional plan and linked assignments
    ├── Collection points [baseline and repeated occurrences]
    │   └── Measure assignments [pinned instrument version and respondent context]
    │       ├── Delivery attempts and access sessions
    │       ├── Draft/abandoned response attempts
    │       └── Accepted submitted response [at most one fulfilment per assignment]
    ├── Disposition, referral actions, handover and closure
    ├── Service events [conditional FR-39]
    └── Separate feedback assignments/responses [conditional FR-15]

Instrument library → approved version → items/options/scoring/eligibility
                                       ↘ pinned by each assignment

Record corrections → prior/new value, editor, reason, source, time
Security/configuration audit → actor, scope, action, effective version/event
Data-quality/resolution cases → referenced records, evidence, owner, approvals
```

Assignments connect their episode, relevant assessment context, and collection point; the tree is an explanation, not a requirement to duplicate records under two parents. Detailed cardinalities and review-instance boundaries must be finalised with the data/clinical owners. Multiple attempts do not mean multiple accepted fulfilments. A repeated clinical collection requires a distinct assignment/time point, not a resend of the same request.

Purpose decisions and respondent relationships are not automatically restricted to one episode; store their actual approved scope. Correction/audit references can apply to different record types. A family respondent is a separate actor linked to the person, not a second identity for the person.

## 3. Staff sitemap — proposed baseline

```text
Staff access and utility
├── Sign in / session recovery / access unavailable                 ST-00
├── Current organisation/scope context (within granted scopes)
├── Help and support                                               ST-26
└── Account/session controls (not clinical content configuration)

My work                                                           ST-01
├── Intake: received / awaiting information / triage / waiting        ST-27
├── Referral follow-up: unresolved receipt / decision / handover     ST-28
├── My assigned work
├── Permitted team work / unassigned work
└── Filters: task type, owner, episode context, due state, blocker

People                                                            ST-02
├── Scoped search / matching / authorised registration
└── Person                                                        ST-03
    ├── Identity and suitable contact context
    ├── Intake and outcome [New person opens required intake]          ST-27
    ├── Onward referrals / external handover history                   ST-28
    ├── Care episode list / explicit episode selector
    └── Selected care episode [persistent context, not repeated clicks]
        ├── Overview                                              ST-04
        │   ├── Timeline, ownership and next action
        │   └── Disposition / handover / pause / closure actions    ST-12
        ├── Assessment                                            ST-05 / ST-09
        │   ├── Core and conditional plan
        │   ├── Collection list, status and details               ST-09
        │   ├── Assignment setup                                  ST-06
        │   ├── Clinician entry                                   ST-07
        │   ├── Collection/delivery setup                          ST-08
        │   └── Clinical review when required                     ST-10
        ├── Events                                                ST-31 (provisional)
        │   ├── Episode-scoped care-event timeline
        │   └── Record medication, care/service, life or other event
        ├── Report                                                ST-29
        │   ├── Progress dashboard and care coordination context
        │   ├── Questionnaire/version evidence
        │   └── Questionnaire comparison and details              ST-13
        ├── Consent & respondents                                 ST-11
        │   ├── Consent request list: select, send, current status and history
        │   ├── Relationships / authority / participation context
        │   └── Approved contact/visibility status
        ├── History & change log (including annotations)           ST-30
        │   └── Care-period activity and change log
        ├── Services [only if adopted]                             ST-24
        └── Feedback [only if adopted]                             ST-25

Data quality
├── Correction requests / incomplete-data issues                   ST-14
├── Duplicate and misalignment cases                               ST-15
├── Correction editor / request action                             ST-16
└── Authorised record audit                                        ST-17

Administration                                                    ST-18
├── Organisations, roles and scopes                                ST-19
├── Instrument library and versions                                ST-20
├── Workflow rules and review schedules                            ST-21
├── Purpose/authority/visibility policy configuration               ST-22
└── Message templates and delivery configuration                    ST-23
```

ST-06/ST-07/ST-08/ST-16/ST-17 are contextual work surfaces, not extra top-level navigation items. The same assignment or audit record can be reached from a queue or the person workspace without creating a duplicate information home.

ST-27 and ST-28 are contextual views available from My work and the person record, including before an episode has been established. They are not extra global navigation items. The first core assessment is gated by completed/proceed intake under L-27. A supporter contribution or questionnaire link never completes intake by itself.

## 4. Participant sitemap — scoped collection

```text
SMS scoped link or authorised tablet session
└── Entry / access and recipient checks                            PT-01
    ├── Unavailable / expired / already submitted / wrong recipient PT-06
    │   └── Appropriate support/recovery                           PT-07
    └── Request introduction                                      PT-02
        ├── Consent decision: accept or decline [only if approved]  PT-08
        └── Questions                                             PT-03
            ├── Help / supported stop                             PT-07
            ├── Review before submission [where instrument allows] PT-04
            └── Confirmed submission                              PT-05
                └── Tablet neutral end/reset                      PT-09
```

No staff sidebar, person search, audit trail, or other respondent's answers are part of this IA. SMS remains account-free in the reported collection baseline, with approved recipient verification. The candidate personal progress surface EX-02 is a different access problem; do not stretch an invitation token into an unrestricted portal credential.

PT-08 is a proposed policy-dependent surface, not an assumption that every consent/guardian process occurs online. Use the approved staff-recorded pathway if appropriate. PT-04 may be replaced by a final-submit step where instrument rules do not permit answer review or revision.

## 5. Screen inventory and information priority

### Baseline staff views

| ID / label                                   | Primary information and actions                                                                                                                                                                                                                                                                          | Entry / return                                                                                                                                | Access boundary                                                                                                                                                                                                                                   |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ST-00 — Sign in and access recovery          | Staff authentication/session state, safe error, help/return to permitted destination.                                                                                                                                                                                                                    | Deep link or staff start; return after authorised session.                                                                                    | Authenticate then authorise; do not reveal protected target details in error.                                                                                                                                                                     |
| ST-01 — My work                              | Task/record context, owner, next action, due window, blocker, independent state dimensions; filter and open task.                                                                                                                                                                                        | Global home; return preserves allowed filters/position.                                                                                       | Only responsibilities and data within role/scope; team view requires grant.                                                                                                                                                                       |
| ST-02 — People                               | Scoped search, discriminating permitted identifiers, result context, matching and authorised create action.                                                                                                                                                                                              | Global nav or queue; results state retained.                                                                                                  | No out-of-scope matches, counts, or sensitive query telemetry.                                                                                                                                                                                    |
| ST-03 — Person                               | Identity/contact context and source; episode list with dates/status/owner; explicit selection/create under rules.                                                                                                                                                                                        | People result; up to search.                                                                                                                  | Person/contact edit separate from clinical view; previous history may be incomplete.                                                                                                                                                              |
| ST-04 — Overview                             | Selected episode header, next action/owner, assessment progress, disposition, outstanding work, dated timeline.                                                                                                                                                                                          | Episode selection, queue, or deep link.                                                                                                       | Scope applies to timeline details and counts, not just buttons.                                                                                                                                                                                   |
| ST-05 — Assessment                           | Core/conditional plan, module reasons, assignments, progress, outstanding evidence; add eligible module; open review.                                                                                                                                                                                    | Episode local nav or assessment queue.                                                                                                        | Clinical task capability; provisional core must be approved before production.                                                                                                                                                                    |
| ST-06 — Assignment setup                     | Instrument/version, respondent, assistance, channel eligibility, purpose checks, collection point, due window, owner.                                                                                                                                                                                    | Assessment; return to initiating collection/list.                                                                                             | Create/configure assignment grants, not instrument-publication authority.                                                                                                                                                                         |
| ST-07 — Clinician entry                      | Pinned items, source/recorder/assistance, validation, unsaved/saved/submitted state, submit.                                                                                                                                                                                                             | Assignment detail; return with actual outcome.                                                                                                | Entry/submit capabilities and eligible instrument mode.                                                                                                                                                                                           |
| ST-08 — Delivery/session setup               | Recipient suitability, verification/expiry, mode, template/version, attempt history; send or launch tablet.                                                                                                                                                                                              | Assignment; return to detail or isolated participant mode.                                                                                    | Send/start capability; no assumption the sender may read all responses.                                                                                                                                                                           |
| ST-09 — Collections within Assessment        | Collection points/assignments; separate assignment/link/response/review-required facts; due filters; attempt and response detail; permitted recovery.                                                                                                                                                    | Assessment or queue; contextual back to the same list.                                                                                        | Answers, attempt metadata, reissue, review and correction actions each authorised.                                                                                                                                                                |
| ST-10 — Clinical review                      | Review requirement/rule, evidence set/revision, submitted answers, recorded review, source/version/corrected status, edit responses and response edit history; when required, record review, add module, proceed to decision.                                                                            | Assessment → Review responses or Review recorded; edit returns here. View details is limited to collection metadata and delivery information. | Authorised staff can open responses; clinical-review approval remains a separate capability. Not required is not reviewed, and neither implies full assessment completion.                                                                        |
| ST-11 — Consent and respondents              | Approved consent library; selected purpose/version; person/episode scope; authority/relationship and visibility/contact constraints; request delivery, current status and full accept/decline/withdrawal history. Staff can select, prepare and send a permitted request or record an authorised change. | Episode nav or action blocker; return to initiating action.                                                                                   | Sensitive authority/evidence details scoped; policy editing lives in ST-22. Sent is not accepted; staff cannot overwrite a participant decision.                                                                                                  |
| ST-12 — Disposition and handover             | Assessment progress, disposition, referral action, owner/team/effective date, next care action; pause/closure impact and reconciliation.                                                                                                                                                                 | Overview/review; return to episode state.                                                                                                     | Distinct capabilities for clinical decisions, ownership changes, and closure.                                                                                                                                                                     |
| ST-13 — Questionnaire comparison and details | Selected care-period questionnaire/version, dated response sequence, source/respondent, actual date meanings, answer-level comparison, review history, gaps and valid-comparison indicators. On narrow screens, the answer matrix becomes labelled records rather than shrinking the question or dated values. | Report ST-29; return to the same selected questionnaire and care period. | Cross-episode access does not widen authorised data scope; charts/answer changes are not clinical scores or direction. |
| ST-31 — Events (provisional)               | Selected episode’s recorded care-event timeline; event type, event date, title/details, recorder/time and type-specific fields; record-event action and validation.                                                                                                                               | Episode Events tab; return to the selected care period.                                                                                         | Current prototype taxonomy and permissions are assumptions. Do not treat an event as a clinical outcome, causal explanation or proof of service delivery without approved policy and evidence. |
| ST-29 — Progress dashboard and report        | Submitted-response, questionnaire-series, charted-Likert and recorded-context metrics; sample care-coordination context; questionnaire/version selector; question-level Likert charts; version-scoped descriptive normalised Likert value; and answer-level comparison where non-Likert questions apply. | Episode Report tab; questionnaire evidence opens ST-13 without losing care-period context. | Staff-only in the current scope. Risk/status categories and goals remain source-limited prototype context; the aggregate is not a clinical score or interpretation. The selector scopes dashboard cards and ST-13; Clinical notes and submitted response history remain outside Report in History/Assessment; no participant/guardian access or unsupported clinical interpretation. |
| ST-30 — History & change log                 | Care-period activity for intake/referral, collection preparation/submission, review requirement/review, corrections, consent decisions, follow-ups, report/annotation and episode changes; actor/time and before/after detail where recorded.                                                            | Episode History tab or Overview timeline; return to selected care period.                                                                     | Older missing metadata stays explicit; person-wide entries are labelled; prototype history is not a tamper-proof production audit.                                                                                                                |
| ST-14 — Correction requests                  | Issue type, record context, evidence availability, owner/status/next action; open/request/assign if permitted.                                                                                                                                                                                           | Data quality or linked task.                                                                                                                  | Operational metadata and record detail limited independently.                                                                                                                                                                                     |
| ST-15 — Record resolution                    | Candidate identities/links, evidence, affected records, centre support, approvals, impact, recoverable action.                                                                                                                                                                                           | Data quality/search issue; return to case.                                                                                                    | Orygen role plus actual scope/support/approval, not unrestricted merge.                                                                                                                                                                           |
| ST-16 — Correct or request                   | Current/prior revision, proposed value, source, required reason, before/after review; save edits or request clinician; conflict feedback.                                                                                                                                                                | Submitted response/review or ST-14; return to record/case.                                                                                    | Clinicians and Data Managers may edit submitted responses within scope, including reviewed responses. Verified-source procedure remains for Data Officer; no silent concurrent overwrite.                                                         |
| ST-17 — Record audit                         | Original answers and correction events, target item/revision, prior/new values, editor identity/role/time/reason/source, original respondent/recorder, related review history.                                                                                                                           | Relevant response, record or case; return to source.                                                                                          | Authorised staff only; every saved edit logged; no participant audit exposure.                                                                                                                                                                    |
| ST-18 — Administration                       | Permitted configuration areas, version/effective status, pending publication/validation.                                                                                                                                                                                                                 | Global nav.                                                                                                                                   | Admin capability is not broad clinical access.                                                                                                                                                                                                    |
| ST-19 — Organisations and access             | Centre/cluster structure, roles/capabilities/scopes, approved memberships and changes.                                                                                                                                                                                                                   | Administration.                                                                                                                               | Separate administer/approve rights; audit access changes.                                                                                                                                                                                         |
| ST-20 — Instruments                          | Approved/draft/retired definitions, pinned versions, items/options/scoring/eligibility, owner and change history.                                                                                                                                                                                        | Administration.                                                                                                                               | Content/configure/approve/publish separated; clinical approval required.                                                                                                                                                                          |
| ST-21 — Rules and schedules                  | Core/conditional rules, reasons, cadence/anchors/windows, dependencies and synthetic preview.                                                                                                                                                                                                            | Administration.                                                                                                                               | No invented clinical rules or universal monthly schedule.                                                                                                                                                                                         |
| ST-22 — Purpose policies                     | Approved purpose/authority/visibility/withdrawal policy versions and effective time; dependency preview.                                                                                                                                                                                                 | Administration.                                                                                                                               | Entering policy is not authority to decide it.                                                                                                                                                                                                    |
| ST-23 — Messages and delivery                | Approved templates/languages, contact/expiry/reminder conditions and version; preview without sending.                                                                                                                                                                                                   | Administration.                                                                                                                               | Preview is synthetic; publication and actual sending are separate actions.                                                                                                                                                                        |
| ST-24 — Services                             | Conditional direct/indirect events, service centre/date/duration/provider and episode linkage.                                                                                                                                                                                                           | Episode nav if adopted.                                                                                                                       | Authorised service recording; not a full care-plan/medication record.                                                                                                                                                                             |
| ST-25 — Feedback                             | Conditional person/family assignments, eligibility, timing, non-sending reasons and permitted responses.                                                                                                                                                                                                 | Episode nav if adopted.                                                                                                                       | Feedback visibility is explicit; not part of clinical assessment completion.                                                                                                                                                                      |
| ST-26 — Help                                 | Approved operational help, support routes, accessible guidance, permitted issue reporting.                                                                                                                                                                                                               | Utility links and recovery states.                                                                                                            | No unapproved clinical promises or sensitive data in support telemetry.                                                                                                                                                                           |
| ST-27 — Intake                               | Registration fields/source, matching, contact/support, permissions, required checks, triage outcome, waiting reason, owner/next review and intake history; save/resume, request information, record authorised outcome.                                                                                  | New person, intake queue, Person or assessment blocker; return to owned intake or proceed to Assessment only after L-27.                      | Registration does not grant triage authority. Every new patient requires intake; no core-assessment creation/activation bypass. Sensitive intake/referral data remains scoped.                                                                    |
| ST-28 — Referral detail                      | Destination/purpose, permitted information, actual sending attempts, receipt and receiving decision, external evidence, next follow-up/owner and handover/alternative resolution.                                                                                                                        | Intake, disposition/transfer or referral queue; return to original person/intake/episode or filtered queue.                                   | Sending, sharing and recording externally verified events require their respective grants. No inferred receipt, acceptance, responsibility transfer or automatic integration.                                                                     |

### Participant views

| ID / label                  | Primary content and action                                                                                                                                                                 | Important boundary                                                                                                                                    |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| PT-01 — Open request        | Scoped access/recipient checks and safe onward routing.                                                                                                                                    | Token possession alone is not verified identity.                                                                                                      |
| PT-02 — About this request  | Who asks, respondent role, purpose, visibility, effort if known, support, save/expiry behaviour; begin.                                                                                    | No unrelated participant/clinical record detail.                                                                                                      |
| PT-03 — Questions           | Pinned instrument content, approved progress/validation/nonresponse/assistance; continue, save where supported, help/stop.                                                                 | Clinical content rules govern requiredness and navigation.                                                                                            |
| PT-04 — Check and submit    | Review permitted answers or approved final-submit step; clear submission intent.                                                                                                           | Do not offer answer review/revision if instrument rules disallow it.                                                                                  |
| PT-05 — Submitted           | Confirm actual receipt and appropriate next step.                                                                                                                                          | No assumed score interpretation, live monitoring, or whole-assessment completion.                                                                     |
| PT-06 — Request unavailable | Safe explanation for expiry/revocation/wrong recipient/already submitted as disclosure permits; recovery/help.                                                                             | Never reveal answers or sensitive identity merely to explain failure.                                                                                 |
| PT-07 — Help or stop        | Approved support contact/availability, permitted assistance, safe exit/draft explanation.                                                                                                  | No fabricated offline persistence or guaranteed clinical response time.                                                                               |
| PT-08 — Consent decision    | Pinned consent information, scope, visibility/consequences, support and explicit Accept or Decline action for the specific sent request; later authorised withdrawal route where approved. | Guardian authority/consent rules and self-service withdrawal channel remain policy-dependent. A decision never reveals unrelated requests or answers. |
| PT-09 — Session ended       | Neutral tablet reset and staff-authentication route.                                                                                                                                       | No prior respondent data; browser back cannot reopen the old context.                                                                                 |

## 6. Candidate full-platform expansion

The CMDCS draft makes these jobs visible; the architecture below reserves logical homes without treating them as launch commitments. Final phase, access, and delivery mode require D-20–D-24. Keep candidate UI out of the baseline launch nav until adopted.

```text
Care workspace expansion
├── Selected episode → Care plan and care events                   EX-01 / CR-01
└── Separate approved participant access → My progress             EX-02 / CR-02

Service improvement expansion (authorised staff)
├── Centre overview / performance / quality context                EX-03 / CR-03
├── Implementation / fidelity / improvement actions                EX-04 / CR-05
└── Dictionary / quality rules / reporting definitions             EX-08 / CR-04

Governed evidence products (portal or external output to decide)
├── Reporting / commissioning / system oversight                   EX-05 / CR-06
├── Data releases / exchange contracts / linkage exceptions        EX-06 / CR-07
└── Research requests / approvals / releases / closure              EX-07 / CR-08
```

| Surface                         | Primary actors                                   | Proposed content                                                                                                      | Boundary and unresolved design                                                                                                     |
| ------------------------------- | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| EX-01 — Care plan and events    | Jess and authorised local/specialist teams       | Plan/context, authored contacts/contributions/approved changes, effective dates, review/handover, amendments.         | Full clinical content and authority under D-22; no diagnosis, prescription, or automatic risk workflow inferred.                   |
| EX-02 — My progress             | Kai; Deb only within separately approved sharing | Understandable approved progress, source/date, care-next-step context, questions for discussion.                      | Phase conflict D-21; authentication and visibility open. Not unlocked by a questionnaire link; no implied messaging inbox.         |
| EX-03 — Centre overview         | Rachel; Ananya as approved                       | Caseload/workforce/performance/fidelity views, definitions, denominator, period/as-of, quality/context, action owner. | Operations Manager/Clinical Director may need different capabilities; no blanket response drill-down or assumed real-time refresh. |
| EX-04 — Implementation          | Sam with Rachel/Ananya                           | Readiness, implementation phase, approved fidelity evidence, local context, learning action and follow-up.            | Aggregate/person-level boundaries and methods need D-22/D-23.                                                                      |
| EX-05 — Reporting and oversight | Priya/David, supported by Ananya                 | Approved report/cohort/method, source/quality/comparability, release version, permitted decisions/follow-up.          | Aggregate/de-identified does not automatically mean safe disclosure; external recipients do not need care nav.                     |
| EX-06 — Data exchange           | Maya/Ananya and authorised release roles         | Contract/schema/version, mappings, manifest, validations, approvals, delivery/acceptance and exceptions.              | Could be a governed transfer rather than an app destination; linkage/transport/recipient contract unresolved.                      |
| EX-07 — Research access         | Helen and approved research/data governance      | Catalogue/request criteria, study/purpose, evidence/approval conditions, release/expiry, findings/closure.            | Request submission ≠ data access; National Research Office process and future trial scope need D-24.                               |
| EX-08 — Data definitions        | Ananya; Tom/Sam for approved use                 | Data dictionary, field/rule versions, lineage, reporting/fidelity definitions, quality ownership.                     | Definitions are not interchangeable with instrument scoring; publication requires the relevant authority.                          |

Candidate content entities: care plan/event; metric/fidelity definition/version; aggregate reporting product/cohort; implementation action; data request/approval; exchange contract; release/manifest; research study/request/conditions. Model these outside the care-episode tree where appropriate and reference approved source records without duplicating or widening access.

## 7. Role-to-surface model

This is an access-design hypothesis, **not** a permission matrix ready to configure. D-12/D-23/D-24 must approve actual actions, scopes, fields, and conditions.

| Persona/capability              | Typical baseline home                                                       | Candidate addition                                   | Never assume                                                                          |
| ------------------------------- | --------------------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Jess — P-04                     | My work → person/episode → Assessment/Report/Consent & respondents/History. | EX-01 care/specialist work.                          | All-centre access, publication authority, or all operational lead rights.             |
| Kai — P-01                      | Assigned participant surface only.                                          | EX-02 approved own progress.                         | Private phone, independent completion, universal account access, or research consent. |
| Deb — P-02                      | Her own eligible contribution.                                              | Separately approved shared/progress information.     | Guardian authority or access to Kai's separate answers.                               |
| Rachel — P-08                   | Permitted team work/ownership view.                                         | EX-03 centre oversight.                              | Detailed clinical access from management title or aggregate access.                   |
| Tom — P-06                      | Scoped registration/quality/correction work if granted.                     | EX-08 quality definitions/use and reporting support. | Correcting unsupported clinical answers or unilateral record merge.                   |
| Ananya — P-07                   | Scoped resolution and audit.                                                | EX-05/EX-06/EX-08 data/report stewardship.           | Unrestricted national/unit-record use or release authority by job title alone.        |
| Sam — P-10                      | No automatic baseline clinical home.                                        | EX-04 and permitted evidence/context.                | Individual-record drill-down simply because the draft mentions it.                    |
| Priya — P-11                    | No baseline care interface.                                                 | EX-05 governed aggregate products.                   | Individual records or unconstrained benchmarking.                                     |
| David — P-12                    | No baseline care interface.                                                 | EX-05 oversight/governance evidence.                 | Verified legal ownership or unrestricted raw data access.                             |
| Maya — P-13                     | No baseline care interface.                                                 | EX-06 governed exchange/output.                      | Care UI access or authority to link arbitrary identifiers.                            |
| Helen — P-14                    | No baseline care interface.                                                 | EX-07 approved research workflow/output.             | Research approval for every person or all future studies.                             |
| Guardian capability — P-03      | Approved decision pathway only.                                             | Sharing only if separately approved.                 | Parent relationship equals authority or authority equals full answer access.          |
| Facilitator capability — P-05   | Limited task/session setup and neutral reset.                               | None implied.                                        | Answer-reading, review, or administration rights.                                     |
| Administrator capability — P-09 | Permitted Administration areas.                                             | Candidate configuration only if adopted.             | Authority to invent policy, scoring, or clinical content.                             |

## 8. Content model and metadata

| Content type                 | Required metadata for usable IA                                                                                                                                                         | Key distinction                                                                                    |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Intake                       | Intake/person IDs, received/source facts, applicable episode link, field/check completeness, triage outcome/actor/time, waiting state/reason, owner, next action/review and history.    | Registration, intake completion and clinical admission are distinct.                               |
| Onward referral              | Intake/episode/person links, destination/purpose, permitted information, actual attempts, receipt, receiving decision, evidence/source, YSCC/external owners, follow-up and resolution. | Sent, received, accepted and handover resolved are independent facts; external work remains owned. |
| Person                       | Stable internal/source identifiers, permitted identity/contact attributes, provenance and available change history.                                                                     | Source snapshot may not contain historic values.                                                   |
| Episode                      | ID/number, start/end semantics, owner, centre, status/closure, referral context, dated allocation.                                                                                      | Registration/home centre can differ from service centre.                                           |
| Assessment                   | Episode/context, core/conditional plan, reasons, progress, owner, outstanding work, evidence reviews, decision references.                                                              | Not synonymous with one questionnaire response.                                                    |
| Collection point             | Episode/context, type, planned/due window, cadence/rule version, actual linked collection events.                                                                                       | Due date is not sent/submitted/reviewed date.                                                      |
| Assignment                   | Instrument/version, respondent role/context, collection point, owner, due window, progress, reasons.                                                                                    | Reissue stays within the assignment; repeat collection is distinct.                                |
| Attempt/session              | Channel, permitted recipient reference, launch/sending state, expiry/end, observed events, supersession/reissue link.                                                                   | Sent/opened is not verified respondent identity or completion.                                     |
| Response                     | Assignment/attempt, item answers/nonresponses, version, source respondent, recorder, assistance, draft/submission dates.                                                                | One accepted fulfilment; corrections are events, not replacement time points.                      |
| Permission/authority         | Purpose, subject/scope, decision-maker/authority, status, effective time, information/policy version, history.                                                                          | Research, care, contact, family participation, and visibility must not collapse into one flag.     |
| Review                       | Reviewer, date, evidence set/revisions, findings/next action under approved content.                                                                                                    | Review of partial evidence need not complete assessment.                                           |
| Correction                   | Target/revision, prior/new, editor/time, reason/source, applicable approval, resulting revision.                                                                                        | Preserve original respondent and recorder separately from editor.                                  |
| Resolution case              | Candidate/link IDs, evidence, issue/owner, centre support, proposed impact, approval/action, recovery/audit.                                                                            | Suspicion is not identity proof.                                                                   |
| Conditional service/feedback | Episode and specific event/respondent fields, actual date meanings, source/version, allowed visibility.                                                                                 | Service mode differs from questionnaire mode; feedback differs from clinical assessment.           |

Use the actual data type and cardinality from approved content. Valid zero, allowed nonresponse, missing, invalid data, and unavailable history require distinct labels. Source raw codes are not participant-facing options. Document the final backend schema and sensitive-field classifications separately before implementation.

## 9. Labels and controlled vocabulary

| Preferred label         | Avoid conflating with                                       | Notes                                                                                                  |
| ----------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| My work                 | A universal all-user dashboard.                             | Shows only relevant responsibilities; title/landing content may adapt to capability.                   |
| People                  | Every supporter or staff user account.                      | This section finds the person's care record; actor management is separate.                             |
| Care episode            | 90-day review, programme, assessment.                       | Show identifier and dates; use “episode” in staff context only after terminology validation.           |
| Assessment              | Assignment, response, or clinical review event.             | Contains core/conditional plan and overall progress.                                                   |
| Measures                | All clinical care activity.                                 | Houses collections/assignments/responses, not full medication/care-plan scope.                         |
| Questionnaire / request | Instrument codes or reporting batch names.                  | Candidate participant wording, subject to clinical/content testing.                                    |
| Submitted               | Saved draft, delivered invitation, or reviewed.             | Confirmation states the actual operation.                                                              |
| Consent and respondents | One all-purpose consent checkbox.                           | Plain sublabels separate purpose, authority, relationship, and visibility.                             |
| Disposition             | Referral source, referral action, or assessment completion. | Clinical term needs label testing; a clearer display label may be approved without changing the model. |
| Data quality            | Permission to change any record.                            | Issues, correction requests, and approved resolution are separate tasks.                               |

Keep labels consistent across nav, page heading, breadcrumb, queue, and message where relevant. Historical source labels remain available in provenance without replacing the user-facing vocabulary. Document stakeholder abbreviations and definitions before showing CMDCS, CQR, PMHC-MDS, or other jargon to non-specialists.

## 10. Search and filter design

**People search:** Clearly state current authorised scope. Use approved matching identifiers and discriminating context; do not invent which identity fields may be displayed. Do not use free-form clinical-answer search as the default person lookup. A match opens the person/episode context, not a blind edit action.

**Intake/referral filters:** Intake state, missing-check/waiting reason, reviewer/owner and next review date; referral destination, transmission outcome, unconfirmed receipt, pending/declined receiving decision and unresolved handover. Include only permitted metadata/counts. Open ST-27/ST-28 and preserve the return filters. Intake completed/proceed patients waiting for assessment belong to the downstream assessment queue, not unfinished intake.

**Work and measure filters:** Independent facets for task type, owner, episode/centre where authorised, assignment progress, due window, blocker, instrument, collection point, and channel. “Overdue” is derived, not a replacement for response/link state. Keep query/filters visible and clearable; show permitted result counts.

**Quality search:** Issue type, owner, evidence/request status, relevant centre, and age/due state where defined. A quality case links to the authoritative record rather than copying a second editable answer.

**History:** Default to the selected episode. Explicitly choose cross-episode history and filter instrument/collection dates; show source/version/respondent and comparison warnings. Do not join incomparable scores into one uninterrupted trend.

**Candidate reporting:** Separately scoped products/definitions, period, cohort, method, refresh, and quality. No global search that mixes unrestricted clinical answers with external reporting products.

**Empty/error states:** Distinguish no matches within scope, restrictive filters, search failure, no assignments yet, missing historic coverage, and unavailable access. Offer spelling/filter adjustment, permitted scope change, or responsible support. Never expose that an unauthorised person/record exists. Avoid auto-creating a duplicate from a zero-results screen.

Search query logging, recent-search suggestions, and browser history can contain sensitive information. Do not enable their persistence without an approved privacy policy. Counts and autocomplete must obey the same access boundary as record retrieval.

## 11. Navigation, deep links, and wayfinding

- Keep the staff global shell stable within a granted capability set; do not reshape it on every record. Show active section and local destination in text and visual styling.
- Keep person and selected-episode context visible during all clinical/collection actions. When switching, protect unsaved work and clear stale content before loading the new context.
- Use episode-local tabs for Overview, Assessment, Events, Report, Consent & respondents, and History. Hide Assessment until the intake/proceed gate is met. Collections live inside Assessment; episode care events live in Events; questionnaire comparison lives inside Report. Intake and Referrals open contextually. Conditional tabs appear only when adopted and authorised.
- A location breadcrumb can show People → person → episode → assignment; collapse middle segments on narrow screens while retaining the immediate parent. Identity labels must use approved privacy-safe display fields.
- Distinguish browser Back, “Back to results” (restores permitted query/filter/position), and a parent link. Closing a modal returns focus to its trigger without resetting an underlying form.
- Logical deep-link shape may use opaque IDs: `/people/:personId/episodes/:episodeId/collections/:assignmentId`. This is an illustrative production route contract, not the prototype's current query shape. Never put names, answers, phone numbers, invitation credentials, or consent values in URLs.
- Invitation credentials require a separate protected access design; do not expose tokens to general logs, analytics, support messages, or copied staff navigation. Token format/storage is a security decision, not defined by the sitemap.
- Every deep link rechecks authorisation and shows enough permitted context to orient the user. Unavailable/denied access gets a safe return route without disclosing protected target facts.
- Every screen has an inbound path and an appropriate return/exit. Administrative previews use synthetic participant contexts, not a shortcut around real permissions.

## 12. Responsive and cross-channel structure

Desktop staff work can use a visible sidebar and episode-local navigation. At narrower widths, preserve the active context and key task actions; test an accessible compact menu rather than squeezing tables until identity/state becomes unreadable. Do not prescribe a native mobile app or five-tab bottom bar merely to match a pattern.

Mobile self-report is a focused task sequence, not a reduced staff app. Tablet collection deliberately replaces staff context with participant mode and ends at a neutral screen. The same approved instrument/version and vocabulary carry across eligible channels; identical layout is not required.

Cross-device continuity exists only where approved draft/access rules support it. A consistent IA does not justify promising resume that is not implemented. Timeouts, local clearing, and retained drafts must remain understandable in every channel.

## 13. IA validation plan

| Task to test                                                                                                            | Persona/capability            | Expected home / distinction                                                                               |
| ----------------------------------------------------------------------------------------------------------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------- |
| Register a new patient without bypassing intake; resume missing-information/triage work.                                | Authorised intake staff       | People → New person → ST-27; no core assessment until the recorded proceed gate.                          |
| Follow an externally sent referral through failure, receipt, receiving decision and handover.                           | Authorised referral owner     | ST-28 and My work; retain unresolved ownership after episode closure.                                     |
| Find the active assessment for a person with two episodes.                                                              | Jess                          | People → explicit episode → Assessment, not a merged history.                                             |
| Identify what remains after one SMS response is submitted or supported tablet completion is marked review not required. | Jess/Rachel within scope      | Assessment; separate response, review requirement/state and assessment completion.                        |
| Reissue an expired link without creating a new review.                                                                  | Authorised staff              | Assignment detail → delivery recovery.                                                                    |
| Locate who supplied and who entered an answer.                                                                          | Jess/Tom as allowed           | Response detail/provenance, not inferred from channel.                                                    |
| Correct corroborated data or request clinical evidence.                                                                 | Tom                           | Data quality → correct/request; distinct routes.                                                          |
| Resolve suspected duplicate with centre support.                                                                        | Ananya                        | Resolution case, not a direct merge button in person search.                                              |
| Send, decide or withdraw a purpose-specific request, or check authority.                                                | Authorised staff/P-03 pathway | Consent & respondents plus scoped participant decision; not Administration unless changing policy itself. |
| Interpret the care-period questionnaire dashboard, add context and trace it to answers.                                 | Jess                          | Report ST-29 → ST-13; charts remain non-scoring and annotations do not alter evidence.                    |
| Submit an eligible contribution without seeing other answers.                                                           | Kai/Deb                       | Scoped participant sequence only.                                                                         |
| End a tablet session safely.                                                                                            | P-05                          | Neutral reset; staff authentication and authorisation to return.                                          |
| Interpret a centre/fidelity finding with missing data.                                                                  | Rachel/Sam, candidate         | EX-03/EX-04 with definition/context/quality, not a raw clinical queue.                                    |
| Request an aggregate product or approved research data.                                                                 | Priya/Helen, candidate        | Governed product/request pathway; not People search.                                                      |

Use card sorting where grouping is uncertain, tree testing before visual polish, then first-click and task-based testing. Record success, wrong turns, time-to-find, interpretation errors, assistance, and terminology confusion. The complete source actor set should inform research, but conditional/candidate branches are tested against their explicit scope status.

## 14. Maintenance and implementation handoff

Screen IDs in this file are canonical. Requirements/rules are owned by document 05; decisions/sources by document 01. Before changing an object's home or label, update its inbound links, breadcrumb, queue entry, flow, help copy, and acceptance task. Avoid separate incompatible “admin” and “clinical” definitions of the same instrument or person record.

Before implementation-ready sign-off, resolve permission granularity, sensitive-field classifications, approved clinical/content inventories, state transitions, actual route/access design, search/matching rules, and adopted candidate surfaces. This is a full proposed architecture of known baseline and source-driven candidate needs, not a claim that unspecified clinical, research, integration, or reporting contracts are complete.

## 15. Report and Events tab direction — 19 September 2026

The following is the current interactive prototype direction, not a stakeholder-approved information architecture. Both tabs require validation with clinicians, assessment operations, data/privacy owners and product/UX before production scope or copy is signed off.

### Report tab — implemented prototype direction

The staff person workspace includes **Report**, scoped to the selected care period. It leads with a shared dated **Care timeline**, with All, Care, Context and conditional K10 filters. It renders only dated fictional records: care periods and medication courses as bars when a start/end is available; medication/context events, goals and risk-related records as markers; and complete compatible K10 responses as raw totals. Selecting an item exposes its local source detail, and the record list provides a non-spatial way to browse the same visible items. A marker means a record was made or an event was recorded at that time; it does not demonstrate that an event caused a change or that a value has clinical meaning. Jordan Ellis also has extra hard-coded visual experiments for design review. They are not a reusable data contract, care plan, risk system, score interpretation or approved report design. The Events tab lists the underlying recorded care events; whether its event set, governance and visibility should match Report remains unresolved. See the [current implementation status](prototype-longitudinal-report-status-2026-09-19.md).

The earlier questionnaire dashboard, normalised Likert aggregate and answer-level **Questionnaire comparison and details** are not rendered in the current Report. Submitted response history, Clinical notes, the clinician-authored narrative, Edit report action, visible report change log, Latest clinician review and Response & follow-up history are also hidden. Assessment and History retain the complete dated collection, review, follow-up and annotation trail. This staff view does not grant participant or guardian access to the report. See [the report requirements](05-requirements-and-logic.md#9-clinician-progress-report).

### Events tab — implemented prototype direction

The person workspace includes **Events**, scoped to the selected care episode. It presents a newest-first timeline and a primary **Record event** action. The current sample form supports four provisional types: medication change, care or service change, significant life event, and other event. Events require an in-episode date, a title or type-specific summary, and type-specific fields such as medication change, service/provider, affected life area, reason, impact or notes. The timeline shows the event date, type, title, details and recording actor/time. Dates outside the care episode or in the future are rejected in the sample implementation.

The tab currently treats events as contextual records, not diagnoses, outcomes, treatment decisions or proof that an external service occurred. Its relationship to care planning, referrals, assessment completion, History & change log, permissions, correction/deletion, event versioning and Report chart markers remains open. The product must decide whether Events is a durable care-plan capability, a lightweight annotation surface, or a narrower activity record before production.

### Validation and stakeholder input required

Validate these assumptions before treating the surfaces as approved:

- Which staff roles may view, create, correct, or retract an event, and what evidence is required?
- Which event types and fields are clinically useful, culturally safe, minimum necessary and reportable?
- Should medication, service, life and “other” events be in one timeline, separate records, or an existing care-plan/referral model?
- Which events should appear on Report charts, and should markers be opt-in, filtered, labelled by source, or omitted entirely?
- Does Report need clinician interpretation, annotations, review state or export, or should those remain in History/Assessment?
- What does “influence” mean for this product, and what language prevents staff from reading a temporal marker as causal evidence?
- What are the retention, correction, audit, visibility and participant-access rules for both tabs?

Until D-28 and D-29 are resolved, these tabs should be described as provisional prototype evidence and excluded from production readiness claims.

- **Trace:** FR-15, FR-39; CR-01; ST-13, ST-29, provisional ST-31; D-15–D-16, D-28–D-29.
