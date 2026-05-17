import React from "react";

function Sidebar({ tasks }) {
  const total = tasks.length;

  const dayCount = tasks.filter((task) => (task.schedule || task.type || "day") === "day").length;
  const weekCount = tasks.filter((task) => (task.schedule || task.type) === "week").length;

  const upcoming = tasks.filter((t) => {
    const time = t.dueAt || t.due_at || t.due || t.created_at || t.createdAt;
    if (!time) return false;
    const due = new Date(time);
    const now = new Date();
    const diff = due - now;
    return diff > 0 && diff <= 24 * 60 * 60 * 1000;
  }).length;

  return (
    <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm min-w-[250px]">
      <h2 className="text-xl font-semibold text-slate-900 mb-4">Overview</h2>

      <div className="space-y-4 text-slate-700">
        <div className="rounded-3xl bg-slate-50 p-4">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Total tasks</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{total}</p>
        </div>

        <div className="rounded-3xl bg-slate-50 p-4">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Day tasks</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{dayCount}</p>
        </div>

        <div className="rounded-3xl bg-slate-50 p-4">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Weekly tasks</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{weekCount}</p>
        </div>

        <div className="rounded-3xl bg-slate-50 p-4">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Due in 24h</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{upcoming}</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
