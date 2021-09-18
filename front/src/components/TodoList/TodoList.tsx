import React from "react";
import { TodoListItem } from "..";
import "./TodoList.css";

interface Props {
  todos: Todo[];
  toggleTodo: ToggleTodo;
  deleteTodo: DeleteTodo;
}

export const TodoList: React.FC<Props> = ({
  todos,
  toggleTodo,
  deleteTodo,
}) => {
  return (
    <>
      <ul>
        {todos.map((todo) => {
          return (
            <TodoListItem
              key={todo.text}
              todo={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          );
        })}
      </ul>
    </>
  );
};
