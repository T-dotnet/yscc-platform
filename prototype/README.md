# YSCC interactive prototype

A working Next.js prototype of the YSCC assessment and care-episode workspace, based on the [product and UX documentation](../docs/README.md). Uses fictional people and original, nonclinical sample questions.

## Open and run

The local development address is **http://127.0.0.1:3100**.

```sh
cd "/Users/danielenicoletti/Documents/ChatGPT/YSCC Platform/prototype"
npm install
npm run dev -- --port 3100
```

The verified intake preview runs at **http://127.0.0.1:3102** using an independent build folder, so other local previews can keep running. To reproduce it, run `YSCC_BUILD_DIR=.next-intake npm run build`, then `YSCC_BUILD_DIR=.next-intake npm start -- --port 3102`.

Production-build check: `npm run build`. Run the built app with `npm start -- --port 3100`. Domain checks: `npm test`.

## What you can explore

| Area             | Working behaviour                                                                                                                                                                                                            |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| My work          | Derived task counts, overdue and review filters, name/ID search, collection-point filtering, record navigation.                                                                                                              |
| People           | Assessment status and due-date summaries, priority ordering, status and episode filters, search, fictional-person registration and duplicate-name warning.                                                                   |
| Care episode     | A plain care label for a single episode; a dated care-period selector only when multiple episodes exist. Overview, Assessment, Events, Report, Consent & respondents, and History follow the selected period.                  |
| Collection       | Respondent and channel selection; sample permission/contact gates; SMS preview, tablet session, and staff transcription modes. Reissue adds an attempt to the same assignment.                                               |
| Questionnaire    | Separate participant interface; introduction, adaptive questions in sections, permitted nonresponse, back/change, searchable review, single submission, support/exit, neutral session end.                                   |
| Clinical review  | Inspect answers and provenance and preserve a separate review state. SMS and independent tablet responses need review; clinician entry and supported tablet completion are marked Review not required under the sample rule. |
| Consent requests | Select a sample purpose/version, use SMS or clinic tablet, open the scoped participant view, record Accept/Decline or later Withdraw, and retain request/decision history.                                                   |
| Follow-up        | Create a distinct collection point with a pinned instrument version inside the existing episode.                                                                                                                             |
| Episode actions  | Pause/close with reason and impact review; reconcile outstanding assignments and revoke active sample links.                                                                                                                 |
| Data quality     | Correct from a verified sample source; retain before/after values, reason, actor, and source in an audit.                                                                                                                    |
| Administration   | Browse eight sample questionnaires and previews, including a verbal Likert-scale check-in; inspect rules, messages and workspace scope; and reset the demo.                                                                  |
| Events           | Provisional episode-scoped care-event timeline with a Record event action for medication, care/service, significant-life and other sample events. Requires clinical, operational and data/privacy validation.                  |
| Report           | Provisional questionnaire-based dashboard with a compact care-coordination context, question-level Likert charts, a version-scoped descriptive normalised value, answer-level comparison and contextual event markers. It does not infer influence, causality or clinical direction. |

### Suggested five-minute walkthrough

1. Open **Kai Thompson** from My work.
2. From Overview, choose **Replace expired link**, keep SMS link, confirm the sample recipient checks, then **Prepare sample link**.
3. Open the sample questionnaire, answer the applicable questions, and submit. All sample assignments now use the longer branching version.
4. End the session and return to the staff demo. This SMS response is submitted with clinical review pending; clinician entry and supported tablet completion use the separate sample **Review not required** path.
5. Record a clinical review, then use **Plan follow-up**. Choose **Add follow-up** to save the new time point, or **Set up collection** to save it and open collection setup for that follow-up. Inspect Assessment to see both prior collections and the new time point in care episode 01.
6. Open **Consent & respondents**, send an available sample purpose, open its patient view, and Accept, Decline or later Withdraw it. Inspect the purpose-specific history.
7. Open **Events** to inspect or record a sample care event, then open **Report** to read the questionnaire dashboard and inspect questionnaire details. Event markers are timing context only; open **History** for the complete care-period activity and annotations. These two tabs are prototype directions pending stakeholder validation.
8. Open Data quality and make a sample correction with a source and reason. Inspect the audit.

