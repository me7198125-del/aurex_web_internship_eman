import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [task, setTask] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // Save tasks to LocalStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add task
  const addTask = (e) => {
    e.preventDefault();

    if (task.trim() === "") {
      alert("Please enter a task!");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: task,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  // Complete task
  const toggleTask = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  // Clear all completed tasks
  const clearCompleted = () => {
    setTasks(tasks.filter((item) => !item.completed));
  };

  // Statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((item) => item.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  // Search + Filter
  const filteredTasks = tasks.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all"
        ? true
        : filter === "completed"
        ? item.completed
        : !item.completed;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="app">

      {/* Header */}
      <header className="header">
        <div>
          <p className="small-title">PRODUCTIVITY APP</p>
          <h1>Task Manager</h1>
          <p className="subtitle">
            Organize your work and stay productive.
          </p>
        </div>

        <div className="header-icon">✓</div>
      </header>

      {/* Statistics */}
      <section className="stats">

        <div className="stat-card">
          <div className="stat-icon blue">📋</div>
          <div>
            <p>Total Tasks</p>
            <h2>{totalTasks}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">⏳</div>
          <div>
            <p>Pending</p>
            <h2>{pendingTasks}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">✓</div>
          <div>
            <p>Completed</p>
            <h2>{completedTasks}</h2>
          </div>
        </div>

      </section>

      {/* Add Task */}
      <section className="add-section">

        <h2>Add New Task</h2>

        <form onSubmit={addTask} className="task-form">

          <input
            type="text"
            placeholder="What do you need to do?"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <button type="submit" className="add-btn">
            + Add Task
          </button>

        </form>

      </section>

      {/* Task Controls */}
      <section className="task-section">

        <div className="task-header">
          <div>
            <h2>My Tasks</h2>
            <p>{pendingTasks} tasks remaining</p>
          </div>

          <button
            className="clear-btn"
            onClick={clearCompleted}
          >
            Clear Completed
          </button>
        </div>

        {/* Search */}
        <div className="search-box">
          🔍
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="filters">

          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={filter === "pending" ? "active" : ""}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>

          <button
            className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>

        </div>

        {/* Tasks */}
        <div className="tasks">

          {filteredTasks.length === 0 ? (

            <div className="empty">
              <div className="empty-icon">📝</div>
              <h3>No tasks found</h3>
              <p>Add a new task to get started.</p>
            </div>

          ) : (

            filteredTasks.map((item) => (

              <div
                className={`task-card ${
                  item.completed ? "done" : ""
                }`}
                key={item.id}
              >

                <button
                  className={`check ${
                    item.completed ? "checked" : ""
                  }`}
                  onClick={() => toggleTask(item.id)}
                >
                  {item.completed ? "✓" : ""}
                </button>

                <div className="task-content">
                  <h3>{item.title}</h3>

                  <span>
                    {item.completed
                      ? "Completed"
                      : "In Progress"}
                  </span>
                </div>

                <button
                  className="delete"
                  onClick={() => deleteTask(item.id)}
                >
                  🗑
                </button>

              </div>

            ))

          )}

        </div>

      </section>

      {/* Footer */}
      <footer>
        <p>React Task Manager • Built with React & Vite</p>
      </footer>

    </div>
  );
}

export default App;