import { useState } from "react";
import { CareTimeline } from "./LongitudinalReport";

const months = [0, 3, 6, 9, 12, 15, 18];
const axis = ({ fullWidth = false } = {}) => (
  <div
    className={`record-two-axis${fullWidth ? " record-two-axis-full" : ""}`}
    aria-hidden="true"
  >
    {months.map((month) => (
      <span key={month} style={{ left: `${(month / 18) * 100}%` }}>
        {month}m
      </span>
    ))}
  </div>
);

const point = (month, value) => `${(month / 18) * 100},${100 - value}`;

function ChartCard({ title, description, children, className = "" }) {
  return (
    <section className={`record-two-card ${className}`}>
      <header>
        <h3>{title}</h3>
        <p>{description}</p>
      </header>
      {children}
    </section>
  );
}

function Symptoms() {
  const [selected, setSelected] = useState(null);
  const values = [
    [
      "Anxiety",
      [
        [1, 76],
        [3, 70],
        [6, 61],
        [9, 50],
        [13, 44],
        [17, 35],
      ],
    ],
    [
      "Sleep",
      [
        [0, 70],
        [4, 61],
        [8, 48],
        [12, 38],
        [16, 34],
      ],
    ],
    [
      "Concentration",
      [
        [2, 66],
        [5, 56],
        [10, 49],
        [14, 43],
        [18, 38],
      ],
    ],
  ];
  return (
    <ChartCard
      title="Symptoms / measures"
      description="Recorded observations only; points are not interpolated."
    >
      <div
        className="record-two-scatter"
        role="group"
        aria-label="Symptom observations over the shared 18-month period"
      >
        {values.map(([label, entries]) => (
          <div className="record-two-series" key={label}>
            <strong>{label}</strong>
            <div className="record-two-plot">
              {entries.map(([month, value]) => (
                <button
                  key={`${month}-${value}`}
                  aria-label={`${label}, month ${month}, severity ${value}`}
                  className="record-two-dot"
                  style={{
                    left: `${(month / 18) * 100}%`,
                    bottom: `${value}%`,
                  }}
                  onClick={() =>
                    setSelected(`${label} · month ${month} · severity ${value}`)
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      {axis()}
      <p className="record-two-selection" aria-live="polite">
        {selected || "Select an observation for its recorded detail."}
      </p>
    </ChartCard>
  );
}

function Periods({ medication = false }) {
  const rows = medication
    ? [
        ["Medication A", 0, 7],
        ["Medication B", 5, 14],
        ["Medication C", 10, 18],
      ]
    : [
        ["Group therapy", 0, 6],
        ["School support", 2, 9],
        ["Parent programme", 4, 12],
        ["Individual support", 11, 16],
      ];
  return (
    <ChartCard
      title={
        medication ? "Medication periods" : "Treatment / programme periods"
      }
      description={
        medication
          ? "Medication events are attached to the active course."
          : "Active periods are positioned at their recorded start and end."
      }
    >
      <div className="record-two-periods">
        {rows.map(([label, start, end], index) => (
          <div className="record-two-period-row" key={label}>
            <strong>{label}</strong>
            <div className="record-two-period-track">
              <span
                className={medication ? "medication" : ""}
                style={{
                  left: `${(start / 18) * 100}%`,
                  width: `${((end - start) / 18) * 100}%`,
                }}
              />
              {medication && index > 0 && (
                <span
                  className="record-two-period-marker"
                  style={{ left: `${((start + 1) / 18) * 100}%` }}
                  role="img"
                  aria-label={`Dose change, month ${start + 1}`}
                  title="Dose change"
                />
              )}
            </div>
          </div>
        ))}
      </div>
      {axis()}
    </ChartCard>
  );
}

function Goals() {
  const goals = [
    ["Improve sleep routine", 70, "Progressing"],
    ["Increase school attendance", 55, "Progressing"],
    ["Build social confidence", null, "In progress"],
    ["Reduce screen time", 100, "Achieved"],
  ];
  return (
    <ChartCard
      title="Goals and progress"
      description="Progress is shown as a percentage only where the record supports one."
    >
      <ol className="record-two-goals">
        {goals.map(([label, value, state]) => (
          <li key={label}>
            <div>
              <strong>{label}</strong>
              <span>{state}</span>
            </div>
            {value === null ? (
              <em>Not scored</em>
            ) : (
              <>
                <div className="record-two-progress">
                  <i style={{ width: `${value}%` }} />
                </div>
                <b>{value}%</b>
              </>
            )}
          </li>
        ))}
      </ol>
    </ChartCard>
  );
}

function LineChart({ outcome = false }) {
  const lines = outcome
    ? [
        [
          "K10",
          "var(--muted)",
          [
            [0, 80],
            [3, 66],
            [6, 55],
            [9, 44],
            [12, 36],
            [15, 31],
            [18, 27],
          ],
        ],
        [
          "Wellbeing",
          "var(--teal)",
          [
            [0, 38],
            [3, 42],
            [6, 47],
            [9, 56],
            [12, 64],
            [15, 69],
            [18, 74],
          ],
        ],
      ]
    : [
        [
          "Activity",
          "var(--teal)",
          [
            [0, 22],
            [3, 31],
            [6, 39],
            [9, 55],
            [12, 70],
            [15, 74],
            [18, 78],
          ],
        ],
      ];
  return (
    <ChartCard
      title={outcome ? "K10 / outcome measures" : "Activity rating over time"}
      description={
        outcome
          ? "Separate instruments retain their own interpretation and scoring direction."
          : "The line shows the trajectory between recorded activity assessments."
      }
    >
      <div className="record-two-line-wrap">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          role="img"
          aria-label={
            outcome
              ? "K10 and wellbeing trajectories"
              : "Activity rating trajectory"
          }
        >
          {[25, 50, 75].map((y) => (
            <line key={y} x1="0" x2="100" y1={y} y2={y} />
          ))}
          {lines.map(([label, colour, values]) => (
            <g key={label}>
              <polyline
                points={values
                  .map(([month, value]) => point(month, value))
                  .join(" ")}
                stroke={colour}
              />
            </g>
          ))}
        </svg>
        {lines.flatMap(([label, colour, values]) =>
          values.map(([month, value]) => (
            <span
              key={`${label}-${month}`}
              className="record-two-line-point"
              style={{
                left: `${(month / 18) * 100}%`,
                bottom: `${value}%`,
                "--record-two-line-colour": colour,
              }}
              role="img"
              aria-label={`${label}, month ${month}, value ${value}`}
            />
          )),
        )}
      </div>
      {axis({ fullWidth: true })}
      {outcome && (
        <div className="record-two-legend">
          {lines.map(([label, colour]) => (
            <span key={label}>
              <i style={{ background: colour }} />
              {label}
            </span>
          ))}
        </div>
      )}
    </ChartCard>
  );
}

function Risk() {
  const rows = [
    ["Self-harm", ["Moderate", "Low", "Low"]],
    ["Housing", ["Low", "Moderate", "Low"]],
    ["Safeguarding", ["Low", "Low", "None"]],
  ];
  return (
    <ChartCard
      title="Risk history"
      description="Ordered risk states show direction of change, not mathematical precision."
    >
      <div className="record-two-risk">
        {rows.map(([label, states]) => (
          <div className="record-two-risk-row" key={label}>
            <strong>{label}</strong>
            <div>
              {states.map((state, index) => (
                <span
                  key={`${state}-${index}`}
                  className={state.toLowerCase()}
                  style={{
                    left: `${(index / 2) * 100}%`,
                  }}
                  title={`${label}: ${state}`}
                >
                  {state}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      {axis()}
    </ChartCard>
  );
}

export default function RecordTwo({ person, episode, navigate }) {
  const isFixture = Boolean(person.fixtureLabel);
  return (
    <div className="stack record-two">
      <div className="section-toolbar">
        <div>
          <h2>Report</h2>
          <p>Longitudinal care record</p>
        </div>
      </div>
      <div className="record-two-grid">
        <CareTimeline person={person} episode={episode} navigate={navigate} />
        {isFixture ? (
          <>
            <Symptoms />
            <Periods />
            <Goals />
            <LineChart />
            <LineChart outcome />
            <Risk />
            <Periods medication />
          </>
        ) : (
          <div className="record-two-empty record-two-empty-wide">
            Structured observations, care periods, goals, activity ratings,
            outcome measures, risk reviews and medication courses are needed
            before this report can draw additional longitudinal graphs.
          </div>
        )}
      </div>
    </div>
  );
}