### Complete a questionnaire as clinician

The clinician-completion preview runs at **http://127.0.0.1:3118**. To reproduce it, use `YSCC_BUILD_DIR=.next-clinician-dev npm run dev -- --port 3118`.

Open **View details** on an outstanding Assessment collection, then choose **Complete as clinician**. You can also choose **Clinician entry** in collection setup. Assessment cards show preview, details and submitted-response review actions; collection setup and clinician completion are accessed from the details view. Overview directs staff to the relevant collection action first. Confirm who supplies the answers and select **Transcribed** or **Joint completion**, then **Begin questionnaire**.

The clinician enters and reviews the answers in the staff workspace. Submission saves the response against the same assessment and delivery attempt, identifies the patient/family respondent as answer source and the clinician as recorder, and does not create a separate clinical-review task. Supported clinic-tablet completion follows the same no-review rule. The current sample instrument is respondent-reported; it does not substitute clinician ratings for patient answers. Closing an answered form prompts before discarding unsaved answers; refresh warns before leaving. Draft save/resume is not implemented.

Clinician completion requires the demo Clinician role and the existing intake, participation and active-care checks. Replaced sessions and duplicate submissions are rejected. Failed browser saves retain entered answers and show an error instead of success. Data Managers retain response editing access. All role checks and persistence remain local prototype behaviour.

### Overview next step

One Current assessment card groups the recommended next step with the response status, clinical review status, instrument and questionnaire preview. The recommendation follows the selected collection and care period, showing its label, due date and overdue duration, with one primary action and a secondary link to Assessment. The collection name is the main heading, with Current assessment as its small section label, the status alongside the name and the due date underneath. The two sections sit alongside each other on desktop and stack on smaller screens; Care timeline and People involved sit below the shared card.

- **Overdue with an active link/session:** inspect collection details and activity before arranging another attempt.
- **Expired link:** open replacement setup for the same collection. A recorded sample draft cannot be resumed.
- **No attempt recorded:** set up collection, with wording for overdue, due-today and scheduled work.
- **Draft or revoked link:** inspect the existing collection first.
- **Submitted / updated answers:** review the response when required; clinician-entry and supported-tablet responses show View details with Review not required. Data Managers see View responses.
- **Reviewed:** open the recorded review. Clinical review remains separate from the next care decision and assessment completion.
- **Intake, participation/contact or unavailable-version blockers:** inspect the prerequisite instead of offering delivery. Paused/cancelled collections remain inspectable; paused/closed care points to episode history.

Questionnaire preview lives in Current assessment. Clinician completion remains available through collection details and collection setup. Inspecting a collection, previewing questions or opening setup does not send a reminder, change a due date, resume a draft or create a follow-up.

### Edit submitted responses

Open **Assessment → Review recorded** for a reviewed response, or **Review responses** for a submitted response awaiting review, then choose **Edit responses**. **View details** contains collection metadata and delivery information only. The recorded review, response editing and response edit history live together in the review view; saving or cancelling an edit returns there. Change an answer, enter a reason, review the before/after summary, then **Save edits**. Cancel leaves the response unchanged.

Use the sidebar profile → **Demo staff profile** to try Jess Taylor (Clinician) or Ananya (Data Manager). Both can edit. Every saved edit appears in **Response edit history** and **Data quality → Recent corrections**, with changed items, prior/new values, editor identity/role, timestamp, reason and optional source. The original answers, respondent, recorder, submission and fulfilment are retained. Editing reviewed evidence flags it for clinician re-review; earlier reviews remain available after re-review.

