# YSCC Platform - Executive edition

16 September 2026 | Eight concise briefs | Aligned to the current local prototype

[Read the combined 20-page executive pack](../../output/pdf/executive/YSCC-Executive-Pack.pdf)

The visual edition uses clear headlines, short summaries, persona profiles, journey/flow diagrams, scope labels and a leadership decision panel on each page. This is an editorial treatment inspired by the supplied persona draft's palette, not a claim of approved YSCC branding.

## Choose a brief

| Executive brief               | Visual PDF                                                                       | Reading copy                                | Pages |
| ----------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------- | ----- |
| 01 - Product framing          | [Open PDF](../../output/pdf/executive/01-product-framing-executive.pdf)          | [Read text](01-product-framing.md)          | 2     |
| 02 - Value Proposition Canvas | [Open PDF](../../output/pdf/executive/02-value-proposition-canvas-executive.pdf) | [Read text](02-value-proposition-canvas.md) | 2     |
| 03 - Personas                 | [Open PDF](../../output/pdf/executive/03-personas-executive.pdf)                 | [Read text](03-personas.md)                 | 3     |
| 04 - Full user journey        | [Open PDF](../../output/pdf/executive/04-user-journey-executive.pdf)             | [Read text](04-user-journey.md)             | 2     |
| 05 - Requirements and logic   | [Open PDF](../../output/pdf/executive/05-requirements-and-logic-executive.pdf)   | [Read text](05-requirements-and-logic.md)   | 2     |
| 06 - UX strategy              | [Open PDF](../../output/pdf/executive/06-ux-strategy-executive.pdf)              | [Read text](06-ux-strategy.md)              | 2     |
| 07 - User flows               | [Open PDF](../../output/pdf/executive/07-user-flows-executive.pdf)               | [Read text](07-user-flows.md)               | 4     |
| 08 - Information architecture | [Open PDF](../../output/pdf/executive/08-information-architecture-executive.pdf) | [Read text](08-information-architecture.md) | 2     |

## Prototype alignment — executive edition 1.5

The product owner confirmed that every new patient must go through intake (U1/D-25). The current local prototype now demonstrates the mandatory gate with fictional data: registration opens owned intake; a complete/proceed decision enables assessment planning; intake/referral activity has visible ownership and history; and referral sending, receipt, decision and handover remain separate events. It also demonstrates care-period context, sample multi-channel collection, purpose-specific consent requests and decisions, policy-dependent review, correction/audit, follow-up, episode actions, a questionnaire-based Progress dashboard and report, annotations in History, and administration.

The detailed documents remain the specification. The prototype has browser-local storage, sample roles, fictional people and sample policy/content. Its sample rule marks clinician entry and supported clinic-tablet completion as **Review not required** while retaining review for the SMS-link path; this is demonstration behaviour, not approved clinical policy. It does not establish production authentication/authorisation, identity or guardian-authority verification, approved consent wording, server persistence/audit, multi-user concurrency, external SMS/referral delivery, clinical scoring, accessibility conformance or release readiness. D-26/D-27 retain clinical and external-service decisions; the catalogue remains 46 FRs, 29 rules and 29 acceptance scenarios.

## What changed

- Revised the detailed and executive material to distinguish demonstrated local prototype coverage from proposed or production-only behaviour.
- Reduced the detailed specification to executive takeaways and decision prompts; technical detail remains in the originals.
- Kept all 11 named CMDCS personas and the three groups, without turning draft attributes into validated findings.
- Made the care journey, independent status dimensions, participant channels and staff navigation visible at a glance.
- Preserved the MVP versus Stage 2 conflict, conditional features, candidate scope, and policy/governance dependencies.
- Added a clickable contents page and chapter bookmarks to the combined PDF.
- Revised brief 07 with three explicit decision diagrams and a separate supporting-workflow page: care decisions, collection/confirmation, and correction versus clinician input.
- Aligned the executive summaries with the purpose-specific consent request flow, review-required/not-required policy state, questionnaire-based Progress dashboard, report history and annotations now demonstrated through History.
- Updated the information architecture to the current person-level navigation: Overview, Assessment, Events, Report, Consent & respondents, and History.

## Evidence and scope

These are summaries, not a replacement implementation specification or stakeholder approval. The [detailed document index](../README.md) remains the route to the canonical requirements, decision register, sources and full interaction logic.

| Source key | Original material                                                                                        | Limitation                                                                                                                         |
| ---------- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| U1         | Product-owner instruction, 15 September 2026: new patients must go through intake                        | Confirms the mandatory intake rule (D-25); detailed operating decisions remain D-26/D-27.                                          |
| S1         | [Oli in #ux, 14 September 2026](https://project-yonder.slack.com/archives/C0C1F1FH1DK/p1789359608362949) | Previously captured reported requirements; no new Slack retrieval or approval in this edition.                                     |
| S2         | Previously captured #ux excerpt, 14 September 2026                                                       | Complete thread/permalink unavailable; shared-core direction remains provisional.                                                  |
| CP1        | [CMDCS Persona Draft v2.pdf](</Users/danielenicoletti/Downloads/CMDCS Persona Draft v2.pdf>)             | Explicitly draft hypotheses; self-report phasing conflicts with S1.                                                                |
| CB1-CB7    | [headspace EP codebook](/Users/danielenicoletti/Desktop/headspace_EP_data_extract_codebook-2025.xlsx)    | Historical reference, not current YSCC scope, clinical content or consent policy. See detailed brief 01 for sheet/cell references. |

No business improvement, clinical outcome, budget, delivery date, legal compliance or production readiness has been established by this design work. Quantitative pain-point claims from the persona draft were not treated as measured baselines.

## Editing and rebuilding

The text copies make review easy. [content.json](content.json) is the shared authored source for the PDF layouts; [build_executive.py](build_executive.py) renders the eight briefs and combined pack using ReportLab. When revising, update the content source and corresponding reading copy, then rebuild and visually inspect the PDFs. Do not edit the detailed originals merely to match an executive summary.

The PDF edition has selectable text and bookmarks, but is not claimed to be a tagged accessible PDF. Plain Markdown reading copies are included; formal accessibility testing remains separate.

## Verification

Edition 1.5 is rebuilt from the revised executive content source. The combined pack and all eight standalone PDFs are regenerated from the shared source; visual inspection remains required for future revisions. The current prototype test suite passed 121/121 tests and its production build completed successfully on 16 September 2026; those checks remain local prototype evidence, not production verification. AC-01–AC-29 are documented acceptance scenarios, not executed production tests.
