# YSCC stakeholder validation questions

Version 0.2 · 16 September 2026 · Episode, Events and Report

Use this short set with clinical, assessment, operations, product/UX, privacy/data and service stakeholders. For each answer, record the decision, owner, date, rationale and documents affected. Treat unanswered questions as open decisions.

## Key terms

| Term | Working definition |
| --- | --- |
| **Care episode** | A defined period of engagement or care for one person, with its own dates, owner, status and closure. |
| **Assessment** | A structured assessment instance within an episode; it may include several modules, reviews and decisions. |
| **Collection point** | A planned baseline or follow-up occurrence when one or more questionnaires are requested. |
| **Questionnaire** | An approved question set and version used to collect answers from a respondent. |
| **Response** | The submitted answers from a questionnaire collection, including respondent, source, dates and review state. |
| **Event** | A dated contextual record about something relevant to care; it is not automatically a diagnosis, outcome or causal explanation. |
| **Report** | A role-appropriate view that helps staff review dated questionnaire evidence and agreed interpretations for an episode. |
| **History** | The trace of activity and changes, including actors, times, reasons and before/after values. |

## 1. Care episode

1. What is the approved definition of a care episode, and what label should staff see?
2. What starts and ends an episode? Who can pause, close or reopen it, and what reason or evidence is required?
3. When should a returning, transferred, relapsing or re-referred person receive a new episode?
4. How should an episode relate to intake, assessment instances, collection points, referrals, reviews and events?
5. Which dates, owners, statuses and pending actions must always be visible? How are unknown or corrected dates shown?
6. What may staff see across episodes, and does the proposed order of Overview, Assessment, Events, Report, Consent & respondents and History match their work?

## 2. Events

1. What problem should Events solve that is not covered by care plans, referrals, assessment, annotations or History?
2. Is an event a durable clinical record, a contextual log, a care-plan entry or another governed record? What must it never imply?
3. Which event types are needed, and what minimum fields, source and evidence does each require?
4. What does the event date mean? How should effective, known, recorded, approximate, unknown, future or out-of-episode dates work?
5. Which roles may view, create, correct, amend, retract or delete events? What audit and retention rules apply?
6. Which events, if any, should appear on Report charts? What wording prevents temporal proximity being read as influence or causality?

## 3. Report

1. Who is Report for, and what decision or conversation should it support?
2. Which label is approved: Report, progress, change over time or another term? What does the chosen term mean?
3. Are the summary measures and latest-response date useful? Which definitions or measures need changing?
4. What makes two responses comparable: questionnaire/version, question, respondent, branch, dates, source or other conditions?
5. How should multiple respondents, assisted completion, missing dates, incompatible versions and nonresponse be shown?
6. Should the page lead with a summary, then a questionnaire/version selector, question-level Likert charts and qualitative Previous → New cards? What hierarchy is clearest?
7. Should questionnaire comparison and details, response history, notes, narrative, review and annotations live here or in Assessment/History? Who may view or edit each?
8. Should events be shown as chart markers? If so, which types, labels, filters, links and accessibility treatment are required?
9. The local prototype now uses a selected-episode care timeline with fictional care periods, medication courses, events, goals, risk-related events and conditional K10 raw totals. Which of these record types have an approved source and purpose, and which remain design experiments only?
10. What provenance and accessible detail must a selected timeline item expose? When should a record be a dated point rather than a duration bar?
11. What must prevent timeline proximity, a raw K10 total or a visual trend from being read as causality, severity, diagnosis, treatment effect or a clinical recommendation?

## 4. Cross-cutting decisions

1. Which terms and statuses must be consistent across services and channels: episode, event, questionnaire, response, review, progress, change and not established?
2. Which staff, participant and supporter roles may view or act on each record? What authority and visibility checks are required?
3. What accessibility, language, cultural-safety and assisted-use requirements apply to timelines, charts, accordions, tables and dense question text?
4. What research evidence is required: wayfinding, episode-boundary comprehension, chart interpretation, comparison confidence and safe handling of sensitive events?
5. What must be approved before release: content and taxonomy, permission matrix, data model, retention, audit, accessibility, usability and clinical sign-off?

## Decision record

| Question or decision | Decision / unresolved point | Owner | Date | Evidence or rationale | Documents to update |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

Until these decisions are recorded, Episode, Events and Report remain working directions rather than approved policy or production requirements.
