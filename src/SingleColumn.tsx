import React, { useState, useRef, useEffect } from "react";
import {
  draggable,
  dropTargetForElements,
  monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { reorder } from "@atlaskit/pragmatic-drag-and-drop/reorder";

import "./components/TaskBoard.css";

type Item = {
  id: string;
  label: string;
};

type DraggableItemProps = {
  item: Item;
  index: number;
  moveItem: (from: number, to: number) => void;
  isDragging: boolean;
  onDropTarget: (index: number | null) => void;
};

const defaultItems: Item[] = [
  { id: "task-1", label: "Organize a team-building event" },
  { id: "task-2", label: "Create and maintain office inventory" },
  { id: "task-3", label: "Update company website content" },
  { id: "task-4", label: "Plan and execute marketing campaigns" },
  { id: "task-5", label: "Conduct employee performance reviews" },
  { id: "task-6", label: "Coordinate with external vendors" },
  { id: "task-7", label: "Manage social media accounts" },
  { id: "task-8", label: "Prepare financial reports" },
  { id: "task-9", label: "Organize training sessions" },
  { id: "task-10", label: "Oversee office maintenance requests" },
];

const SimpleColumn = () => {
  const [items, setItems] = useState(defaultItems);
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
  const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return monitorForElements({
      onDragStart: ({ source }) => {
        const index = (source.data as { index: number }).index;
        setDraggedItemIndex(index);
      },
      onDrop: ({ source }) => {
        if (dropTargetIndex !== null && draggedItemIndex !== null) {
          const from = draggedItemIndex;
          let to = dropTargetIndex;

          if (from < dropTargetIndex) {
            to = dropTargetIndex - 1;
          }

          if (from !== to) {
            moveItem(from, to);
          }
        }

        setDraggedItemIndex(null);
        setDropTargetIndex(null);
      },
    });
  }, [dropTargetIndex, draggedItemIndex]);

  const moveItem = (from: number, to: number) => {
    setItems((current) => {
      return reorder({
        list: current,
        startIndex: from,
        finishIndex: to,
      });
    });
  };

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    return dropTargetForElements({
      element,
      getData: () => ({ index: items.length, type: "container" }),
      onDragEnter: ({ source }) => {
        const sourceIndex = (source.data as { index: number }).index;
        if (sourceIndex !== items.length - 1) {
          setDropTargetIndex(items.length);
        }
      },
    });
  }, [items.length]);

  return (
    <div className="single-column-container">
      <h2 className="column-title">Simple DND</h2>
      <div ref={containerRef} className="tasks-container">
        {draggedItemIndex !== null && dropTargetIndex === 0 && (
          <div className="drop-indicator"></div>
        )}

        {items.map((item, index) => (
          <React.Fragment key={item.id}>
            <DraggableItem
              item={item}
              index={index}
              isDragging={draggedItemIndex === index}
              onDropTarget={setDropTargetIndex}
              moveItem={moveItem}
            />

            {draggedItemIndex !== null && dropTargetIndex === index + 1 && (
              <div className="drop-indicator"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

function DraggableItem(props: DraggableItemProps) {
  const { item, index, moveItem, isDragging, onDropTarget } = props;

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const DragTarget = draggable({
      element,
      getInitialData: () => ({ index, type: "item" }),
    });

    const DropTarget = dropTargetForElements({
      element,
      getData: () => ({ index, type: "target" }),
      onDragEnter: ({ self, source }) => {
        const sourceIndex = (source.data as { index: number }).index;
        const targetIndex = (self.data as { index: number }).index;

        if (sourceIndex !== targetIndex) {
          if (sourceIndex < targetIndex) {
            onDropTarget(targetIndex + 1);
          } else {
            onDropTarget(targetIndex);
          }
        }
      },
    });

    return () => {
      DragTarget();
      DropTarget();
    };
  }, [index, moveItem, onDropTarget]);

  if (isDragging) {
    return null;
  }

  return (
    <div ref={ref} className="task-card" data-is-dragging={isDragging}>
      {item.label}
    </div>
  );
}
export default SimpleColumn;