Role checks and revision-conflict checks demonstrate the intended behaviour in this browser tab. Production authentication, scoped server authorisation, transactional append-only storage and cross-tab/multi-user concurrency are not implemented. This local audit is demo data, not a tamper-proof production log.

### Purpose-specific consent requests

Open a person → **Consent & respondents**. Existing requests appear as Assessment-style accordions: each summary shows its purpose, version, scope and status; expand one to inspect delivery, decision context and the request-history action. Choose **Send consent request**, select one available sample purpose and use **SMS link** or **Clinic tablet**. Sending creates browser-local sample state; it does not prove a real message was dispatched, received or opened. A second Sent/Accepted request for the same purpose is blocked, and SMS requires the sample contact to be Suitable.

Open a Sent request → **Open sample patient view**. The focused `/consent` view shows only that purpose/version/scope, with **Accept** and **Decline**. Accepting exposes a later **Withdraw consent** action; staff can also record withdrawal from request details. History preserves Sent → Accepted/Declined → Withdrawn rather than overwriting the prior decision. Declining or withdrawing assessment participation revokes active sample collection links; service-improvement/contact purposes remain separate.

This is sample interaction behavior. The prototype does not verify identity or guardian authority, send an external message, implement expiry/cancellation, provide approved legal wording, or enforce production retention/access policy. Do not enter real personal or clinical information.

### Questionnaire preview

Clinicians can choose **Preview questionnaire** from **Current assessment** on Overview, each Assessment collection card, and **Plan a follow-up**. Collection details, setup and collection-ready modals do not include questionnaire preview. Existing collections preview their pinned instrument version. Preview access from the record does not depend on collection, response, consent, intake or care-episode status.

**Try a path** uses the same question flow and rules as participant completion: choose sample answers, navigate sections, check the changing progress count and review your answers. **All questions** shows a searchable catalogue grouped by section, including each question’s condition and options (24 questions across five sections for v2.0). **Reset answers** starts a fresh path. Switching modes preserves practice answers; closing preview clears them.

**Done previewing**, Close and Escape return to the originating record or planning form. In planning, the labelled Back action also returns with entered values preserved. Preview never prepares a link, starts a collection session, submits a response, creates a follow-up or changes a care record. The full participant practice is also available under **Help & guidance → Try a sample questionnaire** at `/preview`.

### Instrument library

**Administration → Browse instruments** lists eight original, nonclinical sample questionnaires: Demo check-in, Life and care check-in, Everyday life, Goals and next steps, Support network, Learning and work, Care experience, and Practical support. Search by name or topic and preview each questionnaire without changing a care record.

**Life and care check-in** demonstrates two fully labelled five-point Likert scales: frequency for the past two weeks, and agreement for a recent care conversation. All five verbal anchors remain visible. “I have not had a care conversation,” “No next steps were discussed,” and “Prefer not to answer” sit outside the Likert scale and remain distinct stored responses. In Report, valid Likert positions may also be normalised to 0–100 and averaged within one selected questionnaire version as a descriptive prototype value. It excludes those non-Likert responses and is not a clinical score, direction, threshold or interpretation.

**Plan follow-up → Instrument** selects the questionnaire for a new collection. Its description and preview follow the selection, and saving pins that version to the collection. Earlier assignments and submitted responses retain their existing version. The seven additional questionnaires have six possible questions across three sections, except the longer branching Demo check-in. They collect the person's own perspective, with assistance or staff transcription available; family contributions remain available for Demo check-in. None calculates a clinical score or represents an approved clinical instrument.

### Long questionnaires and branching

The core initial and 90-day mock collections use **Demo check-in v2.0**, an original, nonclinical sample with 24 possible questions across five sections. The initial path contains 12 questions and can expand as answers are given. Conditions support nested follow-ups and all/any combinations. Questions use stable IDs; answers retain their positions within the pinned version.

