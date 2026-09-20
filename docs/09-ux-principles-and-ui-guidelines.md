# YSCC Platform — UX principles and UI guidelines

Version 0.2 · 18 September 2026 · Working proposal for stakeholder validation

[Document index](README.md) · [UX strategy](06-ux-strategy.md) · [Information architecture](08-information-architecture.md) · [Requirements and logic](05-requirements-and-logic.md)

## 1. Purpose and status

This guide translates the YSCC product model into practical experience and interface decisions. It is for product, design, content, engineering, clinical and operational teams working on the platform. It covers the staff workspace first, while identifying the separate constraints that apply to participant and supporter experiences.

The guidance is a proposed design baseline, not a clinical protocol, accessibility conformance claim, permission model or release gate. It should be reviewed with clinicians, young people and families/supporters where appropriate, operations, privacy/security, data and product owners. The Report and Events tabs are explicitly provisional; their current prototype direction needs stakeholder confirmation before implementation decisions are treated as settled.

## 2. Experience promise

YSCC should help people make the next safe, informed contribution to care without asking them to understand the underlying data model. A person record should feel coherent across intake, assessment, collection, review, follow-up, events and history, while each action remains clear about its purpose, scope, owner and evidence.

The interface should make four things easy to answer:

1. **Where am I?** — show the workspace, person, selected care episode and current section.
2. **What am I looking at?** — name the record, questionnaire/version, respondent, date range and status.
3. **What can I do?** — show the next authorised action with a specific verb.
4. **What happened?** — preserve source, actor, time, prior/new values and unresolved work.

## 3. Core UX principles

### P1. Start with the person's care context

Keep the selected person and care episode visible when staff move between sections. A care episode is the context for assessment, collection, events, report and history; it is not interchangeable with an assessment instance or a single response.

**Apply it:** use a stable person/episode header, clear episode dates and owner, active tab styling, and a visible route back to the person or worklist. Never rely on a browser back button as the only way to orient someone.

### P2. Organise around work, not the data model

Navigation and labels should match staff tasks and vocabulary rather than database tables or organisational structure. Keep global navigation stable and use person-level tabs only for views of the selected person and episode.

**Apply it:** use **My work**, **People**, **Data quality** and **Administration** as the primary staff destinations. Use **Overview**, **Assessment**, **Report**, **Consent & respondents** and **History** for the person-level context. Keep intake and referrals contextual unless stakeholders adopt a different model.

### P3. Make status and ownership explicit

One status cannot communicate assignment, delivery, response, review, follow-up and episode state at the same time. Show the specific state, who owns the next action and what evidence supports it.

**Apply it:** distinguish **Draft**, **Submitted**, **Review required**, **Review not required**, **Reviewed**, **Declined**, **Withdrawn**, **Paused**, **Closed** and **Not established** where applicable. Do not use colour alone; pair status colour with text and, where useful, an icon.

### P4. Preserve provenance and longitudinal meaning

Answers are dated contributions, not an unexplained score. A response must retain questionnaire/version, respondent, recorder or source, collection date, care period and review requirement. Comparisons must be question-level and version-aware.

**Apply it:** label charts and tables with the question, scale, response dates and questionnaire/version. Show qualitative changes as **Previous → New** with the question and dates. Never infer improvement, deterioration, influence or causality from a change unless an approved clinical method supports that interpretation.

### P5. Reveal complexity progressively

Lead with the information needed for the current decision. Keep detail available through a predictable accordion, details view or linked history. Do not hide active episode, permission, error, review or incomplete-work context behind progressive disclosure.

**Apply it:** keep key summaries open by default when they orient the task; use accordions for dense details such as questionnaire evidence, delivery attempts and respondent context. Preserve the user's open/closed state within the view where practical.

### P6. Use plain, respectful language

Use the words staff, participants and supporters use. Prefer sentence case, specific verbs and short sentences. Explain system states without blame, speculation or jargon. Use clinically approved terms for instruments and participant-facing content.

**Apply it:** write **Save draft**, **Submit response**, **Record review**, **Request correction**, **Record event** and **Close episode** rather than generic **Submit**, **Complete** or **Update**. Explain **Review not required** as a policy state, not as proof that someone reviewed the response.

### P7. Design for safe recovery

