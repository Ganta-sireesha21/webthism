import { useState } from "react";

function TaskInput({ onAdd }) {
  const [text, setText] = useState("");
  const [dueAt, setDueAt] = useState("");
  const [schedule, setSchedule] = useState("day");

  const handleSubmit = () => {
    if (!text.trim()) return;

    onAdd(text, dueAt || null, schedule);

    setText("");
    setDueAt("");
    setSchedule("day");
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm mb-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Task
          </label>
          <input
            type="text"
            placeholder="Enter task"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Due date / time
          </label>
          <input
            type="datetime-local"
            value={dueAt}
            onChange={(e) => setDueAt(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Schedule
          </label>
          <select
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="day">Day task</option>
            <option value="week">Weekly task</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default TaskInput;