# YSCC documentation gap review

15 September 2026 · Review findings and proposed follow-up · No requirements or product behaviour changed

## Overall assessment

The documentation is a substantial product/UX working specification. It explains the care episode, collection channels, provenance, independent states, correction history, and recovery paths well. The main remaining work is to resolve specific rules, complete operational workflows, and reconcile documentation that has diverged as the prototype evolved.

Some gaps are already explicitly recorded as open decisions. Those are unfinished specification work, not discoveries that the authors overlooked. Other gaps are missing workflow detail or inconsistent descriptions of an already documented decision.

### Review scope and checks

- Reread the eight detailed documents, both documentation indexes, eight executive reading copies, the combined baseline, and prototype README/design/verification notes.
- Confirmed **46 functional requirements, 26 rules, 22 acceptance scenarios, and 24 decision rows**. The decision register currently labels all 24 open.
- Compared the combined baseline and detailed requirements: all 46 FR paragraphs match exactly.
- Checked Markdown local-link targets across 24 Markdown files: none were missing. This checks target existence, not external availability or every heading anchor.
- Did not re-fetch Slack, revalidate the source persona PDF/codebook, inspect PDF rendering, or test the running prototype. Findings about prototype behaviour below are discrepancies between documents, not newly verified UI defects.

## 1. Fix inconsistencies in the next documentation revision

### G-01 — The response-edit decision has not reached every document

**Finding:** FR-29/FR-32, L-20, F-06 and AC-05 now describe Clinicians and Data Managers editing submitted responses within scope, with every saved edit logged. The Data Officer still follows the verified-source rule. However:

- The journey's cross-cutting correction row still presents “verified source → correction; no source → clinician request” without limiting that split to the Data Officer.
- Jess's baseline persona responsibilities and Ananya's record-resolution profile omit the newly documented response-edit task.
- The executive correction diagram covers Tom's request/direct-correction fork, but does not show the separate Clinician/Data Manager entry into response editing. That diagram is valid as Tom's flow; it is incomplete as the summary of F-06.
- The combined baseline's correction journey still offers only Request correction / Correct from verified source, despite its updated FR wording.

**Why it matters:** Different readers can infer different editing rights or fail to design an already requested workflow.

**Complete when:** Every applicable persona, journey and summary distinguishes (a) Clinician/Data Manager response editing, (b) Data Officer evidence-based correction/request, and (c) clinical review approval. The revised evidence remains identifiable and every saved edit retains its audit.

**Evidence:** [Canonical edit permissions](</Users/danielenicoletti/Documents/ChatGPT/YSCC Platform/docs/05-requirements-and-logic.md:60>), [journey correction row](</Users/danielenicoletti/Documents/ChatGPT/YSCC Platform/docs/04-full-user-journey.md:184>), [Ananya responsibilities](</Users/danielenicoletti/Documents/ChatGPT/YSCC Platform/docs/03-personas.md:182>), [executive correction flow](</Users/danielenicoletti/Documents/ChatGPT/YSCC Platform/docs/executive/07-user-flows.md:84>).

### G-02 — Navigation, preview and response-review descriptions disagree

**Finding:** Three concrete contradictions need reconciliation:

| Topic | Conflicting descriptions |
| --- | --- |
| Measures destination | Detailed IA retains a separate Measures tab and ST-09 home; prototype DESIGN says collection work moved into Assessment and explicitly supersedes that tab. |
| Questionnaire preview | Prototype README documents Preview questionnaire inside Plan a follow-up; DESIGN says that form has no preview control. |
| Response/review location | DESIGN says responses and review notes live in the collection-details modal and review returns there; README and detailed F-06/ST-10 say View details contains metadata/delivery only and response editing returns to the review view. |

**Why it matters:** The same task has competing destinations and return paths. A handoff could reintroduce an interaction the user already changed.

**Complete when:** Confirm the accepted interaction for each item, update IA/F flows/README/DESIGN and executive material consistently, and retain stable screen IDs with an explicit mapping where screens have been combined. Record prototype-specific deviations when they are not intended to change the product specification.

**Evidence:** [Canonical episode navigation](</Users/danielenicoletti/Documents/ChatGPT/YSCC Platform/docs/08-information-architecture.md:298>), [prototype design descriptions](</Users/danielenicoletti/Documents/ChatGPT/YSCC Platform/prototype/design/DESIGN.md:19>), [prototype review and preview instructions](</Users/danielenicoletti/Documents/ChatGPT/YSCC Platform/prototype/README.md:41>).

### G-03 — Change and decision tracking needs to distinguish settled details from open policy

