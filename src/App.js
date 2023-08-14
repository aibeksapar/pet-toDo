import { useState } from "react";
import icons from "./icons.svg";

export default function App() {
  const [tasks, setTasks] = useState([]);

  function handleAddTask(task) {
    setTasks((tasks) => [...tasks, task]);
  }

  function handleSelect(id) {
    setTasks((tasks) =>
      tasks.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );

    //  setCompletedTasks((completedTasks) => {
    //    const taskToAdd = tasks.find((task) => task.id === id && !task.completed);
    //    return taskToAdd ? [...completedTasks, taskToAdd] : completedTasks;
    //  });
  }

  return (
    <>
      <Input onAddTask={handleAddTask} />
      <Sort />
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
      date: new Date().toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
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

function Sort() {
  return (
    <div className="sort">
      <span>Sort by:</span>
      <select>
        <option>description</option>
      </select>
    </div>
  );
}

function TasksList({ tasks, onSelection }) {
  return (
    <ul className="tasks">
      {tasks.map((task) => (
        <Task task={task} onSelection={onSelection} key={task.id} />
      ))}
    </ul>
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
              <span>{task.date}</span>
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
