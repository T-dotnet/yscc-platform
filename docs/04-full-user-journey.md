# YSCC Platform — Full user journey

Version 0.5 · 16 September 2026 · Care journey aligned to the current local prototype

[Document index](README.md) · [Personas](03-personas.md) · [User flows](07-user-flows.md)

## 1. Journey boundaries

This is the full proposed lifecycle from intake to episode closure, including activities that continue across the lifecycle. It synthesises S1, provisional S2, and relevant codebook implications; it is **not** a fully agreed Slack journey. Validate the complete discussion and clinical pathway under D-01 in [product framing](01-product-framing.md).

The journey describes experiences, staff actions, system responsibilities, and handoffs over time. The [user flows](07-user-flows.md) describe screen/action sequences. Emotional needs are hypotheses, not interview findings. CP1's named personas now supply the actor model. Section 14 adds service/evidence journeys without forcing commissioning or research into a patient's clinical workflow.

**Current prototype coverage:** The prototype now demonstrates the care-delivery portion of this journey with fictional data: registration into owned intake; intake/triage states and proceed/do-not-proceed outcomes; assessment-plan creation after proceeding; collection setup and recovery; participant, tablet and clinician completion; purpose-specific consent requests and accept/decline/withdraw history; policy-dependent clinical review; follow-up; correction; referral follow-through; and pause/close actions. It keeps a selected care period in context, including a closed historical period, and provides a questionnaire-based Progress dashboard, answer-level comparison and append-only clinical annotations. The clinician-authored narrative and visible report change log are currently hidden. Repeated Likert responses remain separate collection points in the same care episode and render as question-level dated lines; qualitative changes show their questionnaire, full question and recorded Previous/New values. This is coverage of the interaction sequence, not proof that the journey is clinically approved or production-ready. Browser-local storage and sample role/policy checks do not verify identity/authority, external sending/receipt, service handover, server-side access control, real clinical content or the broader service-improvement/system-evidence journeys.

Five rules keep the journey coherent:

1. Every new patient must go through intake. Only a completed intake with a recorded proceed outcome and assessment owner unlocks the core-assessment pathway; registration alone does not. This is confirmed under U1/D-25.
2. A care episode can contain an assessment and many collection points. A 90-day or monthly review does not create another episode.
3. Permission, respondent, assistance, channel eligibility, and instrument version are resolved before each collection, not after it.
4. Submitting one response fulfils that assignment only. The approved instrument/mode policy determines whether a separate clinical review is required; assessment completion, disposition, and closure remain separate actions either way. The prototype's clinician-entry/supported-tablet no-review rule is sample behavior awaiting approval.
5. Only someone continuing care enters recurring collection. A pause, incomplete exit, or not-admitted disposition is handled explicitly.

## 2. Lifecycle map

```text
New patient → register/link person → J-01 Mandatory intake/triage
  ├─ Awaiting information / awaiting triage / waiting → owner + review date → resume intake
  ├─ Do not proceed / close incomplete → next-care plan + owned referral follow-up if needed
  └─ Completed + proceed outcome + assessment owner
       J-02 Explain participation and check action-specific permissions
       J-03 Plan core and conditional assignments
       J-04 Confirm respondent, assistance, and eligible channel
       J-05 Complete and submit an assignment
       J-06 Clinical review of evidence and outstanding work
         ├─ More evidence needed → repeat J-02–J-05
         ├─ Pause / close incomplete → preserve actual progress and record next step
         └─ Ready for a disposition decision → J-07
       J-07 Disposition, referral where relevant, and handover
         ├─ Not continuing care here → agreed next action → J-09 if episode closes
         └─ Continuing care → J-08 Repeated collections/review in the same episode
                                  ├─ Further care → repeat approved collection loop
                                  └─ End of episode → J-09 Closure and reconciliation

Throughout: support, permission changes, corrections/audit, and authorised handover.
Conditional: service events when they occur; separate satisfaction at approved touchpoints.
```

## 3. J-01 — Mandatory intake for every new patient

