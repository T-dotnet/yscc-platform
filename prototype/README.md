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

| Area            | Working behaviour                                                                                                                                                                          |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| My work         | Derived task counts, overdue and review filters, name/ID search, collection-point filtering, record navigation.                                                                            |
| People          | Assessment status and due-date summaries, priority ordering, status and episode filters, search, fictional-person registration and duplicate-name warning.                                  |
| Care episode    | A plain care label for a single episode; a dated care-period selector only when multiple episodes exist. Overview, assessment plan and history follow the selected episode.                |
| Collection      | Respondent and channel selection; sample permission/contact gates; SMS preview, tablet session, and staff transcription modes. Reissue adds an attempt to the same assignment.             |
| Questionnaire   | Separate participant interface; introduction, adaptive questions in sections, permitted nonresponse, back/change, searchable review, single submission, support/exit, neutral session end. |
| Clinical review | Inspect answers and provenance, record a note, preserve a separate review state.                                                                                                           |
| Follow-up       | Create a distinct collection point with a pinned instrument version inside the existing episode.                                                                                           |
| Episode actions | Pause/close with reason and impact review; reconcile outstanding assignments and revoke active sample links.                                                                               |
| Data quality    | Correct from a verified sample source; retain before/after values, reason, actor, and source in an audit.                                                                                  |
| Administration  | Browse seven sample questionnaires and previews, inspect rules, messages and workspace scope, and reset the demo.                                                                                                       |

### Suggested five-minute walkthrough

1. Open **Kai Thompson** from My work.
2. From Overview, choose **Replace expired link**, keep SMS link, confirm the sample recipient checks, then **Prepare sample link**.
3. Open the sample questionnaire, answer the applicable questions, and submit. All sample assignments now use the longer branching version.
4. End the session and return to the staff demo. The response is submitted; the clinical review is pending.
5. Record a clinical review, then use **Plan follow-up**. Choose **Add follow-up** to save the new time point, or **Set up collection** to save it and open collection setup for that follow-up. Inspect Assessment to see both prior collections and the new time point in care episode 01.
6. Open Data quality and make a sample correction with a source and reason. Inspect the audit.

### Complete a questionnaire as clinician

The clinician-completion preview runs at **http://127.0.0.1:3118**. To reproduce it, use `YSCC_BUILD_DIR=.next-clinician-dev npm run dev -- --port 3118`.

Open **View details** on an outstanding Assessment collection, then choose **Complete as clinician**. You can also choose **Clinician entry** in collection setup. Assessment cards show preview, details and submitted-response review actions; collection setup and clinician completion are accessed from the details view. Overview directs staff to the relevant collection action first. Confirm who supplies the answers and select **Transcribed** or **Joint completion**, then **Begin questionnaire**.

The clinician enters and reviews the answers in the staff workspace. Submission saves the response against the same assessment and delivery attempt, identifies the patient/family respondent as answer source and the clinician as recorder, and leaves clinical review pending. The current sample instrument is respondent-reported; it does not substitute clinician ratings for patient answers. Closing an answered form prompts before discarding unsaved answers; refresh warns before leaving. Draft save/resume is not implemented.

Clinician completion requires the demo Clinician role and the existing intake, participation and active-care checks. Replaced sessions and duplicate submissions are rejected. Failed browser saves retain entered answers and show an error instead of success. Data Managers retain response editing access. All role checks and persistence remain local prototype behaviour.

### Overview next step

One Current assessment card groups the recommended next step with the response status, clinical review status, instrument and questionnaire preview. The recommendation follows the selected collection and care period, showing its label, due date and overdue duration, with one primary action and a secondary link to Assessment. The collection name is the main heading, with Current assessment as its small section label, the status alongside the name and the due date underneath. The two sections sit alongside each other on desktop and stack on smaller screens; Care timeline and People involved sit below the shared card.

- **Overdue with an active link/session:** inspect collection details and activity before arranging another attempt.
- **Expired link:** open replacement setup for the same collection. A recorded sample draft cannot be resumed.
- **No attempt recorded:** set up collection, with wording for overdue, due-today and scheduled work.
- **Draft or revoked link:** inspect the existing collection first.
- **Submitted / updated answers:** review the response; Data Managers see View responses.
- **Reviewed:** open the recorded review. Clinical review remains separate from the next care decision and assessment completion.
- **Intake, participation/contact or unavailable-version blockers:** inspect the prerequisite instead of offering delivery. Paused/cancelled collections remain inspectable; paused/closed care points to episode history.

