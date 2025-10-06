import React, { useEffect, useRef } from "react";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import TaskCard from "./TaskCard";
import type { Task } from "./TaskBoard";
import "./TaskBoard.css";

type DropZoneProps = {
  columnId: string;
  index: number;
  onMove: (
    taskId: string,
    from: string,
    to: string,
    targetIndex?: number
  ) => void;
};

const DropZone = (props: DropZoneProps) => {
  const { columnId, index, onMove } = props;
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      const element = ref.current;

      const cleanup = dropTargetForElements({
        element,
        getData: () => ({
          type: "drop-zone",
          columnId,
          index,
        }),
        onDragEnter: () => {
          element.classList.add("drop-zone-active");
        },
        onDragLeave: () => {
          element.classList.remove("drop-zone-active");
        },
        onDrop: ({ source }) => {
          element.classList.remove("drop-zone-active");
          const sourceData = source.data as {
            type: string;
            id: string;
            from: string;
            index: number;
          };

          console.log("DropZone drop:", { sourceData, columnId, index });

          if (sourceData.type === "task") {
            onMove(sourceData.id, sourceData.from, columnId, index);
          }
        },
      });

      return cleanup;
    }
  }, [columnId, index, onMove]);

  return <div ref={ref} className="drop-zone" />;
};

type Props = {
  id: string;
  tasks: Task[];
  onMove: (
    taskId: string,
    from: string,
    to: string,
    targetIndex?: number
  ) => void;
  onDragStart: (taskId: string, from: string) => void;
  onDragEnd: () => void;
  refCallback: (el: HTMLDivElement | null) => void;
};

const Column = (props: Props) => {
  const { id, tasks, onMove, onDragStart, onDragEnd, refCallback } = props;
  useEffect(() => {
    const element = document.querySelector(
      `[data-column-id="${id}"]`
    ) as HTMLElement;

    if (element) {
      const cleanup = dropTargetForElements({
        element,
        onDragEnter: () => {
          element.setAttribute("data-is-drag-over", "true");
        },
        onDragLeave: () => {
          element.setAttribute("data-is-drag-over", "false");
        },
        onDrop: ({ source }) => {
          element.setAttribute("data-is-drag-over", "false");
          const data = source.data as {
            type: string;
            id: string;
            from: string;
          };
          console.log("Column drop:", { data, columnId: id });
          if (data.type === "task") {
            onMove(data.id, data.from, id);
          }
        },
      });

      // return cleanup;
    }
  }, [id, onMove]);

  return (
    <div ref={refCallback} className="column" data-column-id={id}>
      <h3 className="column-title">{id}</h3>

      <div className="tasks-container">
        <DropZone columnId={id} index={0} onMove={onMove} />
        {tasks.map((task, index) => (
          <React.Fragment key={task.id}>
            <div className="task-wrapper">
              <TaskCard
                task={task}
                columnId={id}
                index={index}
                onMove={onMove}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
              />
            </div>
            <DropZone columnId={id} index={index + 1} onMove={onMove} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
export default Column;