**Mia Robinson** also has four submitted **Life and care check-in v1.0** responses in the same active care episode: Starting point, 4 weeks, 8 weeks and 12 weeks. Their dated answers vary across the two verbal Likert scales so the question-level line charts and questionnaire comparison can demonstrate a longitudinal series. The Report tab hides the duplicate submitted-response history section; complete response history remains available from Assessment and History. These are fictional response changes; the prototype does not classify their direction or clinical meaning.

- Completion shows one question at a time, with section navigation, back navigation and review available throughout. Progress counts valid answers on the currently applicable path; it can increase or decrease when answers change. Unresolved conditions are separate from excluded branches.
- Changing a controlling answer clears answers on branches that no longer apply, including nested descendants. Reopening a branch requires fresh answers. The interface announces added questions or cleared answers.
- Participant review groups answers by section, supports search and an unanswered filter, and links directly to each answer. Newly revealed questions must be completed before submission. Permitted nonresponse counts as answered.
- Staff review and answer editing use the same rules and searchable sections. **Questions not asked** explains excluded branches. Edits retain the original response, audit every removed or changed answer, and preserve the existing re-review workflow.
- Patient progress supports question search, section filtering and changed-answer filtering. A question asked on only one response path is **Not comparable**; it is excluded from change counts. Different questionnaire versions remain separate.
- Existing Demo check-in assignments retain v2.0, including historical care periods; Mia’s four longitudinal responses retain Life and care check-in v1.0. Loading an older mock workspace adds the longitudinal fixtures once while preserving compatible browser-local demo work. Legacy v1.0 Demo check-in data still refreshes to the current scenario set. Subsequent demo work is retained until Reset is used.

Unsubmitted participant answers remain in the open page only. Save/resume is not implemented; leaving or refreshing clears the sample answers after the existing warning. No clinical instrument, scoring or live support policy is introduced by the sample conditions.

### Patient progress report

Open a person → **Report** for the care-period progress dashboard. When configured sample data exists, a **Care coordination context** block appears before the questionnaire selector. **Risk and status history** lists dated safety-related, housing, medication-adverse-event and inpatient-admission records; **Not recorded** is not a finding of no concern. **Goals and functioning** lists dated structured milestones and statuses, not a continuous functional score. The dashboard then groups questionnaire evidence by version and respondent. Each Likert question receives its own card with the complete question, labelled scale, first/latest answers and a line connecting every dated response. The vertical positions are the authored ordinal choices only; they do not claim direction, improvement, deterioration or clinical meaning.

The Likert accordion also presents an **Overall questionnaire score** when valid Likert answers exist. It normalises each valid authored ordinal position to 0–100, averages those values within the selected questionnaire version and rounds the result; where possible it shows the difference from the baseline response. Qualitative, unavailable and nonresponse points are excluded. This is a descriptive prototype calculation only, not a clinical score, threshold, diagnosis, risk level or interpretation.

For non-Likert questions, **Questionnaire comparison and details** is open by default. It offers question, section and changed-answer filters, then exposes literal earlier and latest answers with dates. **Submitted response history** is hidden from the Report tab; use **Assessment** or **History** for the complete dated response and follow-up trail. A starting response, incompatible comparison or Likert-only questionnaire stays explicit rather than implying missing evidence.

Use the separate **Questionnaire** selector below the overall dashboard summary to choose a questionnaire/version, such as **Demo check-in v2.0**. The selected version is shown as the heading for its result group, with the respondent and care-period date range beneath it. The choice scopes both the dashboard cards and **Questionnaire comparison and details**. The Report toolbar keeps the latest response date above the dashboard. The Report tab omits the duplicate **Latest clinician review** and **Response & follow-up history** cards; open a response from the comparison for its review, and use **Assessment** or **History** for complete collection and follow-up history. Switching questionnaires resets the response selection and question filters. Questionnaires without a submitted response remain selectable and show an empty state.

