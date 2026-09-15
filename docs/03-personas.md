# YSCC Platform — CMDCS-based working personas

Version 0.3 · 15 September 2026 · Eleven source personas plus three supporting capabilities  
[Document index](README.md) · [Evidence, scope conflicts, and decisions](01-product-framing.md)

## 1. Source and status

This document adopts all **11 named personas** from [CMDCS Persona Draft v2.pdf](</Users/danielenicoletti/Downloads/CMDCS Persona Draft v2.pdf>) (CP1), retaining its three groups and extending each profile into actionable UX needs, boundaries, and validation questions.

The source explicitly labels these as draft hypotheses. Names, ages, portraits, traits, first-person statements, and influence ratings are illustrative persona material, not evidence of real interviewees or representative population statistics. The source PDF is unchanged. New workflow details below are design proposals, not additional source facts.

The previous collection-focused profiles are mapped to the source personas. Stable P IDs are retained to avoid breaking requirement/journey links. P-03, P-05, and P-09 remain supporting capabilities (guardian decision-maker, tablet facilitator, configuration administrator), not three extra source personas.

## 2. Persona map

| Source group | ID and adopted profile | Source page | Scope distinction |
| --- | --- | --- | --- |
| Care Delivery | P-04 — Jess Tran, Treating Clinician | 4 | Baseline assessment plus candidate wider care/specialist workflow. |
| Care Delivery | P-01 — Kai, Person | 5 | Baseline eligible contribution; dashboard and phase conflict need decision. |
| Care Delivery | P-02 — Deb, Family Carer | 6 | Baseline eligible family contribution; visibility/authority are separate. |
| Service Improvement | P-08 — Rachel Nguyen, Centre Leader | 8 | Baseline scoped coordination; wider centre dashboard/fidelity is candidate. |
| Service Improvement | P-06 — Tom Fletcher, Data Officer | 9 | Registration/quality capability and source-verified correction. |
| Service Improvement | P-07 — Ananya Rao, Data Manager | 10 | Baseline resolution plus candidate dictionary/reporting/extract stewardship. |
| Service Improvement | P-10 — Dr Sam Okafor, Implementation Scientist | 11 | Candidate implementation/fidelity learning workflows. |
| System Evidence | P-11 — Priya Sharma, PHN Commissioner | 13 | Candidate governed aggregate evaluation/commissioning. |
| System Evidence | P-12 — David Thompson, Policy Lead | 14 | Candidate system oversight; governance assertions require confirmation. |
| System Evidence | P-13 — Maya Brooks, AIHW Lead | 15 | Candidate governed integration/linkage outputs, not a daily care UI. |
| System Evidence | P-14 — Dr Helen Marsh, Researcher | 16 | Candidate approved research access and learning feedback. |

## 3. Influence ratings retained from the draft

These qualitative ratings are **unvalidated source hypotheses**, not measured usage/adoption scores. Phase labels are preserved as source wording and do not resolve D-21.

| Persona | Use frequency | Adoption influence | Data reliance | Friction tolerance | Digital confidence |
| --- | --- | --- | --- | --- | --- |
| Jess | Very high | Very high | High | Low | Medium |
| Kai | Medium; higher in Stage 2 in source | High | Medium | Low | High |
| Deb | Low–medium; Stage 2 in source | Medium | Low | Medium | Medium |
| Rachel | High | Very high | High | Medium | Medium–high |
| Tom | Very high | High | High | Low | Medium–high |
| Ananya | High | High | Very high | Medium | Very high |
| Sam | High | Very high | Very high | Medium | Very high |
| Priya, David, Maya, Helen | Not specified | Not specified | Not specified | Not specified | Not specified |

## 4. Care Delivery

### P-04 — Jess Tran — Treating Clinician

**Source profile — CP1 p. 4:** Jess Tran, Treating Clinician. Illustrative context: 31, regional Victoria, seven years in youth mental health. Draft traits: person-centred, time-poor, pragmatic, collaborative, wary of administration. Works as a key or specialist clinician across local/central multidisciplinary teams.

**Source jobs and journey:** Engage/assess → plan care → deliver care → review/transition. Record care once, see the person's full picture, record medication/risk/significant changes, and connect specialist input to the care plan. Relationships include engagement, continuing-care and specialist teams, the Centre Leader, people/families, and the Data Officer. Engagement Team and specialist workflows need separate co-design.

