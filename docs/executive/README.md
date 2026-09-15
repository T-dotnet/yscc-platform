# YSCC Platform - Executive edition

15 September 2026 | Eight concise briefs | Includes the confirmed mandatory-intake update

[Read the combined 20-page executive pack](../../output/pdf/executive/YSCC-Executive-Pack.pdf)

The visual edition uses clear headlines, short summaries, persona profiles, journey/flow diagrams, scope labels and a leadership decision panel on each page. This is an editorial treatment inspired by the supplied persona draft's palette, not a claim of approved YSCC branding.

## Choose a brief

| Executive brief | Visual PDF | Reading copy | Pages |
| --- | --- | --- | --- |
| 01 - Product framing | [Open PDF](../../output/pdf/executive/01-product-framing-executive.pdf) | [Read text](01-product-framing.md) | 2 |
| 02 - Value Proposition Canvas | [Open PDF](../../output/pdf/executive/02-value-proposition-canvas-executive.pdf) | [Read text](02-value-proposition-canvas.md) | 2 |
| 03 - Personas | [Open PDF](../../output/pdf/executive/03-personas-executive.pdf) | [Read text](03-personas.md) | 3 |
| 04 - Full user journey | [Open PDF](../../output/pdf/executive/04-user-journey-executive.pdf) | [Read text](04-user-journey.md) | 2 |
| 05 - Requirements and logic | [Open PDF](../../output/pdf/executive/05-requirements-and-logic-executive.pdf) | [Read text](05-requirements-and-logic.md) | 2 |
| 06 - UX strategy | [Open PDF](../../output/pdf/executive/06-ux-strategy-executive.pdf) | [Read text](06-ux-strategy.md) | 2 |
| 07 - User flows | [Open PDF](../../output/pdf/executive/07-user-flows-executive.pdf) | [Read text](07-user-flows.md) | 4 |
| 08 - Information architecture | [Open PDF](../../output/pdf/executive/08-information-architecture-executive.pdf) | [Read text](08-information-architecture.md) | 2 |

## Intake update — executive edition 1.2

The product owner confirmed that every new patient must go through intake (U1/D-25). Briefs 01, 04, 05, 07 and 08, their PDF content source and the combined pack now reflect that rule, intake ownership and referral follow-through. D-26/D-27 retain the detailed clinical and external-service decisions. The current requirement catalogue still contains 46 FRs; it now has 29 rules and 29 acceptance scenarios.

The detailed documents own the registration fields, waiting states and external-event contract. The current prototype has not implemented this new intake gate. The earlier verification notes below describe their original review, not a pass of AC-23–AC-29.

## What changed

- Reduced the detailed specification to executive takeaways and decision prompts; technical detail remains in the originals.
- Kept all 11 named CMDCS personas and the three groups, without turning draft attributes into validated findings.
- Made the care journey, independent status dimensions, participant channels and staff navigation visible at a glance.
- Preserved the MVP versus Stage 2 conflict, conditional features, candidate scope, and policy/governance dependencies.
- Added a clickable contents page and chapter bookmarks to the combined PDF.
- Revised brief 07 with three explicit decision diagrams and a separate supporting-workflow page: care decisions, collection/confirmation, and correction versus clinician input.

## Evidence and scope

These are summaries, not a replacement implementation specification or stakeholder approval. The [detailed document index](../README.md) remains the route to the canonical requirements, decision register, sources and full interaction logic.

| Source key | Original material | Limitation |
| --- | --- | --- |
| U1 | Product-owner instruction, 15 September 2026: new patients must go through intake | Confirms the mandatory intake rule (D-25); detailed operating decisions remain D-26/D-27. |
| S1 | [Oli in #ux, 14 September 2026](https://project-yonder.slack.com/archives/C0C1F1FH1DK/p1789359608362949) | Previously captured reported requirements; no new Slack retrieval or approval in this edition. |
| S2 | Previously captured #ux excerpt, 14 September 2026 | Complete thread/permalink unavailable; shared-core direction remains provisional. |
| CP1 | [CMDCS Persona Draft v2.pdf](</Users/danielenicoletti/Downloads/CMDCS Persona Draft v2.pdf>) | Explicitly draft hypotheses; self-report phasing conflicts with S1. |
| CB1-CB7 | [headspace EP codebook](</Users/danielenicoletti/Desktop/headspace_EP_data_extract_codebook-2025.xlsx>) | Historical reference, not current YSCC scope, clinical content or consent policy. See detailed brief 01 for sheet/cell references. |

No business improvement, clinical outcome, budget, delivery date, legal compliance or production readiness has been established by this design work. Quantitative pain-point claims from the persona draft were not treated as measured baselines.

## Editing and rebuilding

The text copies make review easy. [content.json](content.json) is the shared authored source for the PDF layouts; [build_executive.py](build_executive.py) renders the eight briefs and combined pack using ReportLab. When revising, update the content source and corresponding reading copy, then rebuild and visually inspect the PDFs. Do not edit the detailed originals merely to match an executive summary.

The PDF edition has selectable text and bookmarks, but is not claimed to be a tagged accessible PDF. Plain Markdown reading copies are included; formal accessibility testing remains separate.

## Verification

The initial edition was visually inspected in full. The revised brief 07 and updated combined-pack contents, pagination and chapter transitions were then rendered and checked. Text coverage, all 20 pack pages, all 11 names, layout bounds, the eight contents links and chapter bookmarks were checked. SHA-256 checks confirmed the PDF build did not modify its detailed source documents; those documents were subsequently revised for mandatory intake.

For executive edition 1.2, all 20 pack pages were rendered and visually inspected; the final label changes on pages 15 and 19 were inspected again. Layout bounds, standalone-to-pack text parity, local document links, unique IDs and all 46 FRs against the combined baseline passed. AC-23–AC-29 are documented acceptance scenarios, not executed application tests; prototype implementation remains outstanding.
