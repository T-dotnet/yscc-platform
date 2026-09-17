# YSCC Platform — Requirements and logic

Version 0.5 · 16 September 2026 · Baseline aligned to the current local prototype

[Document index](README.md) · [Source, scope, and decision register](01-product-framing.md)

## 1. Status and specification conventions

This document owns the functional requirements for the separated document set. FR-01 through FR-46 retain their baseline identifiers. The product-owner clarification on 15 September 2026 explicitly permits Clinicians and Data Managers to edit responses with every edit logged (FR-29, FR-32). U1/D-25 confirms a further product rule: every new patient must go through intake before progressing to the core assessment or ongoing-care pathway. The operational detail below is a proposed specification, with remaining clinical/service parameters in D-26/D-27. Other proposed requirements are not evidence of stakeholder approval. Source IDs refer to the register in document 01.

All FRs except FR-15 and FR-39 form the proposed MVP baseline. FR-15 satisfaction and FR-39 service logging are conditional on D-15. Detailed discharge content and historical migration/export also require explicit scope decisions. Basic closure, provenance, and version-aware records remain baseline.

The rules below make expected behaviour testable without inventing clinical thresholds, age rules, reminder intervals, instrument content, or retention periods. Open D-xx decisions are dependencies, not optional post-launch refinements. A prototype may use labelled sample rules; production requires approved rules or explicit exclusion of the affected workflow.

Interpret “must” in a proposed requirement as the intended implementation obligation **if approved and in scope**. It does not represent a legal conclusion or proof of compliance.

### Current local prototype coverage — 16 September 2026

The interactive prototype now exercises representative portions of the baseline with fictional records: FR-01 care periods and mandatory intake; FR-06–FR-14 collection points, pinned questionnaire versions, response history, channel-dependent review and corrections; FR-16–FR-21 sample delivery/participant paths; FR-22–FR-25 purpose-specific consent requests and accept/decline/withdraw history; FR-30–FR-38 work queues, audit, intake/referral ownership and episode actions; and the Report and Events tabs described in sections 9–10. Repeated Likert answers are visualised per question using their labelled ordinal positions, while qualitative changes retain literal Previous/New wording and questionnaire/question context. Report event markers provide timing context only; neither representation creates a clinical score, causal claim or interpretation. The prototype uses browser-local persistence and sample conditions to make these flows testable.

This is not a claim that every FR, rule or acceptance scenario is implemented. In particular, production authentication/authorisation, approved identity/authority/consent and review-policy configuration, external SMS/consent/referral delivery, server audit/retention, interoperability, multi-user concurrency, clinical instruments/scoring and candidate reporting/research capabilities are not established by the prototype. Requirements and acceptance scenarios remain the delivery target and require approved policy/content plus implemented-environment verification.

## 2. Functional requirements

### Programme, assessment, and measure requirements

- **FR-01:** Link each person to their care episodes. Each episode has its own identity, variable start/end dates, ownership, and closure state. Assessment instances, reviews, and service events belong to the relevant episode. Define new-episode, reopening, and transfer rules before implementation; recurring measures do not open episodes. Every new patient must have an intake record and complete intake with a recorded proceed-to-assessment outcome before the core assessment or ongoing-care pathway can begin. Registration alone does not satisfy intake; repeat measures in an existing care episode do not trigger new-patient intake. See L-27 and D-25.
- **FR-02:** Provide the proposed shared eligibility/needs core for incoming people proceeding through assessment, subject to clinical confirmation of its content and applicability. Referral source informs triage without automatically selecting a different core.
- **FR-03:** Support configurable conditional modules based on programme/treatment allocation, presentation, and clinician judgement.
- **FR-04:** Allow a clinician to add an eligible module intentionally, with the reason visible in the record.
- **FR-05:** Pin an approved instrument version when creating an assignment. Responses and resumed drafts retain that version. A later publication does not silently change an existing assignment or relabel its answers. Detailed version and scoring rules are specified in FR-13.
- **FR-06:** Store each baseline or follow-up collection as a distinct occurrence within the care episode, with its planned date/window and actual collection timestamps. Support configurable review cadence, including monthly collection if approved. Confirm the YSCC schedule anchor and handling of late reviews; the headspace 90-day anchor is reference information [CB4].
- **FR-07:** Show response history and dated stream/team changes. Display source, version, and coverage limitations, including current-only imported snapshots and unavailable history. Compare scores only where the approved scoring/version mapping supports comparison. Retain response/correction history under the agreed policy; do not fabricate disposed or overwritten records.
- **FR-08:** Track assignment progress, delivery/link/session state, response submission, the applicable clinical-review requirement/state, and correction history separately, as described below. Derive overdue indicators from due windows and active outstanding work. A submitted response can be pending review, reviewed, or explicitly not require a separate review under an approved instrument/mode/assistance rule. Fulfilling one assignment does not complete its assessment; correction does not reopen collection automatically. The current prototype rule is specified in L-14 and remains subject to D-10.

### Record structure and data-quality requirements

- **FR-09:** Model person, care episode, assessment instance, collection point, measure assignment, delivery attempt/session, response, respondent, and correction as linked records with distinct identifiers. Add occasions of service and satisfaction surveys if adopted. Imported identifiers and record grain must remain traceable to their source; internal events must not be inferred solely from export column names. Include separately identified intake and onward-referral records, with source, state history, accountable owner and links to the person and relevant episode when established. An incoming referral can be registered before episode linkage is settled; it must not fabricate admission or a new course of care. See the intake/referral contract in document 05, section 7.
- **FR-10:** Distinguish planned/due, sent, delivery failure, opened, started, submitted, clinically reviewed, and service timestamps where applicable. Use a separate completion timestamp only for a defined event distinct from submission. Preserve original imported date meanings and identify any derived date and its derivation; unknown timestamps stay unknown.
- **FR-11:** Distinguish intentional nonresponse (prefer not to answer or permitted skipping), missing data, and answer validation errors. If importing headspace data, map legacy 995/997/999 to their corresponding states and 998 to invalid/out-of-standard data with provenance [CB1]. Use “not applicable” only where an approved instrument defines it. Preserve valid zero values; never score a sentinel code as a clinical value. Requiredness and permitted skipping are defined per item/version.
- **FR-12:** Store single- and multi-select answers according to each item's allowed cardinality. Map approved selections to comma-delimited export values only where required. Flag multiple values in single-value fields as data issues; do not interpret every comma-delimited legacy field as a valid multi-select [CB1].
- **FR-13:** Implement FR-05 with versioned items, response options, scoring rules, and terminology attached to the version actually presented. For ordinal Likert-style items, version the recall period, scale type, response order and full verbal anchor for every point; do not present unexplained numbers as the participant-facing scale. Keep a neutral midpoint, permitted nonresponse and instrument-defined not-applicable choices semantically distinct. Nonresponse is not a midpoint and must not be scored as a scale value. Score with that version's approved rules. Any authorised re-scoring retains the original result and records the new rule version/reason. Imported responses retain known source versions or an explicit unknown version; do not assign the currently published version by default.
- **FR-14:** Distinguish registered/home centre from service-delivery centre, with dated ownership changes where captured. Cross-centre care uses an approved permission rule; receiving a service at another centre does not automatically grant unrestricted record access.
- **FR-15:** If satisfaction collection is adopted, keep person and family surveys separate, with approved eligibility, timing, respondent relationships, access, skipping, and reasons for not sending. Their submission does not complete a clinical assessment or establish guardian authority.

### Multi-channel delivery requirements

- **FR-16:** Reuse a single instrument version across its clinically approved respondent and delivery modes. Mode selection must respect instrument eligibility; an instrument requiring clinician input cannot automatically be assigned for independent self-report.
- **FR-17:** Record who supplied the answers, who entered them, any assistance or joint participation, and the delivery mode separately. Link a response to the relevant assignment and delivery attempt/session, recording only events actually observed. Account-free access must not imply that respondent identity was independently verified.
- **FR-18:** Generate expiring, account-free SMS links with an approved recipient-verification and contact-suitability approach. Explain answer visibility and prevent access to unrelated content. Define reissue, cancellation, and concurrent-attempt behaviour so one assignment cannot be silently fulfilled twice; preserve abandoned or superseded attempts without merging their answers.
- **FR-19:** Configure reminders, expiry, and follow-up by assignment and approved cadence. Before sending, recheck applicable consent/permissions, contact preferences, outstanding response state, and any pause, referral, or closure. Stop ordinary collection reminders after fulfilment. Record the disposition of outstanding requests at episode closure rather than leaving them active by default.
- **FR-20:** Provide a tablet session mode that clears respondent context and content after completion, cancellation, timeout, or staff reset.
- **FR-21:** Support clinician-rated, respondent-reported, and jointly completed content where the instrument permits it. A clinician transcribing the person's own answer records the person as its source and themselves as recorder. Joint completion remains identifiable, as illustrated by the codebook [CB5]. An alternative mode requires clinical eligibility and cannot silently substitute a clinician rating for a missing self-report.