The clinician-authored narrative panel, its report change log and **Clinical notes** are hidden from the Report tab. Questionnaire comparison and details remains the answer-level evidence surface; use **History** for care-period activity and annotations.

The sample questionnaire captures preferences and support needs; no clinical improvement, risk, threshold or interpretation is inferred from either a question trend or descriptive aggregate. Comparisons require the same known version and respondent on distinct submission dates. Missing dates, declined/invalid answers and questions not asked on both paths remain explicit. Due dates are never used as submission dates, and multiple responses on the same date do not imply an order. Reports stay within the selected care period, including when inspecting historical care.

On narrow screens, the care-context cards stack, risk-row labels sit above their timelines, and each Likert card receives its own row before its heading or answer values become cramped. The desktop answer-comparison table becomes labelled answer records while retaining its headings for assistive technology.

Report remains a read-only summary surface in this prototype. Storage and role checks remain local demonstration behaviour, without server authorisation or multi-user concurrency guarantees.

### History and change logging

Open a person → **History** for **History & change log**. New questionnaire preparation, submission and correction, follow-up planning, review-required/review events, consent-request decisions, report changes, annotations and care events retain the editor/recorder, role, exact save time and expandable **View changes** with before/after values where applicable. Follow-up entries retain the selected questionnaire and due date; care/participation changes also retain their effects on collection status and links. Reasons and sources remain available where recorded. The Overview timeline shows recent saved activity.

Linked intake and referral events appear in the same care period; person-wide corrections are labelled separately. New events appear once alongside their source audit records. Older records remain readable with missing dates/actors explicit. A due date is never treated as proof of an action. Report changes also remain in the Report tab's dedicated change log.

Saves persist the change and its log together in this browser. Cancelled/rejected actions and failed saves add no successful activity. Unsubmitted questionnaire input remains a draft until submission. These local records are a prototype demonstration, not a tamper-proof server audit.

### Single and multiple care periods

- **Kai Thompson** has one episode: the header shows **Current care** and its start date without a dropdown.
- **Zoe Patel** has two episodes: current care beginning **15 June 2026**, and a closed course from **10 February to 16 June 2025**. Use **Care period** to switch between them. The Assessment tab stays within the selected period; the 2025 episode has its own initial assessment and discharge check-in.
- Zoe opens on her current episode. The closed episode retains completed responses and reviews, has no open worklist tasks, and cannot accept a new follow-up.
- The People status filter shows and opens the matching episode. The selected care period is retained in the URL, including after a reload.
- People shows the highest-priority assessment in the selected episode: overdue, ready for review, due today, scheduled or reviewed. Paused/closed care and incomplete intake remain explicit. Status-filter counts follow the search and episode filter; opening a person retains the exact assessment and return filters. On smaller screens, the list becomes cards with visible status and due-date context. Dates use the prototype's displayed sample date.

## Mandatory intake and referral follow-through

