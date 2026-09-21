# PMHC-MDS measure reference

This reference preserves the measure-governance table previously shown in the
prototype Assessment page. It is a prototype design reference, not a confirmed
PMHC-MDS implementation specification. The PHN/programme owner must approve
the final measure set, licences, versions and data-submission mapping before
live use.

Each measure must be pinned to a version, eligible respondents, collection
timing, scoring rule and missing-data rule before it can be used.

| Measure and version | Respondent and timing | Scoring and missing data | Status |
| --- | --- | --- | --- |
| **Kessler 10+ (K10+)**<br>PMHC-MDS K10+ current | Person<br>Baseline · Review · Discharge | PMHC-MDS K10+ scoring rule; store item-level data before a total.<br>One missing item may be prorated; more than one makes the total missing. | Configured PMHC-MDS reference |
| **Kessler 5 (K5)**<br>PMHC-MDS K5 current | Person<br>Baseline · Review · Discharge | PMHC-MDS K5 total score rule.<br>Any missing item makes the total missing. | Configured PMHC-MDS reference |
| **Strengths and Difficulties Questionnaire (SDQ)**<br>PC101/PC202 · PY101/PY201 · YR101/YR201 | Parent/carer · Young person (11–17)<br>Baseline · Review · Discharge | Use the licensed, version-specific PMHC-MDS SDQ scoring rules.<br>Use the instrument rule; insufficient completed items produce missing summary scores. | Configured PMHC-MDS reference |
| **IAR-DST**<br>Version and scoring method to be confirmed | To be approved<br>Baseline · Review · Discharge | Version, scoring method and interpretation rules must be approved before use.<br>Missing-data rule must be approved before use. | Prototype visualisation fixture — not enabled |
| **WHO-5 Well-Being Index**<br>PMHC-MDS WHO-5 current | Person<br>Baseline · Review · Discharge | Use the approved WHO-5 scoring method for the pinned version.<br>Store the collection status and missing-data reason; do not calculate an incomplete score. | Configured PMHC-MDS reference |
| **Suicidal Ideation Attributes Scale (SIDAS)**<br>PMHC-MDS SIDAS current | Person<br>Baseline · Review · Discharge | Use the approved five-item scoring rule; do not infer clinical action from the total.<br>Any incomplete required item makes the total missing. | Configured PMHC-MDS reference |

## Outcome-record statuses

- Complete
- Incomplete — follow-up required
- Not collected — person declined
- Not collected — unavailable
- Not applicable
- Recorded missing

For every missing status except **Not applicable**, record a missing-data
reason. The configured catalogue remains in the prototype code because
outcome-record validation depends on it; this document replaces only the
Assessment-page governance panel.
