import { useState } from "react";
import icons from "./icons.svg";

const initArr = [
  {
    id: 1,
    content: "test1",
    category: "smth",
    dateString: "Wed, Aug 9",
    date: 1692003638859,
    completed: false,
  },
  {
    id: 2,
    content: "test2",
    category: "smth2",
    dateString: "Sun, Jul 30",
    date: 1692003628988,
    completed: false,
  },
];

export default function App() {
  const [tasks, setTasks] = useState(initArr);

  function handleAddTask(task) {
    setTasks((tasks) => [...tasks, task]);
  }

  function handleSelect(id) {
    setTasks((tasks) =>
      tasks.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  return (
    <>
      <Input onAddTask={handleAddTask} />
      <TasksList tasks={tasks} onSelection={handleSelect} />

      {/* {completedTasks.length ? (
        <Completed completedTasks={completedTasks} onSelection={handleSelect} />
      ) : (
        ""
      )} */}
    </>
  );
}

function Input({ onAddTask }) {
  const [inputTask, setInputTask] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!inputTask) return;

    const newTask = {
      id: crypto.randomUUID(),
      content: inputTask,
      category: "uncategorized",
      dateString: new Date().toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
      date: new Date().getTime(),
      completed: false,
    };
    onAddTask(newTask);
    setInputTask("");
  }

  return (
    <form className="input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add task..."
        value={inputTask}
        onChange={(e) => setInputTask(e.target.value)}
      />
      <button type="submit">
        <svg>
          <use xlinkHref={`${icons}#send`}></use>
        </svg>
      </button>
    </form>
  );
}

function TasksList({ tasks, onSelection }) {
  const [sortBy, setSortBy] = useState("newest");

  let sortedTasks;

  if (sortBy === "newest")
    sortedTasks = tasks.slice().sort((a, b) => b.date - a.date);

  if (sortBy === "oldest")
    sortedTasks = tasks.slice().sort((a, b) => a.date - b.date);

  if (sortBy === "description-up")
    sortedTasks = tasks
      .slice()
      .sort((a, b) => b.content.localeCompare(a.content));

  if (sortBy === "description-down")
    sortedTasks = tasks
      .slice()
      .sort((a, b) => a.content.localeCompare(b.content));

  if (sortBy === "completed")
    sortedTasks = tasks.slice().sort((a, b) => b.completed - a.completed);

  if (sortBy === "not-completed")
    sortedTasks = tasks.slice().sort((a, b) => a.completed - b.completed);

  return (
    <>
      <div className="sort">
        <span>Sort by:</span>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="newest">newest</option>
          <option value="oldest">oldest</option>
          <option value="completed">completed</option>
          <option value="not-completed">not completed</option>
          <option value="description-up">description ⬆</option>
          <option value="description-down">description ⬇</option>
        </select>
      </div>
      <ul className="tasks">
        {sortedTasks.map((task) => (
          <Task task={task} onSelection={onSelection} key={task.id} />
        ))}
      </ul>
    </>
  );
}

function Task({ task, onSelection }) {
  return (
    <li>
      <input type="checkbox" id={task.id} />
      <label
        className={
          task.completed ? "tasks__label item--completed" : "tasks__label"
        }
        onClick={() => onSelection(task.id)}
        htmlFor={task.id}
      >
        <div className="tasks__content">
          <h3>{task.content}</h3>
          <div className="tasks__descr">
            <span className="tasks__category">{task.category}</span>
            <div className="tasks__date">
              <svg>
                <use xlinkHref={`${icons}#calendar`}></use>
              </svg>
              <span>{task.dateString}</span>
            </div>
          </div>
        </div>
      </label>
    </li>
  );
}

function Completed({ completedTasks, onSelection }) {
  function handleOpen() {}

  return (
    <div className="completed">
      <button onClick={handleOpen}>
        <span>Completed</span>
        <svg>
          <use xlinkHref={`${icons}#arrow`}></use>
        </svg>
      </button>
      <ul className="tasks tasks--completed">
        {completedTasks.map((task) => (
          <li>
            <input type="checkbox" id={task.id} defaultChecked />
            <label
              className={"tasks__label item--completed"}
              onClick={() => onSelection(task.id)}
              htmlFor={task.id}
            >
              <div className="tasks__content">
                <h3>{task.content}</h3>
                <div className="tasks__descr">
                  <span className="tasks__category">{task.category}</span>
                  <div className="tasks__date">
                    <svg>
                      <use xlinkHref={`${icons}#calendar`}></use>
                    </svg>
                    <span>{task.date}</span>
                  </div>
                </div>
              </div>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
