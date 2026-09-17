import { useState } from "react";
import { INSTRUMENTS } from "../instruments";
import {
  BookOpen,
  SlidersHorizontal,
  MessageSquare,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  Users,
  ClipboardList,
  CalendarClock,
} from "lucide-react";
import { useStore } from "../store";
import { displayPersonName, currentStaff } from "../model";
import {
  PageHeading,
  Panel,
  Button,
  Badge,
  Avatar,
  Notice,
  Empty,
  Tabs,
} from "../components/UI";
export function Quality({ openModal, navigate }) {
  const { state } = useStore();
  const [filter, setFilter] = useState("Open");
  const issues = state.issues.filter((i) => i.status === filter);
  return (
    <>
      <PageHeading
        title="Data quality"
        subtitle="Resolve the detail. Preserve the history."
      />
      <Tabs
        id="quality"
        label="Issue status"
        className="standalone-tabs"
        value={filter}
        onChange={setFilter}
        items={["Open", "Resolved"].map((value) => ({
          value,
          count: state.issues.filter((i) => i.status === value).length,
        }))}
      />
      <div
        role="tabpanel"
        id="quality-panel"
        aria-labelledby={`quality-tab-${filter === "Open" ? 0 : 1}`}
      >
        <div className="stack">
          {issues.length ? (
            issues.map((i) => {
              const p = state.people.find((p) => p.id === i.personId);
              return (
                <Panel
                  title={i.title}
                  action={<Badge>{i.outcome || i.status}</Badge>}
                  key={i.id}
                >
                  <div className="panel-body">
                    <div className="quality-context">
                      <Avatar name={p.name} />
                      <div>
                        <button
                          className="name-link"
                          onClick={() => navigate(`/people/${p.id}`)}
                        >
                          {displayPersonName(p)}
                        </button>
                        <small>
                          {p.id} · {i.id}
                        </small>
                      </div>
                      <span className="muted">Owner: {i.owner || p.owner}</span>
                    </div>
                    <p>{i.detail}</p>
                    {i.nextStep && (
                      <p>
                        <strong>Next investigation step:</strong> {i.nextStep}
                      </p>
                    )}
                    <div className="actions">
                      {i.status === "Open" && (
                        <Button
                          variant="primary"
                          onClick={() =>
                            openModal({
                              type: "correct",
                              personId: p.id,
                              issueId: i.id,
                            })
                          }
                        >
                          Review issue
                        </Button>
                      )}
                      <Button onClick={() => navigate(`/people/${p.id}`)}>
                        Open person record
                        <ArrowRight size={17} />
                      </Button>
                    </div>
                  </div>
                </Panel>
              );
            })
          ) : (
            <Empty
              title={
                filter === "Open"
                  ? "All sample issues resolved"
                  : "No resolved issues yet"
              }
            >
              {filter === "Open"
                ? "Corrections and source references are retained below."
                : "A verified correction will appear here after it is saved."}
            </Empty>
          )}
        </div>
      </div>
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