**Entry:** Every new patient, whether self-contacting or referred, enters intake. Find/link or register the person and create an owned intake at ST-27; no core assessment or ongoing-care assignment starts from registration alone. Returning/transferred cases use the documented determination under D-09; scheduled reviews in continuing care do not restart new-patient intake.

| Lane                       | Experience or action                                                                                                                                                                                                                                                                 |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Person/supporter           | Receive an explanation of intake, what information is needed, suitable contact/help and the next step. A private phone, independent form completion or family authority is not assumed.                                                                                              |
| Registration/intake staff  | Check matching and capture identity/source, contact suitability, referral reason, support needs and applicable permissions; save incomplete information explicitly. Tom/P-06 can register only within granted capabilities.                                                          |
| Authorised triage reviewer | Review required information; request clarification or record the intake outcome, reason and actual decision time. Jess/Assessment Team and Engagement Team responsibility assignments require D-26 confirmation.                                                                     |
| System/backstage           | Maintain person/intake identity and episode linkage when established. Show received/in-progress/awaiting-information/awaiting-triage/waiting/completed/closed-incomplete separately from assessment progress and admission. Enforce L-27 before core-assessment creation/activation. |
| Handoff                    | Completed/proceed intake → named assessment owner and J-02/J-03. Do-not-proceed or incomplete exit → reason, explained next-care plan and an owned F-17 referral if relevant. Waiting work always has an owner, next action and next review date.                                    |