**Source pain/gain hypotheses:** Duplicate entry and disconnected specialist input → record-once/shared care workflows; change fatigue → usable embedded reporting. The draft's approximately 40% missing-data assertion is unverified. Full care planning, medication/significant-event recording, and specialist consultation are candidate CR-01, not already covered by questionnaire entry or conditional service logging.

**Baseline collection responsibilities:**

**Job:** Build and interpret a coherent assessment, make the appropriate clinical decision, and leave a clear next action for the care team.

- **Trigger and tasks:** For a new patient, complete or receive the authorised intake handoff before core assessment; use ST-27 for intake and ST-28 for referral follow-through where granted. Open assigned work or locate a person; confirm episode/referral context; plan the core and eligible modules; check action-specific permissions; collect/review contributions; record completion, pause, or incomplete exit; decide disposition and handover.
- **Success:** Correct episode, valid evidence and provenance, explicit outstanding work, separate clinical review/disposition, and accountable next care step.
- **Context variants:** Intake versus review; interrupted clinic work; desktop versus tablet setup; staff transcription versus clinician rating; new information requiring an extra module; cross-centre work only within approved scope.
- **Needs — hypotheses:** Task-first overview, understandable branching reasons, date/source/version visibility, rapid resumption, and concise history.
- **Pains/emotions — hypotheses:** Administrative load; uncertainty about “complete”; duplicated entry; fear of acting on the wrong episode or unsupported score comparison.
- **Information needed:** Person/episode identifiers, owner, permissions, assessment plan, each assignment's state, evidence reviewed, meaningful dates, stream/team history, next action, and correction context.
- **Access boundary:** Clinical capabilities are governed by role and scope; clinician status alone is not whole-system access or permission to administer configuration.
- **Design implications:** ST-01–ST-12 and authorised ST-17; distinct “Submit response,” “Record review,” and “Record disposition” actions; intentional episode switching; no automatic assessment completion after one measure.
- **Requirements:** FR-01–FR-14, FR-16–FR-29, FR-35–FR-38, FR-44.
- **Evidence:** S1 supports clinician entry and channels; S2 proposes shared core, modules, and routing. Exact content and completion logic remain open.
- **Validation:** Can a clinician resume a partial assessment, identify who answered, handle a missing permission, add a module after review, and hand over without reconstructing the workflow?

### P-01 — Kai — Person

**Source profile — CP1 p. 5:** Kai, Person. Illustrative context: 19, metro/regional, 18 months with the service; the source describes a 12–25 service population, not a verified eligibility or consent-age rule. Draft traits include digital confidence, self-awareness, variable engagement, trust/privacy, and agency; do not assume all people are digital-native.

**Source jobs and journey:** Entry → engagement → empowerment → transition. Understand progress, contribute to care decisions, share without retelling the story, and trust data handling. Relationships include clinician/coordinator and family/carers. Research consent is a separate purpose and must not be presumed given.

**Source pain/gain hypotheses:** Repetition, feeling unheard, inaccessible personal progress, privacy and cultural-safety concerns → agency, appropriate progress visibility, low-effort contribution, and trust.

**Important scope conflict:** CP1 puts a mostly view-only dashboard in MVP and direct self-report in Stage 2; S1 reports direct collection in MVP. D-21 must resolve the phase conflict. The current working collection baseline retains S1, while a participant progress view is candidate CR-02. The original PDF has not been edited.

**Cultural safety:** CP1 specifically calls for authentic Aboriginal and Torres Strait Islander youth involvement and diverse backgrounds in co-design. This is adopted as a research priority; do not assign an unverified identity to Kai or use one persona as a substitute for lived-experience participation.

**Baseline collection responsibilities:**

**Job:** Contribute their own information to an assigned assessment or follow-up, with a suitable level of help and a clear understanding of what happens next.