### Consent, privacy, and safeguarding requirements

- **FR-22:** Treat each consent as a versioned, purpose-specific request rather than a single record-level setting. Authorised staff select an approved consent item from a library, set its person and care-episode scope where applicable, confirm the decision-maker/authority and eligible delivery channel, then send a traceable request. Store the pinned information version, request/delivery history, current status, decision-maker and effective times. Define care/data collection, contact and secondary-use purposes with owners; the headspace research-consent extract filter is not a universal care-access rule.
- **FR-23:** Let the authorised participant accept or decline the specific sent request through its approved channel. Check the approved authority, current request status and action-specific consent requirements before collection, sending or access. Show a blocking reason and owner when requirements are unmet. A declined, expired, cancelled or withdrawn request cannot be treated as acceptance; declining one purpose must not blanket-block unrelated permitted actions. Sample policy values are allowed in a labelled prototype; production behaviour requires the approved rules.
- **FR-24:** Let the decision-maker withdraw an accepted consent for its specific purpose/scope, recording the effective time and preserving the earlier request, delivery and decision history. Apply approved rules to affected links, reminders, access, secondary use and retention. A withdrawal is not an edit back to “not recorded”, does not silently delete history, and does not by itself permit indefinite retention; authorised retention/disposal is a separate process.
- **FR-25:** Provide approved person and guardian pathways, distinguishing relationship, respondent role, and decision-making authority. Age alone or being a family respondent must not be used as an invented consent policy.
- **FR-26:** Give self-report respondents a clear support/safety route appropriate to their setting; escalation rules must be clinically governed before activation.
- **FR-27:** Limit participant access to the content permitted for their role and collection context. Separate submissions are not automatically shared with family/guardians. Any approved joint-completion or answer-sharing experience must explain visibility before participation; tablet sessions must not expose staff-only content.

### Roles, scope, and audit requirements

- **FR-28:** Enforce centre, cluster, and whole-system data scopes by role.
- **FR-29:** Separate permissions to view, create, submit, correct, approve, configure, and administer. Allow Clinicians and Data Managers to edit submitted responses within their authorised record scope, including responses already clinically reviewed. Response-edit permission does not grant clinical-review approval or unrestricted cross-centre access. Retain the Data Officer evidence rule in FR-30.
- **FR-30:** Permit a Data Officer to directly correct data only where external verified information exists; otherwise support a request-back-to-clinician workflow.
- **FR-31:** Permit Orygen Data Managers to resolve duplicate and misaligned records with recorded centre support.
- **FR-32:** Record every saved response edit and other correction in an append-only audit history with the target response/item and revision, prior value, new value, editor identity and role, timestamp, required reason, and source/reference where relevant. Save the response change and its audit event together; a save cannot succeed without its log. Retain the original answers and respondent/recorder provenance and identify the editor separately. Cancelled or unchanged edits do not alter the response or create a correction event. Apply the agreed retention policy to records and audit data; correction is not a disposal operation.
- **FR-33:** Make audit history readable to authorised users without exposing it in self-report experiences.
- **FR-34:** Support duplicate detection, record-linking/merge review, and a recoverable resolution process; irreversible merge rules need separate approval.

### Workflow and operational requirements

- **FR-35:** Give each role responsible for operational work a scoped queue of assignments and review/correction tasks, with derived due/overdue indicators, blockers, and completion status. Configure role responsibilities before presenting a queue to every internal user. Include intake awaiting information/triage, waiting work and unresolved onward referrals, including externally performed steps; retain their responsible YSCC owner and follow-up date.
- **FR-36:** Clearly show ownership, next step, applicable due date, and any blocking reason for an assessment or assignment. Where work is paused or closed incomplete, retain its reason and follow-up/closure decision. For intake and referrals, show the current waiting/blocking reason, responsible actor, next action and next review date; creating a record or sending a referral is not completion.
- **FR-37:** Record assessment progress/completion, admission disposition, pause/closure reason, and onward referral as separate dimensions. Proposed dispositions are undecided, admitted, and not admitted; final reason codes require approval. Support incomplete-assessment exits, specific referral destinations/next actions, and dated stream/team allocation. Referral source remains a separate intake fact. Only people continuing care enter the recurring-care workflow. Track onward-referral preparation, sending outcome, receipt, receiving-service decision and handover resolution as distinct facts, with evidence and actual timestamps. A failed, unanswered or declined referral remains owned follow-up work until an authorised resolution is recorded. Intake completion and its proceed/do-not-proceed outcome remain separate from clinical admission.
- **FR-38:** Support authorised handover and episode closure with an owner, next action, outstanding-task disposition, and effective date. Resolve whether a transfer continues the same episode or starts another through the approved episode rules, preserving history and scope. Reconcile unresolved onward referrals as well as collection tasks. A sent referral or closed episode does not by itself prove that another service accepted responsibility; retain a named owner until the approved handover/alternative-resolution conditions are recorded.
- **FR-39:** If service logging is adopted, record direct and indirect occasions when they occur throughout care. Include type, team, service-delivery centre, service date, duration in minutes, provider type, and relevant delivery details. Distinguish service mode from questionnaire delivery mode. Enforce each field's allowed cardinality and link events to the care episode.
- **FR-40:** Provide configurable notification templates and delivery conditions; no production message copy should be finalised until clinical/legal review.

### Quality, accessibility, and reliability requirements

- **FR-41:** Meet WCAG 2.2 AA for web and tablet workflows, including keyboard navigation, semantic structure, contrast, focus management, and screen-reader labels.
- **FR-42:** Use plain, age-appropriate language in respondent experiences; reading level and translations require clinical/content review.
- **FR-43:** Design mobile self-report first, with responsive support for desktop and tablet.
- **FR-44:** Show whether answers are unsaved, saved as a draft, or submitted. Apply the approved draft-storage/resume rules for the respondent and channel; do not promise cross-device resume where it is unavailable. Session clearing and saved-draft retention are separate behaviours. A failed save must provide a clear recovery action and must not show submission success.
- **FR-45:** Provide clear recovery when a link expires, connectivity fails, or a measure is already completed.
- **FR-46:** Log security-relevant access and permission events in addition to correction events.

### Status model supporting FR-08

These are proposed state dimensions; final labels and transitions require operational review.

| Dimension           | Example states or events                                                                                  | Meaning                                                                                                                                                                                       |
| ------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Assignment          | Planned, active, paused, fulfilled, cancelled                                                             | Work requested for a particular respondent, instrument version, and collection point. Decline or cancellation reasons are retained. “Not assigned” means no assignment exists.                |
| Delivery attempt    | Queued, sent, failed; opened event where observed                                                         | A single attempt to deliver or start access. Sending is not proof of receipt or completion. Reissuing creates a traceable new attempt.                                                        |
| Link/tablet session | Active, expired, revoked, ended                                                                           | Whether access remains available. Expiry does not erase a response or cancel the assignment automatically.                                                                                    |
| Response            | Draft, submitted, abandoned                                                                               | The answer record. Permitted skips can be present in a valid submitted response. Abandoned drafts are not completed submissions.                                                              |
| Assessment progress | In progress, paused, complete, closed incomplete                                                          | Progress of the assessment as a whole. Completion criteria must be defined independently of one response's submission.                                                                        |
| Clinical review     | Not required, pending, reviewed; governing rule/reason, review date and evidence version where applicable | Whether a separate review is required and, when required, a clinician's review of the available evidence. Submission or a not-required result does not automatically complete the assessment. |
| Consent request     | Planned, sent, accepted, declined, expired, cancelled, withdrawn                                          | A versioned purpose/scope request. Sending is not a decision; withdrawal preserves the earlier acceptance and affects only the approved purpose.                                              |
| Timeliness          | Due soon, overdue                                                                                         | Derived from the approved due window and active outstanding work. These flags can coexist with delivery and response states.                                                                  |
| Correction          | Original record plus correction events                                                                    | Revision history of submitted or recorded data. A correction does not make a response outstanding again.                                                                                      |

For example, one assignment can be active and overdue, have an expired SMS link, and retain a saved draft. The UI should show the next action for that combination. It must not force all four facts into one mutually exclusive status.

## 3. Rule catalogue

These are proposed operational rules derived from the FRs. Decision owners and unresolved parameters are in [product framing](01-product-framing.md). Rules are evaluated in the action's actual person, episode, role, and purpose context.

### L-01 — Person and episode identity

- **Trigger:** Intake, return, transfer, review scheduling, or record selection.
- **Logic:** Resolve an authorised person record first, then select or create the episode using approved boundary rules. A time-based review creates a collection point in the existing episode, not a new episode.
- **Blocked/exception:** Possible duplicate or ambiguous new/reopened/transferred episode → named resolution owner; no silent merge or guessed episode identity.
- **Record:** Person and episode IDs, source IDs where imported, episode dates/ownership, decision reason.
- **Trace:** FR-01, FR-09, FR-14, FR-34, FR-38; D-09, D-12, D-14.

