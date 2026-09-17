# YSCC prototype design specification

## Shared UI refinement — 16 September 2026

The existing teal, white and slate identity remains the visual foundation. Shared rules in `src/styles.css` now own the hierarchy across worklists, records, operational screens and dialogs:

- Page titles: 32px (28px on mobile); section titles: 20px; panel labels and item titles: 16px; body and controls: 14px; secondary text: 13px; metadata and status badges: 12px. Retain the larger question text in participant flows and the assessment title within the record overview.
- Use the shared 4px spacing scale. Panels use 24px internal padding and 24px separation, reducing to 16px on mobile. Keep related controls 8–12px apart.
- Controls use a 6px corner radius and a 40px desktop height, increasing to at least 44px on mobile. Form inputs retain 44px height, with 16px mobile input text. Filled teal indicates the main action; outlined controls support it; repeating table actions use text and an arrow.
- Page descriptions and sample dates sit together under the title. Status colour accompanies a written label. Panel headings, body content and supporting metadata have distinct weights.
- Worklist columns allocate explicit room for each action and wrap longer content. At narrower widths, task cards preserve person, status, due date and next action. Record and worklist tabs remain a single horizontally scrollable row with their existing keyboard navigation.
- Keep the current assessment consolidation and all care, intake, questionnaire and report behaviour. This refinement changes the shared presentation and fixes the Help navigation's active state.

These shared rules supersede the original numeric typography and spacing values below; historical concept copy and layouts remain reference material.

Design references generated with the built-in Image Gen tool: `worklist-concept.png` (1536 × 1024) and `person-concept.png` (1536 × 1024). These are implementation references selected by the agent, not stakeholder-approved product designs.

## Visual system

- White 246px sidebar and white 54px breadcrumb header; cool grey #f7f8fa canvas. Main padding 36px. White panels, #dce3e9 borders, 8px corners. No decorative raster assets or overlays.
- Forest teal #17594f primary, charcoal #223239 text, slate #617080 secondary, sage #e4f1e9 selected backgrounds. Amber overdue, lavender review, neutral due-today chips.
- Native system sans-serif, Inter-like proportions. Heading 36/42 bold; panel heading 21/28 semibold; body 15/22; small text 13/18; buttons 14/20 medium. Controls use explicit typography.
- Asterisk logo; outline navigation/search/clock/chevron icons, 20px, 1.8 stroke. Selected Home filled. Initial avatars alternate sage/lavender; no photography.
- Shared buttons, tabs, pills, table rows, form fields, dialogs, timeline and labelled metadata. Modal and questionnaire layouts extend the same primitives for the flows required by documents 05/07/08.
- Likert items show every verbal anchor at once in a five-column desktop row and a single-column mobile list. Keep the recall-period hint and scale instruction adjacent to the item. Separate nonresponse and instrument-defined not-applicable choices with a divider; never style them as points on the ordinal scale.

## Composition and permitted copy

The worklist reference owns its visible copy: YSCC; Northside Centre; Your workspace; My work; People; Data quality; Administration; Help & guidance; Jess Taylor; Clinician; Workspace; Prototype · sample data; Your next steps, in one place.; Preview questionnaire; New person; Tuesday, 15 September 2026; Open tasks; Across your caseload; Needs attention; Overdue collection; Ready for review; Responses received; Your worklist; Assigned to me; All work; Search by name or ID; All collection points; Person; Next action; Collection point; Due; Status; Showing 6 tasks; Updated just now; Continuity of care; Reviews stay within the same care episode, keeping each person’s history connected.

The six sample people and their initial task copy are copied from the worklist reference. Counts derive from sample records and change with interactions. Empty, edited, error, and filtered copy is a functional extension of the reference. Dates use a fixed 15 September 2026 scenario clock.

My work shows New person as its heading action. The standalone demo is available through Help & guidance as “Try a sample questionnaire”; its header identifies it as practice only. The person Overview Current assessment and each Assessment collection provide a version-pinned **Preview questionnaire** action. Questionnaires opened for actual completion use “Questionnaire · sample content” without a preview label.

Plan a follow-up shows the selected instrument version and respondent and provides a non-mutating **Preview questionnaire** control. Closing the preview restores the unsaved planning values.

