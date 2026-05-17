import {
  useEffect,
  useState,
} from "react";

import API from "./services/api";

import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import Sidebar from "./components/Sidebar";

import { useTaskContext } from "./context/TaskContext";

function App() {
  const { tasks, setTasks } =
    useTaskContext();

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [filter, setFilter] = useState("all");

  // FETCH TASKS
  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res =
        await API.get("/todos");

      setTasks(res.data);

      setError("");
    } catch (err) {
      setError(
        "Failed to fetch tasks"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ADD TASK (accept optional dueAt and schedule)
  const addTask = async (text, dueAt = null, schedule = "day") => {
    try {
      await API.post("/todos", {
        text,
        due_at: dueAt,
        schedule,
      });

      fetchTasks();
    } catch (err) {
      setError("Failed to add task");
    }
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    try {
      await API.delete(
        `/todos/${id}`
      );

      fetchTasks();
    } catch (err) {
      setError(
        "Failed to delete task"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm">
          <h1 className="text-4xl font-semibold text-slate-900">
            Todo App
          </h1>
          <p className="mt-2 text-slate-600">
            Manage your day and weekly tasks with due dates and quick filters.
          </p>
        </header>

        <div className="flex flex-col gap-6 lg:flex-row">
          <Sidebar tasks={tasks} />

          <main className="flex-1 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex flex-wrap gap-2">
              {[
                { key: "all", label: "All" },
                { key: "day", label: "Day" },
                { key: "week", label: "Weekly" },
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setFilter(item.key)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    filter === item.key
                      ? "bg-blue-500 text-white shadow"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <TaskInput onAdd={addTask} />

            {loading && <p className="text-slate-600">Loading...</p>}

            {error && (
              <p className="text-red-600">{error}</p>
            )}

            <TaskList tasks={tasks} onDelete={deleteTask} filter={filter} />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;