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

## Composition and permitted copy

The worklist reference owns its visible copy: YSCC; Northside Centre; Your workspace; My work; People; Data quality; Administration; Help & guidance; Jess Taylor; Clinician; Workspace; Prototype · sample data; Your next steps, in one place.; Preview questionnaire; New person; Tuesday, 15 September 2026; Open tasks; Across your caseload; Needs attention; Overdue collection; Ready for review; Responses received; Your worklist; Assigned to me; All work; Search by name or ID; All collection points; Person; Next action; Collection point; Due; Status; Showing 6 tasks; Updated just now; Continuity of care; Reviews stay within the same care episode, keeping each person’s history connected.

The six sample people and their initial task copy are copied from the worklist reference. Counts derive from sample records and change with interactions. Empty, edited, error, and filtered copy is a functional extension of the reference. Dates use a fixed 15 September 2026 scenario clock.

The user's removal of the dashboard questionnaire preview supersedes that button in the worklist reference. My work shows New person as its heading action. The standalone demo is available only through Help & guidance as “Try a sample questionnaire”; its header identifies it as practice only. Questionnaires opened from a person's assessment use “Questionnaire · sample content” without a preview label.

Plan a follow-up shows the instrument version and respondent without a questionnaire preview control.

Person overview follows `person-concept.png`: persistent person and episode context, tabs, Next step, Care timeline, Current assessment and People involved. Its generated sidebar width and split differ slightly from the first reference; use the primary 246px shell consistently. Preserve original domain vocabulary. Use explicit sample-policy wording in actions; no licensed instrument, automated clinical decision, real delivery, or production access claim.

## Structure and interaction coverage

Next.js App Router, as requested by the user. Separate shared UI, app shell, model/state, worklist, people/episode workspace, operational screens, forms, and participant questionnaire. Responsive sidebar becomes a mobile menu; wide tables scroll inside their own region; detail panels stack. Respect reduced motion and keyboard focus.

Core paths: filter/search work → person → assignment → eligible collection setup → isolated participant form → submission → pending clinical review → recorded review. Follow-up adds a collection to an existing episode; corrections retain before/after evidence. New-person registration checks duplicate names. Episode pause/closure previews and reconciles pending assignments. No clinical scoring is invented.

Collection details open from each Assessment item's “View details” button in a modal scoped to that item and care episode. The person navigation contains Overview, Assessment, Consent & respondents, and History. Responses, review notes, and delivery attempts live in the collection modal; collection setup and response review return to its details on completion or cancellation. Closing details returns to the same Assessment list. This interaction supersedes the Measures tab shown in the original concept image and baseline documents.

## Image generation prompt record

Built-in tool, `ui-mockup`, complete readable 1536 × 1024 app screens. Worklist brief: white sidebar, cool-grey canvas, forest-teal primary, asterisk YSCC brand, Northside Centre, baseline navigation, three derived counters, six-person worklist with exact names/IDs/actions/statuses, continuity-of-care strip. Person brief: same design system, Kai Thompson, care episode 01, Overview/Assessment/Measures/Consent & respondents/History tabs, overdue next step, dated care timeline, independent assessment/response/review states, involved people. Full original prompts are preserved in the task conversation.


## Progress report — 16 September 2026

Report is a reading surface within the existing person workspace. A white document panel holds the summary, section-level changes, clinician interpretation and next steps; Edit report opens labelled inline narrative fields with Save/Cancel. The report uses the existing teal controls, typography, borders and spacing. Current questionnaire evidence follows in dated sequences separated by instrument/version and respondent; full answer comparisons and clinical reviews are disclosed on demand. Authored versions retain evidence and indicate when current responses have changed. This update follows the product owner's report-based direction and supersedes the earlier response-count dashboard composition.
