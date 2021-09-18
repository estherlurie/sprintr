import React from "react";
import "./TodoList.css";

interface Props {
  todo: Todo;
  toggleTodo: ToggleTodo;
  deleteTodo: DeleteTodo;
}

export const TodoListItem: React.FC<Props> = ({
  todo,
  toggleTodo,
  deleteTodo,
}) => {
  todo.startDate = new Date(todo.startDate);
  todo.endDate = new Date(todo.endDate);

  return (
    <>
      <li>
        <div className="ListItem">
          <div className="actions">
            Complete:
            <div className="ToggleTask">
              <input
                type="checkbox"
                checked={todo.complete}
                onClick={() => {
                  toggleTodo(todo);
                }}
              />
            </div>
            Delete:
            <div className="DeleteTask">
              <button
                className="DeleteButton"
                onClick={() => {
                  deleteTodo(todo);
                }}
              >
                X
              </button>
            </div>
          </div>
          <label
            style={{
              textDecoration: todo.complete ? "line-through" : undefined,
            }}
          >
            <div>
              <strong>{todo.text}</strong>
              <br />
              {"Energy: "}
              {todo.energy}
              <br />
              {"Started: "}
              {todo.startDate.getMonth() +
                1 +
                "/" +
                todo.startDate.getUTCDate() +
                "/" +
                todo.startDate.getUTCFullYear()}
              <br />
              {"Due: "}
              {todo.endDate.getMonth() +
                1 +
                "/" +
                todo.endDate.getUTCDate() +
                "/" +
                todo.endDate.getUTCFullYear()}
            </div>
          </label>
        </div>
      </li>
    </>
  );
};