- **Trigger and tasks:** As a new patient, go through intake with appropriate staff support and understand the waiting/next-step outcome; no independent digital intake or private contact channel is assumed. Receive an eligible SMS request or attend a clinic; understand purpose/visibility; complete, pause, use permitted nonresponse, or ask for help; confirm successful submission.
- **Success:** The response is attributable to the person; they understand who may see it and know whether it was submitted and whom to contact.
- **Context variants to design for:** Personal or shared phone; private or public setting; tablet with or without clinician present; staff transcription; approved joint completion; assistive technology; limited connectivity. Do not assume any variant is universal.
- **Needs — hypotheses:** Manageable instructions, predictable progress, clear save state, suitable language and assistance, and freedom from pressure to fabricate an answer.
- **Pains/emotions — hypotheses:** Uncertainty about visibility; fatigue from repeated questions; worry about giving a “wrong” answer; frustration with expired links or failed saving.
- **Information needed:** Requesting service, assigned task, purpose, approved visibility explanation, available support, permitted nonresponse, expiry, and next action. Time estimates only when content is known and tested.
- **Access boundary:** Their authorised assignment/context only. No staff navigation, other respondents' separate answers, or broader care record by default. Link possession is not proof of identity.
- **Design implications:** PT-01–PT-09 surfaces; mobile-first content; clear start/stop/recovery; assistance and recorder provenance do not erase their role as source.
- **Requirements:** FR-11, FR-16–FR-27, FR-41–FR-45.
- **Validation:** Can they explain who sees answers? What makes contact/device use unsuitable? Do labels distinguish saved from submitted? What help is actually wanted, and when?

### P-02 — Deb — Family Carer

**Source profile — CP1 p. 6:** Deb, Family Carer. Illustrative context: 48, regional Victoria, caring for two years. Draft traits: supportive, anxious, practical, advocate, time-stretched.

**Source jobs and journey:** Seek help → contribute context/carer measures → stay appropriately informed → support transitions. Give useful context, understand how to help, and provide experience feedback. Works with the person and care team within approved participation/visibility boundaries.

**Source pain/gain hypotheses:** Feeling excluded or overloaded and unclear responsibilities → clear permitted involvement, simple contribution, and feeling included. These are draft hypotheses, not measured experience.

**Scope/authority:** The source's Stage 2 family-use label conflicts with S1's MVP family collection and is tracked in D-21. Family contribution does not confer guardian authority. Satisfaction remains conditional FR-15; informed progress sharing is candidate CR-02 with its own visibility rules.

**Baseline collection responsibilities:**

**Job:** Provide their own requested perspective without being confused with the person or assumed to hold guardian authority.

- **Trigger and tasks:** Receive an eligible separate request or participate in clinic; identify their relationship and respondent role; answer the assigned content; obtain confirmation and a support route.
- **Success:** Their contribution is separately attributable and handled under the appropriate visibility rules; neither they nor staff infer access to the person's separate answers.
- **Context variants:** Parent, carer, partner, friend, or another permitted supporter; shared contact details; multiple supporters; supporter who also has an approved guardian role. Eligibility must be decided, not inferred from this list.
- **Needs — hypotheses:** Clear wording about whose experience is being asked about, why they were invited, and how their own answers are used.
- **Pains/emotions — hypotheses:** Wanting to help but uncertainty about boundaries; receiving a request intended for someone else; confusing contribution with decision-making authority.
- **Information needed:** Assigned role, relationship label, purpose, answer visibility, task scope, receipt confirmation, and next contact.
- **Access boundary:** Only their permitted task and related information. Being family, receiving a link, or submitting feedback is not a clinical-record access grant.
- **Design implications:** Reuse participant interaction patterns but adapt role/purpose wording. Separate the identity of the subject, respondent, and any recorder. Satisfaction-specific screens exist only if FR-15 is adopted.
- **Requirements:** FR-15 conditionally; FR-16–FR-18, FR-22–FR-27, FR-40–FR-45.
- **Evidence:** S1 establishes family participation; CB6 demonstrates relationship and satisfaction distinctions, not final YSCC eligibility.
- **Validation:** Can they distinguish answering as a supporter from acting as guardian? Do they expect automatic answer sharing? What contact and language support is needed?

## 5. Service Improvement

### P-08 — Rachel Nguyen — Centre Leader

**Source profile — CP1 p. 8:** Rachel Nguyen, Centre Leader. Illustrative context: 44, metro Melbourne, 15 years' experience including five in leadership. Draft traits: accountable, operational, people-focused, data-curious, stretched. This persona may cover separate Operations Manager and Clinical Director responsibilities, not one universally broad access role.

**Source jobs and journey:** Set up/onboard → run → improve → report. Understand caseload, workforce, demand, safety, model fidelity, and performance; support data quality and adoption; report to PHN/governance bodies. Relationships include centre teams, Tom, Ananya, and Sam.

**Source pain/gain hypotheses:** Manual reporting, inconsistent data, no timely service view, and change pressure → reliable dashboards, fidelity visibility, and practical change support. Dashboard/metric scope is candidate CR-03; do not assume real-time refresh or answer-level drill-down.

**Baseline coordination responsibilities:**