Questionnaire preview lives in Current assessment. Clinician completion remains available through collection details and collection setup. Inspecting a collection, previewing questions or opening setup does not send a reminder, change a due date, resume a draft or create a follow-up.

### Edit submitted responses

Open **Assessment → Review recorded** for a reviewed response, or **Review responses** for a submitted response awaiting review, then choose **Edit responses**. **View details** contains collection metadata and delivery information only. The recorded review, response editing and response edit history live together in the review view; saving or cancelling an edit returns there. Change an answer, enter a reason, review the before/after summary, then **Save edits**. Cancel leaves the response unchanged.

Use the sidebar profile → **Demo staff profile** to try Jess Taylor (Clinician) or Ananya (Data Manager). Both can edit. Every saved edit appears in **Response edit history** and **Data quality → Recent corrections**, with changed items, prior/new values, editor identity/role, timestamp, reason and optional source. The original answers, respondent, recorder, submission and fulfilment are retained. Editing reviewed evidence flags it for clinician re-review; earlier reviews remain available after re-review.

Role checks and revision-conflict checks demonstrate the intended behaviour in this browser tab. Production authentication, scoped server authorisation, transactional append-only storage and cross-tab/multi-user concurrency are not implemented. This local audit is demo data, not a tamper-proof production log.

### Questionnaire preview

Clinicians can choose **Preview questionnaire** from **Current assessment** on Overview, each Assessment collection card, and **Plan a follow-up**. Collection details, setup and collection-ready modals do not include questionnaire preview. Existing collections preview their pinned instrument version. Preview access from the record does not depend on collection, response, consent, intake or care-episode status.

**Try a path** uses the same question flow and rules as participant completion: choose sample answers, navigate sections, check the changing progress count and review your answers. **All questions** shows a searchable catalogue grouped by section, including each question’s condition and options (24 questions across five sections for v2.0). **Reset answers** starts a fresh path. Switching modes preserves practice answers; closing preview clears them.

**Done previewing**, Close and Escape return to the originating record or planning form. In planning, the labelled Back action also returns with entered values preserved. Preview never prepares a link, starts a collection session, submits a response, creates a follow-up or changes a care record. The full participant practice is also available under **Help & guidance → Try a sample questionnaire** at `/preview`.

### Instrument library

**Administration → Browse instruments** lists seven original, nonclinical sample questionnaires: Demo check-in, Everyday life, Goals and next steps, Support network, Learning and work, Care experience, and Practical support. Search by name or topic and preview each questionnaire without changing a care record.

**Plan follow-up → Instrument** selects the questionnaire for a new collection. Its description and preview follow the selection, and saving pins that version to the collection. Earlier assignments and submitted responses retain their existing version. The six additional questionnaires each have six possible questions across three sections, including conditional follow-ups. They collect the person's own perspective, with assistance or staff transcription available; family contributions remain available for Demo check-in. None calculates a clinical score or represents an approved clinical instrument.

### Long questionnaires and branching

All initial mock collections use **Demo check-in v2.0**, an original, nonclinical sample with 24 possible questions across five sections. The initial path contains 12 questions and can expand as answers are given. Conditions support nested follow-ups and all/any combinations. Questions use stable IDs; answers retain their positions within the pinned version.

- Completion shows one question at a time, with section navigation, back navigation and review available throughout. Progress counts valid answers on the currently applicable path; it can increase or decrease when answers change. Unresolved conditions are separate from excluded branches.
- Changing a controlling answer clears answers on branches that no longer apply, including nested descendants. Reopening a branch requires fresh answers. The interface announces added questions or cleared answers.
- Participant review groups answers by section, supports search and an unanswered filter, and links directly to each answer. Newly revealed questions must be completed before submission. Permitted nonresponse counts as answered.
- Staff review and answer editing use the same rules and searchable sections. **Questions not asked** explains excluded branches. Edits retain the original response, audit every removed or changed answer, and preserve the existing re-review workflow.
- Patient progress supports question search, section filtering and changed-answer filtering. A question asked on only one response path is **Not comparable**; it is excluded from change counts. Different questionnaire versions remain separate.
- All seeded assignments and responses use v2.0, including historical care periods. Loading an older mock workspace replaces it once with the refreshed six-person scenario set. Subsequent demo work is retained until Reset is used. Staff draft keys also use the new sample version.

