import { Project, Task } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { type DropResult } from "react-beautiful-dnd";
import DndCard from "~/components/dnd/card";
import { api } from "~/utils/api";

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  if (removed) result.splice(endIndex, 0, removed);

  return result;
}

function TaskItem({ task, index }: { task: Task; index: number }) {
  return (
    <Draggable draggableId={`${task.id}`} index={index}>
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
  const [state, setState] = useState<Task[]>([]);
  const [winReady, setwinReady] = useState(false);

  const { data, isLoading, isFetched } = api.project.getById.useQuery({
    id: 3,
  });

  useEffect(() => {
    setwinReady(true);
  }, []);

  useEffect(() => {
    if (!isLoading && isFetched && data) {
      setState(data.tasks);
    }
  }, [isLoading, isFetched, data]);

  if (isLoading)
    return (
      <div className="flex grow">
        <p>Is loading</p>
      </div>
    );

  if (!data) return <div>Something went wrong</div>;

  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const tasks = reorder(state, result.source.index, result.destination.index);

    setState(tasks);
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
                {data.project_name}
              </h1>
              <TaskList tasks={state} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ) : null}
    </DragDropContext>
  );
}

export default Dashboard;