**Job:** Coordinate the service's assessment and follow-up work, identify operational blockers, and ensure ownership through handover.

- **Trigger and tasks:** Review owned intake waiting/triage and unresolved referral follow-up, including external handovers. Review scoped team work; identify unassigned/overdue/blocked tasks; assign or request action if authorised; inspect aggregate progress; resolve handover gaps.
- **Success:** Work has an accountable owner and next action; overdue definitions are understood; unnecessary clinical detail is not exposed.
- **Context variants:** Centre or cluster responsibilities; clinical lead who also holds clinician capabilities versus operational lead without answer access.
- **Needs — hypotheses:** Meaningful queue filters, explainable counts, clear escalation routes, and minimal noise from cancelled/fulfilled work.
- **Pains/emotions — hypotheses:** Inconsistent status definitions, misleading completion rates, or an inability to distinguish an expired link from overdue clinical review.
- **Information needed:** Permitted operational metadata, cohort/filter definitions, due windows, owner, blocker, and next action. Detailed answers only through a separate authorised capability.
- **Access boundary:** Aggregate/queue access does not automatically allow individual clinical-response drill-down. Wider service dashboards/fidelity are candidate CR-03; their phase needs D-22/D-23 confirmation.
- **Design implications:** Scoped team view within ST-01; no new global analytics area in the current collection baseline; EX-03 is the candidate broader workspace.
- **Requirements:** FR-08, FR-19, FR-28–FR-29, FR-35–FR-38.
- **Evidence:** CP1 p. 8 supplies the Centre Leader profile; D-12/D-22 must validate the split between operational and clinical capabilities.
- **Validation:** Test assigning next action, interpreting overdue counts, and navigating without revealing unauthorised detail.

### P-06 — Tom Fletcher — Data Officer

**Source profile — CP1 p. 9:** Tom Fletcher, Data Officer. Site-based registration and data-quality role; the source specifies no age. Draft traits: organised, detail-oriented, persistent, service-minded, data-aware.

**Source jobs and journey:** Register → monitor completeness → follow up → close the loop. Accurate registration, early quality checks, clear ownership, and reporting readiness. Works with clinicians, the Centre Leader, and Data Manager.

**Source pain/gain hypotheses:** Missing records, staff chasing, manual reconciliation, and parallel workflows → embedded checks, one coherent record, and clearer prompts. Reduced manual follow-up is a product hypothesis, not an approved workforce-reduction objective. Registration access must be explicitly granted; automated reporting is candidate CR-04.

**Baseline correction responsibilities:**

**Job:** Correct an error when a verified source supports the change; otherwise obtain a clinician's input without inventing the answer.

- **Trigger and tasks:** If granted registration capability, create/link the person and open mandatory intake; record supplied identity/referral/contact facts and an owner without inventing missing values or marking clinical triage complete. Receive a data-quality issue; inspect scoped record/provenance; locate approved corroborating evidence; correct with reason/source, or route a correction request to the clinician; verify resolution history.
- **Success:** Correct authority path, accurate prior/new values, retained original respondent/recorder, named editor, reason, and evidence. Collection remains submitted where it was already submitted.
- **Context variants:** Demographic/record field versus response error; evidence present versus missing; record within versus outside scope; an already corrected field.
- **Needs — hypotheses:** Side-by-side source/current context, clear permissions, readable audit, and visible request ownership.
- **Pains/emotions — hypotheses:** Unclear sources of truth, pressure to fill gaps, repeated requests, or inability to tell whether someone else already corrected the issue.
- **Information needed:** Record identifiers, field/value, prior corrections, source reference, actor authority, request status, and resolution owner.
- **Access boundary:** Direct correction requires verified external information and approved field authority. Otherwise request a clinician correction. This role does not automatically authorise diagnosis, rescoring, or cross-centre resolution.
- **Design implications:** ST-14, ST-16, ST-17; explicit source/no-source fork; concurrency check before correction; no new invitation caused by correction.
- **Requirements:** FR-28–FR-30, FR-32–FR-33, FR-35, FR-46.
- **Evidence:** Correction boundary is reported in S1. Exact source systems and procedures await D-13.
- **Validation:** Test with and without evidence, conflicting edits, and a scope restriction; verify the officer chooses the correct route.

### P-07 — Ananya Rao — Data Manager

**Source profile — CP1 p. 10:** Ananya Rao, Data Manager. Illustrative context: 36, Melbourne/Orygen central, ten years in data/analytics. Draft traits: rigorous, systems-thinking, quality-driven, diplomatic, detail-oriented.

