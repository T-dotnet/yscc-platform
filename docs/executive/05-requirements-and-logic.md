# YSCC Platform - Requirements and logic

Executive edition 1.5 | 16 September 2026 | Working proposal; aligned to the current local prototype

[Visual PDF](../../output/pdf/executive/05-requirements-and-logic-executive.pdf) | [Detailed original](../05-requirements-and-logic.md) | [Executive index](README.md)

## Six commitments behind the specification.

An executive view of 46 detailed requirements. This summary does not replace their wording or acceptance tests.

### Use the right record

**Tag:** 01 / CARE CONTEXT

**Body:** Every new patient completes intake before core assessment. Registration is not intake completion or admission. Reviews stay in the relevant episode.

### Choose eligible modes

**Tag:** 02 / APPROPRIATE COLLECTION

**Body:** Reuse approved instrument versions across permitted respondent, assistance and delivery modes. Not every measure permits self-report.

### Check each purpose

**Tag:** 03 / INFORMED ACCESS

**Body:** Use a versioned purpose request: send is not consent; accept, decline and withdrawal retain history. Keep relationship, authority and answer visibility separate.

### Preserve what happened

**Tag:** 04 / RECORD INTEGRITY

**Body:** Pin the version presented. Keep source, dates and corrections traceable. Preserve valid zero; do not score missing or invalid codes.

### Leave a next action

**Tag:** 05 / OPERATIONAL CONTINUITY

**Body:** Own intake waits and referral follow-up. Track sending, receipt and receiving decisions separately; reconcile pending work at closure.

### Make outcomes clear

**Tag:** 06 / RELIABLE EXPERIENCE

**Body:** Accessible mobile/tablet/staff use; safe reset; truthful saving and submission; recovery without duplicate fulfilment.

### Scope stays explicit

The local prototype demonstrates intake, collection, consent decisions, review-required/not-required states, correction, referral and the Progress report with sample data. Operational rules and wider scope remain proposed.

### APPROVAL STANDARD

Approve clinical content, consent/authority, review requirements, operational rules and in-scope tests before production. Browser-local sample behavior does not prove security, delivery, scoring or server enforcement.

Basis: Detailed brief 05: FR-01 to FR-46, L-01 to L-29 and AC-01 to AC-29; U1/D-25.

## One status cannot tell the whole story.

The interface must distinguish requested work, access, responses and clinical decisions.

### Assignment

**Value:** Active + overdue

**Body:** The requested work is still outstanding.

### SMS link

**Value:** Expired

**Body:** This access route is no longer usable.

### Response

**Value:** Saved draft

**Body:** A draft may still exist under policy.

All three can be true together. Next action: use the approved reissue/resume pathway; preserve history and prevent duplicate fulfilment.

| DO NOT CONFUSE | WHAT IT MEANS |
| --- | --- |
| Sent / accepted / submitted / reviewed / not required | Consent delivery/decision, response acceptance and clinical review requirement/state are different facts. |
| Assessment / admission / referral | Completion, clinical disposition and onward referral are separate decisions. |
| Correction / new collection | Correcting a submitted record does not restart ordinary reminders. |
| Missing / invalid / not applicable | Legacy 998 is invalid/out-of-standard data, not not applicable. Preserve source meaning. |

### Policy-dependent, not hard-coded assumptions

Guardian pathways, withdrawal/retention, review requirements/cadence, episode boundaries and draft/concurrent-attempt handling remain open decisions. Sample rules are not clinical or legal approval.

### TEST THE EDGE CASES

Require evidence for partial assessments, expired links, uncertain saves, competing submissions, corrections, scope restrictions and closure failures - not just a successful form submission.

Basis: Detailed brief 05, status model and acceptance catalogue; D-04 to D-14/D-18. Codebook CB1 mapping.
