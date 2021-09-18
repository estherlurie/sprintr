import React from "react";
import "./TodoList.css";

interface Props {
  todo: Todo;
  toggleTodo: ToggleTodo;
}

export const TodoListItem: React.FC<Props> = ({ todo, toggleTodo }) => {
  todo.startDate = new Date(todo.startDate);
  todo.endDate = new Date(todo.endDate);
  return (
    <>
      <li>
        <div className="ListItem">
          <label
            style={{
              textDecoration: todo.complete ? "line-through" : undefined,
            }}
          >
            <div className="ToggleTask">
              <input
                type="checkbox"
                checked={todo.complete}
                onClick={() => {
                  toggleTodo(todo);
                }}
              />
            </div>
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