**Finding:** Document 05 records a product-owner clarification on response editing, but the evidence register has no corresponding source entry. D-13 still bundles correction authority with unresolved external sources, rescoring and re-review. All decisions are labelled open; there are no recorded outcomes, named accountable individuals or decision-by milestones. Documents remain version 0.2 despite subsequent changes.

**Why it matters:** The team cannot readily tell which parts are settled, which need a decision, or which summaries/PDFs contain an earlier revision.

**Complete when:** Record each accepted clarification with its source/date and affected IDs; split or annotate partially resolved decisions; add an accountable owner, status, outcome, dependency and decision-by milestone. Link each executive build and prototype verification record to the source revision it covers. Do not reopen a settled edit permission simply because rescoring remains unresolved.

**Evidence:** [Recorded clarification](</Users/danielenicoletti/Documents/ChatGPT/YSCC Platform/docs/05-requirements-and-logic.md:6>), [source register](</Users/danielenicoletti/Documents/ChatGPT/YSCC Platform/docs/01-product-framing.md:81>), [decision register](</Users/danielenicoletti/Documents/ChatGPT/YSCC Platform/docs/01-product-framing.md:112>).

## 2. Complete the rules needed to design and build the baseline

### G-04 — An agreed launch boundary

**Already acknowledged:** D-15 and D-21–D-24.

The documents preserve the conflict between MVP self-report in captured Slack and Stage 2 self-report/MVP dashboard in the persona draft. They also identify conditional and broader capabilities clearly. What is missing is the decision: the first release's users, centres, instruments, channels and complete workflows, with an explicit phase for each conditional/candidate capability.

**Complete when:** A release-scope table states included/later/excluded, accountable owner and acceptance evidence for each capability. It must resolve the self-report/dashboard conflict and separately decide satisfaction, service logging, discharge content and migration/export. A thin release still needs a complete operational path for its selected users.

**Evidence:** [Scope and readiness](</Users/danielenicoletti/Documents/ChatGPT/YSCC Platform/docs/01-product-framing.md:51>).

### G-05 — The actual clinical content and rule catalogue

**Already acknowledged:** D-01–D-03, D-08, D-13 and D-16.

The platform rules explain how to use an approved instrument, but there is no populated launch inventory of instruments, items, versions, eligibility, requiredness, scoring or module triggers. This is the largest gap between a generic questionnaire mechanism and the intended assessment experience.

The inventory also needs worked cases for behaviour that is only partly specified today:

- An earlier answer changes and a previously applicable item/module becomes inapplicable: what happens to its existing answers, assignment and completion calculation?
- A clinician overrides a suggested module, or two rules conflict: what is permitted, recorded and shown?
- Submission succeeds but scoring is pending, unavailable, invalid or fails: what can the reviewer see and do?
- A published instrument is urgently withdrawn while assignments/drafts exist: who stops collection, replaces work and informs the responsible staff?

**Complete when:** Each launch instrument has an approved definition and example inputs/expected outputs, including partial answers and permitted nonresponse. Add the applicable rule, screen states and acceptance scenarios. Urgent replacement is already mentioned in L-04; the missing piece is its procedure and verification.

**Evidence:** [Content/version rules](</Users/danielenicoletti/Documents/ChatGPT/YSCC Platform/docs/05-requirements-and-logic.md:114>), [handoff requirements](</Users/danielenicoletti/Documents/ChatGPT/YSCC Platform/docs/05-requirements-and-logic.md:426>).

### G-06 — A capability matrix and staff access lifecycle

**Already acknowledged:** D-12; the role-to-surface table explicitly says it is not a configurable permission matrix.

Missing is an action × record/field × role × centre/cluster/system matrix, including specific grants to view answers, edit responses, approve review, assign work, resolve identity, publish configuration and inspect audit.

Staff operational flows are also missing: invitation/provisioning, first access, access request/approval, role or centre changes, suspension/offboarding, session invalidation, and reassignment of work owned by someone who leaves. ST-00 and ST-19 give these areas a home without describing the full sequence.

**Complete when:** The matrix includes allowed and denied examples, and a staff join/change/leave scenario shows both access changes and ownership continuity. Authentication and recovery methods must be selected explicitly rather than inferred from a sign-in screen.

**Evidence:** [Role-to-surface limitations](</Users/danielenicoletti/Documents/ChatGPT/YSCC Platform/docs/08-information-architecture.md:217>), [staff access/configuration screens](</Users/danielenicoletti/Documents/ChatGPT/YSCC Platform/docs/08-information-architecture.md:137>).

### G-07 — Concrete participation, contact and visibility pathways

**Already acknowledged:** D-04–D-07, D-18 and D-19.

The purpose-specific model is strong. Missing are the actual decision table and approved participant content: which purpose permits which action, who can decide, what evidence is needed, what is visible, and what changes on withdrawal.

