import assert from "node:assert/strict";
import test from "node:test";
import { careTimelineData, timelinePosition } from "./careTimeline.js";

test("care context timeline keeps factual records in separate lanes", () => {
  const timeline = careTimelineData({
    start: "2026-06-01",
    collections: [
      {
        id: "response",
        label: "Initial assessment",
        response: "Submitted",
        submittedAt: "2026-06-03T10:00:00Z",
        review: "Reviewed",
        reviewDate: "2026-06-04",
      },
      {
        id: "planned",
        label: "90-day review",
        response: "Not started",
        due: "2026-08-30",
      },
    ],
    servicePeriods: [
      { id: "service", label: "Community care", start: "2026-06-01", end: "2026-08-30" },
    ],
    goalMilestones: [
      { id: "goal", date: "2026-07-01", title: "Weekly routine", status: "Started" },
    ],
    events: [
      {
        id: "housing",
        actionType: "ADD_CARE_EVENT",
        eventType: "housing",
        eventDate: "2026-07-10",
        title: "Accommodation changed",
      },
    ],
  });

  assert.equal(timeline.lanes.find((lane) => lane.id === "responses").entries.length, 1);
  assert.equal(timeline.lanes.find((lane) => lane.id === "reviews").entries.length, 2);
  assert.equal(timeline.lanes.find((lane) => lane.id === "services").entries[0].end, "2026-08-30");
  assert.equal(timeline.riskRows.find((row) => row.id === "housing").entries.length, 1);
  assert.equal(timeline.riskRows.find((row) => row.id === "harm").entries.length, 0);
  assert.equal(timeline.goals.length, 1);
});

test("timeline positions remain bounded when dates are missing or identical", () => {
  assert.equal(timelinePosition("2026-06-01", "2026-06-01", "2026-06-01"), 50);
  assert.equal(timelinePosition(null, "2026-06-01", "2026-06-10"), 0);
  assert.equal(timelinePosition("2026-06-20", "2026-06-01", "2026-06-10"), 100);
});