Every interrupted, blocked, empty or failed state needs a clear next action. Preserve entered answers where allowed. Make expiry, retry, cancellation, correction and tablet reset understandable before they are needed.

**Apply it:** distinguish **Saved as draft** from **Submitted**; explain whether a retry creates another delivery attempt or another clinical time point; show what will happen before a destructive or irreversible action; provide support routes without exposing protected information.

### P8. Minimise exposure and respect agency

Show only the information and actions needed for the current role, purpose and care scope. A participant invitation is not a credential for an unrestricted progress portal. Consent purposes, respondent relationships, authority and visibility must remain explicit.

**Apply it:** scope search, counts, deep links, exports, report content and event visibility consistently. Do not infer guardian authority, consent, identity or permission from a relationship, link recipient or role label alone.

### P9. Accessibility is part of the interaction model

Target the proposed WCAG 2.2 AA baseline, subject to testing. Keyboard access, focus order, semantic headings, screen-reader names, reflow, contrast, touch targets, readable copy and non-colour state cues are product requirements, not polish.

**Apply it:** use real headings and labelled controls, announce validation and save/submission state, preserve focus when accordions open, and test zoom/reflow and assistive technology with representative workflows. A scan does not prove an accessible experience.

## 4. Information hierarchy and page composition

Use a consistent hierarchy so a staff member can scan before reading. The recommended order for a person-level working view is:

1. **Global shell:** workspace, primary navigation, help and signed-in user.
2. **Location:** breadcrumb or back link, person identity and selected care episode.
3. **Primary task:** page title, one-sentence purpose and the most important action.
4. **Decision summary:** dates, owner, status, latest response or outstanding work.
5. **Scoped controls:** selector, search, filter or comparison control that changes the content below it.
6. **Evidence and detail:** cards, tables, charts, forms or timelines in a clear reading order.
7. **Recovery and history:** warnings, incomplete work, audit links and related next steps.

Do not put a selector in the same visual container as the summary it controls if that makes the hierarchy ambiguous. Give a selected questionnaire/version its own heading and supporting line, then place its charts and comparison details below. Keep labels close to their controls and keep explanatory text adjacent to the decision it supports.

## 5. UI guidelines by pattern

### 5.1 Shell, navigation and wayfinding

- Keep primary navigation visible on desktop and provide a clearly labelled open/close control for the side menu.
- Use the same label in navigation, page title, breadcrumb and help copy. Prefer **Report**, not a rotating mix of **Progress dashboard** and **Report**.
- Highlight the active destination and expose it to assistive technology with `aria-current`.
- Show the selected person and care episode above person-level tabs. Do not make tabs carry identity that is only visible in a header.
- Use tabs only for sibling views of the same person/episode. Use a contextual link or action for intake, referral and modal details.
- Make deep links safe to open directly: show the current location, scope, loading state and an authorised recovery path.

### 5.2 Headings, cards and containers

- Use one clear page heading, then a predictable `h2`/`h3` ladder. Do not make a card border carry the only meaning of a section.
- Use cards for comparable records, status summaries or a focused decision. Do not turn every paragraph into a card.
- Separate summary, selector, evidence and narrative containers when they have different jobs.
- Give containers comfortable padding and enough width for labels and question text to wrap. Never force a question into a single line when it harms comprehension.
- Use a horizontal divider when it clarifies a change of information group; avoid decorative rules directly under every heading.
- Keep visual hierarchy stable across Mia, Zoe and other sample people. Data differences should not produce different page structures.

### 5.3 Accordions and detail views

- Use native `details`/`summary` semantics or an equivalent accessible disclosure pattern.
- The whole summary row should be keyboard operable and communicate expanded/collapsed state.
- Keep the most useful evidence open by default when the section is the main task; keep secondary audit detail closed by default.
- Use a clear title and one-line description in the summary, not a paragraph that changes shape unpredictably.
- Do not use an accordion to hide an error, a required action, the selected episode or the current permission boundary.
- In a modal **View details** experience, group related fields into accordions with stable headings such as **Questionnaire and respondent**, **Delivery and contact**, and **Delivery attempts**. Preserve the same order and wording in the underlying page and modal.

### 5.4 Forms and questionnaires

