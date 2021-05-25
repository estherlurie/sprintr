import React, { useState } from "react";
import { TodoList } from "../../components/TodoList/TodoList";
import { AddTodoForm } from "../../components";
import Card from "react-bootstrap/Card";

const defaultTodos: Todo[] = [
  {
    text: "Write app",
    complete: false,
    startDate: new Date(),
    endDate: new Date(),
    energy: 4,
    category: "Dev",
  },
];

const Main = () => {
  const [todos, setTodos] = useState(defaultTodos);

  const toggleTodo: ToggleTodo = (selectedTodo: Todo) => {
    const newTodos = todos.map((todo) => {
      if (todo === selectedTodo) {
        return {
          ...todo,
          complete: !todo.complete,
        };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const addTodo: AddTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <AddTodoForm addTodo={addTodo} />
    </>
  );
};

export default Main;