**Source jobs and journey:** Define data dictionary/quality rules → monitor across sites → report/extract → feed insights back. The source describes unit-record stewardship, PMHC-MDS/CQR support, PHN/DHDA/AIHW outputs, and governed benchmarking. Relationships include Tom, Sam, PHNs, David, and Maya.

**Source pain/gain hypotheses:** Missing/inconsistent data, manual extracts, mapping complexity, and inaccessible comparison data → consistent definitions, validation, governed extracts, and reliable comparison. These reporting contracts and wider access are candidate CR-04/CR-07 under D-23, not already authorised by the persona.

**Baseline record-resolution responsibilities:**

**Job:** Resolve duplicate or misaligned records with recorded centre support and a recoverable, auditable process.

- **Trigger and tasks:** Review an escalated/suspected duplicate or alignment issue; inspect authorised identifiers and dependencies; obtain required centre support; propose/approve/execute the resolution only within granted capabilities; verify outcome and audit.
- **Success:** Correctly linked records, retained traceability, explicit impact, required support/approval, and a supported recovery path.
- **Context variants:** Within-centre duplicates, cross-centre ownership ambiguity, mislinked episode/response, and unresolved identity evidence.
- **Needs — hypotheses:** Comparison context, dependency impact, clear centre contacts, and a visible difference between proposed resolution and committed change.
- **Pains/emotions — hypotheses:** Risk of joining different people; uncertain ownership; irreversible actions without sufficient evidence; silent movement of historical data.
- **Information needed:** Scoped candidate identifiers, linked records, supporting evidence, centre decisions, proposed action, approval status, and audit trail.
- **Access boundary:** “Data Manager” does not automatically mean unrestricted scope or unilateral irreversible merge. Centre support and decision authority must be defined in D-12/D-14.
- **Design implications:** ST-15 and ST-17; dedicated case and preview; uncertain identity routes to investigation, not an automatic merge.
- **Requirements:** FR-09, FR-14, FR-28–FR-29, FR-31–FR-34, FR-46.
- **Evidence:** Role and centre support are reported in S1; detailed interaction is proposed.
- **Validation:** Can the manager distinguish suspicion from evidence, explain affected records, obtain the correct support, and recover a mistaken approved resolution under the defined procedure?

### P-10 — Dr Sam Okafor — Implementation Scientist

**Source:** CP1 p. 11; Service Improvement. Orygen central, cross-site and across establishment, implementation, and consolidation; no age is specified. Draft traits: evidence-focused, curious, collaborative, systems-minded, improvement-oriented.

**Essence:** A learning partner translating implementation evidence into practical support and stronger model fidelity.

- **Jobs and desired outcomes:** Understand centre readiness and implementation barriers; evaluate fidelity; compare patterns with local context; return useful findings to teams.
- **Journey:** Establish readiness/capability → monitor implementation and early signals → evaluate fidelity → coordinate shared learning.
- **Relationships:** Centre Leaders, Data Manager, new centres, and network teams. Exact responsibilities and relationships are explicitly unvalidated in the source.
- **Pains — source hypotheses:** Fragmented/late data, metrics without local context, incomparable centres, and findings that do not reach practice.
- **Gains — source hypotheses:** Timely linked views, site insight alongside data, consistent fidelity definitions, and practical improvement feedback.
- **Information needed — proposed:** Site/context, implementation phase, approved fidelity definitions, cohort/time window, completeness, comparison limitations, and a documented improvement action/owner.
- **Access boundary:** The draft mentions individual and aggregate data. It does not grant person-level access; D-23 must define justified scope, purpose, authority, and disclosure controls before any drill-down.
- **Design implications:** Candidate CR-05; EX-04 implementation workspace, governed evidence views, and a closed improvement-action loop. This is separate from a clinician's daily queue.
- **Success to test:** Sam can explain what the evidence supports, identify context/missingness limits, and agree an actionable response with a centre without overinterpreting rankings.
- **Validation:** Co-design with implementation staff and centres; confirm whether individual data is necessary, who can author fidelity measures, and how learning actions return to practice. D-22–D-23.

## 6. System Evidence

### P-11 — Priya Sharma — PHN Commissioner

**Source:** CP1 p. 13; System Evidence. Represents a PHN consuming aggregated, de-identified reporting for evaluation and commissioning/recommissioning. The draft gives no age, journey, influence ratings, or digital-confidence rating; do not invent them.

