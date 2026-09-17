# YSCC Platform - User flows

Executive edition 1.5 | 16 September 2026 | Working proposal; aligned to the current local prototype

[Visual PDF](../../output/pdf/executive/07-user-flows-executive.pdf) | [Detailed original](../07-user-flows.md) | [Executive index](README.md)

## From intake to next care.

Clinical team | Boxes = actions; diamonds = decisions.

### Steps

- **New patient: complete intake:** Register, check information and record triage.

- **Intake complete and proceed?:**

- **Wait or exit:** Keep owner, reason and next review. Resume intake or track the referral.

- **Plan the assessment:** Assign core + eligible additional measures.

- **Collect the assigned responses:** Use an eligible channel - see Flow 2.

- **Apply review rule + inspect work:** Record review when required; keep completion separate.

- **Ready for a care decision?:**

- **More evidence needed:** Identify missing evidence; add eligible measures.

- **Record the clinical decision:** Record admission, referral and handover.

- **Continue care:** Plan the next review in the same episode.

- **Agree the next care action:** Close the episode only if appropriate.

### Connections

- New patient: complete intake -> Intake complete and proceed?

- Intake complete and proceed? -- No --> Wait or exit

- Intake complete and proceed? -- Yes --> Plan the assessment

- Plan the assessment -> Collect the assigned responses

- Collect the assigned responses -> Apply review rule + inspect work

- Apply review rule + inspect work -> Ready for a care decision?

- Ready for a care decision? -- No --> More evidence needed

- More evidence needed -- Return to planning --> Plan the assessment

- Ready for a care decision? -- Yes --> Record the clinical decision

- Record the clinical decision -- Continuing here --> Continue care

- Record the clinical decision -- Not continuing here --> Agree the next care action

### MANDATORY INTAKE AND NEXT STEPS

The local prototype demonstrates intake, consent requests, channel-dependent review and the next-care loop with sample records. Registration, response and review state never imply admission or completion.

Basis: F-01/F-02/F-05/F-08/F-09/F-17; U1/D-25. Intake detail D-26/D-27 remains proposed.

## Three channels. One response.

Staff set up the task; the eligible respondent or clinician completes it.

### Steps

- **Confirm the assignment:** Person, version, respondent, support and owner.

- **Permissions and channel checks pass?:**

- **Resolve the blocker:** Name the owner and next action; then return to setup.

- **Clinician entry:** Record a clinician rating or transcribed answers; retain who supplied them.

- **SMS link:** Send an expiring, account-free link. Check recipient; explain purpose and visibility.

- **Clinic tablet:** Start an isolated session. Explain purpose, visibility and permitted assistance.

- **Answer, then submit:** Use pinned item rules; re-check current permission when submitting.

- **Response accepted and saved?:**

- **Check the outcome:** Return to this decision. Retry only when safe; never create a duplicate.

- **This assignment is fulfilled:** Apply the approved review rule; assessment remains separate.

- **Tablet only:** End and reset; staff re-authenticate to return.

### Connections

- Confirm the assignment -> Permissions and channel checks pass?

- Permissions and channel checks pass? -- No --> Resolve the blocker

- Resolve the blocker -- After resolution --> Confirm the assignment

- Permissions and channel checks pass? -- Yes - eligible clinician entry --> Clinician entry

- Permissions and channel checks pass? -- Yes - eligible SMS --> SMS link

- Permissions and channel checks pass? -- Yes - eligible tablet --> Clinic tablet

- Clinician entry -> Answer, then submit

- SMS link -> Answer, then submit

- Clinic tablet -> Answer, then submit

- Answer, then submit -> Response accepted and saved?

- Response accepted and saved? -- No or not known --> Check the outcome

- Check the outcome -- Re-check outcome --> Response accepted and saved?

- Response accepted and saved? -- Yes --> This assignment is fulfilled

- This assignment is fulfilled -- Tablet only --> Tablet only

### PARTICIPATION AND INTERRUPTION

Family contribution does not grant guardian authority. Sent consent is not accepted. Clinician entry and supported tablet are Review not required only under the prototype's sample rule.

Basis: F-02/F-03/F-04/F-10. Eligibility, recovery and storage policies remain open; phase conflict D-21 remains.

## Correct, or ask the clinician?

Tom, Data Officer | Jess, authorised clinician | Different responsibilities.

### Steps

- **Tom opens the issue:** Confirm scope, field, revision and source.

- **Approved verified source available?:**

- **Tom prepares a correction:** Check authority; record the new value, source and reason.

- **Tom requests clinician input:** Assign Jess an issue with context, evidence reference and next action.

- **Review and save the change:** Check the latest revision. If it changed, review again before saving.

- **Jess investigates and responds:** Any change uses the audited correction route; otherwise record another resolution.

- **Confirm the correction + audit:** Retain prior/new value, source, actor, time and reason.

- **Record the request outcome:** Keep the issue open until the responsible clinician resolves it.

- **Close the resolved issue:**

### Connections

- Tom opens the issue -> Approved verified source available?

- Approved verified source available? -- Yes - direct correction --> Tom prepares a correction

- Approved verified source available? -- No - request clinician input --> Tom requests clinician input

- Tom prepares a correction -> Review and save the change

- Tom requests clinician input -> Jess investigates and responds

- Review and save the change -> Confirm the correction + audit

- Jess investigates and responds -> Record the request outcome

- Confirm the correction + audit -> Close the resolved issue

- Record the request outcome -> Close the resolved issue

### CORRECTION IS NOT A NEW SUBMISSION

Keep the original response submitted and preserve provenance. Do not reissue an invitation or restart ordinary reminders. Source eligibility, re-scoring and re-review still need D-13 approval.

Basis: F-06 / L-20 / AC-05 / AC-18. Cancel leaves the record unchanged. Only authorised actions are permitted.

## Other workflows at a glance.

Supporting processes stay separate from assessment collection.

### Preview before committing

**Tag:** BASELINE / RECORD RESOLUTION

**Body:** Ananya investigates duplicates or misalignment, records required centre support, previews impact and performs only approved recoverable actions. Suspicion is not identity proof.

### Separate intention from success

**Tag:** BASELINE / CONFIGURATION AND CLOSURE

**Body:** Configure approved versions. At closure, reconcile pending work and onward referrals. Failed, unanswered or declined referrals retain a YSCC follow-up owner.

### Request, approve, release, learn

**Tag:** CANDIDATE / EVIDENCE USE

**Body:** Reporting, exchange and research specify purpose and minimum scope, obtain approval, validate and release, then return findings and close use. A request is not an access grant.

### Collection recovery remains part of the design

Expired or wrong-recipient links lead to safe support, not exposed answers. Reissue preserves attempt history. Tablet reset does not decide server-draft retention. Resolve uncertain saves before treating work as submitted.

### GOVERNANCE QUESTION

Who can act, on what evidence, within which scope, and how is the result verified? Require answers before implementing shortcuts or external data access.

Basis: F-07/F-09/F-11 and candidate F-14 to F-16. These summaries do not replace the detailed F-01 to F-17 catalogue.
