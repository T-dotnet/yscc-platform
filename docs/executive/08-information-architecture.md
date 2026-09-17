# YSCC Platform - Information architecture

Executive edition 1.5 | 16 September 2026 | Working proposal; aligned to the current local prototype

[Visual PDF](../../output/pdf/executive/08-information-architecture-executive.pdf) | [Detailed original](../08-information-architecture.md) | [Executive index](README.md)

## Organise around the work, not the org chart.

Staff need a stable place to find people, understand the current episode and take the next authorised action.

### My work

**Body:** Implemented locally: owned intake waits, referral follow-up and due work.

### People

**Body:** Implemented locally: register into intake, then select the care context.

### Data quality

**Body:** Corrections, audit and record resolution.

### Administration

**Body:** Approved roles, versions and rules.

People > Person > Selected care episode

- **Overview:** Identity, dates, owner, timeline and next action.

- **Assessment:** Core/modules, collections, delivery, response and policy-dependent review.

- **Events:** Dated care-period changes and milestones, such as medication, service or significant life events.

- **Report:** Progress dashboard, clinician narrative, annotations and questionnaire details.

- **Consent & respondents:** Versioned purpose requests, decisions/history, relationship, authority and visibility.

- **History:** Care-period activity, actors, times and before/after details.

### Intake and contextual destinations

Intake (ST-27) and referral detail (ST-28) open contextually. Assessment, Report (ST-29), Consent & respondents and History (ST-30) retain the selected care period.

### FINDABILITY TEST

Can staff find the right episode, distinguish a response from a reviewed assessment, and return to their work without losing context? Test labels and paths before visual sign-off.

Basis: Detailed brief 08, ST-00 to ST-30; intake rule U1/D-25. Core staff surfaces are demonstrated locally; production routes and access remain proposed.

## Separate spaces. Governed connections.

A participant invitation, a clinician workspace and a research output must not share the same access assumptions.

### Open request

**Body:** Scoped access and approved recipient checks.

### Understand + answer

**Body:** Pinned questionnaire or consent purpose, visibility, support and explicit action.

### Confirm + exit

**Body:** Real receipt, safe recovery and tablet reset.

Participant surfaces expose only the permitted questionnaire or consent task. An invitation link is not a credential for an unrestricted progress portal.

### Care plans and personal progress

**Tag:** CANDIDATE / CARE

**Body:** Jess's ongoing-care context and Kai's approved progress view. Define clinical content, authentication and sharing; decide phase.

### Centre and implementation workspaces

**Tag:** CANDIDATE / SERVICE

**Body:** Rachel, Sam and Ananya need scoped performance, fidelity, definitions and improvement actions - not automatic clinical drill-down.

### Governed evidence products

**Tag:** CANDIDATE / SYSTEM

**Body:** Priya, David, Maya and Helen may need reports, exchange contracts or approved releases rather than daily access to the care interface.

### Access must hold everywhere

Apply the same scope rules to search, counts, deep links, audit and outputs. Persona groups do not automatically become menus or permission grants.

### ARCHITECTURE DECISION

Approve capability and data scope first, then decide the appropriate surface or external output. Keep candidate destinations out of launch navigation until adopted.

Basis: Detailed brief 08: PT-01 to PT-09 and candidate EX-01 to EX-08; D-12/D-21 to D-24.