Make changing circumstances explicit: a supporter changes, a guardian's authority changes, a contact number is corrected or shared, a link reaches the wrong recipient, or a person asks to use a different channel. The docs describe safe access failures but do not finish the staff workflow for updating the relationship/contact and reconciling existing invitations and drafts.

**Complete when:** Worked scenarios cover person, supporter and authorised-guardian participation, changes over time, refusal/withdrawal, unsuitable contact and safe resumption. Each has approved information text, a responsible actor and a recorded outcome. Do not infer an age rule or automatic family access.

**Evidence:** [Purpose and authority flow](</Users/danielenicoletti/Documents/ChatGPT/YSCC Platform/docs/07-user-flows.md:202>), [SMS recovery](</Users/danielenicoletti/Documents/ChatGPT/YSCC Platform/docs/07-user-flows.md:97>).

### G-08 — Worked lifecycle examples and a field-level data contract

**Already acknowledged:** D-08–D-11 and D-16; the IA explicitly defers cardinalities and review-instance boundaries.

The distinction between episode, assessment, collection point and assignment is clear conceptually. It is not yet precise enough to answer all build questions:

- Does a later clinical reassessment create a new assessment instance, a collection point linked to the initial assessment, or another defined relationship?
- Can a person have concurrent episodes or assessments, and within which organisational boundaries?
- When does a return reopen an episode versus create a new one? What happens during transfer?
- If a review is late or missed, which time point does it fulfil and how is the next due date calculated?
- Which identity/contact/referral fields are required, optional, unknown or editable; which system is authoritative; and how are conflicts handled?

**Complete when:** A data dictionary and relationship model define keys, cardinalities, source/effective dates, sensitive fields and valid states. Walk through one synthetic person's first assessment, later review, late response, transfer, closure and return with exact example records and expected queue/due states.

**Evidence:** [Domain-model boundary](</Users/danielenicoletti/Documents/ChatGPT/YSCC Platform/docs/08-information-architecture.md:47>), [metadata/schema boundary](</Users/danielenicoletti/Documents/ChatGPT/YSCC Platform/docs/08-information-architecture.md:238>), [state transition proposal](</Users/danielenicoletti/Documents/ChatGPT/YSCC Platform/docs/05-requirements-and-logic.md:338>).

### G-09 — Intake and onward-referral completion

