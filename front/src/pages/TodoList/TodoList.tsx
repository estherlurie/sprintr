import React from "react";
import { TodoListItem } from "../../components";
import Card from "react-bootstrap/esm/Card";

interface Props {
  todos: Todo[];
  toggleTodo: ToggleTodo;
}

export const TodoList: React.FC<Props> = ({ todos, toggleTodo }) => {
  return (
    <>
      <ul>
        {todos.map((todo) => {
          return (
            <TodoListItem key={todo.text} todo={todo} toggleTodo={toggleTodo} />
          );
        })}
      </ul>
    </>
  );
};