**Essence:** A commissioning evaluator who needs trustworthy and fair service comparisons.

- **Jobs and desired outcomes:** Evaluate performance, benchmark fairly, and inform commissioning decisions.
- **Proposed journey extension:** Access an approved reporting product → select permitted period/cohort/comparison → inspect definitions/quality/context → interpret with the service → record a commissioning question or decision through the agreed process.
- **Relationships:** Services/Centre Leaders and central reporting/governance teams; detailed decision responsibilities require validation.
- **Pains — source hypotheses:** Inconsistent data, unfair comparison, and late reporting.
- **Gains — source hypotheses:** Reliable aggregate outputs, appropriate benchmarking, and timely evidence.
- **Information needed — proposed:** Metric definition/version, denominator, cohort, reporting period, refresh/as-of date, suppression rules, missingness, context/case-mix limitations, and permissible comparisons.
- **Access boundary:** Aggregate/de-identified products by default as described; no care-record navigation or individual drill-down. Aggregation alone does not prove disclosure safety.
- **Design implications:** Candidate CR-06, EX-05 reporting product; disclose unsupported comparisons and quality limitations before export/use.
- **Success to test:** Priya can explain a metric and its limitations and distinguish a legitimate comparison from a misleading league table.
- **Validation:** Agree reporting contract, recipients, data granularity, methods, turnaround, and commissioning accountability. D-23.

### P-12 — David Thompson — Policy Lead

**Source:** CP1 p. 14; System Evidence. The draft positions DHDA as data steward/owner of the governance framework and describes oversight, accountability, and funding responsibilities. These are source assertions requiring confirmation, not a verified legal ownership statement.

**Essence:** A policy/stewardship actor seeking accountable evidence of system value and appropriate governance.

- **Jobs and desired outcomes:** Oversee accountability, assess compliance evidence, understand investment value, and steward the framework.
- **Proposed journey extension:** Define oversight questions and approved reporting contract → inspect system-level evidence/quality → review governance exceptions → commission an accountable follow-up and monitor resolution.
- **Relationships:** Programme/data governance, central data/reporting functions, commissioning and national integration actors; exact organisational responsibilities are open.
- **Pains — source hypotheses:** Fragmented data, difficulty demonstrating impact, and privacy/governance risk.
- **Gains — source hypotheses:** Core-dataset visibility, accountability, and clear national data responsibilities.
- **Information needed — proposed:** Agreed outcome/coverage measures, methods and limits, governance responsibilities, release approvals, and exception status. Product analytics do not automatically demonstrate value for money or causal clinical impact.
- **Access boundary:** System-level/governed information appropriate to purpose. Stewardship title does not automatically grant unrestricted raw data, care access, or unilateral disposal authority.
- **Design implications:** Candidate CR-06, EX-05 reporting/oversight; link evidence to definition, owner, and approval status.
- **Success to test:** David can distinguish measured outcomes, coverage gaps, and governance exceptions, with an accountable next action.
- **Validation:** Confirm organisation naming, actual ownership/stewardship responsibilities, access, reporting obligations, and evaluation method. D-20, D-23.

### P-13 — Maya Brooks — AIHW Lead

**Source:** CP1 p. 15; System Evidence. Represents AIHW in national integration, linkage, coordination, and PMHC-MDS alignment. The source explicitly describes consumption of governed outputs rather than daily use of the care interface.

**Essence:** A national integration actor needing consistent, documented, governable data exchange.

- **Jobs and desired outcomes:** Manage integration, coordinate linkage, align definitions with PMHC-MDS, and support valid national comparison.
- **Proposed journey extension:** Agree exchange specification/authority → validate schema and mapping → receive an approved release → reconcile quality/linkage exceptions → return findings to the data custodian.
- **Relationships:** Data Manager, policy/data governance and national collection/linkage teams; exact handoffs require a contract.
- **Pains — source hypotheses:** Inconsistent definitions, fragile manual integration, linkage constraints, and unclear accountability.
- **Gains — source hypotheses:** Aligned definitions, governed exchange, documented linkage, and clear control ownership.
- **Information needed — proposed:** Data dictionary/version, source/target mapping, schema, date/grain semantics, release manifest, lineage, approved identifiers, quality results, and exception owner.
- **Access boundary:** Governed exchange for approved purposes; no general clinical UI or assumption that de-identified extract identifiers are suitable for national linkage.
- **Design implications:** Candidate CR-07, EX-06 exchange/release view or an external delivery contract; a separate interactive portal is not automatically necessary.
- **Success to test:** An authorised output validates against the agreed contract, with traceable rejected records and reproducible release provenance.
- **Validation:** Confirm current collection specification, transport, identity/linkage authority, recipient responsibilities, and correction/re-release process. D-23.

