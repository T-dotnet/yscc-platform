import { useMemo, useState } from "react";
import { INSTRUMENTS } from "../instruments";
import {
  BookOpen,
  SlidersHorizontal,
  MessageSquare,
  RotateCcw,
  ShieldCheck,
  Users,
  ClipboardList,
  CalendarClock,
  Filter,
  ChevronDown,
} from "lucide-react";
import { useStore } from "../store";
import { currentStaff, formatDate, TODAY } from "../model";
import {
  QUALITY_SEVERITIES,
  QUALITY_STATUSES,
  getQualityIssues,
} from "../dataQuality";
import {
  PageHeading,
  Panel,
  Button,
  Badge,
  Avatar,
  Notice,
  Empty,
  Select,
} from "../components/UI";

const EMPTY_FILTERS = {
  organisation: "All organisations",
  clinician: "All clinicians",
  status: "All statuses",
  severity: "All severities",
  submissionPeriod: "All submission periods",
};

export function Quality({ openModal, navigate }) {
  const { state } = useStore();
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const issues = useMemo(() => getQualityIssues(state, TODAY), [state]);
  const unresolved = issues.filter(
    (issue) => !["Resolved", "Closed"].includes(issue.status),
  );
  const visibleIssues = issues.filter(
    (issue) =>
      (filters.organisation === "All organisations" ||
        issue.organisation === filters.organisation) &&
      (filters.clinician === "All clinicians" ||
        issue.owner === filters.clinician) &&
      (filters.status === "All statuses" || issue.status === filters.status) &&
      (filters.severity === "All severities" ||
        issue.severity === filters.severity) &&
      (filters.submissionPeriod === "All submission periods" ||
        issue.submissionPeriod === filters.submissionPeriod),
  );
  const filterOptions = {
    organisations: [...new Set(issues.map((issue) => issue.organisation))],
    clinicians: [...new Set(issues.map((issue) => issue.owner))],
    periods: [...new Set(issues.map((issue) => issue.submissionPeriod))],
  };
  const hasFilters = Object.entries(filters).some(
    ([key, value]) => value !== EMPTY_FILTERS[key],
  );
  const setFilter = (key, value) =>
    setFilters((current) => ({ ...current, [key]: value }));
  return (
    <>
      <PageHeading
        title="Data quality"
        subtitle="Continuously check completeness, resolve the source, and retain the evidence."
        meta="Sample PMHC-MDS rule set · Northside Centre · 15 September 2026"
      />
      <Panel
        title="Validation issue queue"
        action={<Badge>{unresolved.length} unresolved</Badge>}
        className="quality-queue"
      >
        <details
          className={`care-timeline-filters quality-filters${hasFilters ? " has-active-filters" : ""}`}
          open={filtersOpen}
          onToggle={(event) => setFiltersOpen(event.currentTarget.open)}
        >
          <summary
            className="care-timeline-filter-heading"
            aria-label="Show validation issue filters"
          >
            <div>
              <Filter size={18} aria-hidden="true" />
              <span className="sr-only">Filter validation issues</span>
            </div>
            <span aria-live="polite">
              Showing {visibleIssues.length} of {issues.length} issues
            </span>
            <ChevronDown
              className="care-timeline-filter-chevron"
              size={18}
              aria-hidden="true"
            />
          </summary>
          <div className="care-timeline-filter-body">
            <div className="care-timeline-filter-fields quality-filter-fields">
              <Select
                label="Organisation filter"
                value={filters.organisation}
                onChange={(event) =>
                  setFilter("organisation", event.target.value)
                }
              >
                <option>All organisations</option>
                {filterOptions.organisations.map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </Select>
              <Select
                label="Clinician filter"
                value={filters.clinician}
                onChange={(event) => setFilter("clinician", event.target.value)}
              >
                <option>All clinicians</option>
                {filterOptions.clinicians.map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </Select>
              <Select
                label="Status filter"
                value={filters.status}
                onChange={(event) => setFilter("status", event.target.value)}
              >
                <option>All statuses</option>
                {QUALITY_STATUSES.map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </Select>
              <Select
                label="Severity filter"
                value={filters.severity}
                onChange={(event) => setFilter("severity", event.target.value)}
              >
                <option>All severities</option>
                {QUALITY_SEVERITIES.map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </Select>
              <Select
                label="Submission period filter"
                value={filters.submissionPeriod}
                onChange={(event) =>
                  setFilter("submissionPeriod", event.target.value)
                }
              >
                <option>All submission periods</option>
                {filterOptions.periods.map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </Select>
              {hasFilters && (
                <Button
                  variant="secondary"
                  onClick={() => setFilters(EMPTY_FILTERS)}
                >
                  Clear filters
                </Button>
              )}
            </div>
          </div>
        </details>
        {visibleIssues.length ? (
          <div className="table-scroll quality-table-scroll">
            <table
              className="quality-table"
              aria-label="Validation issue queue"
            >
              <thead>
                <tr>
                  <th>Severity</th>
                  <th>Client</th>
                  <th>Issue</th>
                  <th>Owner</th>
                  <th>Status</th>
                  <th>Due</th>
                  <th>
                    <span className="sr-only">Manage issue</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {visibleIssues.map((issue) => {
                  const person = state.people.find(
                    (item) => item.id === issue.personId,
                  );
                  return (
                    <tr key={issue.id}>
                      <td data-label="Severity">
                        <Badge>{issue.severity}</Badge>
                      </td>
                      <td data-label="Client">
                        <button
                          className="name-link"
                          onClick={() => navigate(`/people/${person.id}`)}
                        >
                          {person.name}
                        </button>
                        <small>{person.id}</small>
                      </td>
                      <td data-label="Issue" className="quality-issue-cell">
                        <strong>{issue.type}</strong>
                        <span>{issue.description}</span>
                      </td>
                      <td data-label="Owner">{issue.owner}</td>
                      <td data-label="Status">
                        <Badge>{issue.status}</Badge>
                      </td>
                      <td data-label="Due">
                        {issue.dueDate ? formatDate(issue.dueDate) : "Not set"}
                      </td>
                      <td className="quality-manage-cell">
                        <Button
                          aria-label={`Manage ${issue.type} for ${person.name}`}
                          onClick={() =>
                            openModal({
                              type: "quality-issue",
                              personId: person.id,
                              issueId: issue.id,
                            })
                          }
                        >
                          Manage
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <Empty title="No validation issues match these filters">
            Change a filter to see another part of the queue.
          </Empty>
        )}
      </Panel>
    </>
  );
}
export function Administration({ openModal }) {
  const { state } = useStore();
  const staff = currentStaff(state);
  return (
    <>
      <PageHeading
        title="Administration"
        subtitle="The foundations of a consistent care experience."
      />
      <Notice>
        Sample configuration for exploring the workspace. Publication, clinical
        approval, and live permissions are not connected.
      </Notice>
      <Panel title="Workspace configuration" className="admin-panel">
        {[
          [
            BookOpen,
            "Instrument library",
            `${INSTRUMENTS.length} sample questionnaires · Browse topics and preview questions`,
            "instrument",
            "Browse instruments",
          ],
          [
            SlidersHorizontal,
            "Rules & schedules",
            "Explicit follow-ups, version pinning, and independent review",
            "rules",
            "View sample rules",
          ],
          [
            MessageSquare,
            "Messages & delivery",
            "A sample invitation for account-free collection",
            "messages",
            "Preview message",
          ],
          [
            ShieldCheck,
            "Organisation & access",
            `Northside Centre · ${staff?.name}, ${staff?.role}`,
            "scope",
            "View workspace",
          ],
        ].map(([Icon, title, desc, type, action]) => (
          <div className="admin-row" key={title}>
            <span className="admin-icon">
              <Icon size={24} />
            </span>
            <div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
            <Button onClick={() => openModal({ type })}>
              {action}
              <ArrowRight size={17} />
            </Button>
          </div>
        ))}
      </Panel>
      <div className="reset-panel">
        <div>
          <h3>Start fresh with sample data</h3>
          <p>Restore the original six people and their worklist.</p>
        </div>
        <Button onClick={() => openModal({ type: "reset" })}>
          <RotateCcw size={17} />
          Reset sample workspace
        </Button>
      </div>
    </>
  );
}
export function Help({ navigate, openModal }) {
  return (
    <>
      <PageHeading
        title="Help & guidance"
        subtitle="A few paths to explore the workspace."
      />
      <div className="help-grid">
        {[
          [
            ClipboardList,
            "Follow an overdue review",
            "Open Kai’s record, choose Set up collection, confirm a sample collection method, and complete the questionnaire.",
            "Open Kai’s record",
            () => navigate("/people/YS-1024"),
          ],
          [
            FileCheck2,
            "Review a submitted response",
            "Open Amelia’s record to review her sample answers. Saving the review preserves the response and its source.",
            "Open Amelia’s record",
            () => navigate("/people/YS-1025"),
          ],
          [
            CalendarClock,
            "Plan the next check-in",
            "Use Plan follow-up in a person record. The new time point stays within the same care episode.",
            "Explore people",
            () => navigate("/people"),
          ],
          [
            Users,
            "Try the participant experience",
            "Try a longer questionnaire with questions that adapt to your answers, without updating a person’s care record. No account is needed.",
            "Try a sample questionnaire",
            () => navigate("/preview"),
          ],
        ].map(([Icon, title, desc, label, fn]) => (
          <Panel key={title}>
            <div className="panel-body help-card">
              <Icon size={25} />
              <h2>{title}</h2>
              <p>{desc}</p>
              <Button onClick={fn}>
                {label}
                <ArrowRight size={17} />
              </Button>
            </div>
          </Panel>
        ))}
      </div>
      <Notice>
        All records and questions are fictional. No SMS is sent, no clinical
        score is calculated, and sample answers are saved only in this browser.
        Use your care team’s usual support route for real care questions.
      </Notice>
    </>
  );
}
