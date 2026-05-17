function TaskList({ tasks, onDelete, filter = "all" }) {
  const formatTime = (t) => {
    if (!t) return null;
    try {
      return new Date(t).toLocaleString();
    } catch (e) {
      return t;
    }
  };

  const getSchedule = (task) => task.schedule || task.type || "day";

  const grouped = {
    day: tasks.filter((task) => getSchedule(task) === "day"),
    week: tasks.filter((task) => getSchedule(task) === "week"),
    other: tasks.filter(
      (task) => !["day", "week"].includes(getSchedule(task))
    ),
  };

  const renderTasks = (title, list) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4 text-slate-900">{title}</h3>
      {list.length === 0 ? (
        <p className="text-sm text-gray-500">No tasks yet.</p>
      ) : (
        list.map((task) => {
          const time = task.dueAt || task.due_at || task.created_at || task.createdAt;
          const scheduleLabel = getSchedule(task) === "week" ? "Weekly" : "Day";

          return (
            <div
              key={task.id}
              className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
            >
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{task.text}</p>
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
                    {scheduleLabel}
                  </span>
                </div>
                {time && (
                  <p className="text-sm text-gray-600">Due: {formatTime(time)}</p>
                )}
              </div>

              <button
                onClick={() => onDelete(task.id)}
                className="rounded-2xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          );
        })
      )}
    </div>
  );

  const filterLabel = filter === "day" ? "Day tasks" : filter === "week" ? "Weekly tasks" : "All tasks";

  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter((task) => getSchedule(task) === filter);

  return (
    <div>
      {filter === "all" ? (
        <>
          {renderTasks("Day tasks", grouped.day)}
          {renderTasks("Weekly tasks", grouped.week)}
          {grouped.other.length > 0 && renderTasks("Other tasks", grouped.other)}
        </>
      ) : (
        renderTasks(filterLabel, filteredTasks)
      )}
    </div>
  );
}

export default TaskList;