- State the purpose, respondent, recorder, channel and questionnaire/version before the first question.
- Use one visible label per field. Put instructions before the control when they change how someone should answer.
- Keep Likert response options in a stable, authored order. Let labels wrap; do not truncate or overlap long questions.
- Make **Prefer not to answer**, **Not asked** and **Not established** explicit options or states when approved. They are not validation errors.
- Validate in context and on submission. Identify the question and explain the correction in plain language.
- Distinguish draft, submitted, rejected/unknown and reviewed states in copy and visual treatment.
- Never imply that a questionnaire response is a diagnosis, clinical score or completed assessment unless the approved instrument and workflow say so.

### 5.5 Report and longitudinal evidence

- Lead the current Report with the selected care episode's labelled date range and a shared **Care timeline**. Offer clear All, Care, Context and conditional K10 filters; do not hide the available tracks in a colour-only legend.
- Use a bar only for a record with a factual start and end date. Use a point or marker for a one-date record. The selected item must expose its date, type, factual description, source status and available provenance; provide a browseable list alongside the spatial plot.
- A K10 raw total requires a complete, dated, compatible response, its named scoring method and an accessible value/date alternative. Never add thresholds, diagnosis, severity labels, causal inference or treatment-effect language without the approved instrument-specific contract.
- If events appear on a timeline, use a distinct marker style and accessible label. A marker communicates timing only; it does not establish influence.
- Clearly label fixture-only visual experiments and never promote their simulated symptoms, risk states, outcome trajectories, activity ratings, programme periods or medication changes as governed data or a production feature.
- The earlier questionnaire dashboard, normalised Likert display and answer-level **Questionnaire comparison and details** are not current Report behaviour. Future question-level comparison must keep the question, compatible versions, respondent, dates and comparison limits visible rather than substituting an interpreted status.
- Keep clinician notes, narrative, response history and annotations in their approved destinations. A hidden module must not be silently treated as unavailable data.
- Use a table only when side-by-side comparison improves a decision. Wrap question text, keep column headings visible, and put actions such as **View latest response** or **View earlier response** in the relevant response cell. At narrow widths, retain those headings semantically and show each dated answer with a visible label rather than leaving a compressed or horizontally clipped table.

### 5.6 Events and activity history

- Treat an event as a dated contextual record, not automatically a diagnosis, outcome, treatment decision or proof of external service delivery.
- Show event date, type, title/summary, details, recording actor and recorded time. Separate the event date from audit time.
- State whether the event belongs to the selected care episode. Reject or explain dates outside the episode according to the approved rule.
- Keep event creation, correction, retraction, visibility and retention rules explicit. Do not imply that an event can be deleted if history must be preserved.
- In History, lead with the activity title, then actor/role/context on separate lines, then reason and a **View changes** disclosure. Do not repeat a timestamp in the item body when it is already in the timeline rail.
- Use dividers and spacing to separate history items. Keep before/after values labelled and aligned so the change can be understood without reading a paragraph.

### 5.7 Status, empty, error and confirmation states

- Use a consistent status vocabulary and define it in help or supporting text where a distinction matters.
- Empty state structure: what is empty, why it may be empty, and the next safe action.
- Error structure: what failed, relevant context, and what to do next. Never show only a technical code or **Something went wrong**.
- Confirmation structure: state the completed action and its consequence, for example **Response submitted. It is now available for review.**
- For unavailable or unestablished data, say **Not established** rather than implying a negative finding or silently leaving a blank.
- Do not rely on animation, hover or colour alone. Provide equivalent text and keyboard access.

## 6. Content and terminology rules

Use sentence case for headings, labels, buttons and status values. Prefer short, concrete labels and active verbs. Keep one concept to one term:

| Prefer | Avoid | Why |
| --- | --- | --- |
| Report | Progress dashboard, report view, outcomes view | One stable destination name |
| Care episode | Episode, case, period used interchangeably | Preserves the domain distinction |
| Questionnaire | Instrument, form, survey mixed in the same context | Matches participant-facing language where approved |
| Submitted response | Completed questionnaire | Separates submission from assessment completion |
| Review not required | No review, automatically reviewed | Does not imply a review happened |
| Not established | Unknown, blank, not available mixed together | Honest state without inventing a reason |
| View details | Click here, More | Describes the action and target |

Write helper text as a short explanation of why the information matters. Avoid clinical interpretation in interface copy unless it is approved for that instrument and audience. Do not use a person's or respondent's name as a substitute for a role, source or authority statement.

