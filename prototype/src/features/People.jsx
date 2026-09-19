import useQueueView from "../useQueueView";
import { Plus, ChevronRight } from "lucide-react";
import { useStore } from "../store";
import { age, formatDate } from "../model";
import { comparePeople, peopleInEpisodes } from "../people";
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
} from "../components/UI";

const PAGE_SIZE = 6;
const HIDDEN_FROM_PEOPLE_LIST = new Set(["Oliver James", "Zoe Patel"]);
const PEOPLE_LIST_PRIORITY = new Map([["Mia Robinson", 0]]);

export default function People({ navigate, openModal }) {
  const { state } = useStore();
  const view = useQueueView();
  const query = view.params.get("q") || "";
  const status = ["Active", "Paused", "Closed", "Intake"].includes(
    view.params.get("status"),
  )
    ? view.params.get("status")
    : "All episodes";
  const setQuery = (value) => view.set("q", value, "", true);
  const setStatus = (value) => view.set("status", value, "All episodes", true);
  const assessmentStatus = view.params.get("assessment") || "All statuses";
  const open = (href) => {
    view.remember();
    navigate(href);
  };
  const rows = peopleInEpisodes(state.people, status)
    .filter(
      ({ person }) =>
        !HIDDEN_FROM_PEOPLE_LIST.has(person.name) &&
        `${person.name} ${person.id}`
          .toLowerCase()
          .includes(query.toLowerCase()),
    )
    .sort(
      (a, b) =>
        (PEOPLE_LIST_PRIORITY.get(a.person.name) ?? 1) -
          (PEOPLE_LIST_PRIORITY.get(b.person.name) ?? 1) ||
        comparePeople(a, b),
    );
  const statusOptions = [...new Set(rows.map((row) => row.status))];
  if (
    assessmentStatus !== "All statuses" &&
    !statusOptions.includes(assessmentStatus)
  )
    statusOptions.push(assessmentStatus);
  const people = rows.filter(
    (row) =>
      assessmentStatus === "All statuses" || row.status === assessmentStatus,
  );
  const pageCount = Math.max(1, Math.ceil(people.length / PAGE_SIZE));
  const requestedPage = Number(view.params.get("page"));
  const page = Math.min(
    Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1,
    pageCount,
  );
  const pageStart = (page - 1) * PAGE_SIZE;
  const visiblePeople = people.slice(pageStart, pageStart + PAGE_SIZE);
  const showingFrom = people.length ? pageStart + 1 : 0;
  const showingTo = Math.min(pageStart + PAGE_SIZE, people.length);
  const personHref = ({ person, episode, collection }) => {
    const params = new URLSearchParams({ returnTo: view.href });
    if (episode) params.set("episode", episode.id);
    else params.set("tab", "intake");
    if (collection) params.set("collection", collection.id);
    return `/people/${person.id}?${params}`;
  };
  return (
    <>
      <PageHeading
        title="People"
        subtitle="See who needs attention and where they are in their care."
        meta="Sample date · 15 September 2026"
      >
        <Button
          variant="primary"
          onClick={() => openModal({ type: "new-person" })}
        >
          <Plus size={18} />
          New person
        </Button>
        <Button
          variant="secondary"
          onClick={() => openModal({ type: "import-people" })}
        >
          Import
        </Button>
      </PageHeading>
      <Panel
        className="people-panel"
        title="People at Northside Centre"
        action={<span className="muted">{people.length} people</span>}
      >
        <div className="work-toolbar people-toolbar">
          <SearchInput value={query} onChange={setQuery} />
          <Select
            label="Assessment status"
            value={assessmentStatus}
            onChange={(e) =>
              view.set("assessment", e.target.value, "All statuses", true)
            }
          >
            <option value="All statuses">All statuses</option>
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s} ({rows.filter((row) => row.status === s).length})
              </option>
            ))}
          </Select>
          <Select
            label="Episode status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {["All episodes", "Intake", "Active", "Paused", "Closed"].map(
              (s) => (
                <option key={s}>{s}</option>
              ),
            )}
          </Select>
        </div>
        <div className="table-scroll people-table-scroll">
          <table
            className="people-table"
            aria-label="People and assessment status"
          >
            <thead>
              <tr>
                <th>Person</th>
                <th>Status</th>
                <th>Next / latest assessment</th>
                <th>Care owner</th>
                <th>Episode</th>
                <th>
                  <span className="sr-only">Open</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {visiblePeople.map((row) => {
                const { person: p, episode } = row;
                const href = personHref(row);
                return (
                  <tr key={p.id} onClick={() => open(href)}>
                    <td className="people-identity">
                      <div className="person-cell">
                        <Avatar
                          name={p.name}
                          tone={Number(p.id.slice(3)) % 2 ? "lavender" : ""}
                        />
                        <span>
                          <button
                            className="name-link"
                            onClick={(e) => {
                              e.stopPropagation();
                              open(href);
                            }}
                          >
                            {p.name}
                          </button>
                          <small>
                            {p.id} ·{" "}
                            {p.dob ? `${age(p.dob)} years` : "Age unknown"}
                          </small>
                        </span>
                      </div>
                    </td>
                    <td className="people-status">
                      <Badge>{row.status}</Badge>
                    </td>
                    <td className="people-assessment">
                      <span>
                        {row.stage ? `Intake - ${row.stage}` : row.label}
                      </span>
                      <small
                        className={
                          row.status === "Overdue" ? "people-overdue" : ""
                        }
                      >
                        {row.detail}
                      </small>
                    </td>
                    <td className="people-owner" data-label="Care owner">
                      {episode?.owner || p.owner || "Unassigned"}
                    </td>
                    <td className="people-episode" data-label="Episode">
                      <span>{episode?.status || "Intake"}</span>
                      <small>
                        {episode
                          ? `Started ${formatDate(episode.start)}`
                          : "Not started"}
                      </small>
                    </td>
                    <td className="people-open">
                      <ChevronRight size={18} aria-hidden="true" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {!people.length && <Empty title="No matching people" />}
        <div className="table-footer" role="status">
          <span>
            Showing {showingFrom}–{showingTo} of {people.length} people
          </span>
          <span>Highest-priority assessment shown first</span>
          <Pagination
            label="People"
            page={page}
            pageCount={pageCount}
            onPageChange={(nextPage) => view.set("page", String(nextPage), "1")}
          />
        </div>
      </Panel>
    </>
  );
}