Unsubmitted participant answers remain in the open page only. Save/resume is not implemented; leaving or refreshing clears the sample answers after the existing warning. No clinical instrument, scoring or live support policy is introduced by the sample conditions.

### Patient progress report

Open a person → **Report** for a readable, questionnaire-based report: **Summary**, **Clinician interpretation**, and **Next steps**. Questionnaire details and clinical reviews are always visible below the report, with a searchable answer-by-answer comparison and review history.

In **Questionnaire details**, use **Questionnaire** to select a questionnaire and version, such as **Demo check-in v2.0**, recorded in the selected care period. Responses, comparisons, clinical reviews and follow-up history are scoped to that selection. Switching questionnaires resets the response selection and question filters. Questionnaires without a submitted response remain selectable and show an empty state.

Clinicians can choose **Edit report**, change every narrative section, then **Save report** or **Cancel**. The **Report change log**, directly below the report, records each changed section with before/after wording, editor identity/role, timestamp and saved version. Removed text remains visible, and **View full saved report** opens the complete earlier narrative. The first save is labelled as the initial report. Cancelled edits, failed saves and unchanged saves add no entries; an evidence-only update retains a version with narrative unchanged. Earlier saved versions remain available, with comparisons derived from their retained wording where available. Saves and evidence snapshots persist in this browser. Editing the narrative does not change questionnaire answers or complete their clinical reviews. New submissions, corrections or changed review evidence flag the saved report for an update; clinician wording is preserved until explicitly edited and saved. A stale editor cannot overwrite a newer report or changed evidence. Data Managers can read the report and change log but cannot edit it in this prototype.

The sample questionnaire captures preferences and support needs; no clinical improvement, risk, score or threshold is inferred. Comparisons require the same known version and respondent on distinct submission dates. Missing dates, declined/invalid answers and questions not asked on both paths remain explicit. Due dates are never used as submission dates, and multiple responses on the same date do not imply an order. Reports stay within the selected care period, including when inspecting historical care.

Save before leaving the Report tab; unsaved report text is not persisted. Storage and role checks remain local demonstration behaviour, without server authorisation or multi-user concurrency guarantees.

### History and change logging

Open a person → **History** for **History & change log**. New questionnaire preparation, submission and correction, follow-up planning, clinical reviews, report changes and care events retain the editor/recorder, role, exact save time and expandable **View changes** with before/after values. Follow-up entries retain the selected questionnaire and due date; care/participation changes also retain their effects on collection status and links. Reasons and sources remain available where recorded. The Overview timeline shows recent saved activity.

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
- Reloading replaces older mock data with the refreshed v2.0 scenarios once. The six fictional people include varied short and long answer paths, permitted nonresponse, outstanding collections, clinical reviews and longitudinal changes. Zoe retains current and historical care periods.
- Unsubmitted questionnaire answers remain in the open interface; leaving discards them. Save/resume is not implemented. The seeded Draft state illustrates an existing draft rather than a functional draft-storage service.
- Real authentication, staff reauthentication, access enforcement, SMS, backend storage, clinical instruments/scoring, automated escalation, and production consent policy are not connected.
- Assessment completion/disposition remain separate from response submission and clinical review. The prototype does not implement the full clinical decision or assessment-completion workflow.
- Paused/closed episode records can be inspected; reopening, returning-care episode creation, and transfer are not implemented.
- Broader centre analytics, reporting, research, integration, and conditional services/satisfaction features remain outside this prototype, matching their unresolved scope in the requirements.
- No real personal or clinical information should be entered into this local demonstration.

## Implementation

Next.js 16.3.5 App Router with a server layout and a client-side interactive prototype. The root layout self-hosts Inter using `next/font/local`; there are no external font requests. Feature screens live in `src/features`, shared controls in `src/components`, domain transitions in `src/model.js`, and versioned questionnaires plus shared branch evaluation in `src/instruments.js`. `src/components/QuestionnaireFlow.jsx` serves both participant completion and interactive preview.

`src/app/[[...route]]/page.jsx` hosts the prototype routes; all state is local. This is a deliberate frontend prototype boundary, not a claim of production data access or security.

## Design and verification

- [Design specification and concept prompts](design/DESIGN.md)
- [Verification record](design/VERIFICATION.md)
- [Worklist concept](design/worklist-concept.png)
- [Person workspace concept](design/person-concept.png)

The concepts were selected for implementation by the agent, not approved as final YSCC branding or clinical policy.