### L-02 — Core and conditional assignment

- **Trigger:** Proceed to assessment or new clinical information during review.
- **Logic:** Apply the approved shared core and eligible conditional rules. An authorised clinician may intentionally add an eligible module with a visible reason. A rule recommendation is not a diagnosis.
- **Blocked/exception:** Unapproved content or conflicting rules → route to clinical/content owner. Referral source alone does not select a different core.
- **Record:** Assessment instance, assignment, triggering rule/version or clinician rationale, owner.
- **Trace:** FR-02–FR-04, FR-36; D-01–D-02.

### L-03 — Respondent and mode eligibility

- **Trigger:** Assignment setup, sending, session start, or proposed mode switch.
- **Logic:** Validate instrument version × respondent role × assistance/joint mode × delivery mode. Keep respondent, recorder, and facilitator distinct. Recheck purpose/contact/context before the action.
- **Blocked/exception:** An ineligible independent self-report cannot replace clinician-rated content; staff transcription does not turn self-report into a clinician rating. Offer another eligible mode or staff follow-up.
- **Record:** Actual source/recorder/assistance/mode and delivery attempt/session.
- **Trace:** FR-16–FR-21, FR-23, FR-27; D-03, D-07, D-18.

### L-04 — Version pinning and scoring

- **Trigger:** Assignment creation, form rendering/resume, scoring, or new publication.
- **Logic:** Pin the approved version at assignment creation. Every display, validation, and score uses that version's items/options/rules. New publication affects eligible new assignments, not existing drafts/responses.
- **Blocked/exception:** Unknown imported version stays unknown. Do not score with today's rules by default. Approved rescoring adds a traceable result with rule version/reason and preserves the original. Urgent withdrawal/replacement of a published version needs an explicit reviewed procedure, not silent substitution.
- **Trace:** FR-05, FR-07, FR-13; D-02, D-13, D-16.

### L-05 — Answer state and requiredness

Validate with the presented instrument's approved rules. This mapping applies to legacy imports, not raw codes displayed to participants.

| Source value/state                           | Meaning                                             | Handling                                                                                                  |
| -------------------------------------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Valid answer, including a valid numeric zero | Answer supplied within the item's valid domain.     | Retain and score only using the applicable rule.                                                          |
| 995                                          | Prefer not to answer.                               | Intentional nonresponse; do not score as numeric 995.                                                     |
| 997                                          | Skipped.                                            | Preserve skip state; completion eligibility depends on item/version rules.                                |
| 999                                          | Missing/not answered.                               | Preserve missing state; do not relabel as an intentional refusal.                                         |
| 998                                          | Invalid/out-of-standard answer or data-entry error. | Flag data-quality issue with raw source/provenance; never relabel as not applicable or score numerically. |
| Not applicable                               | Only an explicit approved instrument option/rule.   | Do not infer from 998, blank data, or an absent historic record.                                          |

A valid submitted response may include permitted nonresponses. Requiredness is item/version-specific; do not require a clinical value where approved skipping is allowed. Missing or invalid data never becomes zero to make a score computable.

**Trace:** FR-11, FR-13; CB1; D-02, D-16.

### L-06 — Cardinality and imports

- **Trigger:** Answer entry, validation, import, or export mapping.
- **Logic:** Store single values and arrays according to each item's cardinality. Parse legacy comma-delimited content only using an approved field mapping.
- **Exception:** Multiple service-length values are a flagged source issue, not proof that duration is multi-select. Keep raw source values available to authorised data-quality work.
- **Trace:** FR-09, FR-11–FR-12, FR-39 conditionally; CB1; D-15–D-16.

### L-07 — Action-specific permission gate

- **Trigger:** View, create, collect, send, submit, share, correct, configure, or administer.
- **Logic:** Evaluate applicable role capability, data scope, purpose/authority, record context, and current action prerequisites. Recheck at the server-side mutation/access boundary; a visible button is not authorisation.
- **Blocked/exception:** Explain the next permitted action and responsible owner without leaking protected facts. A refusal for one purpose must not blanket-block a different permitted purpose.
- **Record:** Applicable decision/policy versions and security-relevant events as approved.
- **Trace:** FR-22–FR-23, FR-28–FR-29, FR-46; D-04–D-07, D-12.

### L-07a — Consent request lifecycle

- **Trigger:** Staff need consent for a purpose, or an authorised decision-maker opens, accepts, declines or withdraws a consent request.
- **Logic:** Staff select an approved consent item/version from the library, confirm purpose, person and episode scope where applicable, authority, contact suitability and eligible channel, then create and send one traceable request. A participant-facing request presents the pinned information and the explicit choices **Accept** and **Decline**. The accepted decision is effective only after confirmed persistence. A later withdrawal changes that same request to **Withdrawn** with an effective time; it never overwrites the original decision.
- **States:** Draft/planned → sent → accepted or declined. A sent request may expire or be cancelled before a decision. An accepted request may be withdrawn. Every transition records actor, authority context where required, actual time, information version and delivery/decision evidence.
- **Blocked/exception:** Only the approved decision-maker and channel may act. Uncertain authority, unsuitable contact, expired/revoked access, duplicate/competing decision or unavailable policy must show a safe next step and leave the last confirmed state intact. A new request is required after a decline, expiry or withdrawal only where the approved policy permits it; it does not silently reinstate permission.
- **Effects:** The action gate uses the current accepted request at the required purpose/scope. Decline/withdrawal cancels or revokes only the affected future access, links and reminders under policy; unrelated accepted purposes and submitted-history treatment remain independent.
- **Trace:** FR-22–FR-25, FR-40, FR-46; D-04–D-07, D-11.

### L-08 — Guardian authority and relationship

- **Trigger:** Record respondent relationship or a decision made on someone's behalf.
- **Logic:** Store relationship, respondent role, and verified decision-making authority separately. Apply the approved authority pathway for this purpose/context.
- **Blocked/exception:** Family relationship, recipient contact details, or age alone must not implement an invented consent policy. Uncertain authority goes to a named human review route.
- **Trace:** FR-22, FR-25, FR-27; D-04–D-05.

### L-09 — Participant visibility and session boundaries

- **Trigger:** Open participant access, change respondent/context, or end tablet use.
- **Logic:** Expose only the assigned permitted content. Explain any approved joint/shared visibility before participation. Keep staff-only notes, audit, and unrelated responses outside participant sessions.
- **End/reset:** Completion, cancellation, timeout, or staff reset clears local participant context and prevents browser back from revealing it. Staff re-entry requires authentication **and** the appropriate authorisation.
- **Exception:** Session clearing is not a decision to delete a server-side draft; draft retention/resume follows L-10 and policy.
- **Trace:** FR-20, FR-27–FR-29; D-05, D-18.

### L-10 — Draft saving and resumption

- **Trigger:** Answer change, explicit save, navigation, interruption, timeout, or return.
- **Logic:** Distinguish unsaved input, save in progress, confirmed saved draft, save failure/uncertainty, and submitted response. Display “saved” only for confirmed persistence.
- **Recovery:** Preserve recoverable input only within approved storage/privacy rules; provide retry or supported exit. Explain unsaved changes before an exit that would lose them.
- **Resume:** Require permitted access to the same assignment/version and eligible draft. Do not promise offline or cross-device resume unless implemented and approved. Never silently combine drafts from different attempts.
- **Trace:** FR-05, FR-18, FR-20, FR-44–FR-45; D-06, D-18.

### L-11 — Submission and single fulfilment

- **Trigger:** Submit response.
- **Logic:** Recheck access, assignment eligibility, pinned version, and item rules. Persist the accepted response and assignment fulfilment consistently; record actual respondent/recorder/attempt/timestamp. Confirm only after the persisted result is known.
- **Concurrency proposal:** Use a stable submission operation identifier and atomic assignment-fulfilment check so a retry cannot create a second accepted fulfilment. A competing attempt receives an explicit already-submitted/conflict outcome. Preserve its provenance under policy; do not merge answers automatically.
- **Exception:** Unknown network result → check persisted operation/assignment outcome before another attempt. One accepted response does not complete the assessment or clinical review.
- **Trace:** FR-08–FR-10, FR-17–FR-18, FR-44–FR-45; D-10, D-18.

### L-12 — Delivery, reissue, and mode change

- **Trigger:** Send/retry/reissue invitation, open link, or switch collection channel.
- **Logic:** Each delivery attempt is traceable. Sent means sent, not received or answered. Apply approved expiry/verification. Reissue keeps the assignment/time point and pinned version; it does not create a new clinical response occurrence.
- **Exception:** Explicitly reconcile older access/drafts under D-18. Revocation/supersession of a link must not silently discard history. If the assignment is already fulfilled, do not start ordinary collection again.
- **Feedback:** Distinguish sending failure, expired/revoked access, unavailable task, and already submitted where disclosure policy permits.
- **Trace:** FR-08, FR-18–FR-19, FR-45; D-07, D-11, D-18.

