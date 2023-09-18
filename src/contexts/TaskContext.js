import { createContext, useContext } from "react";

const TaskContext = createContext();

function TaskProvider({ children }) {
  const smth = 1;

  return <TaskContext.Provider value={smth}>{children}</TaskContext.Provider>;
}

function useTask() {
  const context = useContext(TaskContext);
  if (context === undefined)
    throw new Error("TaskContext was used out of TaskProvider");
  return context;
}

export { TaskProvider, useTask };
