# Prototype verification

16 September 2026. Local Next.js prototype using fictional data.

## Current verification refresh — 16 September 2026

- `npm test` passes **121/121** domain tests. The current suite covers mandatory intake/referral state, purpose-specific consent send/accept/decline/withdraw history, channel-dependent review handling, questionnaire branching/versioning, response corrections, care-period isolation, longitudinal Likert fixtures and dashboard mapping, qualitative-change separation, append-only clinical annotations, report version/change logging, activity history and local permission/error guards.
- `npm run build` passes with Next.js 16.3.5. The catch-all application route and not-found route build successfully.
- Current implemented behavior: clinician entry and supported clinic-tablet completion are marked **Review not required** and do not create review work; SMS and independent tablet submission remain pending review. This is verified sample logic, not an approved clinical rule.
- Current implemented consent behavior: staff can create browser-local sample requests for one purpose/version/channel, participants can Accept or Decline, accepted requests can be Withdrawn, and history/audit is retained. Tests verify purpose isolation and active-link revocation for assessment-participation decline/withdrawal. They do not verify real delivery, identity/authority, legal content or production retention.
- Current implemented Report behavior: the selected care period keeps the overall dashboard summary visible, then offers a separate questionnaire/version selector that scopes the dashboard cards and Questionnaire comparison and details. The selected version is the result-group heading with respondent and care-period dates beneath it; the group renders one dated line chart per comparable Likert question or a qualitative-changes panel containing explicit questionnaire/question **Previous → New** cards, followed directly by Questionnaire comparison and details. The toolbar shows the latest response date. Submitted response history, **Clinical notes**, the clinician-authored narrative panel, edit action, visible report change log and duplicate **Latest clinician review** and **Response & follow-up history** cards are hidden from Report. Review access remains on response actions, while Assessment and History retain the complete collection trail and annotations. Tests continue to protect the stored report model, evidence/version isolation, ordinal mapping, qualitative separation and save guards. The charts do not infer clinical direction or score.
- Current implemented Events behavior: the selected episode has an **Events** tab with a newest-first care-event timeline and a primary **Record event** action. The sample supports medication, care/service, significant-life and other event types with type-specific validation and actual event dates. Report charts can display episode event markers with hover labels for timing context. This behavior is provisional and does not establish that events influence responses, that the taxonomy is approved, or that Report markers and Events records must be the same set; D-28/D-29 require stakeholder validation.

## Report dashboard verification — 16 September 2026

- In-app Browser QA opened **Mia Robinson → Report** and verified six Likert question cards, each with the full Life and care check-in v1.0 question, all five verbal anchors and four dated values from 16 June to 8 September 2026.
- **Zoe Patel → Report** verified five qualitative-change cards. Each card visibly names Demo check-in v2.0, the full question and dated Previous/New values.
- Submitted response history was not rendered on Report for Mia or Zoe. The dashboard’s question-level Likert and qualitative change cards remained visible; at 390 × 844 the Report content had no horizontal overflow.
- At a wide viewport, **Questionnaire comparison and details** occupied the full content column. Clinical notes, the clinician-authored narrative, Edit report action and visible report change log were absent from rendered text.
- With a 390 × 844 mobile override, the questionnaire comparison remained readable, the document width matched the effective viewport width, and no horizontal page overflow was present.
- Browser console error/warning scan was clean; no framework overlay appeared. `npm run build`, the 121-test suite, diff checks and the layout detector all passed after the final changes.

## Vercel deployment — 16 September 2026