### L-13 — Reminders

- **Trigger:** Scheduled reminder becomes eligible for dispatch.
- **Logic:** At dispatch, recheck current permission, contact suitability/preferences, assignment still outstanding, due/cadence rules, and pause/withdrawal/referral/closure restrictions.
- **Stop:** Fulfilment stops ordinary collection reminders. A correction does not restart them. Expired access requires the approved recovery policy, not a reminder that sends the person to unusable access without explanation.
- **Record:** Attempt, template/version, dispatch outcome, and suppression reason where permitted.
- **Trace:** FR-06, FR-08, FR-18–FR-19, FR-40; D-07–D-08, D-11.

### L-14 — Clinical review and assessment completion

- **Trigger:** Clinician opens review or records an assessment decision.
- **Logic:** Show required/conditional assignments, their actual state, provenance, version limits and whether a separate clinical review is required. If required, record reviewer/date and the specific evidence set reviewed. If not required, retain the approved instrument/mode/assistance rule or reason; do not label that result as a clinician review.
- **Completion:** Apply the approved assessment completion criteria; never infer full completion from one submitted response or a review of partial evidence. Additional modules repeat L-02/L-03/L-07.
- **Exception:** Missing evidence supports a recorded next action, pause, or closed-incomplete pathway. A later correction flags the affected reviewed evidence for the approved re-review procedure without erasing the original review or restarting collection.
- **Current prototype rule:** Clinician entry and supported clinic-tablet completion are recorded as **Review not required**; other submitted participant responses remain pending until a clinician records review. This makes the state testable but does not approve the production policy. D-10 must define it by instrument, respondent, channel and assistance context.
- **Trace:** FR-03, FR-07–FR-08, FR-36–FR-37; D-02, D-10, D-13.

### L-15 — Disposition and routing

- **Trigger:** Clinical disposition or handover decision.
- **Logic:** Record assessment progress, admission disposition, referral action/destination, closure/pause reason, and dated stream/team allocation separately.
- **Branch:** Continuing care requires a responsible team/owner and next plan before recurring collection. Not-admitted or incomplete-exit records do not automatically enter that loop.
- **Exception:** An onward referral may accompany a disposition; it is not an exclusive substitute for admitted/not admitted. Actual referral communication/integration is not assumed by recording the action.
- **Trace:** FR-14, FR-36–FR-38; D-09–D-12.

### L-16 — Repeated collection and timeliness

- **Trigger:** Approved baseline/follow-up scheduling event.
- **Logic:** Create a distinct collection point/assignment in the episode using approved cadence, anchor, window, and instrument. Retain actual events separately from due dates.
- **Timeliness:** Derive due-soon/overdue only for active outstanding work using the approved window/timezone. Expired link and overdue assignment can coexist.
- **Exception:** Monthly collection is enabled only when approved. Late/missed collection must follow D-08 rather than silently shifting all future dates.
- **Trace:** FR-01, FR-06–FR-08, FR-10, FR-19; D-08–D-09.

### L-17 — Pause or incomplete exit

- **Trigger:** Assessment/assignment cannot or should not continue under the current plan.
- **Logic:** Record affected scope, actual progress, reason, owner, and next action or closure decision. Reconcile outstanding outreach using D-11.
- **Exception:** A missing answer or declined measure does not universally close the episode. A closed-incomplete assessment preserves partial responses and does not pretend they meet full completion criteria.
- **Trace:** FR-08, FR-19, FR-23, FR-36–FR-38; D-10–D-11.

### L-18 — Handover and closure reconciliation

- **Trigger:** Transfer of work or episode closure.
- **Logic:** Show an impact list of pending assignments, links, drafts, reviews, reminders, and owners. Record the approved treatment of each category, next-care action, effective time, and responsible owner.
- **Exception:** Do not leave pending work active by omission. Approved post-closure contact must be explicit. If reconciliation cannot finish, show incomplete action and a responsible recovery path; do not present fully successful closure while outbound work is uncontrolled.
- **History:** Do not erase partial responses or infer a new episode on transfer. Episode boundaries, retention, and access use their own approved rules.
- **Trace:** FR-01, FR-19, FR-24, FR-36–FR-38; D-06, D-09–D-11.

### L-19 — Withdrawal and retention

- **Trigger:** Valid withdrawal/permission change.
- **Logic:** Record purpose, authority, effective time, and decision information; compute affected future collection/contact/access/secondary-use actions using the approved policy.
- **Exception:** Unrelated permitted purposes remain separate. Retention or disposal is governed independently of routine correction and is never inferred as “delete everything” or “keep forever.”
- **Feedback:** Communicate only approved consequences; unresolved policy must block the affected production capability.
- **Trace:** FR-22–FR-25, FR-32; D-04–D-06, D-11.

### L-20 — Correction and review provenance

- **Trigger:** A record/response error is discovered.
- **Logic:** A Clinician or Data Manager can edit submitted responses within authorised scope, review the before/after values, provide a reason, and save with an audit event for every changed item. An authorised Data Officer requires an approved verified external source and correct field scope; without corroboration, request clinician correction. Clinical-review approval remains separate from editing.
- **Concurrency:** Recheck the current revision before commit; if someone else changed it, show the new state and require renewed review rather than overwriting it silently.
- **Effect:** Preserve original respondent/recorder, submitted state, and audit. No new longitudinal response or ordinary reminder. Scoring/re-review consequences use D-13 and retain original results/reviews.
- **Trace:** FR-08, FR-13, FR-29–FR-30, FR-32–FR-33; D-13.

### L-21 — Duplicate and misaligned record resolution

- **Trigger:** Suspected duplicate or incorrect record linkage.
- **Logic:** Open a scoped resolution case; compare evidence and dependencies; record required centre support; preview impact; perform only the approved recoverable action.
- **Exception:** Suspected similarity is not proof of identity. No automatic irreversible merge; uncertain cases remain assigned for investigation. Preserve source IDs, prior link history, actor, and approval.
- **Trace:** FR-09, FR-14, FR-28–FR-29, FR-31–FR-34; D-12, D-14.

### L-22 — Date and event semantics

- **Trigger:** Event recording, import, timeline, or reporting.
- **Logic:** Store planned/due separately from observed sent, failed, opened, started, submitted, reviewed, and service events. Define timezone/date-only semantics in the data contract. Unknown stays unknown.
- **Exception:** A codebook survey date may mean a due date, provider-entered date, or creation date depending on the batch. Derived discharge dates retain the derivation and source; never relabel them as a directly observed clinical event.
- **Trace:** FR-06, FR-09–FR-10; CB3–CB4; D-08, D-16.

### L-23 — Historical views and comparisons

- **Trigger:** View trends, previous episodes, or imported history.
- **Logic:** Show selected episode, collection date meaning, instrument/version, respondent/mode, and source. Compare scores only when approved mapping supports it; segment or suppress unsupported comparison.
- **Exception:** Current-only snapshots, disposed/overwritten history, and unknown versions must be visibly labelled. No history found does not mean no previous care or zero symptoms.
- **Trace:** FR-07, FR-10, FR-13; CB2–CB3, CB7; D-06, D-16.

### L-24 — Role and data scope

- **Trigger:** Search, record access, operational counts, deep link, or data mutation.
- **Logic:** Enforce capability and centre/cluster/system scope, including approved cross-centre exceptions. Counts, autocomplete, exports if adopted, and audit views use the same authorisation boundary.
- **Exception:** Service-delivery centre does not automatically grant full person-record access. A configuration administrator or service lead does not automatically receive clinical answer access.
- **Trace:** FR-14, FR-27–FR-29, FR-35, FR-46; D-05, D-12.

### L-25 — Configuration lifecycle

- **Trigger:** Edit or publish instrument, workflow, purpose, role, cadence, or message settings.
- **Logic:** Separate draft configuration, approval authority, effective version, and publication. Preview with synthetic data and check affected workflows before enabling. Retain configuration and security audit.
- **Exception:** Configuration permissions do not grant clinical/legal authority. Existing assignments stay pinned under L-04; policy/access changes follow their approved effective-time rules. Do not silently treat a failed publication as active.
- **Trace:** FR-05, FR-13, FR-19, FR-22–FR-29, FR-40, FR-46; D-02–D-08, D-12, D-17–D-19.

### L-26 — Conditional record types