**New person → Register and open intake → Complete intake → Create assessment plan.** Registration creates an owned intake with no care episode or initial assessment. Unknown name/DOB and unavailable contact can be recorded without fabricated values. The [intake and referral contract](../docs/05-requirements-and-logic.md#7-intake-and-onward-referral-contract) remains the requirements reference.

- **Intake** captures referral origin, identity source, safe contact, permission/authority references, communication/support needs, checks, triage summary and ownership. Save partial work as Received, In progress, Awaiting information, Awaiting triage or Waiting. Waiting requires a reason, responsible actor and review date. Saved updates retain their actor, timestamp, reason and field snapshot; drafts survive navigation in this tab.
- The demo Clinician records **Proceed** or **Do not proceed**, with required checks, source, actual decision time and receiving assessment owner when proceeding. **Closed incomplete** retains the exit reason and next plan. Finalised decisions are read-only; reopening/returning-care determination is not implemented.
- Completed/proceed intake appears as **Waiting for assessment** until staff explicitly choose the initial due date and create the plan. This creates the care record with admission still undecided. Planning, delivery and submission recheck intake at the action boundary. Existing continuing-care reviews remain in their episode.
- **Referrals** are available from intake and existing care records. Save a draft, then record actual external events: sending attempts, failed/unknown sending, verified sending outcome, receipt, acceptance/decline, follow-up and handover or alternative resolution. Unknown sending requires verification before retry. Receipt is never inferred from sending or acceptance. Events retain actual event time, service/system, evidence and recorder.
- **My work → Intake / Referrals** exposes owned tasks and review dates. Pending referrals remain in the queue after care closes. Acceptance alone leaves the handover open; resolving it requires receiving responsibility and the agreed next-care arrangement.
- Intake/referral saves first attempt browser persistence. Failed saves keep the form open and report failure; registration request IDs and record revisions reject repeated/stale actions in this tab. Cross-tab and multi-user transactions remain outside the prototype.

The six continuing-care fixtures have explicitly labelled fictional intake histories. A separate intake migration fills missing intake records in current questionnaire-version data; custom registrations receive a pending evidence review, preserving existing episodes. The existing refresh of older questionnaire fixtures remains a separate behaviour described below.

No external referral is sent. Detailed clinical criteria, identity-matching policy, team permissions and external handover agreements remain sample assumptions under D-26/D-27. The app does not implement clinical admission, returning/transfer episode creation, or real staff authentication.

## Persistence and boundaries

- Scenario date: **15 September 2026**, kept fixed so seeded due states are reproducible.
- Sample records and submitted responses are stored in this browser’s local storage. Each browser/origin has independent demo data. Reset is available in Administration.
- Reloading upgrades older compatible mock data once. The six fictional people include varied short and long answer paths, permitted nonresponse, outstanding collections, clinical reviews and longitudinal changes. Mia has four timepoints of the same Likert questionnaire in one care episode; Zoe retains current and historical care periods.
- Unsubmitted questionnaire answers remain in the open interface; leaving discards them. Save/resume is not implemented. The seeded Draft state illustrates an existing draft rather than a functional draft-storage service.
- Real authentication, staff reauthentication, access enforcement, SMS, backend storage, clinical instruments/scoring, automated escalation, and production consent policy are not connected.
- Assessment completion/disposition remain separate from response submission and clinical review. The prototype does not implement the full clinical decision or assessment-completion workflow.
- Paused/closed episode records can be inspected; reopening, returning-care episode creation, and transfer are not implemented.
- Broader centre analytics, reporting, research, integration, and conditional services/satisfaction features remain outside this prototype, matching their unresolved scope in the requirements.
- No real personal or clinical information should be entered into this local demonstration.

## Implementation

Next.js 16.3.5 App Router with a server layout and a client-side interactive prototype. The root layout self-hosts Inter using `next/font/local`; there are no external font requests. Feature screens live in `src/features`, shared controls in `src/components`, domain transitions in `src/model.js`, and versioned questionnaires plus shared branch evaluation in `src/instruments.js`. `src/components/QuestionnaireFlow.jsx` serves both participant completion and interactive preview.

`src/app/[[...route]]/page.jsx` hosts the prototype routes; all state is local. This is a deliberate frontend prototype boundary, not a claim of production data access or security.

### Hosted prototype

The current Vercel production alias is [prototype-beta-hazel.vercel.app](https://prototype-beta-hazel.vercel.app). The hosted build uses the same fictional browser-local data and sample rules described above. “Production” is the Vercel deployment target only; it does not turn the prototype into a production clinical system or verify any of the excluded identity, security, delivery, persistence, policy or compliance capabilities.

## Design and verification

- [Design specification and concept prompts](design/DESIGN.md)
- [Verification record](design/VERIFICATION.md)
- [Worklist concept](design/worklist-concept.png)
- [Person workspace concept](design/person-concept.png)

The concepts were selected for implementation by the agent, not approved as final YSCC branding or clinical policy.
