import { useState, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

import initialState from "./data/data";
import TodoItem from "./components/TodoItem";

const reducer = (state, action) => {
  console.log("line 8 state", state);
  console.log("line 9 action.type", action.type);
  switch (action.type) {
    case "addTodo": {
      if (action.payload.title === "") {
        return state;
      }
      console.log("Line 16 action.payload.title", action.payload.title);
      return [
        {
          title: action.payload.title,
          completed: false,
          id: uuidv4(),
          userId: 1,
        },
        ...state,
      ];
    }
    case "deleteTodo": {
      return state.filter((task) => task.id !== action.payload.id);
    }
    case "toggleCompleted": {
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, completed: !task.completed }
          : task
      );
    }
    case "editTodo": {
      return state.map((task) =>
        task.id === action.payload.id
          ? {
              ...task,
              title: action.payload.title,
            }
          : task
      );
    }
    default: {
      throw Error("Unknown Action: " + action.type);
    }
  }
};

const App = function () {
  const [title, setTitle] = useState("");
  const [tasks, dispatch] = useReducer(reducer, initialState);
  const [editId, setEditId] = useState(null);

  const [isEditing, setIsEditing] = useState(false);

  const handleEditing = (title, id) => {
    if (isEditing) {
      setTitle("");
    } else {
      setTitle(title);
      setEditId(id);
    }
    setIsEditing(!isEditing);
  };

  const handleAddAndEdit = (id = editId) => {
    if (isEditing) {
      dispatch({ type: "editTodo", payload: { id: editId, title: title } });
      setIsEditing(!isEditing);
      setTitle("");
    } else {
      dispatch({ type: "addTodo", payload: { title: title } });
      setTitle("");
    }
  };

  return (
    <div>
      <h2>Create Todo List</h2>
      <input
        type="text"
        placeholder="Add task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={handleAddAndEdit}> {isEditing ? "Save" : "Add"} </button>

      {tasks
        .sort((a, b) => b.id - a.id)
        .map((task) => {
          return (
            <TodoItem
              key={task.id}
              title={task.title}
              id={task.id}
              dispatch={dispatch}
              completed={task.completed}
              setTitle={setTitle}
              handleEditing={handleEditing}
              isEditing={isEditing}
            />
          );
        })}
    </div>
  );
};

export default App;
