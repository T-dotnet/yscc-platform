# Prototype longitudinal Report implementation status

19 September 2026 · Factual local-prototype record · Not an approved clinical, privacy, accessibility or production specification

## Purpose and scope

This note records the Report behaviour currently rendered by the local YSCC prototype. It describes fictional browser-local demonstration data and design experiments, not approved clinical policy, reporting logic, data governance or production readiness.

## Current Report composition

For every selected care episode, **Report** renders a **Care timeline**. It has a date range, All, Care, Context and conditional K10 filters, a horizontally scrollable visual track, a key, a non-spatial **Browse visible records** disclosure and a timing-not-causality caveat. Selecting an item opens source detail; collection and event records can open their existing staff views.

The timeline may contain:

- care-setting/service periods with a recorded start and end;
- medication courses with a recorded start and end, plus one-date medication events;
- significant/contextual events;
- dated goal milestones and risk-related events; and
- complete, dated, compatible K10 responses as raw totals from 10 to 50.

Undated submitted responses are excluded and called out. A bar is never inferred from a single date. The K10 fixture uses the explicitly labelled ABS NHS four-week 1–5 sum; it has no threshold, diagnosis, severity band, clinical direction or treatment-effect interpretation.

## Jordan Ellis fixture

Jordan Ellis is a fictional full-report fixture. In addition to the shared timeline, the prototype displays hard-coded visual experiments for symptoms/measures, treatment/programme periods, goals/progress, activity ratings, K10/outcome measures, risk history and medication periods. These panels are design-review material only. They are not connected to a governed source model, do not define a reusable Report contract and must not be represented as clinical records, risk assessment, medication management, validated scores or a production reporting feature.

## What is not currently rendered

The previous questionnaire dashboard, care-coordination cards, questionnaire/version selector, normalised Likert aggregate, Likert question cards and **Questionnaire comparison and details** are not rendered in the current Report. Nor are the submitted-response history, clinician-authored narrative, edit action or visible report-change log. Assessment and History remain the relevant source surfaces for response, review, collection and activity detail.

## Boundaries that remain unchanged

- Timeline proximity shows timing only. It does not establish influence, causality, risk, improvement, deterioration or treatment response.
- The data is fictional and browser-local. It does not establish authentication, authorisation, multi-user concurrency, retention, external delivery, production persistence or audit controls.
- Event, service, medication, goal and risk labels remain provisional. Their definitions, evidence standards, access, correction, retention and participant/supporter visibility need stakeholder approval.
- Report remains a staff demonstration surface; it grants no participant or guardian access.

## Related documents

- [Documentation index](README.md)
- [Requirements and logic](05-requirements-and-logic.md#9-clinician-progress-report)
- [User flows](07-user-flows.md)
- [Information architecture](08-information-architecture.md)
- [UX principles and UI guidelines](09-ux-principles-and-ui-guidelines.md)
- [Future report visualisations brief](future-report-visualisations-brief-2026-09-18.md)
