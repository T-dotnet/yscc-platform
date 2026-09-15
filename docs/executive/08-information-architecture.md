# YSCC Platform - Information architecture

Executive edition 1.2 | 15 September 2026 | Working proposal

[Visual PDF](../../output/pdf/executive/08-information-architecture-executive.pdf) | [Detailed original](../08-information-architecture.md) | [Executive index](README.md)

## Organise around the work, not the org chart.

Staff need a stable place to find people, understand the current episode and take the next authorised action.

### My work

Owned intake waits, referral follow-up and due work.

### People

Register new patients into intake; then select care context.

### Data quality

Corrections and record resolution.

### Administration

Approved roles, versions and rules.

**People > Person > Selected care episode**

- **Overview:** Identity, dates, owner, timeline and next action.
- **Progress:** Questionnaire-based report with clear changes over time, clinician editing, dated source evidence and report version history.
- **Assessment:** Core/modules, progress, evidence review and decision.
- **Measures:** Assignments, delivery attempts, responses and trends.
- **Consent and respondents:** Purpose decisions, relationship, authority and visibility.

### Intake and contextual destinations

Intake (ST-27) and referral detail (ST-28) open from My work or People. Services/Feedback remain conditional; correction/audit stays with its record.

### Findability test

Can staff find the right episode, distinguish a response from a reviewed assessment, and return to their work without losing context? Test labels and paths before visual sign-off.

Basis: Detailed brief 08, ST-00 to ST-28; intake rule U1/D-25. Surfaces are proposed, not implemented routes.

## Separate spaces. Governed connections.

A participant invitation, a clinician workspace and a research output must not share the same access assumptions.

### Open request

Scoped access and approved recipient checks.

### Understand + answer

Purpose, visibility, support and pinned questions.

### Confirm + exit

Real receipt, safe recovery and tablet reset.

Participant surfaces expose only permitted tasks. An invitation link is not a credential for an unrestricted progress portal.

### Care plans and personal progress

CANDIDATE / CARE

Jess's ongoing-care context and Kai's approved progress view. Define clinical content, authentication and sharing; decide phase.

### Centre and implementation workspaces

CANDIDATE / SERVICE

Rachel, Sam and Ananya need scoped performance, fidelity, definitions and improvement actions - not automatic clinical drill-down.

### Governed evidence products

CANDIDATE / SYSTEM

Priya, David, Maya and Helen may need reports, exchange contracts or approved releases rather than daily access to the care interface.

### Access must hold everywhere

Apply the same scope rules to search, counts, deep links, audit and outputs. Persona groups do not automatically become menus or permission grants.

### Architecture decision

Approve capability and data scope first, then decide the appropriate surface or external output. Keep candidate destinations out of launch navigation until adopted.

Basis: Detailed brief 08: PT-01 to PT-09 and candidate EX-01 to EX-08; D-12/D-21 to D-24.