### P-14 — Dr Helen Marsh — Researcher

**Source:** CP1 p. 16; System Evidence. Academic/translational researcher; the draft describes approved studies and access via the National Research Office, including a future adaptive platform trial. Treat those access/governance arrangements and future trial capability as unconfirmed.

**Essence:** An evidence-generating actor who needs timely, appropriately authorised, linkable data and a route to return findings to care.

- **Jobs and desired outcomes:** Obtain approved data, link outcomes where authorised, produce evidence, and feed findings back to practice.
- **Proposed journey extension:** Define study/question → submit data/ethics/authority request → receive review/conditions → use an approved release in the approved setting → return findings and satisfy retention/closure conditions.
- **Relationships:** Research office, data custodian/manager, governance/ethics and clinical collaborators; validate actual workflow and responsibilities.
- **Pains — source hypotheses:** Delays, weak care/research integration, and access/ethics friction. The stated 12-month-plus delay is not a measured baseline in this project.
- **Gains — source hypotheses:** Timely governed access, approved linkage, and future research infrastructure. Trial enablement is a strategic candidate, not a committed launch capability.
- **Information needed — proposed:** Dataset catalogue, eligibility and consent/authority constraints, provenance/version/coverage, request criteria, approval/expiry, release manifest, linkage limits, and output-review/closure conditions.
- **Access boundary:** Study-specific minimum necessary data and approved purpose/setting; no general person search or assumption that a single research checkbox authorises all studies. Routine care is not conditional on research participation.
- **Design implications:** Candidate CR-08, EX-07 research request/status or a documented external handoff. No trial randomisation/treatment-allocation feature is assumed.
- **Success to test:** Helen can understand eligibility, obtain the correct review, use only approved data, and return interpretable findings with clear obligations.
- **Validation:** Research office workflow, ethics/consent/other authority, linkage, data environment, request turnaround, retention, and future trial scope. D-24.

## 7. Supporting capabilities, not additional source personas

These capabilities remain necessary to describe safe collection/configuration. Confirm who performs them; do not add automatic access grants or imply they were separate personas in CP1.

### P-03 — Authorised guardian decision-maker

**Job:** Make a clearly bounded decision for a specific purpose only where the approved pathway establishes their authority.

- **Trigger and tasks:** Staff identify a policy-dependent decision requiring an authorised representative; authority is checked; the decision-maker receives the relevant information and records or communicates a decision.
- **Success:** Decision, purpose, authority, effective time, and information version are traceable. Permitted person participation and other purposes remain separately handled.
- **Context variants:** May also be P-02, but the two functions must not be collapsed. Guardian involvement may change over time or by purpose according to approved rules.
- **Needs — hypotheses:** Clear explanation of the decision being requested, its limits, review/withdrawal route, and whom to ask when authority is uncertain.
- **Pains/emotions — hypotheses:** Ambiguity about responsibilities, uncertainty about consequences, or being asked to agree to several unrelated purposes together.
- **Information needed:** Applicable purpose, approved information text, decision options, scope, consequences, authority evidence requirements, and support route.
- **Access boundary:** Authority to make a decision does not automatically grant all answer visibility or ongoing portal access. Age thresholds and authority evidence are not specified by these personas.
- **Design implications:** Explicit authority review and purpose-specific records in ST-11. A digital participant decision surface, PT-08, is a proposed option only if D-04 approves that mode; do not invent a separate guardian portal.
- **Requirements:** FR-22–FR-25, FR-27–FR-29.
- **Evidence:** S2 identifies unresolved person/guardian and withdrawal policy. This is a required design contingency, not a confirmed legal model.
- **Validation:** Legal/PIA and clinical owners must define the authority rules first; then test comprehension, distinction between purposes, and supported decision recording.

### P-05 — In-clinic facilitator

**Job:** Start the correct participant task and safely hand over/recover the device, providing only the assistance appropriate to the instrument and role.