- Linked project: `t-dotnets-projects/prototype`; framework Next.js; project root `prototype`; configured Node.js version 24.x.
- Production alias: [prototype-beta-hazel.vercel.app](https://prototype-beta-hazel.vercel.app). Vercel reported the production deployment **Ready**, and the aliased `/people/YS-1029?tab=report` route returned HTTP 200 through `/[[...route]]`.
- In-app Browser verification loaded the aliased Report routes for Mia and Zoe and confirmed the questionnaire dashboard, question-level Likert charts, qualitative Previous → New cards and comparison. The duplicate Submitted response history section, Clinical notes, clinician-authored narrative, Edit report action, visible report change log, **Latest clinician review** and **Response & follow-up history** were absent. The latest production deployment was reported **Ready**; the stable alias and rendered route are verified separately in this section so the record does not depend on an obsolete deployment ID.
- This is deployment verification for the fictional frontend prototype. It is not evidence of production authentication, server persistence, live delivery, clinical governance, compliance or release readiness.

The browser and visual observations below are the 15 September pass and remain historical evidence for the earlier surface. They were not rerun as a full visual/accessibility certification of every 16 September addition. Use the automated refresh above together with a new browser walkthrough before release-oriented sign-off.

## Method

Verified in Codex’s in-app browser using native accessibility controls and the browser’s Playwright locators. No separate Chromium fallback was needed. Desktop reference-size viewport: **1536 × 1024 CSS pixels**, confirmed from the rendered document. Mobile: **390 × 844**, with document width equal to viewport width. Also inspected the ordinary 1280 × 720 browser viewport.

Browser workflow checks used the separate `localhost:3100` origin so the user-facing `127.0.0.1:3100` sample state was not reset or overwritten by test actions.

## Functional results

- Production build passes with Next.js 16.3.5.
- Nine domain tests pass: seed counts; follow-up identity/version/history; link reissue preserving the assignment/draft; one accepted submission; independent review/disposition; withdrawal gating; closure reconciliation; correction provenance; eligibility gates; review prerequisites (some tests cover multiple invariants).
- Browser: overdue filter shows Kai/Oliver; search for Kai returns one task.
- Browser: reissue → explicit sample delivery → questionnaire → three answers → check answers → submit → end session → staff record. The response becomes Submitted, assignment Fulfilled, and clinical review stays Pending.
- Browser: save a review note, then add an October follow-up. Assessment retains baseline and September responses plus a distinct October point inside care episode 01.
- Browser: correction records old/new birth date, verified source, reason, actor, and date; the issue moves to Resolved.
- Browser: duplicate-name registration is blocked; fictional Alex can be registered; collection is blocked until participation and contact are recorded.
- Browser: mobile menu, worklist, creation dialog, questionnaire introduction, answer navigation, and end-session path work. Wide tables scroll in their own region without horizontal page overflow.
- Local Inter font is served by Next.js. Transient development errors while correcting the font path were resolved; the final production build passed.

## Visual comparison and repair ledger

The selected Image Gen concepts and final in-app browser screenshots were opened with `view_image` for direct inspection. The implementation was faithfully verified against the selected design system, with the explicit functional adaptations below. This is visual review, not an automated pixel-perfect equivalence claim.

| Comparison point     | Evidence and resolution                                                                                                                                                                                                                                                |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| App structure        | Preserved white left rail, asterisk wordmark, centre scope, four primary destinations, bottom profile, thin breadcrumb header. Shared 246px rail resolves a slight rail-width difference between the generated references.                                             |
| Layout and density   | Preserved three task counters, full-width six-row table, search/filter strip, continuity banner, and two-column person overview. Reduced excess top padding and metadata/timeline spacing so the intended desktop content fits.                                        |
| Typography           | Self-hosted Inter with explicit UI/control/caption sizes. Matched the heading hierarchy and restrained weight; browser controls do not use default fonts.                                                                                                              |
| Palette              | White surfaces and cool-grey canvas; forest teal actions, sage navigation, amber overdue, lavender review. No raster UI or new decorative imagery.                                                                                                                     |
| Copy                 | Worklist heading, navigation, primary actions, task names/IDs, actions, status labels, and continuity copy match the reference. Normalised `Sept` to `Sep`. No extra hero label or new promotional claim.                                                              |
| Geometry and icons   | Shared 7–8px control/panel corners, thin borders, initial avatars, consistent outline icons, readable status chips. The logo remains a code-native vector mark.                                                                                                        |
| Person context       | Preserved person, episode, owner, source/version, independent assessment/response/review states, and involvement context. Added explicit sample-instrument copy instead of implying a clinical measure.                                                                |
| Responsive behaviour | Drawer navigation, stacked details/forms, bounded table scrolling, and a focused single-column questionnaire. At 390px, the page width remains 390px.                                                                                                                  |
| Interaction feedback | Visible selection and focus, native modal focus containment/Escape, inline validation, blocked collection, submission confirmation, audit, and status feedback. Hidden mobile navigation is removed from focus/visibility; background is inert while the menu is open. |

### Intentional adaptations

- The person concept’s overdue chip follows the shared panel header alignment, and metadata uses the same status-chip family as the worklist.
- The person timeline uses `Demo check-in`, `SMS link`, and an explicit collection-planned start event to reflect the sample data model. Dynamic activities replace the seeded entries after actions.
- The generated views are desktop references. Mobile screens, questionnaire states, forms, operational screens, and recovery copy extend that design system to support the documented journeys.
- “My team” shows the same six people because every seeded task belongs to Jess at the same sample centre.
- There are no material unresolved clipping, overflow, missing-asset, or nonfunctional-primary-action issues in the checked screens. Production capabilities and unimplemented workflows are listed in the README.

Final screenshot artefacts: `worklist-render.png`, `person-render.png`, and `participant-mobile.png` in this folder. Temporary capture files were not added to the project.
