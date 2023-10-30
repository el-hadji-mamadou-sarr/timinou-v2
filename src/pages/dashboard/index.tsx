import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { type DropResult } from "react-beautiful-dnd";
import dynamic from "next/dynamic";
import DndCard from "~/components/dnd/card";
import { type Task } from "~/interfaces/task";

const initial: Task[] = [
  {
    id: "1",
    task_name: "design figma",
    task_description:
      "faire un design page acceuil et page liste des créations",
    neglected: 70,
    progress: 10,
  },
  {
    id: "2",
    task_name: "design figma",
    task_description:
      "faire un design page acceuil et page liste des créations",
    neglected: 70,
    progress: 10,
  },
];

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  if (removed) result.splice(endIndex, 0, removed);

  return result;
}

function TaskItem({ task, index }: { task: Task; index: number }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="mb-4 w-full"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <DndCard {...task} />
        </div>
      )}
    </Draggable>
  );
}

const TaskList = React.memo(function TaskList({ tasks }: { tasks: Task[] }) {
  return tasks.map((task: Task, index: number) => (
    <TaskItem task={task} index={index} key={task.id} />
  ));
});

function Dashboard() {
  const [state, setState] = useState({ quotes: initial });
  const [winReady, setwinReady] = useState(false);
  useEffect(() => {
    setwinReady(true);
  }, []);

  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const quotes = reorder(
      state.quotes,
      result.source.index,
      result.destination.index,
    );

    setState({ quotes });
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {winReady ? (
        <Droppable droppableId="list">
          {(provided) => (
            <div
              className="px-4 py-2"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <h1 className="mb-5 text-2xl font-semibold text-primary">
                Heritage Hub
              </h1>
              <TaskList tasks={state.quotes} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ) : null}
    </DragDropContext>
  );
}

export default Dashboard;
