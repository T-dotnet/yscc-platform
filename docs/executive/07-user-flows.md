# YSCC Platform - User flows

Executive edition 1.2 | 15 September 2026 | Working proposal

[Visual PDF](../../output/pdf/executive/07-user-flows-executive.pdf) | [Detailed original](../07-user-flows.md) | [Executive index](README.md)

Three decision flows show who acts, where work stops, and where it returns. Boxes are actions; diamonds are questions. These are proposed interaction flows, not approved clinical pathways.

## 1. From intake to next care.

Clinical team | Boxes = actions; diamonds = decisions.

```mermaid
flowchart TD
    intake["New patient: complete intake<br/>Register, check information and record triage."]
    proceed{"Intake complete<br/>and proceed?"}
    pause["Wait or exit<br/>Keep owner, reason and next review. Resume intake or track the referral."]
    plan["Plan the assessment<br/>Assign core + eligible additional measures."]
    collect["Collect the assigned responses<br/>Use an eligible channel - see Flow 2."]
    review["Review evidence + unfinished work<br/>Check completion criteria separately."]
    ready{"Ready for a<br/>care decision?"}
    more["More evidence needed<br/>Identify missing evidence; add eligible measures."]
    decision["Record the clinical decision<br/>Record admission, referral and handover."]
    continue["Continue care<br/>Plan the next review in the same episode."]
    leave["Agree the next care action<br/>Close the episode only if appropriate."]
    intake --> proceed
    proceed -->|"No"| pause
    proceed -->|"Yes"| plan
    plan --> collect
    collect --> review
    review --> ready
    ready -->|"No"| more
    more -->|"Return to planning"| plan
    ready -->|"Yes"| decision
    decision -->|"Continuing here"| continue
    decision -->|"Not continuing here"| leave
```

### MANDATORY INTAKE AND NEXT STEPS

Every new patient goes through intake (D-25); registration is not completion. Waiting and non-proceeding intakes retain an owner and next action. Clinical admission remains separate.

Basis: F-01/F-02/F-05/F-08/F-09/F-17; U1/D-25. Intake detail D-26/D-27 remains proposed.

## 2. Three channels. One response.

Staff set up the task; the eligible respondent or clinician completes it.

```mermaid
flowchart TD
    setup["Confirm the assignment<br/>Person, version, respondent, support and owner."]
    permission{"Permissions and<br/>channel checks pass?"}
    blocker["Resolve the blocker<br/>Name the owner and next action; then return to setup."]
    entry["Clinician entry<br/>Record a clinician rating or transcribed answers; retain who supplied them."]
    sms["SMS link<br/>Send an expiring, account-free link. Check recipient; explain purpose and visibility."]
    tablet["Clinic tablet<br/>Start an isolated session. Explain purpose, visibility and permitted assistance."]
    submit["Answer, then submit<br/>Use pinned item rules; re-check current permission when submitting."]
    accepted{"Response accepted<br/>and saved?"}
    recover["Check the outcome<br/>Return to this decision. Retry only when safe; never create a duplicate."]
    fulfilled["This assignment is fulfilled<br/>Clinical review is a separate step."]
    reset["Tablet only<br/>End and reset; staff re-authenticate to return."]
    setup --> permission
    permission -->|"No"| blocker
    blocker -->|"After resolution"| setup
    permission -->|"Yes - eligible clinician entry"| entry
    permission -->|"Yes - eligible SMS"| sms
    permission -->|"Yes - eligible tablet"| tablet
    entry --> submit
    sms --> submit
    tablet --> submit
    submit --> accepted
    accepted -->|"No or not known"| recover
    recover -->|"Re-check outcome"| accepted
    accepted -->|"Yes"| fulfilled
    fulfilled -->|"Tablet only"| reset
```

### PARTICIPATION AND INTERRUPTION

Family contribution does not grant guardian authority or access to another person's answers. A draft is not submitted. Tablet cancel/timeout clears local context under approved policy.

Basis: F-02/F-03/F-04/F-10. Eligibility, recovery and storage policies remain open; phase conflict D-21 remains.

## 3. Correct, or ask the clinician?

Tom, Data Officer | Jess, authorised clinician | Different responsibilities.

```mermaid
flowchart TD
    issue["Tom opens the issue<br/>Confirm scope, field, revision and source."]
    source{"Approved verified<br/>source available?"}
    direct["Tom prepares a correction<br/>Check authority; record the new value, source and reason."]
    request["Tom requests clinician input<br/>Assign Jess an issue with context, evidence reference and next action."]
    commit["Review and save the change<br/>Check the latest revision. If it changed, review again before saving."]
    clinician["Jess investigates and responds<br/>Any change uses the audited correction route; otherwise record another resolution."]
    audit["Confirm the correction + audit<br/>Retain prior/new value, source, actor, time and reason."]
    resolution["Record the request outcome<br/>Keep the issue open until the responsible clinician resolves it."]
    closed["Close the resolved issue"]
    issue --> source
    source -->|"Yes - direct correction"| direct
    source -->|"No - request clinician input"| request
    direct --> commit
    request --> clinician
    commit --> audit
    clinician --> resolution
    audit --> closed
    resolution --> closed
```

### CORRECTION IS NOT A NEW SUBMISSION

Keep the original response submitted and preserve provenance. Do not reissue an invitation or restart ordinary reminders. Source eligibility, re-scoring and re-review still need D-13 approval.

Basis: F-06 / L-20 / AC-05 / AC-18. Cancel leaves the record unchanged. Only authorised actions are permitted.

## 4. Other workflows at a glance.

Supporting processes stay separate from assessment collection.

### Preview before committing

BASELINE / RECORD RESOLUTION

Ananya investigates duplicates or misalignment, records required centre support, previews impact and performs only approved recoverable actions. Suspicion is not identity proof.

### Separate intention from success

BASELINE / CONFIGURATION AND CLOSURE

Configure approved versions. At closure, reconcile pending work and onward referrals. Failed, unanswered or declined referrals retain a YSCC follow-up owner.

### Request, approve, release, learn

CANDIDATE / EVIDENCE USE

Reporting, exchange and research specify purpose and minimum scope, obtain approval, validate and release, then return findings and close use. A request is not an access grant.

### Collection recovery remains part of the design

Expired or wrong-recipient links lead to safe support, not exposed answers. Reissue preserves attempt history. Tablet reset does not decide server-draft retention. Resolve uncertain saves before treating work as submitted.

### GOVERNANCE QUESTION

Who can act, on what evidence, within which scope, and how is the result verified? Require answers before implementing shortcuts or external data access.

Basis: F-07/F-09/F-11 and candidate F-14 to F-16. These summaries do not replace the detailed F-01 to F-17 catalogue.

## What changed in this revision

- Replaced side-note tables and channel lists with explicit decisions, arrows, return paths and outcomes.
- Separated a fulfilled assignment from clinical review, assessment completion and admission.
- Made Tom's verified-source correction route distinct from a request for Jess to investigate.
- Retained supporting operations and candidate evidence workflows on a separate page; the detailed flow catalogue remains authoritative.
