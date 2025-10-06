import React, { useRef, useEffect } from "react";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import type { Task } from "./TaskBoard";
import "./TaskBoard.css";

type Props = {
  task: Task;
  columnId: string;
  index: number;
  onMove: (
    taskId: string,
    from: string,
    to: string,
    targetIndex?: number
  ) => void;
  onDragStart: (taskId: string, from: string) => void;
  onDragEnd: () => void;
};

const TaskCard = (props: Props) => {
  const { task, columnId, index, onMove, onDragStart, onDragEnd } = props;
  const ref = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  useEffect(() => {
    if (ref.current) {
      const element = ref.current;

      const cleanup = draggable({
        element,
        getInitialData: () => ({
          type: "task",
          id: task.id,
          from: columnId,
          index: index,
        }),
        onDragStart: () => {
          setIsDragging(true);
          onDragStart(task.id, columnId);
        },
        onDrop: () => {
          setIsDragging(false);
          onDragEnd();
        },
      });

      return cleanup;
    }
  }, [task.id, columnId, index, onDragStart, onDragEnd]);

  React.useEffect(() => {
    setIsDragging(false);
  }, [task.id]);

  return (
    <div
      ref={ref}
      className="task-card"
      data-is-dragging={isDragging}
      tabIndex={0}
    >
      <span>{task.title}</span>
    </div>
  );
};
export default TaskCard;
