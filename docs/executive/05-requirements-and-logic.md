# YSCC Platform - Requirements and logic

Executive edition 1.2 | 15 September 2026 | Working proposal

[Visual PDF](../../output/pdf/executive/05-requirements-and-logic-executive.pdf) | [Detailed original](../05-requirements-and-logic.md) | [Executive index](README.md)

## Six commitments behind the specification.

An executive view of 46 detailed requirements. This summary does not replace their wording or acceptance tests.

### Use the right record

01 / CARE CONTEXT

Every new patient completes intake before core assessment. Registration is not intake completion or admission. Reviews stay in the relevant episode.

### Choose eligible modes

02 / APPROPRIATE COLLECTION

Reuse approved instrument versions across permitted respondent, assistance and delivery modes. Not every measure permits self-report.

### Check each purpose

03 / INFORMED ACCESS

Separate relationship, authority, permission and answer visibility. Do not make care depend on unrelated research agreement.

### Preserve what happened

04 / RECORD INTEGRITY

Pin the version presented. Keep source, dates and corrections traceable. Preserve valid zero; do not score missing or invalid codes.

### Leave a next action

05 / OPERATIONAL CONTINUITY

Own intake waits and referral follow-up. Track sending, receipt and receiving decisions separately; reconcile pending work at closure.

### Make outcomes clear

06 / RELIABLE EXPERIENCE

Accessible mobile/tablet/staff use; safe reset; truthful saving and submission; recovery without duplicate fulfilment.

### Scope stays explicit

Mandatory new-patient intake is confirmed (D-25). Operational details remain proposed. Satisfaction, services and the eight CR capabilities need separate scope decisions.

### Approval standard

Approve clinical content, permissions, operational rules and in-scope tests before enabling production workflows. A working prototype is not proof of security, persistence, scoring or delivery.

Basis: Detailed brief 05: FR-01 to FR-46, L-01 to L-29 and AC-01 to AC-29; U1/D-25.

## One status cannot tell the whole story.

The interface must distinguish requested work, access, responses and clinical decisions.

### Assignment

**Active + overdue**

The requested work is still outstanding.

### SMS link

**Expired**

This access route is no longer usable.

### Response

**Saved draft**

A draft may still exist under policy.

All three can be true together. Next action: use the approved reissue/resume pathway; preserve history and prevent duplicate fulfilment.

| DO NOT CONFUSE | WHAT IT MEANS |
| --- | --- |
| Sent / submitted / reviewed | Delivery, accepted response and clinical review are different events. |
| Assessment / admission / referral | Completion, clinical disposition and onward referral are separate decisions. |
| Correction / new collection | Correcting a submitted record does not restart ordinary reminders. |
| Missing / invalid / not applicable | Legacy 998 is invalid/out-of-standard data, not not applicable. Preserve source meaning. |

### Policy-dependent, not hard-coded assumptions

Guardian pathways, withdrawal/retention, review cadence, episode boundaries and draft/concurrent-attempt handling remain open decisions. No new age rule, reminder interval or scoring threshold is invented here.

### Test the edge cases

Require evidence for partial assessments, expired links, uncertain saves, competing submissions, corrections, scope restrictions and closure failures - not just a successful form submission.

Basis: Detailed brief 05, status model and acceptance catalogue; D-04 to D-14/D-18. Codebook CB1 mapping.