- **Trigger:** D-15 approves satisfaction or service logging.
- **Satisfaction:** Distinct person/family assignments, eligibility, permitted skipping, visibility, timing, and non-sending reasons. A submitted satisfaction survey does not complete a clinical assessment.
- **Service:** Separate direct/indirect events recorded when they occur, with episode, actual service centre/date/duration/provider and approved cardinality. Service mode is distinct from questionnaire channel.
- **Exception:** Do not expose conditional navigation or collect conditional fields before adoption. A supplied codebook is not an import/export contract or an instrument licence.
- **Trace:** FR-15, FR-39; CB4, CB6; D-15–D-16.

### L-27 — Mandatory intake for new patients

- **Confirmed rule:** Every new patient goes through intake (U1/D-25). Creating a person, receiving a referral, granting permission or selecting a channel does not complete intake.
- **Gate:** Before first core-assessment creation/activation or entry to ongoing care, require the person's relevant intake to be completed with an authorised proceed-to-assessment outcome, identified decision-maker/time, resolved required intake checks and a receiving assessment owner. Recheck at the action boundary; a deep link or previously open screen cannot bypass it. Clinical admission remains a later, separate decision.
- **Allowed work while pending:** Registration, intake information gathering, applicable permission checks, approved triage/support and onward-referral work. This gate must not prevent access to the approved support route. It does not invent the clinical content of triage.
- **Exceptions:** Closed-incomplete or completed/do-not-proceed intake cannot start the core assessment. Previously supplied information may be reviewed and reused with provenance, but an external referral or historic person record never auto-completes YSCC intake. Existing continuing-care reviews use their current episode; returning/transferred cases follow D-09 and must have a documented relevant intake determination.
- **Trace:** FR-01, FR-09, FR-23, FR-36–FR-38; D-09–D-10, D-25–D-26; AC-23–AC-25, AC-28.

### L-28 — Registration, triage and waiting work

- **Trigger:** New patient/referral, resumption of intake, missing information or a triage decision.
- **Logic:** Capture the section 7 registration fields, search/match within scope, create or link the person and open the intake. Save partial information with explicit unknown/missing states; do not invent identity, contact or consent values to pass validation. Block progression where a required identity/clinical check remains unresolved.
- **States:** Received, in progress, awaiting information, awaiting triage, waiting, completed or closed incomplete. Completion requires a recorded outcome; waiting is not a clinical decision. Preserve every transition's actor, time and reason. Waiting for assessment after completed/proceed intake is a downstream work state, not a reversal of intake completion.
- **Ownership:** Every unresolved intake has a YSCC owner, next action and next review date. Information arrival returns it to an owned intake/triage task. No reply, elapsed time or a queue count can automatically mean declined/admitted/completed.
- **Trace:** FR-09, FR-28–FR-29, FR-34–FR-38; D-12, D-26; AC-23–AC-25, AC-29.

### L-29 — Onward-referral follow-through

- **Trigger:** Intake exit, clinical decision, transfer or other authorised onward referral.
- **Logic:** Create a linked referral with destination, purpose, permission to share, permitted information, YSCC owner and follow-up date. Record preparation, each actual sending attempt, evidence of receipt, receiving-service response and handover resolution separately. Unknown events remain unknown; a recorded intention or generated document is not delivery.
- **Recovery:** Failed sending, requests for information, no response or a declined referral each creates/retains an owned next action. Retry attempts preserve history. Record an alternative plan if the referral cannot proceed; do not convert failure into successful acceptance.
- **External steps:** Record the external service/system, responsible contact when known, approved reference/evidence, actual event time and recorder. Manual verification is supported; integration is not assumed. Retain YSCC follow-up ownership until the approved acknowledgement/alternative-resolution conditions are recorded, including after episode closure.
- **Trace:** FR-09, FR-10, FR-22–FR-24, FR-35–FR-38, FR-46; D-05, D-11–D-12, D-27; AC-26–AC-27.

## 4. State transitions and invariants

The dimensions in section 2 are independent. D-25 confirms mandatory intake. Detailed transitions require D-10/D-11/D-18 and intake/referral decisions D-26/D-27; it is not a final backend enum contract.

| Object                   | Trigger                    | Proposed transition/effect                                                  | Guard or recovery                                                                                                                 |
| ------------------------ | -------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Assignment               | Approved launch            | Planned → active                                                            | Eligible version/respondent/context and action permission.                                                                        |
| Assignment               | Pause/resume               | Active → paused → active                                                    | Authorised action, reason, and outreach/draft treatment; resume rechecks current rules.                                           |
| Assignment               | Accepted submission        | Active → fulfilled                                                          | One accepted fulfilment; submitted response remains linked.                                                                       |
| Assignment               | Cancel                     | Planned/active/paused → cancelled                                           | Reason and reconciliation of access/drafts; do not erase history.                                                                 |
| Fulfilled assignment     | Error found                | Remains fulfilled                                                           | Use correction or separately approved new collection, not reopening by default.                                                   |
| Response                 | Save                       | Unsaved interaction → persisted draft                                       | “Saved” only after confirmation; failed save stays visibly unresolved.                                                            |
| Response                 | Submit                     | Draft → submitted                                                           | Current permission, valid item rules, atomic fulfilment check.                                                                    |
| Response draft           | Abandon/supersede          | Draft → abandoned if approved                                               | Preserve disposition/provenance and apply retention; no silent draft merge.                                                       |
| Delivery attempt         | Dispatch                   | Queued → sent or failed                                                     | Actual provider outcome; no inferred receipt.                                                                                     |
| Link/session             | Access ends                | Active → expired/revoked/ended as appropriate                               | Does not itself fulfil/cancel assignment or erase server draft.                                                                   |
| Consent request          | Select and send            | Planned → sent                                                              | Approved library item/version, scope, authority, contact/channel and actual dispatch outcome; sent is not a decision.             |
| Consent request          | Participant decision       | Sent → accepted or declined                                                 | Approved decision-maker/channel, current request and confirmed persistence; preserve pinned information and decision evidence.    |
| Accepted consent request | Withdrawal                 | Accepted → withdrawn                                                        | Record decision-maker, effective time and policy-defined impact; preserve prior accept and do not reinstate through a staff edit. |
| Consent request          | Expiry/cancel              | Planned/sent → expired or cancelled                                         | Reason and delivery/access reconciliation; a non-decision is not a decline or acceptance.                                         |
| Assessment               | Pause/resume               | In progress → paused → in progress                                          | Reason, owner, next action; no implied clinical completion.                                                                       |
| Assessment               | Approved decision          | In progress/paused → complete or closed incomplete                          | Explicit completion criteria or incomplete-exit reason; preserve evidence.                                                        |
| Review                   | Evidence reviewed          | Pending → reviewed for identified evidence set                              | Later evidence/correction is identifiable; re-review policy separate.                                                             |
| Episode                  | Close                      | Closure action reconciles tasks and records end state                       | Episode enum/reopening rules remain open; no fabricated complete assessments.                                                     |
| Intake                   | New patient saved          | No intake → received/in progress                                            | New person creation opens intake; no automatic assessment assignment.                                                             |
| Intake                   | Information/triage pending | In progress ↔ awaiting information/awaiting triage/waiting                  | Owner, reason, next action and next review date remain visible.                                                                   |
| Intake                   | Authorised decision        | In progress/awaiting triage → completed + explicit outcome                  | Proceed outcome opens assessment planning; do-not-proceed records a next-care plan/referral.                                      |
| Intake                   | Ends before decision       | Unfinished intake → closed incomplete                                       | Reason, owner and next action; no assessment/admission success implied.                                                           |
| Onward referral          | Send/receive/decision      | Record each independent event and status                                    | Sent is not received; received is not accepted; accepted is not automatically handover complete.                                  |
| Onward referral          | Resolve                    | Open follow-up → acknowledged handover or documented alternative resolution | Evidence and responsible actor; no auto-resolution on episode closure.                                                            |

Core invariants:

- Active + overdue assignment + expired link + saved draft is valid; present all facts and a permitted next action.
- A newly registered patient with unfinished intake cannot begin core assessment; intake progress, assessment progress and admission are separate.
- Submitted response and pending clinical review is valid.
- A reviewed partial assessment can remain in progress or closed incomplete.
- A completed assessment can have a not-admitted disposition and an onward referral.
- A correction changes the interpreted record through an audit event, not the collection time point.
- A consent request being sent is not consent. A decline, expiry, cancellation or withdrawal is not a missing value and cannot satisfy an action gate.
- One purpose's decision does not determine another purpose's decision; a later withdrawal retains the accepted decision in history and applies only its approved scope/effective time.
- A person's older episode remains older even when a new review or centre transfer is being discussed.
- The system must not show success for a failed or indeterminate persistence/closure action.

## 5. Acceptance scenarios

These scenarios preserve the revised baseline's 14 core tests and assign stable AC IDs. They are design tests with synthetic data and labelled sample policy. Repeat them against the implemented system with approved rules; prototype behaviour cannot prove server-side enforcement, persistence, SMS delivery, or scoring.