## 7. Responsive and inclusive behaviour

- At narrow widths, preserve the care-context header and make the active section clear before collapsing secondary navigation.
- Allow tables to scroll or transform into labelled records; do not shrink question text below comfortable reading size.
- Reflow chart cards to one column when labels or tooltips would otherwise collide. Keep the question heading and scale legend attached to its chart; allow the heading/status row to wrap before reducing the question to word-by-word lines.
- Stack Risk and status history above Goals and functioning before their parallel cards make category labels or milestone content unreadable. Within a narrow risk card, stack the category label above its dated track.
- Maintain a minimum touch target of approximately 44 by 44 CSS pixels for primary controls, subject to the approved accessibility standard.
- Test keyboard-only, screen reader, zoom, high-contrast and reduced-motion use. Include supported completion, shared-device and low-confidence digital contexts.
- Do not infer age, culture, language, disability, guardian authority or preferred channel from a name, device or role. Ask only what the approved workflow needs.

## 8. Validation and governance

Before treating a guideline as an implemented standard, validate it in four passes:

1. **Content review:** clinical, operational, safeguarding, privacy and plain-language review of labels, question text, status definitions and help copy.
2. **Structure review:** tree testing and first-click testing for the shell, person/episode context and tab labels.
3. **Task review:** observe representative staff, participant and supporter tasks, including incomplete, corrected, declined, expired and permission-limited paths.
4. **Accessibility and integrity review:** keyboard/screen-reader/reflow checks plus provenance, scope, audit, retry and concurrency tests in the implemented environment.

Record evidence, unresolved assumptions, owner and decision date. A visually coherent prototype is not evidence that a clinical rule, permission boundary, consent path or production integration is approved.

### Stakeholder decisions required for this guide

- Which terms and status distinctions must be standard across all services and channels?
- Which Report content belongs in Report, Assessment or History, and who may see or edit each part?
- Which event types and fields are useful, minimum necessary and safe to display on Report charts?
- What does a stakeholder mean by improvement, influence or progress, and what approved method may support those claims?
- Which participant/supporter paths, authority checks, assistance rules and translations must be supported at launch?
- What evidence is required before these guidelines become a production design standard?

## 9. Implementation checklist

- [ ] The page identifies workspace, person, selected care episode and current section.
- [ ] Headings, labels and buttons use the approved vocabulary and sentence case.
- [ ] Status text explains the actual state and does not rely on colour alone.
- [ ] Each primary action has a specific verb, owner and recoverable outcome.
- [ ] Questionnaire/version, respondent, recorder/source and dates remain visible wherever answers are compared.
- [ ] Likert charts and non-Likert answer comparisons are question-level and do not infer clinical meaning.
- [ ] Any normalised Likert aggregate is labelled as a prototype-only descriptive calculation, with its scope and exclusions visible; it is not presented as an approved clinical score.
- [ ] Event markers communicate timing only and have an accessible label.
- [ ] Accordions expose secondary detail without hiding required actions or scope.
- [ ] Report comparison cards, care-context cards and Likert cards retain their core labels without horizontal overflow at narrow widths.
- [ ] Empty, blocked, error, draft, submitted, corrected and unavailable states have clear next steps.
- [ ] Tables wrap long questions and keep response actions in the relevant cell.
- [ ] Keyboard, screen-reader, zoom, contrast, reflow and reduced-motion behaviour has been tested.
- [ ] Prototype assumptions are labelled and linked to an owner, decision or validation result.

## 10. Related documents

- [01 — Product framing](01-product-framing.md) for evidence status, scope and ownership.
- [05 — Requirements and logic](05-requirements-and-logic.md) for the canonical FR/rule/acceptance catalogue.
- [06 — UX strategy](06-ux-strategy.md) for research, measurement and design sequencing.
- [07 — User flows](07-user-flows.md) for task sequences, recovery and interaction behaviour.
- [08 — Full information architecture](08-information-architecture.md) for domain relationships, screen inventory, labels and wayfinding.
- [Stakeholder validation questions](stakeholder-validation-questions-2026-09-16.md) for the current Report and Events decisions.

**Status note:** this document is a working proposal. It does not approve clinical content, consent wording, access control, scoring, retention, external delivery or production readiness.
