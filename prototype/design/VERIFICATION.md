# Prototype verification

15 September 2026. Local Next.js prototype using fictional data.

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

| Comparison point | Evidence and resolution |
| --- | --- |
| App structure | Preserved white left rail, asterisk wordmark, centre scope, four primary destinations, bottom profile, thin breadcrumb header. Shared 246px rail resolves a slight rail-width difference between the generated references. |
| Layout and density | Preserved three task counters, full-width six-row table, search/filter strip, continuity banner, and two-column person overview. Reduced excess top padding and metadata/timeline spacing so the intended desktop content fits. |
| Typography | Self-hosted Inter with explicit UI/control/caption sizes. Matched the heading hierarchy and restrained weight; browser controls do not use default fonts. |
| Palette | White surfaces and cool-grey canvas; forest teal actions, sage navigation, amber overdue, lavender review. No raster UI or new decorative imagery. |
| Copy | Worklist heading, navigation, primary actions, task names/IDs, actions, status labels, and continuity copy match the reference. Normalised `Sept` to `Sep`. No extra hero label or new promotional claim. |
| Geometry and icons | Shared 7–8px control/panel corners, thin borders, initial avatars, consistent outline icons, readable status chips. The logo remains a code-native vector mark. |
| Person context | Preserved person, episode, owner, source/version, independent assessment/response/review states, and involvement context. Added explicit sample-instrument copy instead of implying a clinical measure. |
| Responsive behaviour | Drawer navigation, stacked details/forms, bounded table scrolling, and a focused single-column questionnaire. At 390px, the page width remains 390px. |
| Interaction feedback | Visible selection and focus, native modal focus containment/Escape, inline validation, blocked collection, submission confirmation, audit, and status feedback. Hidden mobile navigation is removed from focus/visibility; background is inert while the menu is open. |

### Intentional adaptations

- The person concept’s overdue chip follows the shared panel header alignment, and metadata uses the same status-chip family as the worklist.
- The person timeline uses `Demo check-in`, `SMS link`, and an explicit collection-planned start event to reflect the sample data model. Dynamic activities replace the seeded entries after actions.
- The generated views are desktop references. Mobile screens, questionnaire states, forms, operational screens, and recovery copy extend that design system to support the documented journeys.
- “My team” shows the same six people because every seeded task belongs to Jess at the same sample centre.
- There are no material unresolved clipping, overflow, missing-asset, or nonfunctional-primary-action issues in the checked screens. Production capabilities and unimplemented workflows are listed in the README.

Final screenshot artefacts: `worklist-render.png`, `person-render.png`, and `participant-mobile.png` in this folder. Temporary capture files were not added to the project.
