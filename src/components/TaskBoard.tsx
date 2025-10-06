import React, { useState } from "react";
import Column from "./Column";
import "./TaskBoard.css";

export type Task = {
  id: string;
  title: string;
};

export type Columns = {
  [key: string]: Task[];
};

const DEFAULT_COLUMNS: Columns = {
  todo: [
    { id: "t1", title: "Buy groceries" },
    { id: "t2", title: "Write report" },
    { id: "t3", title: "Call client meeting" },
    { id: "t4", title: "Update documentation" },
  ],
  inProgress: [
    { id: "t5", title: "Fix bugs" },
    { id: "t6", title: "Code review" },
    { id: "t7", title: "Test features" },
  ],
  done: [
    { id: "t8", title: "Deploy to prod" },
    { id: "t9", title: "Setup database" },
    { id: "t10", title: "Create wireframes" },
  ],
};

const TaskBoard = () => {
  const [columns, setColumns] = useState<Columns>(DEFAULT_COLUMNS);

  const [draggedTask, setDraggedTask] = useState<{
    id: string;
    from: string;
  } | null>(null);

  function onDragStart(taskId: string, from: string) {
    console.log("Drag started:", { taskId, from });
    setDraggedTask({ id: taskId, from });
  }

  function onDragEnd() {
    console.log("Drag ended");
    setDraggedTask(null);
  }

  function moveTask(
    taskId: string,
    from: string,
    to: string,
    targetIndex?: number
  ) {
    console.log("moveTask called:", { taskId, from, to, targetIndex });

    setDraggedTask(null);

    setColumns((prev) => {
      const taskToMove = prev[from].find((task) => task.id === taskId);
      if (!taskToMove) return prev;

      if (from === to) {
        const currentIndex = prev[from].findIndex((task) => task.id === taskId);
        console.log("Same column move:", { currentIndex, targetIndex });

        if (targetIndex === undefined) return prev;

        if (targetIndex === currentIndex || targetIndex === currentIndex + 1) {
          console.log("Same position, no move needed");
          return prev;
        }

        const newTasks = [...prev[from]];
        newTasks.splice(currentIndex, 1);

        const adjustedIndex =
          targetIndex > currentIndex ? targetIndex - 1 : targetIndex;
        console.log("Adjusted index:", adjustedIndex);

        newTasks.splice(adjustedIndex, 0, taskToMove);

        return {
          ...prev,
          [from]: newTasks,
        };
      } else {
        console.log("Cross column move");
        const targetTasks = [...prev[to]];
        const insertIndex =
          targetIndex !== undefined ? targetIndex : targetTasks.length;
        targetTasks.splice(insertIndex, 0, taskToMove);

        return {
          ...prev,
          [from]: prev[from].filter((task) => task.id !== taskId),
          [to]: targetTasks,
        };
      }
    });
  }

  return (
    <div className="task-board">
      {Object.keys(columns).map((colId) => {
        const filteredTasks =
          draggedTask && draggedTask.from === colId
            ? columns[colId].filter((task) => task.id !== draggedTask.id)
            : columns[colId];

        return (
          <Column
            key={colId}
            id={colId}
            tasks={filteredTasks}
            onMove={moveTask}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            refCallback={() => {}}
          />
        );
      })}
    </div>
  );
};
export default TaskBoard;
