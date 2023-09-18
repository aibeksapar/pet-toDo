import { useState } from "react";
import Task from "./Task";
import Sort from "./Sort";
import Group from "./Group";

function TasksList({ tasks, onSelection, onDelete }) {
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
      <div className="top">
        <Group />
        {tasks.length > 0 && <Sort sortBy={sortBy} onSortBy={setSortBy} />}
      </div>

      <ul className="tasks">
        {sortedTasks.map((task) => (
          <Task
            task={task}
            onSelection={onSelection}
            onDelete={onDelete}
            key={task.id}
          />
        ))}
      </ul>
    </>
  );
}

export default TasksList;