- **Trigger and tasks:** A clinician requests tablet collection; confirm person/assignment and permitted assistance; launch participant mode; explain support; end/reset the session; let authorised staff check receipt.
- **Success:** Correct participant and eligible task; assistance is recorded; the next person cannot see previous content; returning to staff view requires authentication.
- **Context variants:** Clinician performing this task themselves, or another staff member with limited capabilities; independent, assisted, or joint completion only where approved.
- **Needs — hypotheses:** Minimal setup, unambiguous participant context, a neutral end screen, and recovery from interruptions or timeout.
- **Pains/emotions — hypotheses:** Rushed handovers, accidental staff-screen exposure, uncertainty whether someone has submitted, or an instruction that unintentionally influences answers.
- **Information needed:** Task identity, eligible mode, assistance instructions, session state, and receipt confirmation within their allowed scope.
- **Access boundary:** Facilitation does not automatically permit reading answers, clinical review, correction, or configuration. Staff authentication alone is insufficient without the relevant capability.
- **Design implications:** ST-08 launches PT-01; PT-09 ends/reset sessions. Keep answers out of the neutral receipt/reset screen.
- **Requirements:** FR-16–FR-17, FR-20–FR-21, FR-27–FR-29, FR-44–FR-45.
- **Validation:** Test completion, cancellation, timeout, back navigation, and device handover; confirm whether this is a separate role or clinician capability under D-12.

### P-09 — System/configuration administrator

**Job:** Maintain approved organisations, capabilities, instrument versions, workflow settings, and message/policy configuration without silently changing existing clinical records.

- **Trigger and tasks:** Receive an approved change; prepare configuration; preview/test affected scenarios; obtain required approval; publish; inspect audit and effective version.
- **Success:** Changes are attributable and approved; new assignments use the intended version; active assignments/drafts remain pinned; access changes take effect according to policy.
- **Context variants:** Separate content, access, and technical administrators, or combined staff capabilities. The final split is open.
- **Needs — hypotheses:** Draft-versus-published clarity, change impact, safe preview data, and clear boundaries between editing a rule and authorising its clinical use.
- **Pains/emotions — hypotheses:** Accidentally publishing clinical content, breaking active collection, or assuming configuration access grants answer access.
- **Information needed:** Approved source/rationale, version/effective date, dependencies, test results, required approver, and publication/audit status.
- **Access boundary:** Technical configuration does not confer clinical/legal decision authority or unrestricted access to responses. Distinct configure/approve/administer grants must be enforced.
- **Design implications:** ST-18–ST-23; use synthetic previews; show existing-assignment impact and retain audit. Emergency withdrawal/replacement behaviour needs explicit operational policy.
- **Requirements:** FR-05, FR-13, FR-19, FR-22–FR-29, FR-40, FR-46.
- **Evidence:** Proposed operational role supporting source-backed capabilities; exact grants and approval process need validation.
- **Validation:** Publish a new sample version during an active draft; verify no silent mutation. Test unauthorised publication, rule dependencies, and narrow access administration.

## 8. Validation priorities and source reconciliation

1. Resolve D-21: the draft's MVP dashboard / Stage 2 self-report statement conflicts with S1's reported MVP direct person/family collection. Retain both claims with source labels until the owner decides.
2. Validate Jess across engagement, continuing-care, local/central, and specialist contexts. Assessment clinician is one task context, not the full treating-clinician job.
3. Co-design with Aboriginal and Torres Strait Islander people and other diverse contexts using appropriate partnerships, cultural-safety practices, and research safeguards. Do not invent Kai's identity or use persona imagery as evidence of lived experience.
4. Split Rachel's operational/clinical capabilities where needed; confirm Tom's registration grants and Ananya/Sam's scoped individual versus aggregate access.
5. Validate System Evidence stakeholders' actual jobs, data contracts, governance, and whether they need a product screen or governed external output. Do not add four unrestricted staff accounts merely because four personas exist.
6. Verify quantitative pain claims before using them as baselines: approximately 40% missing hAPI data and 12-month-plus research delays.
7. Treat persona ages, confidence ratings, motivation, and pains as hypotheses. Test personal/shared devices, supported/independent participation, assistive technology, language, low connectivity, and changing engagement.
8. Use approved research consent/assent, safeguarding, privacy, and culturally safe recruitment procedures. Early tests can use synthetic records and should not require clinical disclosure to evaluate navigation.

The profiles are complete working artefacts. They become research-backed only when observations, contradictions, source dates, and confidence are recorded. Candidate capabilities are CR-01–CR-08 in [requirements and logic](05-requirements-and-logic.md); the full learning loop is in [journey](04-full-user-journey.md).
