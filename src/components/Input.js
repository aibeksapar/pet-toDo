import { useState } from "react";
import icons from "../assets/icons.svg";

function Input({ onAddTask }) {
  const [inputTask, setInputTask] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!inputTask) return;

    const newTask = {
      id: crypto.randomUUID(),
      content: inputTask,
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

export default Input;
