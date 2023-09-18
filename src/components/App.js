import { useState } from "react";

import Input from "./Input";
import TasksList from "./TasksList";
import Reset from "./Reset";
import Completed from "./Completed";

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
  const [completed, setCompleted] = useState(
    initArr.filter((el) => el.completed)
  );

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

  function handleDelete(id) {
    setTasks((tasks) => tasks.filter((task) => id !== task.id));
  }

  function handleReset() {
    const confirm = window.confirm("Are you sure to delete all notes?");
    if (confirm) setTasks([]);
  }

  function handleComplete() {}

  return (
    <>
      <Input onAddTask={handleAddTask} />
      <TasksList
        tasks={tasks}
        onSelection={handleSelect}
        onDelete={handleDelete}
      />
      {tasks.length > 0 && <Reset onReset={handleReset} />}

      {/* {completedTasks.length ? (
        <Completed completedTasks={completedTasks} onSelection={handleSelect} />
      ) : (
        ""
      )} */}
    </>
  );
}
