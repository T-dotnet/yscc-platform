import { Plus, ArrowRight } from "lucide-react";
import { useStore } from "../store";
import {
  getTasks,
  formatDate,
  currentStaff,
} from "../model";
import { ownedTasks, taskHref } from "../workflow";
import { intakeStage } from "../intake";
import useQueueView from "../useQueueView";
import {
  PageHeading,
  Button,
  Panel,
  SearchInput,
  Select,
  Avatar,
  Badge,
  Empty,
  Pagination,
  Tabs,
} from "../components/UI";

const filters = [
  "All work",
  "Needs attention",
  "Ready for review",
  "Intake",
  "Referrals",
];
const PAGE_SIZE = 6;

const workRecord = (task) =>
  task.collection || {
    id: task.record.id,
    label:
      task.kind === "intake"
        ? "Intake"
        : `Referral · ${task.record.destination}`,
    due: task.record.reviewDate,
  };
export default function Worklist({ navigate, openModal }) {
  const { state } = useStore();
  const view = useQueueView();
  const query = view.params.get("q") || "";
  const filter = filters.includes(view.params.get("filter"))
    ? view.params.get("filter")
    : "All work";
  const point = view.params.get("point") || "All collection points";
  const ownership = ["me", "team", "unassigned"].includes(
    view.params.get("owner"),
  )
    ? view.params.get("owner")
    : "me";
  const tasks = ownedTasks(getTasks(state), state, ownership);
  const matchesFilter = (task, selected) =>
    selected === "All work" ||
    (selected === "Intake"
      ? task.kind === "intake"
      : selected === "Referrals"
        ? task.kind === "referral"
        : selected === "Needs attention"
          ? ["Overdue", "Sending failed", "Declined"].includes(task.status)
          : task.status === "Ready for review");
  const filtered = tasks.filter(
    (task) =>
      matchesFilter(task, filter) &&
      (point === "All collection points" || workRecord(task).label === point) &&
      `${task.person.name} ${task.person.id}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const requestedPage = Number(view.params.get("page"));
  const page = Math.min(
    Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1,
    pageCount,
  );
  const pageStart = (page - 1) * PAGE_SIZE;
  const visibleTasks = filtered.slice(pageStart, pageStart + PAGE_SIZE);
  const showingFrom = filtered.length ? pageStart + 1 : 0;
  const showingTo = Math.min(pageStart + PAGE_SIZE, filtered.length);
  const openTask = (task) => {
    view.remember();
    navigate(taskHref(task, view.href));
  };
  const openPerson = (person) => {
    view.remember();
    navigate(`/people/${person.id}?returnTo=${encodeURIComponent(view.href)}`);
  };
  return (
    <>
      <PageHeading
        title="My work"
        subtitle="Intake, assessment and referral follow-up in one place."
        meta="Sample date · 15 September 2026"
      >
        <Button
          variant="primary"
          onClick={() => openModal({ type: "new-person" })}
        >
          <Plus size={18} />
          New person
        </Button>
      </PageHeading>
      <Panel
        className="work-panel"
        title="Worklist"
        action={
          <Select
            label="Work ownership"
            value={ownership}
            onChange={(event) =>
              view.set("owner", event.target.value, "me", true)
            }
          >
            <option value="me">
              Assigned to me · {currentStaff(state)?.name}
            </option>
            <option value="team">My team · Northside Centre</option>
            <option value="unassigned">Unassigned</option>
          </Select>
        }
      >
        <Tabs
          id="work"
          label="Work status"
          className="work-tabs"
          value={filter}
          onChange={(value) => view.set("filter", value, "All work", true)}
          items={filters.map((value) => ({
            value,
            count: tasks.filter((task) => matchesFilter(task, value)).length,
          }))}
        />
        <div
          role="tabpanel"
          id="work-panel"
          aria-labelledby={`work-tab-${filters.indexOf(filter)}`}
        >
          <div className="work-toolbar">
            <SearchInput
              value={query}
              onChange={(value) => view.set("q", value, "", true)}
            />
            <Select
              label="Collection point filter"
              value={point}
              onChange={(event) =>
                view.set(
                  "point",
                  event.target.value,
                  "All collection points",
                  true,
                )
              }
            >
              <option>All collection points</option>
              {[...new Set(tasks.map((task) => workRecord(task).label))].map(
                (label) => (
                  <option key={label}>{label}</option>
                ),
              )}
            </Select>
          </div>
          <div className="table-scroll desktop-worklist">
            <table
              className="work-table"
              aria-label="Work items and next actions"
            >
              <thead>
                <tr>
                  <th>Person</th>
                  <th>Work item</th>
                  <th>Due / review date</th>
                  <th>Status</th>
                  <th>Next action</th>
                </tr>
              </thead>
              <tbody>
                {visibleTasks.map((task) => {
                  const { person: p, status, action } = task;
                  const c = workRecord(task);
                  return (
                    <tr key={c.id}>
                      <td>
                        <div className="person-cell">
                          <Avatar
                            name={p.name}
                            tone={Number(p.id.slice(3)) % 2 ? "lavender" : ""}
                          />
                          <span>
                            <button
                              className="name-link"
                              onClick={() => openPerson(p)}
                            >
                              {p.name}
                            </button>
                            <small>{p.id}</small>
                          </span>
                        </div>
                      </td>
                      <td>
                        {task.kind === "intake"
                          ? `Intake - ${intakeStage(task.record)}`
                          : c.label}
                      </td>
                      <td>
                        {c.response === "Submitted" ? (
                          <span className="muted">Response received</span>
                        ) : (
                          formatDate(c.due)
                        )}
                      </td>
                      <td>
                        <Badge>{status}</Badge>
                      </td>
                      <td>
                        <Button
                          className="task-action"
                          onClick={() => openTask(task)}
                          aria-label={`${action} · ${p.name} · ${c.label}`}
                        >
                          {action}
                          <ArrowRight size={16} />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mobile-worklist">
            {visibleTasks.map((task) => {
              const { person: p, status, action } = task;
              const c = workRecord(task);
              return (
                <article className="task-card" key={c.id}>
                  <div className="task-card-heading">
                    <button className="name-link" onClick={() => openPerson(p)}>
                      {p.name}
                    </button>
                    <Badge>{status}</Badge>
                  </div>
                  <p>
                    {p.id} ·{" "}
                    {task.kind === "intake" &&
                      `Intake - ${intakeStage(task.record)}`}
                    {task.kind !== "intake" && c.label}
                  </p>
                  <p>
                    {c.response === "Submitted"
                      ? "Response received · review pending"
                      : `${task.kind ? "Review" : "Collection due"} ${formatDate(c.due)}`}
                  </p>
                  <Button
                    onClick={() => openTask(task)}
                    aria-label={`${action} · ${p.name} · ${c.label}`}
                  >
                    {action}
                    <ArrowRight size={16} />
                  </Button>
                </article>
              );
            })}
          </div>
          {!filtered.length && (
            <Empty
              title={
                ownership === "me" && !tasks.length
                  ? "No tasks assigned to you"
                  : "No matching work"
              }
            >
              {ownership === "me" && !tasks.length
                ? "Choose My team to see work assigned to other care owners."
                : "Try another search, status, or collection point."}
            </Empty>
          )}
          <div className="table-footer" role="status">
            <span>
              Showing {showingFrom}–{showingTo} of {filtered.length}{" "}
              {filtered.length === 1 ? "task" : "tasks"}
            </span>
            <span>Sorted by priority, then due / review date</span>
            <Pagination
              label="My work"
              page={page}
              pageCount={pageCount}
              onPageChange={(nextPage) =>
                view.set("page", String(nextPage), "1")
              }
            />
          </div>
        </div>
      </Panel>
    </>
  );
}
