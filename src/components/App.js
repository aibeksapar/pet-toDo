import { useEffect, useState } from "react";

import Input from "./Input";
import TasksList from "./TasksList";
import Reset from "./Reset";

const initArr = [
  {
    id: 1,
    content: "test1",
    dateString: "Wed, Aug 9",
    date: 1692003638859,
    completed: false,
    group: null,
  },
  {
    id: 2,
    content: "test2",
    dateString: "Sun, Jul 30",
    date: 1692003628988,
    completed: false,
    group: null,
  },
];

export default function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  const [addGroup, setAddGroup] = useState(false);

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

  function handleAddGroup() {
    setAddGroup((state) => !state);
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <Input onAddTask={handleAddTask} />
      <TasksList
        tasks={tasks}
        onSelection={handleSelect}
        onDelete={handleDelete}
        addGroup={addGroup}
        onAddGroup={handleAddGroup}
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