| Scenario                                                 | Observable acceptance condition                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Requirements                    |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| AC-01 — Intake, core, and conditional collection         | A new patient completes intake with a recorded proceed outcome and assessment owner before a shared core assessment is created in the relevant episode. A conditional module has a visible reason; its respondent and permitted channel are selected before collection.                                                                                                                                                                                                                                                                            | FR-01–FR-05, FR-16              |
| AC-02 — One measure submitted                            | An SMS response fulfils its assignment; a second unfinished measure and the assessment's outstanding review remain visible.                                                                                                                                                                                                                                                                                                                                                                                                                        | FR-08, FR-17–FR-18, FR-37       |
| AC-03 — Tablet handover                                  | Submission confirms successful receipt, then ends the participant session. Back navigation or a new participant cannot expose the previous response or staff workspace.                                                                                                                                                                                                                                                                                                                                                                            | FR-20, FR-27, FR-45             |
| AC-04 — Who answered, who entered and review requirement | A clinician transcribes a person's answer. The record identifies both roles accurately; the prototype records clinician entry and supported tablet completion as review not required while leaving other submitted self-report pending. A permitted joint response remains distinguishable from independent completion. Production behavior follows the approved D-10 rule.                                                                                                                                                                        | FR-08, FR-17, FR-21             |
| AC-05 — Correction                                       | A Clinician and a Data Manager can each edit a submitted response in scope. Each save records before/after values, item/revision, editor identity/role, timestamp, and reason while retaining original answers and provenance. Cancel, unchanged values, and missing reasons leave the record unchanged. Unauthorised roles/scope are denied. The Data Officer verified-source rule remains. Submission/fulfilment remain unchanged, no collection reminder restarts, and prior reviews are retained with affected evidence flagged for re-review. | FR-08, FR-29–FR-33              |
| AC-06 — Scope and navigation                             | Staff open a person and select an episode; unauthorised records cannot be opened. Any approved cross-centre service access is visibly limited to its granted scope.                                                                                                                                                                                                                                                                                                                                                                                | FR-09, FR-14, FR-28–FR-29       |
| AC-07 — Later review in the same episode                 | A second review has its own due date and response while retaining the original episode and prior review. No new episode appears solely because 90 days elapsed.                                                                                                                                                                                                                                                                                                                                                                                    | FR-01, FR-06–FR-07              |
| AC-08 — Family participation                             | A family/supporter respondent receives an eligible, separate assignment. Their relationship does not automatically confer guardian authority or access to the person's separate answers.                                                                                                                                                                                                                                                                                                                                                           | FR-17, FR-22, FR-25, FR-27      |
| AC-09 — Assessment pause or exit                         | Staff record a pause or close an unfinished assessment with a reason/next action. Partial responses remain partial. A not-admitted disposition can include an onward referral without entering recurring care.                                                                                                                                                                                                                                                                                                                                     | FR-36–FR-38                     |
| AC-10 — Consent request, decision and withdrawal         | Staff select a versioned consent from the approved sample library, scope it to the person/episode and send it through an eligible sample channel. The participant can accept or decline the specific request; sent is not accepted. A later withdrawal preserves the earlier decision/history, revokes only the policy-affected future access/reminders and does not block an unrelated permitted purpose.                                                                                                                                         | FR-22–FR-25                     |
| AC-11 — Delivery and recovery states                     | An active overdue assignment can have an expired link and a saved draft. The next action is clear; reissue preserves history, and repeat submission cannot silently create another fulfilled response.                                                                                                                                                                                                                                                                                                                                             | FR-08, FR-18–FR-19, FR-44–FR-45 |
| AC-12 — Version changes and source gaps                  | A new instrument version published during a draft does not change that assignment. A historical snapshot or unknown source version is labelled; unsupported comparisons are not presented as reliable change.                                                                                                                                                                                                                                                                                                                                      | FR-05, FR-07, FR-10, FR-13      |
| AC-13 — Nonresponse and invalid data                     | Permitted skipped/declined answers, missing answers, valid zero, and imported invalid code 998 remain distinguishable. Invalid data is not scored as a response.                                                                                                                                                                                                                                                                                                                                                                                   | FR-11–FR-12                     |
| AC-14 — Episode closure                                  | Closing an episode records a reason and next action, then explicitly reconciles pending assignments, links, and reminders according to the chosen sample policy.                                                                                                                                                                                                                                                                                                                                                                                   | FR-01, FR-19, FR-38             |

If adopted, add scenarios for service entry during intake and ongoing care (FR-39), separate satisfaction invitations including non-sending reasons (FR-15), and approved discharge/migration/export mappings. Repeat applicable scenarios against the implemented system before production use, using approved rules instead of prototype samples.

### Additional logic/security verification

| ID    | Given / when                                                                             | Expected outcome                                                                                                   | Rule links        |
| ----- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------- |
| AC-15 | Two active attempts submit for one assignment.                                           | At most one accepted fulfilment; other attempt gets an explicit outcome; no silent answer merge.                   | L-11–L-12.        |
| AC-16 | Network fails after submission was accepted but before confirmation arrived.             | Outcome lookup/retry resolves to the existing accepted response without duplication.                               | L-10–L-11.        |
| AC-17 | Permission changes after a reminder is queued or a form was opened.                      | Dispatch/submit rechecks current applicable rules; blocked action shows appropriate recovery.                      | L-07, L-13, L-19. |
| AC-18 | Two authorised editors correct the same prior record revision.                           | Second editor sees the changed current revision and cannot silently overwrite it.                                  | L-20.             |
| AC-19 | User searches or opens a deep link outside their scope.                                  | No protected result, count, answer, or audit detail leaks; safe authorised return path.                            | L-24.             |
| AC-20 | Administrator publishes a sample instrument version while an old assignment has a draft. | New eligible assignments use the new version; existing assignment/draft retains its pinned version.                | L-04, L-25.       |
| AC-21 | Closure reconciliation fails for a pending invitation.                                   | No false fully-successful closure; unresolved item has a visible owner and recovery path.                          | L-18.             |
| AC-22 | Participant asks for support.                                                            | Approved route and accurate availability are shown; no unsupported claim of live monitoring or automated response. | FR-26; D-19.      |

### Intake and referral acceptance scenarios

These are specification scenarios, not executed prototype tests. D-25 is confirmed; unresolved operational values use labelled examples until D-26/D-27 are settled.

| ID    | Given / when                                                                                                               | Expected outcome                                                                                                                                                                                                                           | Rule links        |
| ----- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- |
| AC-23 | A new patient is registered, then staff try to open/create a core assessment through the UI or a direct action.            | Person and owned intake exist; assessment creation/activation is blocked until completed/proceed intake and receiving ownership are recorded. No automatic baseline assignment is created by registration.                                 | L-27–L-28.        |
| AC-24 | Intake has unresolved required checks, is closed incomplete, or completes with do-not-proceed.                             | Partial save and approved intake/support work remain possible. Missing values stay explicit. No core assessment begins; reason, owner and next action/referral are recorded.                                                               | L-27–L-29.        |
| AC-25 | Intake waits for information/triage, then the required information arrives and an authorised proceed decision is recorded. | Waiting reason/date/owner and history remain traceable. After the checks and decision, assessment planning becomes available; waiting for assessment remains a separate downstream task and does not imply admission.                      | L-27–L-28.        |
| AC-26 | An onward referral fails to send, is retried, is acknowledged, then is accepted or declined.                               | Actual attempts, receipt evidence and receiving decision remain distinct. Failure/no response/decline keeps follow-up owned. Acceptance requires the defined handover conditions or an alternative resolution before the follow-up closes. | L-29.             |
| AC-27 | Referral communication occurs in an external system, or the YSCC episode closes before handover is resolved.               | Authorised staff record permitted evidence/reference, actual external event time and recorder. No automatic integration success is inferred. The unresolved referral retains a responsible YSCC owner and follow-up until resolution.      | L-29, L-18.       |
| AC-28 | A person in continuing care needs another scheduled measure, or returns for a new course of care.                          | The scheduled review stays in the existing episode without new-patient intake. A return uses the approved episode/intake determination with recorded evidence; record existence alone never bypasses required intake.                      | L-01, L-16, L-27. |
| AC-29 | Intake registration finds a possible duplicate or staff retry a save after an unknown result.                              | Resolve matching/save outcome before creating another person/intake. No automatic merge, duplicate assessment or fabricated identity; preserve the responsible investigation task.                                                         | L-01, L-21, L-28. |

## 6. Handoff checklist

Before implementation-ready sign-off, attach approved clinical content/version inventories, the action/capability/scope matrix, purpose/authority/visibility policy, episode and scheduling rules, draft/session/concurrency rules, correction and resolution procedures, communication/support content, and the intake/referral field, state and ownership contract in section 7.

For each delivery increment, record: in-scope FRs; resolved/open D IDs; associated F/ST/PT screens; acceptance scenarios; owner; evidence of actual test execution. Pending policy or conditional scope is not a passed test. See [UX strategy](06-ux-strategy.md) for research and release gates.

