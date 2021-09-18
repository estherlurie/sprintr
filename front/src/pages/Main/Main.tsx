import React, { useState, useEffect } from "react";
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
  const [initTodos, setInitTodos] = useState(false);

  useEffect(() => {
    if (!initTodos) {
      fetch("/tasks/get").then((res) => {
        res.json().then((j) => {
          let tasks: Todo[] = [];
          j.tasks.map(
            (task: {
              text: string;
              startDate: string;
              endDate: string;
              energy: number;
              category: string;
            }) => {
              tasks.push({
                text: task.text,
                complete: false,
                startDate: new Date(task.startDate),
                endDate: new Date(task.endDate),
                energy: task.energy,
                category: task.category,
              });
            }
          );
          setTodos(j.tasks);
          setInitTodos(true);
        });
      });
    }
  });

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
    fetch("/tasks/post", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(todo),
    }).then((res) => {
      console.log(res.json());
      setTodos([...todos, todo]);
    });
  };

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <AddTodoForm addTodo={addTodo} />
    </>
  );
};

export default Main;
