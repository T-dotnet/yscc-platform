# YSCC Platform — UX Strategy and Product Requirements

**Expanded documentation:** The [eight-document product and UX set](docs/README.md) is the current working expansion, including the supplied CMDCS persona draft and its scope conflicts. This combined baseline is retained as an input/reference; its FR-01–FR-46 identifiers are retained in the new requirements document. FR-29 and FR-32 reflect the product-owner clarification of 15 September 2026: Clinicians and Data Managers may edit responses, and every edit must be logged.

**Status:** Revised working baseline, aligned to the local prototype on 16 September 2026; stakeholder decisions remain open  
**Sources:** Captured YSCC #ux discussion and headspace EP data extract codebook (2025), listed below  
**Purpose:** Align product, clinical, design, and engineering work before prototype or implementation.

**Intake and prototype update, 16 September 2026:** The product owner confirms that every new patient must go through intake (U1/D-25 in document 01). Registration alone cannot start the core assessment. The current [intake/referral contract](docs/05-requirements-and-logic.md#7-intake-and-onward-referral-contract), F-01/F-17, ST-27/ST-28 and AC-23–AC-29 specify the pathway; the local prototype now demonstrates registration, owned intake, proceed/do-not-proceed decisions, assessment-plan gating and separate referral follow-through with fictional data. Clinical/service parameters remain D-26/D-27, and the prototype is not production evidence.

## 1. Product framing

YSCC is a longitudinal youth assessment and outcomes platform. The proposed experience supports an Assessment Team to collect a common clinical core, add conditional programme-specific measures, and follow a person's responses over time.

It must reduce administrative burden without compromising clinical record integrity. Each instrument version has one definition, with approved respondent and delivery modes. The platform supports clinician entry, SMS self-report, and tablet self-entry; the permitted modes for each instrument need clinical confirmation. Submitted responses and corrections retain their history for the period required by the agreed retention policy. Imported records can contain gaps that the new platform cannot reconstruct.

### Intended outcomes

1. Give assessment teams one clear, role-appropriate view of a person’s current programme and data journey.
2. Let people and families complete appropriate measures safely, with the least possible friction.
3. Show baseline and follow-up responses over time, including monthly collection where approved, with clear indications of changes in instrument version, respondent, or source that affect comparison.
4. Help data and clinical teams resolve errors transparently and within their permission scope.
5. Route people to the correct stream/team without making referral source dictate the assessment itself.

### Evidence and decision status

**Reported requirements** are requirements Oli explicitly described in the captured Slack messages, including confirmations he attributed to Caroline. **Provisional direction** covers statements awaiting confirmation. **Reference findings** describe the headspace extract. **Proposed requirements** translate these sources into the YSCC experience and require stakeholder review. The complete #ux thread was not retrieved; the detailed journey below is a synthesis, not a record of approval of every step.

Reported requirements from Slack [S1]:

- Direct person/family collection is included in the MVP.
- Launch collection modes include an expiring, account-free SMS link and in-clinic tablet self-entry, alongside clinician entry. Instrument definitions should be reused across approved modes.
- Collection at different time points produces separate responses. Corrections require the prior value, actor, and time to remain traceable.
- Data Officers can correct information corroborated elsewhere; otherwise they request clinician input. Orygen Data Managers address key record errors with centre support.
- Access is scoped by centre, cluster, or whole system depending on role.

Provisional direction from Slack [S1–S2]:

- A common eligibility/needs core for incoming people proceeding through assessment, with conditional modules based on presentation, treatment allocation, and clinician judgement. Caroline still needs to confirm the detailed model and content.
- Referral context informs intake/triage rather than selecting a different core assessment. Assessment findings inform admission and onward routing.
- Patient-reported measures **may** be collected monthly as well as at 90-day reviews. The launch cadence and instrument list are not settled.
- Consent should support separate purposes and withdrawal; final policy is being developed with the department and the privacy impact assessment (PIA).

### Decisions intentionally not assumed

- The age and pathway for person versus guardian consent.
- What happens to previously collected data when consent is withdrawn.
- The final legal/PIA policy and exact consent wording.
- Final programme/module content, including the exact conditional logic.
- The YSCC design system and brand assets.
- Rules for opening, reopening, transferring, and closing care episodes.
- Adoption of headspace service logging, satisfaction surveys, discharge content, and export formats in the YSCC MVP.

### Source register

Workbook references below refer to [headspace_EP_data_extract_codebook-2025.xlsx](/Users/danielenicoletti/Desktop/headspace_EP_data_extract_codebook-2025.xlsx). This is an extract reference through 30 June 2025, not a current YSCC data specification.

| ID | Source location | What it supports |
| --- | --- | --- |
| S1 | [Oli, #ux, 14 September 2026](https://project-yonder.slack.com/archives/C0C1F1FH1DK/p1789359608362949) | Direct collection modes, possible monthly collection, response history, corrections, and role scopes. |
| S2 | Previously captured #ux excerpt, 14 September 2026; complete thread and permalink unavailable | Provisional common core, conditional modules, referral/routing relationship, and unresolved consent and branding. |
| CB1 | `Data extract supplementary info!B7:B15` | Stable de-identified IDs, episode-level research-consent extract filter, multi-select caveats, and response codes. |
| CB2 | `Data extract supplementary info!B17:B20` | Historical instrument substitution, MDS item changes, and removed items. |
| CB3 | `Data extract supplementary info!B24:B33` | Current-only profile/status data, episode-level referral data, stream transitions, and derived dates. |
| CB4 | `Data extract supplementary info!B36:B58` | Record grain, date meanings, and service-delivery centre. |
| CB5 | `Batch 2_Assessment!E126` and `E129` | Clinician, joint, or person completion; incomplete-assessment outcomes. |
| CB6 | `Batch 3_90 Day Review!C106:F106`; `Batch 5_Client Satisfaction!A6`; `Batch 6_Family Satisfaction!A6` and `E16` | Reasons a satisfaction survey was not sent, permitted skipping, and respondent relationships. |
| CB7 | `DataDisposal2025!A2` | Historical disposal of profiles and service data; no authority to apply that policy to YSCC. |

Source limitations: some discharge and client-satisfaction headings still cite a 2023 cutoff (`Batch 4_Discharge!A3`; `Batch 5_Client Satisfaction!A2:A5`), while the supplementary information cites 2025. Confirm these discrepancies with the data owner before defining an import or export contract.

### Codebook implications considered

These reference findings inform the proposed YSCC requirements. Adoption of particular headspace instruments, codes, and reporting batches remains a scope decision:

- A person can have multiple episodes. `client_ID`, `episode_number`, and `episode_id` identify different levels of that history; survey and occasion-of-service records use their own identifiers.
- Registration, assessment, 90-day review, discharge, person satisfaction, family satisfaction, direct service, and indirect service are distinct reporting batches. If adopted, their records should link to the relevant care episode and remain identifiable by type.
- A review due date, a survey sent event, a completion date, and a service date are different facts. The experience must not label one as another.
- The reporting codebook distinguishes **prefer not to answer (995)**, **skipped (997)**, and **not answered/missing (999)**. **Not in MDS (998)** denotes an invalid/out-of-standard answer or data-entry error. It is a validation state, not “not applicable” or an intentional nonresponse [CB1]. Numeric extract codes should map to meaningful internal states and readable labels.
- Permitted multi-select answers should be stored as structured selections. Commas do not prove that a field permits multiple answers: the codebook flags multiple `service_length` entries as a data issue [CB1].
- Many response sets and items changed across MDS versions, and some are historical-only. Instrument, item, response-option, and calculation versions must therefore be retained with every submitted response.
- The centre where a person is registered can differ from the centre that delivered an occasion of service. Scope and reporting must model both rather than assuming one organisation field.
- Person and family satisfaction are separate respondent experiences. If adopted, each needs an approved access policy; separate survey types alone do not establish who may read the answers.
- Profile fields and episode status can be current snapshots; some previous profile values were overwritten [CB3]. Imported history must be labelled according to what the source actually contains.
- Historical disposal and instrument substitution can limit coverage and comparability [CB2, CB7]. Missing history must not be represented as zero, no previous care, or a newly reconstructed response.
- The extract's episode-level consent filter concerns monitoring, evaluation, and research [CB1]. It does not determine permission for care, SMS contact, family participation, or access to clinical records in YSCC.

## 2. UX strategy

### Experience principles

| Principle | Design implication |
| --- | --- |
| One connected care journey | Reuse instrument definitions across clinically approved modes; preserve respondent, assistance, and entry provenance. |
| Start with the clinical task at hand | Clinicians see the next required action and relevant history, not an undifferentiated library of forms. |
| Preserve clinical truth | Never silently replace a submitted response. Make dates, source, respondent, and corrections visible. |
| Consent is active, not a checkbox | Explain purpose and participation at the moment it matters; show current status, limits, and withdrawal consequences once policy is final. |
| Respect respondent context | Confirm that contact/device use is suitable; explain who can see responses. SMS may be viewed on a shared device. Tablet self-entry can be supported or independent. |
| Progressive disclosure | Begin with the core assessment and reveal conditional modules only when criteria are met or a clinician deliberately adds one. |
| Design for handover | Clear status, ownership, due dates, and audit history let another appropriate team member safely continue the work. |

### Primary success measures

- Completion rate for required baseline measures, split by delivery channel.
- Median time from intake to complete core assessment.
- Percentage of assigned follow-up measures completed within their approved due window, split by cadence and instrument.
- Clinician time spent entering patient-reported data compared with the current process.
- Proportion of corrections with a complete reason and audit history.
- Drop-off rate per person self-report question and link-expiry rate.
- Accessibility and comprehension feedback from people/families.

Define each metric's denominator, observation period, and handling of cancelled, declined, skipped, and incomplete work before setting targets. A permitted skip does not automatically make a survey incomplete, and response submission alone does not indicate clinical review.

## 3. Users, roles, and jobs

| Role | Primary job | Essential UX needs |
| --- | --- | --- |
| Assessment clinician/team member | Complete the core assessment, select appropriate modules, review findings, and determine next action. | Clear queue, guided assessment, longitudinal context, concise summaries, safe handover. |
| Person | Complete an assigned measure independently when appropriate. | Plain language, mobile-first, progress visibility, save/resume only if policy permits, support and privacy guidance. |
| Family/supporter respondent; guardian where applicable | Give their own information and, where authorised, act in a consent role. | Record relationship separately from consent authority. A family relationship or receipt of a link does not grant access to another person's answers. |
| In-clinic facilitator | Hand over a tablet and support completion without influencing answers. | Fast participant/session start, privacy reset between people, completion confirmation, minimal clinical administration. |
| Data Officer | Correct data corroborated elsewhere, or request clinician correction. | Search, source evidence, scoped editing, mandatory rationale, visible audit history. |
| Orygen Data Manager | Resolve key data-quality issues with centre support. | Duplicate/misalignment workflows, centre-aware permissions, escalation record. |
| Service/stream lead | Monitor intake, completion, routing, and overdue work. | Aggregate status without inappropriate access to detailed clinical answers. |
| System administrator | Configure organisations, roles, measure library, and delivery rules. | Safe configuration, preview/testing, version control, clear effect of changes. |

These are proposed task roles, not a final permission matrix. Confirm whether facilitator, service lead, and administrator responsibilities are separate roles or capabilities assigned to existing staff. Distinguish the person giving the answer from the staff member entering it and anyone assisting completion.

## 4. Information architecture

Proposed internal navigation:

1. **My work** — assigned intake, assessments, due measures, and correction requests.
2. **People** — find a person, then select the relevant care episode.
3. **Data quality** — scoped correction requests and record-resolution work.
4. **Administration** — restricted role, instrument, workflow, and consent configuration.

Inside **People → person → care episode**, provide **Overview/timeline**, **Assessment**, **Measures**, and **Consent and respondents**. Assessment contains the core, conditional modules, review status, and disposition. Measures contains assignments, delivery attempts, responses, and trends for the selected episode. Display the episode identity and dates persistently; an explicit history view can compare episodes without merging them.

Provide an authorised history/correction view from the relevant record. If service logging or satisfaction collection is approved, add **Services** and **Feedback** within the episode. These are not currently confirmed global MVP navigation items. Person/family links open only their assigned collection experience, with access governed by the applicable policy.

### Person record structure

The record should answer, at a glance:

- Who is this person, which centre/cluster owns their care, and what is their current intake/assessment status?
- What consent and respondent pathways currently apply?
- What action is needed next, by whom, and by when?
- Which assignments need work, which responses have been submitted, and which delivery links have expired?
- How have key outcomes changed over time?
- What was corrected, by whom, when, and why?

## 5. Core end-to-end journeys

### A. Mandatory intake and triage

1. Every new patient enters intake, including self-contact and external referrals. Staff match/link or register the person and open an owned intake; registration never creates a core assessment automatically.
2. Record identity/source, suitable contact or alternative, referral reason, communication/support needs and applicable permissions. Partial information saves with explicit unknown/missing states; unresolved required checks prevent progression.
3. Track received, in progress, awaiting information, awaiting triage, waiting, completed or closed incomplete, with an owner, next action and review date. Record the authorised triage outcome separately from intake progress and clinical admission.
4. Completed/proceed intake with an assessment owner unlocks the shared core in the relevant care episode. Resolve episode boundaries/linkage under D-09; do not invent admission or a new course of care from referral receipt.
5. Do-not-proceed or incomplete exit retains a next-care plan and owned onward-referral follow-through where needed. Sending, receipt, receiving acceptance/decline and handover resolution are distinct, including externally performed steps.
6. A scheduled review in continuing care stays inside the existing episode without new-patient intake. A return/transfer requires the documented relevant intake/episode determination.

See [requirements section 7](docs/05-requirements-and-logic.md#7-intake-and-onward-referral-contract) for the fields, state tables, permissions and external ownership contract. U1/D-25 confirms the mandatory step; D-26/D-27 retain clinical and service decisions.

### B. Clinician-led assessment

1. Clinician opens the assessment instance within the selected care episode and reviews its current plan.
2. For each assignment, staff confirm the applicable permissions, respondent, assistance needs, and permitted delivery mode before collection. The instrument version is pinned to that assignment.
3. The clinician records clinician-rated content or transcribes a respondent's answers with their origin identified. Draft saving and submission are visibly different actions.
4. As information emerges, approved rules or clinician judgement can add conditional modules. Each new assignment repeats the permission, mode-selection, and collection steps.
5. A submitted response records its respondent(s), person entering the data, assistance, actual instrument version, timestamps, assignment, assessment instance, and care episode. Other unfinished assignments remain visible.
6. The clinician reviews available evidence and outstanding work, then records completion or a pause/closure reason, admission disposition, onward referrals where relevant, and follow-up ownership. A single submitted measure never automatically finalises the assessment.

### C. SMS self-report

1. Authorised staff select an eligible instrument and respondent, confirm contact suitability and applicable permissions, and choose available language/accessibility options and delivery timing.
2. The system sends an expiring, account-free link for the pinned assignment version and records the delivery attempt. Failed sending is distinct from an unanswered invitation.
3. The landing screen explains the request, purpose, estimated time, who may see answers, support information, and expiry. Apply the agreed recipient-verification method; possession of a link alone is not proof of who answered.
4. The respondent completes the measure, using skip or prefer-not-to-answer options only where approved. A confirmation is shown after successful submission. An uncertain save shows a recovery state.
5. That assignment is fulfilled and its response becomes available to authorised staff. Other measures and the clinical review retain their own status.
6. Reminders apply only to eligible outstanding assignments. Recheck permission, contact preferences, completion, and any pause/closure before sending. Reissue, cancellation, and mode changes preserve attempt history and prevent duplicate fulfilment.

### D. In-clinic tablet self-entry

1. An authorised staff member checks the assignment's permissions and approved completion mode, then starts a temporary tablet session from the clinician workflow.
2. The participant sees the assigned measure, an explanation of visibility, and any available assistance. Staff record whether completion is independent, assisted, or joint as permitted by the instrument.
3. After the response is successfully saved and submitted, the tablet shows confirmation and returns to a neutral screen. Cancellation or timeout clears the local participant session; any saved draft remains subject to the approved resume policy.
4. The clinician checks receipt in their authorised view. The tablet cannot return to the prior participant's answers or the staff workspace without staff authentication.

### E. Correction and audit

1. An authorised user opens a completed response or record field and chooses **Request correction** or **Correct from verified source**, according to role.
2. The system shows current value, original source, and audit history before an edit is made.
3. The editor supplies a reason and, where appropriate, a source/reference.
4. The system stores the new value as a correction event and preserves the prior value for the agreed retention period. Correction does not reset a submitted response to incomplete or trigger a new invitation.
5. The audit view shows who changed what, when, why, and any associated workflow/escalation.

Correction is available when an issue is discovered at any stage of care. It is independent of the discharge sequence.

### F. Detailed longitudinal assessment journey

This proposed journey combines the captured Slack direction [S1–S2] with codebook findings and the design requirements below. Its sequence and exception handling require clinical/operational review.

**Care episode:** A variable-length period of engagement or care for a person, identified by `episode_id` and `episode_number`. Dates follow service events under agreed rules. A 90-day review or other collection point creates a dated record within the episode, not a new episode. A new course of care has its own episode identity; the rules distinguishing a new course from a reopened episode or transfer remain open.

**Assessment instance:** A specific core assessment and its conditional modules within a care episode. An individual instrument response is one part of that assessment. Programme/stream allocation is a clinical attribute with dated changes, rather than another name for an episode or review interval.

| Phase | Person's experience | Staff action and next step | Records and requirements |
| --- | --- | --- | --- |
| 1. Intake and triage | Understand why information is being requested and the immediate next step. | Register/link the person and open mandatory intake; record fields, waiting/triage and authorised outcome. Only completed/proceed intake with an owner opens core assessment; other outcomes retain a next-care plan and referral follow-through. | Person, care episode, referral, triage state; FR-01, FR-09, FR-36–FR-38. |
| 2. Explain participation and check permissions | Receive information relevant to their role and the intended activity. | Confirm the applicable consent purposes, any guardian authority, contact suitability, and access scope. A blocked action has an owner and resolution path. | Purpose-specific permissions and respondent relationship; FR-22–FR-28. Repeat checks when the activity or participant changes. |
| 3. Plan core and conditional assignments | See manageable tasks and an explanation of why they are being asked. | Plan the shared eligibility/needs core. Add relevant conditional modules when information or clinician judgement supports them; further modules can be assigned after review. | Assessment instance, assignments, pinned versions, and reasons; FR-02–FR-05, FR-13. |
| 4. Choose respondent and channel | Use an approved method suited to the situation, with any assistance explained. | Before each collection, confirm who answers, who enters the data, assistance, and the permitted clinician, SMS, or tablet mode. | Respondent and recorder provenance, delivery attempt/session; FR-16–FR-21. |
| 5. Complete and submit | Answer, use permitted nonresponse options, and receive confirmation when submission succeeds. | Track this assignment, recover failed delivery/save attempts, or record a pause/decline and follow-up. | Assignment progress, link/session state, response, timestamps, and validation; FR-08–FR-12, FR-44–FR-45. One response fulfils only its assignment. |
| 6. Clinical review | Receive an explanation of the assessment's progress and next steps. | Review submitted evidence and outstanding work. Return to phases 2–5 for additional modules. Record completion or a reason for pausing/closing an incomplete assessment. | Clinical review state distinct from measure completion; FR-03–FR-08, FR-36–FR-37. |
| 7. Decide disposition and hand over | Understand whether care continues here, whether an onward referral is being made, and whom to contact. | Record admission disposition separately from assessment completion, closure reason, and onward referral. Assign the next team/owner. Only people continuing care enter phase 8. | Dated disposition, stream/team allocation, referral destination and handover; FR-37–FR-38. |
| 8. Continuing care and repeat measures | Receive the next relevant measure at the approved interval. | Schedule review collections, repeat phases 2–6 as needed, and review changes over time. Monthly collection is enabled only for approved instruments/cadences. | Distinct collection points and responses within the same episode; FR-06–FR-07, FR-19, FR-35–FR-36. |
| 9. Discharge or episode closure | Understand the agreed next care step and any outstanding contact. | Record the episode end/closure reason and next-care plan. Reconcile outstanding assignments, links, and reminders under the approved closure policy. | Episode closure and task disposition; FR-01, FR-19, FR-37–FR-38. Detailed headspace discharge content awaits scope confirmation. |

**Branches and exceptions:**

- **Assessment paused:** retain its actual progress and an owner/reason. Further outreach follows the approved pause/contact policy.
- **Assessment closed before completion:** record a specific reason, such as the person deciding not to continue or being unreachable, and any referral/next action. Preserve partial responses as partial. Final YSCC reason codes require approval; headspace examples are reference material [CB5].
- **Not admitted:** record whether an onward referral or another next step exists. “Referred elsewhere” is a separate action that can accompany a disposition; it is not a mutually exclusive admission status.
- **Admitted/continuing care:** assign the stream/team and follow-up plan before starting recurring collection. A later change of stream records its effective date and reassesses relevant assignments.
- **Declined or blocked collection:** identify the affected assignment and purpose. Declining a research use or one measure does not automatically close the care episode; consequences follow the agreed policy.

**Activities throughout the journey:**

- Corrections, audit, and authorised handover apply whenever needed, including after closure within the retention policy.
- If direct/indirect service logging is adopted, record occasions when they occur, including intake or assessment. They are not a final discharge task [CB4; FR-39].
- If satisfaction surveys are adopted, schedule person and family feedback as distinct assignments at approved touchpoints, such as review or discharge, with separate access rules and reasons for non-sending [CB6; FR-15].

**Journey success condition:** staff can identify the active episode, assessment progress, each respondent's contribution, any blocked or overdue work, and the next clinical action. Someone who exits assessment or is not admitted does not silently enter the recurring-care workflow.

## 6. Functional requirements

These are proposed implementation requirements informed by section 1. Their wording is not evidence of stakeholder approval. Section 7 assigns delivery scope; FR-15 and FR-39 are conditional on adoption of satisfaction surveys and service logging. Requirement IDs are retained across this revision.

### Programme, assessment, and measure requirements

- **FR-01:** Link each person to their care episodes. Each episode has its own identity, variable start/end dates, ownership, and closure state. Assessment instances, reviews, and service events belong to the relevant episode. Define new-episode, reopening, and transfer rules before implementation; recurring measures do not open episodes. Every new patient must have an intake record and complete intake with a recorded proceed-to-assessment outcome before the core assessment or ongoing-care pathway can begin. Registration alone does not satisfy intake; repeat measures in an existing care episode do not trigger new-patient intake. See L-27 and D-25.
- **FR-02:** Provide the proposed shared eligibility/needs core for incoming people proceeding through assessment, subject to clinical confirmation of its content and applicability. Referral source informs triage without automatically selecting a different core.
- **FR-03:** Support configurable conditional modules based on programme/treatment allocation, presentation, and clinician judgement.
- **FR-04:** Allow a clinician to add an eligible module intentionally, with the reason visible in the record.
- **FR-05:** Pin an approved instrument version when creating an assignment. Responses and resumed drafts retain that version. A later publication does not silently change an existing assignment or relabel its answers. Detailed version and scoring rules are specified in FR-13.
- **FR-06:** Store each baseline or follow-up collection as a distinct occurrence within the care episode, with its planned date/window and actual collection timestamps. Support configurable review cadence, including monthly collection if approved. Confirm the YSCC schedule anchor and handling of late reviews; the headspace 90-day anchor is reference information [CB4].
- **FR-07:** Show response history and dated stream/team changes. Display source, version, and coverage limitations, including current-only imported snapshots and unavailable history. Compare scores only where the approved scoring/version mapping supports comparison. Retain response/correction history under the agreed policy; do not fabricate disposed or overwritten records.
- **FR-08:** Track assignment progress, delivery/link/session state, response submission, clinical review, and correction history separately, as described below. Derive overdue indicators from due windows and active outstanding work. Fulfilling one assignment does not complete its assessment; correction does not reopen collection automatically.

### Record structure and data-quality requirements

- **FR-09:** Model person, care episode, assessment instance, collection point, measure assignment, delivery attempt/session, response, respondent, and correction as linked records with distinct identifiers. Add occasions of service and satisfaction surveys if adopted. Imported identifiers and record grain must remain traceable to their source; internal events must not be inferred solely from export column names. Include separately identified intake and onward-referral records, with source, state history, accountable owner and links to the person and relevant episode when established. An incoming referral can be registered before episode linkage is settled; it must not fabricate admission or a new course of care. See the intake/referral contract in document 05, section 7.
- **FR-10:** Distinguish planned/due, sent, delivery failure, opened, started, submitted, clinically reviewed, and service timestamps where applicable. Use a separate completion timestamp only for a defined event distinct from submission. Preserve original imported date meanings and identify any derived date and its derivation; unknown timestamps stay unknown.
- **FR-11:** Distinguish intentional nonresponse (prefer not to answer or permitted skipping), missing data, and answer validation errors. If importing headspace data, map legacy 995/997/999 to their corresponding states and 998 to invalid/out-of-standard data with provenance [CB1]. Use “not applicable” only where an approved instrument defines it. Preserve valid zero values; never score a sentinel code as a clinical value. Requiredness and permitted skipping are defined per item/version.
- **FR-12:** Store single- and multi-select answers according to each item's allowed cardinality. Map approved selections to comma-delimited export values only where required. Flag multiple values in single-value fields as data issues; do not interpret every comma-delimited legacy field as a valid multi-select [CB1].
- **FR-13:** Implement FR-05 with versioned items, response options, scoring rules, and terminology attached to the version actually presented. Score with that version's approved rules. Any authorised re-scoring retains the original result and records the new rule version/reason. Imported responses retain known source versions or an explicit unknown version; do not assign the currently published version by default.
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

- **FR-22:** Model consent and relevant permissions by purpose, person, care-episode scope where applicable, decision-maker/authority, status, and effective date. Preserve decision history and the information version shown. Define care/data collection, contact, and secondary-use purposes with owners; the headspace research-consent extract filter is not a universal care-access rule.
- **FR-23:** Check the approved permission/consent requirements for the specific action before collection, sending, or access. Show a blocking reason and owner when requirements are unmet. Declining one purpose must not blanket-block unrelated permitted actions. Sample policy values are allowed in a labelled prototype; production behaviour requires the approved rules.
- **FR-24:** Record withdrawal by purpose and effective time, then apply approved rules to affected links, reminders, access, secondary use, and retention. Ordinary corrections preserve history; any authorised retention/disposal process is separate. Do not assume that withdrawal either deletes all history or permits indefinite retention.
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

| Dimension | Example states or events | Meaning |
| --- | --- | --- |
| Assignment | Planned, active, paused, fulfilled, cancelled | Work requested for a particular respondent, instrument version, and collection point. Decline or cancellation reasons are retained. “Not assigned” means no assignment exists. |
| Delivery attempt | Queued, sent, failed; opened event where observed | A single attempt to deliver or start access. Sending is not proof of receipt or completion. Reissuing creates a traceable new attempt. |
| Link/tablet session | Active, expired, revoked, ended | Whether access remains available. Expiry does not erase a response or cancel the assignment automatically. |
| Response | Draft, submitted, abandoned | The answer record. Permitted skips can be present in a valid submitted response. Abandoned drafts are not completed submissions. |
| Assessment progress | In progress, paused, complete, closed incomplete | Progress of the assessment as a whole. Completion criteria must be defined independently of one response's submission. |
| Clinical review | Pending, reviewed; review date and evidence version | A clinician's review of the available evidence. Reviewing partial evidence does not automatically complete the assessment. |
| Timeliness | Due soon, overdue | Derived from the approved due window and active outstanding work. These flags can coexist with delivery and response states. |
| Correction | Original record plus correction events | Revision history of submitted or recorded data. A correction does not make a response outstanding again. |

For example, one assignment can be active and overdue, have an expired SMS link, and retain a saved draft. The UI should show the next action for that combination. It must not force all four facts into one mutually exclusive status.

## 7. MVP scope and sequencing

### Proposed MVP baseline

This baseline turns the reported launch capabilities and provisional clinical direction into a delivery proposal. It still requires scope sign-off; inclusion here does not imply the full journey was approved in Slack.

| Capability | Requirements | MVP treatment |
| --- | --- | --- |
| Person and care-episode workspace, core assessment, conditional modules | FR-01–FR-05, FR-09, FR-13 | Include episode selection and basic rule configuration from the foundation/clinical-core phases. Final core and branching rules require approval. |
| Baseline and longitudinal review collection | FR-06–FR-08, FR-10–FR-14 | Include repeated collections, pinned versions, distinct states, and historical-data limitations. Support the agreed review cadence; monthly collection is conditional on approval. |
| Clinician, SMS, and tablet collection, including applicable family participation | FR-16–FR-21 | Include approved mode eligibility, respondent/recorder provenance, contact checks, failure recovery, reminder controls, and tablet reset. |
| Purpose-specific consent, authority, withdrawal, and access controls | FR-22–FR-29 | Include configuration and action gating. The approved rules are required before the corresponding production activity is enabled. |
| Corrections, audit, data quality, work queues, and handover | FR-30–FR-38, FR-46 | Include operational ownership, incomplete-assessment exits, referral actions, and reconciliation of requests at closure. |
| Accessible collection, drafts, and clear communications | FR-40–FR-45 | Include approved content, keyboard/mobile/tablet support, draft/save clarity, and recovery states. |

FR-15 and FR-39 are conditional scope decisions below. All other FRs form the proposed baseline, with policy/content details governed by the open decisions in section 9. The scope includes minimal episode closure and next-action recording; a full headspace discharge questionnaire is not yet committed.

### Scope decisions awaiting confirmation

- **Satisfaction surveys (FR-15):** Confirm whether person and family satisfaction are launch deliverables, their timing, and answer visibility. General family participation is already a reported launch capability; it does not establish which feedback surveys are required.
- **Service logging (FR-39):** Confirm direct/indirect service capture and reporting. If included at launch, complete it during the operations phase and record events throughout care.
- **Detailed discharge content:** Confirm whether the headspace discharge survey and future-care code set are adopted, adapted, or excluded. Basic episode closure remains in the proposed baseline.
- **Historical migration and exports:** Confirm datasets, mappings, source limitations, and any required headspace compatibility. Version/provenance support is baseline; a full migration/export implementation is not established by supplying the codebook.

Record an explicit included/later/excluded decision and owner for each before finalising delivery scope. If included in the MVP, the relevant operational and acceptance work must finish before launch.

### Decisions required before production use

- Applicable consent purposes, authority/guardian rules, answer visibility, withdrawal handling, and retention/disposal policy.
- Approved core/module content, respondent and delivery eligibility, requiredness/skipping, scoring, branching rules, and review cadence.
- Rules for opening/reopening/transferring/closing episodes, assessment completion, incomplete exits, and handling outstanding invitations at closure.
- Role/centre access rules, verified-source correction procedures, SMS verification/contact checks, reminders, and support/escalation handling.

The prototype can demonstrate these mechanisms with clearly labelled sample rules. Unresolved rules must be resolved or the affected production workflow explicitly excluded before launch; a placeholder is not a release decision. Automated clinical escalation is outside the baseline until separately scoped and approved. The participant support route in FR-26 is still required.

### Later enhancements

- Advanced trend analysis, service-level dashboards, and richer workflow administration beyond the basic configuration required at launch.
- Additional languages after the launch language set and accessibility approach are agreed.
- Automated duplicate merging, if separately approved; the baseline provides authorised, recoverable review/resolution.

Brand assets and the final visual system remain design inputs to obtain before final UI sign-off. They do not prevent journey or neutral-wireframe work.

### Suggested delivery order

1. **Foundation:** person/care-episode model, respondent/recorder provenance, role/scope and purpose-permission models, instrument version pinning, state dimensions, audit/retention design, and basic configuration.
2. **Clinical core:** intake/triage, shared assessment, configurable conditional modules, permission checks, clinician entry, partial/incomplete exits, review/disposition, and minimal work queues.
3. **Respondent channels:** approved SMS/tablet/family pathways, contact/verification checks, draft/recovery behaviour, duplicate-attempt handling, assignment fulfilment, and privacy reset.
4. **Longitudinal operations:** approved review scheduling, reminder controls, trends with source/version caveats, correction workflows, handover, closure, and scoped data-quality views. Include service logging, satisfaction, detailed discharge, and migration/export work here if selected for launch.
5. **Pre-launch validation:** resolve required decisions, verify approved rules with stakeholders, exercise the applicable acceptance scenarios below, and review participant accessibility/content and permissions.
6. **Later enhancements:** advanced analytics, richer administration, and additional languages. Basic rules and versioning are already required in phases 1–2.

## 8. Design acceptance criteria and current local prototype

The current clickable prototype demonstrates the baseline scenarios with synthetic records and clearly labelled sample policy/content, including the mandatory intake/referral sequence added in this revision. These remain design acceptance criteria, not a test-certification claim: browser-local persistence and sample role checks do not prove server-side permissions, external delivery, production persistence, multi-user concurrency, or clinical scoring.

| Scenario | Observable acceptance condition | Requirements |
| --- | --- | --- |
| 1. Intake, core, and conditional collection | A new patient completes intake with a recorded proceed outcome and assessment owner before a shared core assessment is created in the relevant episode. A conditional module has a visible reason; its respondent and permitted channel are selected before collection. | FR-01–FR-05, FR-16 |
| 2. One measure submitted | An SMS response fulfils its assignment; a second unfinished measure and the assessment's outstanding review remain visible. | FR-08, FR-17–FR-18, FR-37 |
| 3. Tablet handover | Submission confirms successful receipt, then ends the participant session. Back navigation or a new participant cannot expose the previous response or staff workspace. | FR-20, FR-27, FR-45 |
| 4. Who answered and who entered | A clinician transcribes a person's answer. The record identifies both roles accurately. A permitted joint response remains distinguishable from independent completion. | FR-17, FR-21 |
| 5. Correction | A Clinician and a Data Manager can each edit a submitted response in scope. Each save records before/after values, item/revision, editor identity/role, timestamp, and reason while retaining original answers and provenance. Cancel, unchanged values, and missing reasons leave the record unchanged. Unauthorised roles/scope are denied. The Data Officer verified-source rule remains. Submission/fulfilment remain unchanged, no collection reminder restarts, and prior reviews are retained with affected evidence flagged for re-review. | FR-08, FR-29–FR-33 |
| 6. Scope and navigation | Staff open a person and select an episode; unauthorised records cannot be opened. Any approved cross-centre service access is visibly limited to its granted scope. | FR-09, FR-14, FR-28–FR-29 |
| 7. Later review in the same episode | A second review has its own due date and response while retaining the original episode and prior review. No new episode appears solely because 90 days elapsed. | FR-01, FR-06–FR-07 |
| 8. Family participation | A family/supporter respondent receives an eligible, separate assignment. Their relationship does not automatically confer guardian authority or access to the person's separate answers. | FR-17, FR-22, FR-25, FR-27 |
| 9. Assessment pause or exit | Staff record a pause or close an unfinished assessment with a reason/next action. Partial responses remain partial. A not-admitted disposition can include an onward referral without entering recurring care. | FR-36–FR-38 |
| 10. Purpose-specific blocking | Under a labelled sample policy, missing permission blocks only the affected action and shows its owner/next step. A secondary-use refusal does not automatically disable an unrelated permitted activity. | FR-22–FR-25 |
| 11. Delivery and recovery states | An active overdue assignment can have an expired link and a saved draft. The next action is clear; reissue preserves history, and repeat submission cannot silently create another fulfilled response. | FR-08, FR-18–FR-19, FR-44–FR-45 |
| 12. Version changes and source gaps | A new instrument version published during a draft does not change that assignment. A historical snapshot or unknown source version is labelled; unsupported comparisons are not presented as reliable change. | FR-05, FR-07, FR-10, FR-13 |
| 13. Nonresponse and invalid data | Permitted skipped/declined answers, missing answers, valid zero, and imported invalid code 998 remain distinguishable. Invalid data is not scored as a response. | FR-11–FR-12 |
| 14. Episode closure | Closing an episode records a reason and next action, then explicitly reconciles pending assignments, links, and reminders according to the chosen sample policy. | FR-01, FR-19, FR-38 |

If adopted, add scenarios for service entry during intake and ongoing care (FR-39), separate satisfaction invitations including non-sending reasons (FR-15), and approved discharge/migration/export mappings. Repeat applicable scenarios against the implemented system before production use, using approved rules instead of prototype samples.

## 9. Open questions for clinical, legal, and operational owners

| Question | Owner needed | Decision needed |
| --- | --- | --- |
| At what age and in what circumstances does a person consent independently versus a guardian? | PIA/legal + clinical leadership | Determines consent journey, recipients, language, and access rules. |
| What happens to existing responses when consent is withdrawn? | PIA/legal + data governance | Determines retention, visibility, export, and audit behaviour. |
| Which measures are core, conditional, or optional for launch? | Assessment Team + clinical leads | Determines the assessment builder and module rules. |
| What precise events trigger a programme-specific module? | Clinical leads | Determines transparent, testable branching logic. |
| What are approved reminder cadence, SMS copy, opt-out/contact preferences, and expiry rules? | Clinical operations + legal | Determines safe outreach and notification design. |
| Which external systems are sources of truth for a Data Officer correction? | Data governance + technical lead | Determines evidence capture and correction authority. |
| What constitutes centre support for an Orygen Data Manager resolution? | Data governance | Determines approval/escalation workflow. |
| Which Orygen/YSCC brand assets and accessibility standards apply? | Brand/design owner | Determines visual system and reusable components. |
| Is the proposed shared core/conditional journey accurate, including triage exits and clinical review? | Caroline + Assessment Team | Validate provisional S2 direction and reconcile the complete #ux discussion. |
| Which purposes govern care collection, contact, secondary use, family participation, and answer visibility? | Clinical operations + legal/data governance | Define action-specific rules and guardian authority without applying the extract's research filter globally. |
| What retention/disposal policy covers responses, drafts, audit history, and imported records? | Data governance + legal | Reconcile historical preservation with approved disposal and document known source gaps. |
| Which instruments permit independent, assisted, joint, or clinician-only completion, and which items permit skipping? | Clinical/content owners | Define valid mode selection, provenance, and completion criteria. |
| What are the launch review cadence, scheduling anchor/window, and monthly instrument requirements? | Clinical operations | Configure recurring collections, reminders, and overdue indicators. |
| When does a return, transfer, or reopened case create a new care episode? | Clinical operations + data lead | Finalise episode identity, boundary dates, and cross-centre ownership rules. |
| How are assessment completion, admission disposition, incomplete exits, and onward referrals recorded? | Assessment Team + clinical operations | Approve reason codes, review criteria, and handover/closure behaviour. |
| What happens to pending links, drafts, assignments, and reminders on pause, withdrawal, or closure? | Clinical operations + data governance | Define permitted recovery and future contact for each affected activity. |
| Are service logging, satisfaction surveys, detailed discharge, and historical import/export included at launch? | Product owner + clinical/data leads | Assign included/later/excluded scope and owners to conditional requirements and validation. |
| Which codebook mappings and instrument comparisons are valid, including conflicting extract dates and unknown versions? | Data owner + clinical measurement lead | Finalise source contracts, pinned versions, scoring, and comparable trends. |
| What recipient verification and shared-device/contact approach is approved for account-free links? | Product/security + clinical operations | Define access and provenance without assuming a delivered link verifies the respondent. |

## 10. Immediate next artefacts

1. A domain/data model for people, care episodes, assessment instances, dated stream/team allocations, collection points, assignments, attempts/sessions, responses, respondent/recorder roles, purpose-specific consent, corrections, and access scopes. Include conditional record types only with explicit scope status.
2. A service blueprint for clinician, SMS, and tablet collection, including repeated assignment loops, incomplete exits, handover, and recovery.
3. A prototype of the clinician workspace and mobile/tablet/family pathways covering section 8, with sample rules identified and production decisions tracked separately.
4. A clinical content inventory for core and conditional measures, including version, item cardinality/requiredness, skipping, scoring, respondent/assistance eligibility, approved channels/cadence, and owner.
5. A stakeholder decision record resolving section 9 and linking approved outcomes to stable FR IDs and source evidence, including verification of the complete #ux journey discussion.


## Product-owner update — clinician Progress report, 16 September 2026

The staff Report tab is a report based on questionnaires, designed to make changes over time understandable despite questionnaire complexity. Clinicians can edit the narrative. Saved changes to **Summary**, **Clinician interpretation** and **Next steps** must be change logged with before/after wording, editor identity/role, timestamp and retained versions. Cancelled edits and unchanged saves add no entry. The [detailed report contract](docs/05-requirements-and-logic.md#9-clinician-progress-report) defines section summaries, dated evidence, interpretation/next steps, source traceability, the report change log and update-needed behaviour. This does not resolve participant report access, clinical scoring definitions or broader external reporting scope.

**Additional product-owner direction, 16 September 2026:** Every saved questionnaire change, new follow-up and recorded care event must also appear in **History & change log**, with actor/time, relevant before/after values and preserved prior records. See [record activity and change logging](docs/05-requirements-and-logic.md#10-record-activity-and-change-logging) for coverage, care-period scope and save behaviour.
