export default function TodoItem({ title, id, dispatch, completed }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        border: "1px solid brown",
        borderRadius: "5px",
        margin: "5px",
      }}
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={() => {
          dispatch({ type: "toggleCompleted", payload: { id } });
        }}
      ></input>{" "}
      <p>title {title} </p>
      <p>completed: {completed.toString()} </p>{" "}
      <button
        onClick={() => {
          dispatch({ type: "editTodo", payload: { id, title } });
        }}
      >
        Edit
      </button>{" "}
      <button
        onClick={() => {
          dispatch({ type: "deleteTodo", payload: { id } });
        }}
        disabled={!completed}
      >
        Delete
      </button>
    </div>
  );
}
