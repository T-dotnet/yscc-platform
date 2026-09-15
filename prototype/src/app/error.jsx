"use client";
export default function Error({ reset }) {
  return (
    <main className="recovery">
      <h1>Let’s reopen the workspace</h1>
      <p>
        This view could not load. Your saved sample data is still on this
        device.
      </p>
      <button onClick={reset}>Try again</button>
      <button
        onClick={() => {
          localStorage.removeItem("yscc-prototype-v1");
          location.href = "/";
        }}
      >
        Reset sample workspace
      </button>
    </main>
  );
}