Person overview follows `person-concept.png`: persistent person and episode context, tabs, Next step, Care timeline, Current assessment and People involved. Its generated sidebar width and split differ slightly from the first reference; use the primary 246px shell consistently. Preserve original domain vocabulary. Use explicit sample-policy wording in actions; no licensed instrument, automated clinical decision, real delivery, or production access claim.

## Structure and interaction coverage

Next.js App Router, as requested by the user. Separate shared UI, app shell, model/state, worklist, people/episode workspace, operational screens, forms, and participant questionnaire. Responsive sidebar becomes a mobile menu; wide tables scroll inside their own region; detail panels stack. Respect reduced motion and keyboard focus.

Core paths: filter/search work → person → assignment → eligible collection setup → isolated participant or clinician form → submission → apply the sample review-required rule → record clinical review where required. SMS and independent tablet completion remain pending review; clinician entry and supported tablet completion display Review not required and do not create a review task. Follow-up adds a collection to an existing episode; corrections retain before/after evidence. New-person registration checks duplicate names. Episode pause/closure previews and reconciles pending assignments. No clinical scoring is invented.

Collection details open from each Assessment item's “View details” button in a modal scoped to that item and care episode. The person navigation contains Overview, Assessment, Report, Consent & respondents, and History; Assessment is unavailable until intake has proceeded. Collection details contain metadata, delivery attempts and setup/clinician-entry actions. Submitted answers, review notes and response-edit history live in the separate response/review modal, which returns to the initiating Assessment context. Closing either view returns to the same Assessment list. This interaction supersedes the Measures tab shown in the original concept image; the detailed IA maps its collection content into Assessment while retaining stable logical screen IDs.

Consent & respondents contains a list of purpose-specific, versioned sample requests. Each request uses the Assessment accordion pattern: a compact summary exposes purpose/version/scope/status, and expansion reveals delivery, decision context and the request-history action. Staff can select an available purpose, choose SMS link or clinic tablet, send the browser-local request, inspect its status/history, open a scoped participant decision surface, and record withdrawal. Accept, Decline and Withdraw are distinct; one purpose does not decide another. The design must continue to label this as sample policy and never imply verified identity/authority, real delivery, approved legal wording or production persistence.

## Image generation prompt record

Built-in tool, `ui-mockup`, complete readable 1536 × 1024 app screens. Worklist brief: white sidebar, cool-grey canvas, forest-teal primary, asterisk YSCC brand, Northside Centre, baseline navigation, three derived counters, six-person worklist with exact names/IDs/actions/statuses, continuity-of-care strip. Person brief: same design system, Kai Thompson, care episode 01, Overview/Assessment/Measures/Consent & respondents/History tabs, overdue next step, dated care timeline, independent assessment/response/review states, involved people. Full original prompts are preserved in the task conversation.

## Progress report — 16 September 2026

Report is a reading surface within the existing person workspace. It leads with four honest summary counts, a separate questionnaire/version selector and questionnaire/version/respondent grouping. The selected version is the result-group heading, with respondent and care-period dates beneath it; question-level Likert line charts and qualitative **Previous → New** cards each sit in a bordered change panel. **Questionnaire comparison and details** sits directly below the selected group’s change panel, while the toolbar carries the latest response date. Submitted response history is intentionally hidden from Report; complete dated response and follow-up history remains in Assessment and History. Each Likert card keeps the full question, verbal anchors and dated values visible. Ordinal positions must never be presented as a combined score or as direction, improvement, deterioration or clinical meaning.

The clinician-authored narrative panel—including its care-period heading, draft metadata, Summary, Clinician interpretation, Next steps, explanatory footer, edit action and visible report change log—is hidden from Report. **Questionnaire comparison and details** occupies the full content column, separated by instrument/version and respondent; full answers and clinical reviews remain available through response actions. **Clinical notes** are also hidden from Report; care-period annotations remain available through History. The duplicate **Latest clinician review** and **Response & follow-up history** cards remain omitted; complete collection and follow-up history stays in Assessment and History.

## Events tab — provisional direction

Events is a selected-care-episode timeline with a primary Record event action. The prototype shows medication change, care or service change, significant life event and other event types with actual event date, type-specific details and recorder/time metadata. Report charts may show available episode events as distinct timing markers with hover labels, but markers are not causal evidence and do not imply that an event influenced a response. The event taxonomy, permissions, evidence, relationship to care planning/referrals/History and the boundary between Events records and Report markers require stakeholder validation under D-29.