**Need hypothesis:** Understand what is happening while waiting and who will make contact next.  
**Failure/recovery:** Unknown/missing information can be saved without fabricated answers. Unresolved matching prevents progression and goes to F-07. No response or waiting time does not auto-complete intake. A received referral or an externally completed form is not a YSCC intake decision; authorised staff review and record the outcome.  
**Exit evidence:** Required intake checks, decision-maker/time, explicit proceed/do-not-proceed outcome, owner and next action; or an actual waiting/closed-incomplete record with follow-through. Intake completion is not clinical admission.  
**Trace:** U1/D-25; FR-01, FR-09, FR-23, FR-34–FR-38; L-27–L-29; AC-23–AC-29. [Registration fields and states](05-requirements-and-logic.md#7-intake-and-onward-referral-contract) are proposed under D-26/D-27. Adoption and content of any IAR-DST/triage instrument remain unconfirmed.

## 4. J-02 — Explain participation and check permissions

**Entry:** Staff identify the next intended action, such as collecting a response, contacting a respondent, or sharing permitted information. Repeat when purpose, actor, authority, or context changes.

| Lane                      | Experience or action                                                                                                                                                                               |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Person/supporter/guardian | Receive information relevant to their role and purpose; understand available choices, visibility, and support. Where an approved decision is required, make it through the permitted pathway.      |
| Frontstage staff          | Distinguish relationship from authority, check current action-specific permission and suitable contact/device context, and explain any blocker without making unrelated purposes contingent on it. |
| System/backstage          | Record purpose, decision-maker/authority, scope, status, effective time, and information version. Evaluate only the applicable action rules.                                                       |
| Handoff                   | Allowed action proceeds; blocked action records reason, owner, and resolution route. Unrelated permitted activity can continue.                                                                    |

**Need hypothesis:** Understanding without coercion or overly broad agreement.  
**Failure/recovery:** Unclear guardian authority → authorised review, not invented age-based logic. Secondary-use refusal → apply that purpose's consequences, not a blanket care shutdown.  
**Exit evidence:** Current permission/authority decision or explicit unresolved blocker.  
**Trace:** FR-22–FR-29; D-04–D-07, D-19. Do not use the codebook research-consent extract filter as the care-permission rule.

## 5. J-03 — Plan the assessment and assignments

**Entry:** The new patient has completed intake with a recorded proceed outcome and assigned assessment owner; the proposed core model and applicable clinical content have been approved for use, or explicitly labelled sample content is used in a prototype.

| Lane                 | Experience or action                                                                                                                                                                     |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Person               | Understand the requested work in manageable terms and why additional content may be needed.                                                                                              |
| Frontstage clinician | Plan the shared eligibility/needs core; add conditional modules through approved rules or intentional clinical judgement, with visible reasons.                                          |
| System/backstage     | Create linked assessment/collection/assignment records; pin an approved version at assignment creation; show dependencies and required work without changing previously presented items. |
| Handoff              | Each assignment has an owner, relevant purpose/context, respondent eligibility, pinned version, and applicable planned date/window.                                                      |

**Need hypothesis:** A coherent assessment plan rather than a large unexplained form library.  
**Failure/recovery:** No approved instrument/rule → block that assignment and route to content owner. Referral source is context, not an automatic selector of a different core. A new module added after review repeats permission and channel checks.  
**Exit evidence:** Traceable assignment plan with module reasons and version.  
**Trace:** FR-02–FR-06, FR-09, FR-13, FR-36; D-01–D-03, D-08.

## 6. J-04 — Confirm respondent, assistance, and channel

**Entry:** An eligible assignment is ready to collect. P-04 or an authorised P-05 sets up the interaction with P-01/P-02.

| Lane             | Experience or action                                                                                                                                                        |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Respondent       | Understand whose answers are sought; use an eligible method suited to the setting, with appropriate help.                                                                   |
| Frontstage staff | Confirm respondent, recorder, permitted assistance/joint completion, instrument mode eligibility, and SMS/tablet suitability. Recheck applicable permissions before launch. |
| System/backstage | Offer only allowed instrument/role/mode combinations; link the delivery attempt or tablet session to the assignment and preserve provenance.                                |
| Handoff          | Clinician entry, scoped SMS, or temporary tablet collection begins; support and visibility are explained before answering.                                                  |

**Need hypothesis:** Choice appropriate to the person's situation, without suggesting every channel is always available.  
**Failure/recovery:** Unsuitable SMS contact/device → choose another clinically eligible approach or assign staff follow-up. Clinician-only instrument → do not substitute self-report. Family contact ≠ guardian authority.  
**Exit evidence:** Eligible respondent/mode, assistance context, permission check, and attempt/session identity.  
**Trace:** FR-16–FR-21, FR-23, FR-25, FR-27; D-03, D-05, D-07, D-18.

## 7. J-05 — Complete and submit

| Channel         | Frontstage experience                                                                                                                      | System responsibility                                                                                                                                                | Handoff / recovery                                                                                                                                                                                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Clinician entry | P-04 records clinician ratings or transcribes a respondent's own answers, preserving the distinction.                                      | Save drafts visibly; use pinned item rules; record respondent, recorder, assistance, observed dates and the applicable review rule.                                  | Submission confirmation leads back to remaining assessment work, not automatic assessment completion. The prototype records no separate review as required; production policy remains D-10.                                                                              |
| SMS             | P-01/P-02 opens the expiring account-free link, completes approved verification/introduction, answers, reviews where allowed, and submits. | Restrict to the assignment; show real save state; enforce version/nonresponse rules and single fulfilment.                                                           | Confirmation explains what was received and next step. Expired, already submitted, wrong recipient, or failed save routes to safe recovery.                                                                                                                              |
| Tablet          | P-05 launches participant mode; P-01/P-02 completes independently, assisted, or jointly as approved.                                       | Separate participant and staff context; record assistance and the applicable review rule; clear local content/session after submit, cancellation, timeout, or reset. | Neutral end screen; authorised clinician checks receipt. The prototype treats supported tablet completion as not requiring a separate review; independent completion remains pending review. Saved-draft retention and production review policy are governed separately. |

**Need hypothesis:** Confidence in receipt, no avoidable loss of work, and a way to stop or get help.  
**Validation:** Use requiredness and nonresponse rules for the presented version. A valid zero is not missing. Permitted skipping can occur in a valid submission; 998 invalid legacy data is not a participant answer option.  
**Failure/recovery:** A failed/uncertain submission does not show success. Check the persisted outcome before retrying; preserve safe recoverable work under the approved policy. A reissued link retains attempt history and does not silently merge drafts.  
**Exit evidence:** Submitted response and fulfilled assignment, or actual draft/paused/cancelled status with reason and next action.  
**Trace:** FR-08–FR-13, FR-17–FR-21, FR-26–FR-27, FR-40–FR-45; D-02, D-07, D-18–D-19.

## 8. J-06 — Clinical review and further evidence

| Lane                 | Experience or action                                                                                                                                                                                                                                                                         |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Person/supporter     | Receive the appropriate explanation of assessment progress and next steps from the care team; no automatic diagnostic feedback is assumed.                                                                                                                                                   |
| Frontstage clinician | For responses requiring review, review available evidence and provenance, compare only supported scores, identify outstanding evidence, and decide whether further modules or clarification are needed. Treat a recorded not-required result as a policy outcome, not as a clinician review. |
| System/backstage     | Show assessment progress independently of assignment status; show review-required/not-required/pending/reviewed accurately; record the governing rule or who reviewed which evidence/version and when; keep unfinished work visible.                                                         |
| Handoff              | More evidence → J-02–J-05. Ready decision → J-07. Pause/incomplete exit → reason, owner, and next action under approved policy.                                                                                                                                                              |

**Need hypothesis:** Confidence that “reviewed” refers to identifiable evidence, not an ambiguous global checkmark.  
**Failure/recovery:** Partial evidence can be reviewed without completing the assessment. Unknown versions/current-only imports are labelled. A later correction needs the approved re-review process; it does not create a new patient response.  
**Exit evidence:** Applicable review requirement and, where required, review record; outstanding work; completion/pause/incomplete status according to approved criteria.

**Trace:** FR-03–FR-08, FR-13, FR-32–FR-33, FR-36–FR-37; D-02, D-10, D-13, D-16.

## 9. J-07 — Disposition, onward referral, and handover

| Lane                      | Experience or action                                                                                                                                                                                        |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Person/supporter          | Understand whether care continues here, what an onward referral means, the next step, and whom to contact.                                                                                                  |
| Frontstage clinician/team | Record disposition separately from assessment progress and referral action. For continuing care, assign the stream/team and follow-up owner. For non-continuing care, record the agreed next action.        |
| System/backstage          | Store decision date, decision-maker, dated allocation, referral destination/action when relevant, and pending-work handover. Apply approved access changes, not automatic unrestricted cross-centre access. |
| Handoff                   | Continuing care → J-08. Not continuing → agreed next step and J-09 if episode closes. A transfer follows D-09 episode rules.                                                                                |

**Need hypothesis:** A clear transition, particularly when the person is not admitted or the assessment closes incomplete.  
**Failure/recovery:** “Referred elsewhere” is not a substitute for admission disposition. Missing receiving owner or unclear next action stays visible as handover work. No unsupported automatic external referral integration is assumed.  
**Exit evidence:** Disposition, linked referral, owner/team, effective date, outstanding work and next action. F-17 tracks referral preparation, actual sending, receipt, acceptance/decline and handover resolution separately; external steps retain their source/evidence and YSCC follow-up owner. A recorded referral or episode closure cannot imply external acceptance.  
**Trace:** FR-14, FR-28–FR-29, FR-36–FR-38; D-09–D-12.

## 10. J-08 — Continuing care and repeated measures

| Lane             | Experience or action                                                                                                                                                                   |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Person/supporter | Receive the next appropriate request at the approved time with context about the repeat collection.                                                                                    |
| Frontstage staff | Plan reviews using approved instrument/cadence/window rules; recheck purpose, contact, respondent, and mode; review trends and adjust the plan within clinical authority.              |
| System/backstage | Create distinct collection points and responses in the same episode; preserve prior responses; derive overdue from active outstanding work; recheck eligibility before every reminder. |
| Handoff          | Repeat J-02–J-06 as needed. Changed stream/team → dated allocation and reassessment of future assignments. End of episode → J-09.                                                      |

**Need hypothesis:** Repetition that feels relevant and does not require retelling information unnecessarily.  
**Failure/recovery:** Monthly cadence is used only if approved. Late/missed review and schedule-anchor rules need D-08. A stale link is not an absent response; a correction does not restart ordinary collection reminders.  
**Exit evidence:** Distinct dated collections, actual review events, owner and next planned step.  
**Trace:** FR-01, FR-05–FR-08, FR-10, FR-13, FR-19, FR-35–FR-38; D-03, D-08, D-11, D-16.

## 11. J-09 — Discharge or episode closure

| Lane             | Experience or action                                                                                                                                                                                                                                                                                  |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Person/supporter | Understand the next-care plan, any intended remaining contact, and the appropriate support contact.                                                                                                                                                                                                   |
| Frontstage staff | Record episode closure/reason/effective date and next action; inspect outstanding assignments, drafts, links, reminders, and reviews; apply the approved reconciliation policy.                                                                                                                       |
| System/backstage | Retain the actual record history within policy; record each pending item's disposition; prevent ordinary requests remaining active by omission.                                                                                                                                                       |
| Handoff          | Closed episode with explicit outstanding-work resolution, including any pending onward referral. Unresolved external handover retains its named YSCC owner and next follow-up; episode closure does not mark it accepted or resolved. Any approved post-closure activity is intentional and governed. |

**Need hypothesis:** A clear ending or transition without unexpected continued messages.  
**Failure/recovery:** Unresolved pending-item treatment → identify responsible owner before closure is finalised under the approved process. Do not fabricate assessment completion or delete partial responses to make the episode look tidy.  
**Exit evidence:** Closure decision, next-care action, reconciled pending work, access/retention handling.  
**Trace:** FR-01, FR-19, FR-24, FR-36–FR-38; D-06, D-09–D-11, D-15. Detailed headspace discharge content is conditional, unlike basic episode closure.

## 12. Cross-cutting journeys

| Activity                                      | Trigger and actors                                                                            | Safe outcome / boundary                                                                                                                                                                    |
| --------------------------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Correction                                    | P-06 or authorised clinical staff discovers an error at any stage, including after closure.   | Verified source → authorised correction; no source → clinician request. Preserve prior/new/actor/reason/source and original response provenance. See F-06.                                 |
| Duplicate/misalignment resolution             | P-07 investigates with required centre support.                                               | Scoped evidence, impact preview, approved recoverable resolution; unresolved identity does not become a merge. See F-07.                                                                   |
| Consent request, withdrawal or purpose change | Authorised staff sends a versioned purpose request; P-01/P-03 acts through the approved path. | Sent is not accepted. Record accept/decline/withdraw and effective time; preserve history; apply only relevant action/access/retention rules; communicate approved consequences. See F-10. |
| Support                                       | Respondent asks for help or the clinical team identifies a support need.                      | Approved human/support route with accurate availability; no promise of live monitoring or unapproved automated escalation.                                                                 |
| Ownership change                              | Care or task moves to another authorised team member.                                         | Named receiver/next action, appropriate scope and dated ownership, clear pending work. Episode identity follows D-09.                                                                      |
| Service event — conditional                   | Staff records direct/indirect service when it occurs, including during intake/assessment.     | Separate event in the episode, actual service centre/date/duration; not delayed to discharge. FR-39.                                                                                       |
| Satisfaction — conditional                    | Approved review/discharge/standalone trigger for person or family.                            | Separate eligible assignment, visibility, skipping, and non-sending reason; not part of clinical assessment completion. FR-15.                                                             |

## 13. Experience risks and validation coverage

| Test moment                  | Failure to detect                                                                                                | Acceptance link      |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------- | -------------------- |
| Intake and episode selection | Wrong episode or review treated as new episode.                                                                  | AC-01, AC-06, AC-07. |
| Respondent setup             | Guardian authority inferred from family relationship; wrong source/mode.                                         | AC-04, AC-08, AC-10. |
| Submission and review        | One response silently completes the assessment, or a sample not-required result is mistaken for clinical review. | AC-02, AC-04.        |
| Tablet handover              | Previous answers or staff workspace exposed.                                                                     | AC-03.               |
| Expiry and network failure   | Lost draft, false success, duplicate fulfilment.                                                                 | AC-11.               |
| History/correction           | Invalid score comparison, erased provenance, or restarted reminders.                                             | AC-05, AC-12, AC-13. |
| Pause, exit, and closure     | Incomplete assessment enters recurring care; stale invitations remain active.                                    | AC-09, AC-14.        |

Acceptance definitions are in [requirements and logic](05-requirements-and-logic.md). Validate emotional/communication hypotheses alongside task accuracy; do not substitute a polished journey map for participant or clinical review.

## 14. Persona-aligned care and learning journeys

### Source care-journey coverage

| Persona     | CP1 journey                                        | Coverage and gap                                                                                                                                                                                                    |
| ----------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Jess — P-04 | Engage/assess → plan → deliver → review/transition | J-01–J-09 cover assessment, contributions, review, and transitions. Full care plan, medication/significant events, and specialist coordination are candidate CR-01, not fully specified by the collection baseline. |
| Kai — P-01  | Entry → engagement → empowerment → transition      | J-01–J-09 include eligible participation and explained next steps. Own-progress/shared decision support is CR-02. D-21 resolves the MVP dashboard / Stage 2 self-report conflict.                                   |
| Deb — P-02  | Seeking help → involvement → support → ongoing     | Separate contributions and handoffs appear across the care journey. Ongoing visibility requires CR-02/D-05; no automatic access to Kai's answers.                                                                   |

### Service Improvement loop

| ID    | Phase and actors                                                              | Frontstage/backstage handoff                                                                                                                                         | Outcome and exception                                                                                                |
| ----- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| SJ-01 | Establish centre/definitions — Rachel, Sam, Ananya, authorised administrators | Agree readiness, responsibilities, data definitions, workflows, and configuration; Tom supports registration/quality setup.                                          | Named owners and approved configuration. Missing definitions/authority hold the affected activation.                 |
| SJ-02 | Capture and check — Jess, Tom, Ananya                                         | Care creates records; permitted validation identifies issues; Tom follows up or corrects from verified evidence; Ananya resolves broader issues with centre support. | Reliable source with visible unresolved issues. Baseline correction applies; wider automated reporting is CR-04.     |
| SJ-03 | Understand performance — Rachel, Ananya                                       | Select approved centre/period/cohort; inspect definitions, completeness, and local context before interpretation.                                                    | Appropriate service action or assigned question. CR-03; no unsupported real-time/risk-prediction promise.            |
| SJ-04 | Evaluate implementation and learn — Sam, Rachel, Ananya                       | Combine approved evidence with site insight; assess fidelity; co-own an improvement action/follow-up.                                                                | Learning returns to the centre and SJ-02/SJ-03 evaluate change. CR-05; person-level access needs specific authority. |

### System Evidence loop — candidate governed outputs

| ID    | Phase and actors                                                            | Frontstage/backstage handoff                                                                                                                                                | Outcome and exception                                                                                                            |
| ----- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| SJ-05 | Define request — Priya, David, Maya, or Helen with Ananya/governance        | Clarify commissioning, oversight, exchange/linkage, or research purpose; agree product, granularity, recipient, and authority.                                              | Named request/contract and owner. Unapproved request goes to review, not unrestricted search.                                    |
| SJ-06 | Review and prepare — Ananya and authorised governance/research office roles | Check definitions, quality, applicable consent/authority, disclosure/linkage controls, and source/version coverage.                                                         | Approved release with manifest/conditions, or blocked/rejected request with permitted explanation. D-23/D-24 govern the process. |
| SJ-07 | Receive and interpret — Priya/David/Maya/Helen in their own role            | Consume approved aggregate report, system evidence, exchange, or study-specific release; inspect provenance, missingness, comparisons, and conditions.                      | Valid use within purpose. Schema error or unsupported comparison returns to the custodian, not guessed data.                     |
| SJ-08 | Return findings and close — system actors with Rachel/Sam/Ananya            | Return commissioning questions, governance actions, exchange-quality findings, or research insights; assign service follow-up and apply release/request closure conditions. | Actionable learning returns to SJ-01–SJ-04. Expiry/retention use policy. No automatic clinical treatment change.                 |

These journeys may use governed external outputs instead of a new logged-in UI. They do not place external actors inside a person's care record. CR-03–CR-08, F-14–F-16, and EX-03–EX-07 connect this broader experience to explicit scope/governance decisions.
