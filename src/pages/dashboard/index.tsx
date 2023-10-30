import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { type DropResult } from "react-beautiful-dnd";
import dynamic from "next/dynamic";
import DndCard from "~/components/dnd/card";

interface Quote {
  id: string;
  content: string;
}

const initial = Array.from({ length: 10 }, (v, k) => k).map((k) => {
  const custom: Quote = {
    id: `id-${k}`,
    content: `Quote ${k}`,
  };
  return custom;
});

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  if (removed) result.splice(endIndex, 0, removed);

  return result;
}

function QuoteItem({ quote, index }: { quote: Quote; index: number }) {
  return (
    <Draggable draggableId={quote.id} index={index}>
      {(provided) => (
        <div
          className="mb-4 w-full"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <DndCard />
        </div>
      )}
    </Draggable>
  );
}

const QuoteList = React.memo(function QuoteList({
  quotes,
}: {
  quotes: Quote[];
}) {
  return quotes.map((quote: Quote, index: number) => (
    <QuoteItem quote={quote} index={index} key={quote.id} />
  ));
});

function QuoteApp() {
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
              <QuoteList quotes={state.quotes} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ) : null}
    </DragDropContext>
  );
}

export default QuoteApp;
