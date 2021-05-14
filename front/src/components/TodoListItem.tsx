import React from "react";

interface Props {
  todo: Todo;
  toggleTodo: ToggleTodo;
}

export const TodoListItem: React.FC<Props> = ({ todo, toggleTodo }) => {
  return (
    <li>
      <label
        style={{ textDecoration: todo.complete ? "line-through" : undefined }}
      >
        <input
          type="checkbox"
          checked={todo.complete}
          onClick={() => {
            toggleTodo(todo);
          }}
        />{" "}
        <div>
          {todo.text}
          {" | Energy: "}
          {todo.energy}
          {" | Started: "}
          {todo.startDate.getMonth() +
            1 +
            "/" +
            todo.startDate.getUTCDate() +
            "/" +
            todo.startDate.getUTCFullYear()}
        </div>
      </label>
    </li>
  );
};
