export default function TodoItem({
  title,
  id,
  dispatch,
  completed,
  handleEditing,
  isEditing,
}) {
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
      <p> {title} </p>
      {/* <p>completed: {completed.toString()} </p>{" "} */}
      <button
        style={{ display: isEditing ? "none" : "block" }}
        onClick={() => handleEditing(title, id)}
      >
        Edit
      </button>{" "}
      <button
        style={{ display: isEditing ? "none" : "block" }}
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
