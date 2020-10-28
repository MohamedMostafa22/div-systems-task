import React, { useReducer } from "react";

import { makeStyles, useTheme } from "@material-ui/core";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import _map from "lodash/map";

import Card from "./Card";

const useStyles = makeStyles((theme) => ({
  app: {
    height: "100vh",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    width: "25%",
    borderRight: "1px solid #f4f4f4",
    alignItems: "center",
  },
  columnsContainer: {
    display: "flex",
    height: "100%",
  },
  title: {
    padding: 24,
    borderBottom: "1px solid #eaecf3",
    alignSelf: 'stretch',
    textAlign: 'center',
    color: theme.palette.secondary.main,
    fontWeight: 'bold'
  },
}));

const STATUS_TYPES = {
  DONE: "Done",
  IN_PROGRESS: "In progress",
  NEW: "New",
};

const tasks = [
  {
    id: uuidv4(),
    name: "First",
    status: STATUS_TYPES.NEW,
  },
  {
    id: uuidv4(),
    name: "Second",
    status: STATUS_TYPES.NEW,
  },
  {
    id: uuidv4(),
    name: "Third",
    status: STATUS_TYPES.NEW,
  },
  {
    id: uuidv4(),
    name: "Fourth",
    status: STATUS_TYPES.IN_PROGRESS,
  },
  {
    id: uuidv4(),
    name: "Fifth",
    status: STATUS_TYPES.IN_PROGRESS,
  },
  {
    id: uuidv4(),
    name: "Sixth",
    status: STATUS_TYPES.IN_PROGRESS,
  },
  {
    id: uuidv4(),
    name: "Seventh",
    status: STATUS_TYPES.DONE,
  },
  {
    id: uuidv4(),
    name: "Eighth",
    status: STATUS_TYPES.DONE,
  },
];

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (
  sourceArray,
  destinationArray,
  { index: sourceIndex, source },
  { index: destinationIndex, destination }
) => {
  const sourceClone = Array.from(sourceArray);
  const destClone = Array.from(destinationArray);
  const [removed] = sourceClone.splice(sourceIndex, 1);

  destClone.splice(destinationIndex, 0, removed);

  return {
    [source]: sourceClone,
    [destination]: destClone,
  };
};

function App() {
  const classes = useStyles();

  const [items, setItems] = useReducer(
    (state, { id, source, destination, sourceIndex, destinationIndex }) => {
      if (source === destination) {
        return {
          ...state,
          [source]: reorder(state[source], sourceIndex, destinationIndex),
        };
      }
      const res = move(
        state[source],
        state[destination],
        {
          index: sourceIndex,
          source,
        },
        {
          index: destinationIndex,
          destination,
        }
      );
      return {
        ...state,
        ...res,
      };
    },
    {
      [STATUS_TYPES.DONE]: tasks.filter(
        (task) => task.status === STATUS_TYPES.DONE
      ),

      [STATUS_TYPES.IN_PROGRESS]: tasks.filter(
        (task) => task.status === STATUS_TYPES.IN_PROGRESS
      ),
      [STATUS_TYPES.NEW]: tasks.filter(
        (task) => task.status === STATUS_TYPES.NEW
      ),
    }
  );

  const onDragEnd = (result) => {
    if (!result || !result.destination || !result.source || !result.draggableId)
      return;
    setItems({
      id: result.draggableId,
      source: result.source.droppableId,
      destination: result.destination.droppableId,
      sourceIndex: result.source.index,
      destinationIndex: result.destination.index,
    });
  };

  const theme = useTheme();

  return (
      <div className={classes.app}>
        <div className={classes.columnsContainer}>
          <DragDropContext onDragEnd={onDragEnd}>
            {_map(STATUS_TYPES, (status) => (
              <Droppable droppableId={status} key={status}>
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} className={classes.column} style={{
                    background: snapshot.isDraggingOver && theme.palette.primary.light
                  }}>
                    <div className={classes.title}>{status}</div>
                    {items[status].map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            name={item.name}
                            status={status}
                          />
                        )}
                      </Draggable>
                    ))}
                  </div>
                )}
              </Droppable>
            ))}
          </DragDropContext>
        </div>
      </div>
  );
}

export default App;