## 7. Intake and onward-referral contract

### 7.1 Confirmed entry rule and status of the detail

**Every new patient must go through intake before the core assessment or ongoing-care pathway.** U1/D-25 records this product-owner decision. A registered person is not automatically an assessed or admitted patient.

The fields, states and operational handoffs below are the proposed product specification implementing that decision. D-26/D-27 retain the outstanding clinical form content, permitted identity/matching rules, local staff assignments, response windows and external service agreements. Mandatory intake itself is settled.

An intake has its own identifier linked to the person and incoming contact/referral. Link it to the care episode when that episode is established under D-09; do not require a fabricated admission date or create a new episode for every referral packet. A new patient's core assessment requires the resolved person/episode context and completed/proceed intake. If triage uses an instrument, its content, permission and episode/assignment mapping must be approved; it is not a shortcut into the core assessment.

### 7.2 Registration and intake fields

“Required to save” means a record must contain the value or the explicit unknown/pending state specified below. “Required to progress” applies at the completed/proceed gate. Do not reject an initial referral merely because the patient has no private phone, email or complete demographic details.

| Field group             | Proposed fields                                                                                                                                                                      | Save / progression behaviour                                                                                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Record identity         | Person ID, intake ID, intake received date/time, creation time, recorder, responsible YSCC service/team and owner.                                                                   | IDs/creation metadata generated; actual received time recorded or explicitly unknown. Service and accountable owner required to save an active intake.                      |
| Person/matching         | Preferred/display name; supplied legal name where needed for approved matching; date of birth or explicitly unknown; source identifiers where supplied; matching outcome and source. | Record supplied information with provenance; unresolved matching/identity prevents progression. Exact required identity checks are D-26, not a fabricated name/DOB default. |
| Contact suitability     | Contact method/value if available, whose contact it is, safe contact preferences/restrictions, permission reference, no suitable contact option and alternative staff route.         | Contact may be unknown/unavailable at receipt. Sending requires suitable contact and the relevant permission; a private phone/email is not universally required.            |
| Communication/support   | Preferred language, interpreter/accessibility or assistance needs, preferred safe way to engage.                                                                                     | Unknown/not yet discussed is allowed at receipt; responsible staff review the needs relevant to the next activity.                                                          |
| Referral origin         | Self-contact or referring service/person, received channel/date, supplied reference, reason for contact, supporting information and its source.                                      | Source can be unknown pending clarification. No external referrer or document is mandatory for self-contact. Sensitive documents follow approved storage/access rules.      |
| Supporter/authority     | Supporter identity/relationship and contact where relevant; respondent role; separately verified decision-making authority; applicable purpose decisions.                            | Conditional by context. Relationship is not authority. Apply current permissions during intake, not only after it.                                                          |
| Intake/triage work      | Assigned reviewer, required-check status, missing information, triage summary, decision/outcome/reason, decision-maker and actual decision time.                                     | Incomplete entries can save. Completion/proceed requires approved intake checks and a recorded authorised outcome; no score or age threshold is invented.                   |
| Waiting and next action | Waiting reason, missing item/request, responsible internal/external actor, next action, next review date, contact attempts and outcomes.                                             | Required for unresolved waiting work; the review date is owned planning, not an invented universal deadline.                                                                |
| Assessment handoff      | Proceed/do-not-proceed outcome, assessment team/owner, episode link when established, next step communicated or pending, communication evidence.                                     | Proceed gate requires the assigned receiving owner and relevant context. Clinical admission is not inferred.                                                                |
| Exit/referral           | Closure/incomplete reason, next-care plan, linked onward referral(s), outstanding follow-up owner and history.                                                                       | A non-proceeding/unfinished intake must retain its actual outcome and follow-through; do not fabricate a completed assessment.                                              |

### 7.3 Intake and waiting states

| Intake state         | Meaning                                                                             | Allowed next step                                                                                                                                          |
| -------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Received             | New contact/referral logged and owned.                                              | Start/resume intake; resolve matching and missing information.                                                                                             |
| In progress          | Staff are completing registration and intake checks.                                | Save, request information, route to triage or record an authorised outcome when ready.                                                                     |
| Awaiting information | Identified information/check is outstanding.                                        | Record what is needed/from whom and next review; resume when supplied or record an incomplete exit.                                                        |
| Awaiting triage      | Intake is ready for an assigned authorised triage reviewer.                         | Review; request information; record outcome.                                                                                                               |
| Waiting              | Intake/triage is paused for an explicit service/process reason.                     | Record reason, responsible owner and review date; resume or close incomplete with a next plan.                                                             |
| Completed            | Required intake review and an explicit proceed/do-not-proceed outcome are recorded. | Proceed opens core-assessment planning; do-not-proceed leads to an explained next-care plan and referral tracking when applicable. Neither means admitted. |
| Closed incomplete    | Intake ended without satisfying completion criteria.                                | Retain partial information, reason, next action and any referral follow-up. Reopening/return uses an authorised recorded decision.                         |

After completed/proceed intake, **waiting for assessment** belongs to the assessment work queue. Preserve the intake completion and its decision; show the downstream owner and next action. Intake waiting, assessment waiting, clinical admission and referral acceptance are not interchangeable states.

### 7.4 Onward-referral record and outcome tracking

Onward referral can start from intake, a clinical decision or a later transfer. Store its own ID, person/intake/episode links as applicable, destination and contact, reason, permitted information/purpose, YSCC owner, external owner when known, next follow-up date and supporting evidence references.

| Dimension                  | Proposed values/events                                                                                          | Evidence and action                                                                                                                                                                |
| -------------------------- | --------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Preparation                | Draft/prepared/cancelled.                                                                                       | Reason, intended destination, relevant sharing permission and approved information. Preparing or exporting a document does not mark sent.                                          |
| Transmission attempts      | Not sent; sent; failed; outcome unknown.                                                                        | Each attempt records channel/system, actor, actual time, permitted reference and observed outcome. Unknown result requires checking before retry; failures remain owned.           |
| Recipient receipt          | Unconfirmed or acknowledged received.                                                                           | Record actual acknowledgement evidence/time when known. Do not infer receipt from sending.                                                                                         |
| Receiving-service decision | Pending; awaiting information; accepted; declined.                                                              | Source/actor, actual decision time and permitted reason/evidence. An acceptance can be recorded directly without inventing an earlier receipt timestamp.                           |
| Handover/follow-up         | Open; awaiting acknowledgement of responsibility; resolved handover; resolved alternative; cancelled with plan. | Record receiving responsibility and next-care arrangement under D-27, or an authorised alternative/closure reason and remaining owner. Acceptance alone does not prove care began. |

No response by the planned follow-up date, failed transmission, a request for more information or a declined referral returns to an owned task. Communicate the appropriate next step through the agreed service channel. Retry or choose another destination within authority; keep earlier attempts and decisions. Episode/intake closure does not silently remove unresolved referral work.

### 7.5 YSCC and external ownership

| Step                | YSCC responsibility                                                                                 | Possible external activity and evidence                                                                                                                            |
| ------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Receive/register    | Open owned intake, check identity/source and preserve received information.                         | Referrer supplies information; staff record provenance and missing items. An external intake document is evidence to review, not automatic YSCC intake completion. |
| Intake/triage       | Record the responsible staff member, work state and authorised outcome; enforce the mandatory gate. | External information or assessment advice may inform the review within approved authority.                                                                         |
| Send referral       | Check permission/destination, prepare minimum approved information and own follow-up.               | Staff may send using an approved external clinical/referral system; record the permitted reference and actual outcome in YSCC.                                     |
| Receipt/decision    | Maintain the task and record observed external events.                                              | Receiving service acknowledges, requests information, accepts or declines. Staff verification is supported without assuming an API/inbox.                          |
| Handover resolution | Retain a named YSCC owner until approved handover or alternative-plan conditions are recorded.      | Receiving service confirms responsibility/next step according to its agreement. A referral decision is not evidence of a first appointment or treatment.           |

The technical system of record, channels, field sharing, responsible named teams and handover conditions are resolved under D-26/D-27. No appointment-booking system, automatic external referral transmission or new participant account is implied. F-01/F-17 and ST-27/ST-28 describe the corresponding product flows and surfaces.

## 8. Persona-derived candidate requirements

CP1 identifies needs beyond assessment/collection. These **CR** items are candidate scope, not approved FRs or MVP commitments. Elaborate and phase them after D-20–D-24; preserve the existing 46 FRs. A persona hypothesis is not implementation or data-access authority.