**Update after this review:** U1/D-25 confirms mandatory intake for every new patient. The documentation now specifies registration fields, intake/triage/waiting states, the completed/proceed gate, external referral outcomes and continuing ownership in [requirements section 7](05-requirements-and-logic.md#7-intake-and-onward-referral-contract), F-01/F-17 and ST-27/ST-28, with AC-23–AC-29. The documentation omission is addressed; clinical/local-operating details remain D-26/D-27 and prototype implementation is still outstanding. The text below records the original finding.

**Partly acknowledged:** D-01, D-09–D-10 and D-22.

F-01 starts with finding/registering a person and refers to an approved registration/matching process that is not supplied. Intake and onward referral are described as actions and handoffs, without a full operational path before assessment or after the referral decision.

Decide whether the service needs referral received/incomplete/awaiting triage/waiting/accepted/declined/withdrawn states. Establish whether a care episode exists before acceptance and who owns the person while waiting. For an onward referral, define what proves it was sent, received, accepted, rejected or needs follow-up, and when the sending service's responsibility ends. These are questions to resolve, not proposed clinical eligibility rules.

**Complete when:** A new referral and an unsuccessful onward handoff can each be followed to a recorded outcome with an owner. If another system or manual service process owns these steps, document that boundary and the evidence recorded in YSCC; a new integration or appointment system is not implied.

**Evidence:** [Intake journey](</Users/danielenicoletti/Documents/ChatGPT/YSCC Platform/docs/04-full-user-journey.md:20>), [find/register flow](</Users/danielenicoletti/Documents/ChatGPT/YSCC Platform/docs/07-user-flows.md:12>), [routing limitation](</Users/danielenicoletti/Documents/ChatGPT/YSCC Platform/docs/05-requirements-and-logic.md:224>).

### G-10 — Task ownership, review follow-up and the actual support service

**Partly acknowledged:** FR-35–FR-38, D-11 and D-19.

Queues show owner, blocker and next action, but the operational lifecycle of those tasks is incomplete: creation, claiming, reassignment, acknowledgement of a handover, rejected/failed handover, cover during absence, and completion or escalation of stale work.

Response editing now flags reviewed evidence for re-review. Define who receives that task, its visible state and timing, what happens to a previously recorded decision, and how later review resolves the flag while preserving history. This also needs to work if the original clinician has left or the episode is closed.

Support is required, but actual contacts, availability, routing, ownership and handback are not supplied. A help screen alone does not establish the service behind it.

**Complete when:** A task can move between authorised staff without becoming ownerless, a corrected response reaches an accountable re-review outcome, and a support request has a defined route and expectation. Keep automatic clinical escalation outside scope unless explicitly adopted.

**Evidence:** [Operational requirements](</Users/danielenicoletti/Documents/ChatGPT/YSCC Platform/docs/05-requirements-and-logic.md:67>), [correction/re-review](</Users/danielenicoletti/Documents/ChatGPT/YSCC Platform/docs/07-user-flows.md:148>), [support decision](</Users/danielenicoletti/Documents/ChatGPT/YSCC Platform/docs/01-product-framing.md:144>).

## 3. Add delivery evidence and operating requirements

### G-11 — Measurable nonfunctional and service-operation requirements

**Missing as a consolidated specification:** Accessibility, access checks and individual save/retry behaviour are documented. Service-wide performance, availability, expected scale, supported device/browser range, backup/restore, outage recovery, deployment rollback and operational monitoring are not specified in comparable detail.

Record hosting/data-location decisions, system boundaries, sensitive-data handling and who investigates delivery/persistence incidents. Include a staff procedure for continuing or safely pausing work during an outage and reconciling subsequent entries. Choose targets with the responsible owners; do not invent uptime or recovery numbers.

**Complete when:** A compact operating-requirements table gives each requirement a measurable condition, owner and verification method. The resulting production criteria remain separate from frontend prototype behaviour.

**Evidence:** [Current quality/reliability requirements](</Users/danielenicoletti/Documents/ChatGPT/YSCC Platform/docs/05-requirements-and-logic.md:76>), [release gate](</Users/danielenicoletti/Documents/ChatGPT/YSCC Platform/docs/06-ux-strategy.md:130>).

### G-12 — Requirement-to-test coverage and current validation evidence

**Partly present:** There are 22 useful acceptance scenarios and a prototype verification note. The FR/rule/flow links are valuable, but they are not a complete requirement-by-requirement record of implementation and execution.

Add coverage for duplicate/misalignment resolution and recovery (F-07 currently cites FRs without a dedicated AC), staff access changes, assignment rule changes, late/missed scheduling, instrument withdrawal and re-review. AC-05 should explicitly exercise the FR-32 guarantee that an edit cannot save if its audit event fails; AC-20 should also cover denied publication and validation failure, beyond version pinning.

The prototype README identifies save/resume, real authentication/SMS/storage, full disposition/completion, transfer and reopening as unimplemented. Preserve these limits and map them to requirements instead of treating a prototype build or an earlier walkthrough as evidence for the whole baseline. The research programme exists; validated findings, decision changes and retest results are still needed.

**Complete when:** Each in-scope FR maps to its rules, flows/screens, acceptance case, implementation status, last tested revision, actual result and remaining limitation. Use distinct statuses for proposed, demonstrated, implemented and verified. Do not infer that all 22 scenarios have passed.

**Evidence:** [Acceptance catalogue](</Users/danielenicoletti/Documents/ChatGPT/YSCC Platform/docs/05-requirements-and-logic.md:376>), [prototype boundaries](</Users/danielenicoletti/Documents/ChatGPT/YSCC Platform/prototype/README.md:74>), [research and delivery sequence](</Users/danielenicoletti/Documents/ChatGPT/YSCC Platform/docs/06-ux-strategy.md:40>).

## 4. Broader features are documented candidates, not hidden omissions

Care plans/events, personal progress, centre performance, implementation learning, reporting definitions, commissioning/oversight, national exchange and research access already appear as **CR-01–CR-08**, with candidate flows and IA surfaces. Their detailed data products, metrics, recipients and contracts remain unfinished by design until scope is decided.

The useful next action is to phase and validate them. Adding more generic dashboard or research prose would not resolve the actual gaps. Similarly, appointment booking, billing, telehealth and a general messaging inbox should not be added just to make the document set appear more complete.

**Evidence:** [Candidate capability catalogue](</Users/danielenicoletti/Documents/ChatGPT/YSCC Platform/docs/05-requirements-and-logic.md:426>).

## Recommended order

1. **Synchronise accepted changes:** G-01–G-03. These are documentation maintenance, not a request to reapprove response editing.
2. **Decide the first release:** G-04, with accountable owners for its remaining rules.
3. **Produce concrete design inputs:** G-05–G-08: content inventory, capability/purpose matrices and worked lifecycle/data examples.
4. **Finish service handoffs:** G-09–G-10, including tasks owned outside YSCC.
5. **Make readiness reviewable:** G-11–G-12: operating requirements and a current coverage/evidence register.

Keep the eight-document structure. Fill its missing decision tables, examples and traceability attachments, and update its summaries from the accepted revision.