| ID    | Candidate capability and actors                                                                     | Proposed logic / acceptance question                                                                                                                                                                                                | Decision and boundary                                                                                                           |
| ----- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| CR-01 | Ongoing care plan, contacts, medication/significant changes, specialist contribution — Jess         | Identify episode, clinical author, event/effective time, source, care-plan relationship, amendment history, and review/handover owner. Can local and specialist input connect without duplicate entry or confused authority?        | D-22; clinical content/governance needed. FR-39 service logging is not a full care, medication, or risk-management system.      |
| CR-02 | Appropriate personal progress and participation in care decisions — Kai, Deb within approved limits | Explain permitted data, source/version, meaning, and next step. Can Kai understand progress without unsupported interpretation or family over-sharing?                                                                              | D-05, D-21; resolve phase conflict. No unrestricted portal, automatic guardian view, or authentication method assumed.          |
| CR-03 | Centre performance, caseload/workforce, safety/fidelity oversight — Rachel                          | Version metrics/denominators; show scope, period, as-of date, completeness/context, comparison limits, and action owner. Can each leadership capability interpret the appropriate view?                                             | D-22–D-23; metrics, refresh, and phase open. No automated clinical risk prediction inferred.                                    |
| CR-04 | Governed dictionary, quality rules, unit-record reporting/extracts — Tom/Ananya                     | Trace fields to definitions/rules/output versions; assign quality issues; authorise reproducible releases. Can an output reconcile to an approved source contract?                                                                  | D-15–D-16, D-23; PMHC-MDS/CQR/recipient contracts require verification before implementation.                                   |
| CR-05 | Implementation readiness/fidelity and shared learning — Sam/Rachel/Ananya                           | Combine approved data with site context, version fidelity criteria, restrict access, and track action/owner/follow-up. Can findings lead to a centre-agreed action?                                                                 | D-22–D-23; individual data requires necessity/authority, not a persona-based grant.                                             |
| CR-06 | Commissioning and system oversight — Priya/David                                                    | Govern aggregate cohort, denominator/method, refresh, disclosure, comparisons, provenance, and follow-up. Can recipients recognise uncertainty or invalid comparison?                                                               | D-23; no general care-record access, assumed national obligations, or causal value-for-money claim.                             |
| CR-07 | National exchange/integration and authorised linkage — Maya/Ananya                                  | Define schema/version, mapping, identifier handling, delivery contract, release manifest, quality rejection/reconciliation, and audit. Can an approved exchange validate without losing provenance?                                 | D-23; may be an external output. No endpoint, standard version, or linkage authority invented.                                  |
| CR-08 | Approved research access and return of findings — Helen/Ananya/governance                           | Track study/purpose, required consent/other authority and approvals, minimum dataset, conditions/expiry, permitted setting/linkage, release audit, findings, and closure. Can the request be fulfilled within actual authorisation? | D-24; confirm National Research Office process. Future adaptive/registry/cluster trial operation is not automatically included. |

Candidate acceptance planning must cover denied/expired access, unsuitable comparison, missingness/disclosure, versioned releases, incorrect recipient, and approval changes. Review/approval and release are distinct events: submitting a data request never grants access. No candidate changes the S1-reported collection baseline until D-21 and scope decisions are resolved.

## 9. Clinician progress report

**Latest product-owner display direction, 16 September 2026:** Because questionnaires are complex, the staff **Report** tab leads with a dashboard based on the questionnaires and clearly shows patient progress over time. The clinician-authored narrative, its edit action and its visible change log are hidden from this surface. The stored report model remains in the prototype for now; removal, migration or reuse is a separate data/product decision. This applies to the selected care period; participant access remains a separate unresolved scope decision.

- Lead with a patient-progress dashboard: submitted-response, review and open-collection counts; question-level charts of comparable Likert changes; and explicit qualitative Previous → New cards where applicable. Submitted response history is not rendered on Report; complete dated response and follow-up history remains in Assessment and History. A chart must state its respondent, questionnaire version and date range. It must not imply a clinical score, direction, improvement or deterioration without an approved instrument-specific definition.
- Keep the overall dashboard summary intact, then provide a separate questionnaire/version selector container whose choice scopes the visible Likert or qualitative cards and **Questionnaire comparison and details** in the full content column. Hide **Clinical notes** and the clinician-authored narrative from Report; care-period annotations remain available through History. Do not render the Summary, Clinician interpretation, Next steps or report metadata panel on this surface. Summarise questionnaire sections before offering item-level detail.
- Identify instruments/versions, respondent perspectives, collection dates and sources. Show the starting-to-latest comparison and the intermediate collection points, including changes since the preceding dated response.
- Only compare clinically compatible measures/versions and the same known respondent. Keep missing dates, different perspectives, unanswered/declined/invalid items, branching and collection context visible. Approved clinical scores, direction and interpretation require instrument-specific definitions; answer changes alone do not establish improvement or deterioration.
- Stored report narrative and version history remain intact but are not displayed or editable from Report under the current direction. Preserve underlying submitted answers, separate response review status, previous stored report versions, author/time and evidence snapshots until a separate migration decision is made. Corrections to answers use the established response-editing workflow.
- **Annotations:** Authorised clinicians can add an append-only annotation to the selected care period. Retain its wording, clinician identity/role, exact timestamp, report revision where one exists and the evidence revision it was recorded against. An annotation does not alter answers, response-review status or report wording; it appears in the care-period activity history. Editing/deleting annotations, participant visibility and non-clinician authoring require explicit policy and capability decisions.
- Prototype implementation uses local storage, clinician-role checks and versioned saves; production scope, server access enforcement, concurrent editing and any sharing/export workflow require implementation separately.

Acceptance: a clinician can read the dashboard counts and clearly limited question-level charts; inspect exact qualitative Previous → New values where they are rendered; trace findings to dated responses through Questionnaire comparison and details; and add a timestamped annotation. The Report page contains no submitted response history, clinician-authored narrative, Edit report action or visible report change log. Different care periods and respondent perspectives remain distinct; an annotation neither edits answers nor marks responses reviewed.

**Validation status:** Report is a provisional display direction based on assumptions about questionnaire complexity, longitudinal comparison and the value of contextual event markers. Events is a provisional episode timeline and recording flow based on assumptions about care-event taxonomy and ownership. D-28 and D-29 require stakeholder input from clinical leadership, assessment operations, data/privacy governance and product/UX before these surfaces are treated as approved requirements. In particular, validate whether event markers belong in Report, which event records qualify, whether “influence” can be discussed at all, and how both surfaces relate to History, care planning, referrals, annotations and clinical review.

### 9.1 Provisional Events tab contract

The prototype Events tab is episode-scoped and supports a newest-first timeline plus a Record event action. The sample types are medication change, care or service change, significant life event and other event. A saved event retains its type, actual event date, title/details, type-specific fields, recorder/role and recording timestamp. The sample validates required type-specific data and rejects dates outside the episode or in the future. This is not an approved medication record, care plan, referral record, clinical outcome, causal explanation or external-service confirmation. Production requirements must resolve the event taxonomy, authority, evidence, correction/deletion, retention, visibility, audit and relationship to existing records before implementation.

## 10. Record activity and change logging

**Product-owner direction, 16 September 2026:** Every saved questionnaire change, new follow-up and recorded event must be logged. This extends the report-specific change log to the person's **History & change log**.

- Cover questionnaire preparation/replacement, submission and answer corrections; new follow-up collections and their pinned questionnaire/due date; clinical-review-required/not-required outcomes, reviews and re-reviews; consent-request sending, decisions and withdrawal; report edits and annotations; participation/contact and data-quality updates; care pause/closure and resulting collection/link changes; linked intake and referral events.
- Retain the action, relevant person/care period/collection, editor identity and role, exact recording timestamp, and previous/new values for saved changes. Preserve reasons, sources, actual event time and previous versions where recorded. Participant submissions identify the respondent/recorder rather than attributing them to whichever staff profile is selected.
- Keep earlier entries and original responses. Show the history newest first, with expandable **View changes** details. Link activity to its retained source record so new delivery, review and answer-edit events appear once. A future due date is planned work, not an event that has already happened.
- Scope care activity to the selected period. Clearly label person-wide changes; retain linked intake/referral history within its actual context. Older records with missing editor/time remain explicit; never infer an exact date from a due date or invent historical metadata.
- Save the change and its log together. Rejected actions, cancelled edits, failed saves and unchanged report/answer edits add no successful entry. Unsaved questionnaire inputs remain drafts; submitting commits the response and its activity. An evidence-only report reconciliation can create a version labelled as narrative unchanged.
- Prototype logs persist in this browser. Production requires authenticated actors, server-side access checks, durable append-only records and transactional concurrency controls; those remain outside this local prototype.

Acceptance: plan a follow-up, submit a questionnaire, record the applicable review requirement, record/re-record a clinical review where required, send/decide/withdraw a consent request, correct an answer, add an annotation, edit the report and record a care event. Each successful action is inspectable with its actor/time and relevant before/after values after reload. Corrections and consent decisions retain their originals/history; person/care-period boundaries, unsuccessful saves and repeated submissions do not create misleading entries.
