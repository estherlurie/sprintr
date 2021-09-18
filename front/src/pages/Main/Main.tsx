import React, { useState, useEffect } from "react";
import { TodoList } from "../../components/TodoList/TodoList";
import { AddTodoForm } from "../../components";
import Card from "react-bootstrap/Card";

const defaultTodos: Todo[] = [
  {
    id: -1,
    text: "default",
    complete: false,
    startDate: new Date(),
    endDate: new Date(),
    energy: 1,
    category: "default",
  },
];

const SORT_CATEGORIES: { name: string; rich: string }[] = [
  { name: "text", rich: "Text" },
  { name: "complete", rich: "Completed" },
  { name: "startDate", rich: "Start Date" },
  { name: "endDate", rich: "End Date" },
  { name: "energy", rich: "Energy" },
  { name: "category", rich: "Category" },
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
              id: number;
              text: string;
              startDate: string;
              endDate: string;
              energy: number;
              category: string;
              complete: number;
            }) => {
              tasks.push({
                id: task.id,
                text: task.text,
                complete: task.complete === 1 ? true : false,
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
        todo.complete = !todo.complete;
        fetch("/tasks/update", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify(todo),
        });
        return todo;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const deleteTodo: DeleteTodo = (todo: Todo) => {
    fetch("/tasks/delete", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(todo),
    }).then((res) => {
      setInitTodos(false);
    });
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
      setTodos([...todos, todo]);
    });
  };

  const handleSort = (event: { target: { value: string } }) => {
    let category = event.target.value;
    switch (category) {
      case "text":
        setTodos([...todos].sort((a, b) => a.text.localeCompare(b.text)));
        break;
      case "complete":
        setTodos(
          [...todos].sort((a, b) =>
            a.complete === b.complete ? 0 : a.complete ? -1 : 1
          )
        );
        break;
      case "startDate":
        setTodos(
          [...todos].sort((a, b) =>
            a.startDate === b.startDate ? 0 : a.startDate > b.startDate ? 1 : -1
          )
        );
        break;
      case "endDate":
        setTodos(
          [...todos].sort((a, b) =>
            a.endDate === b.endDate ? 0 : a.endDate > b.endDate ? 1 : -1
          )
        );
        break;
      case "energy":
        setTodos(
          [...todos].sort((a, b) =>
            a.energy === b.energy ? 0 : a.energy > b.energy ? 1 : -1
          )
        );
        break;
      case "category":
        setTodos(
          [...todos].sort((a, b) => a.category.localeCompare(b.category))
        );
        break;
    }
  };

  return (
    <>
      <div className="sort">
        Sort:
        <select name="sortCategory" onChange={handleSort}>
          {SORT_CATEGORIES.map((category) => {
            return <option value={category.name}>{category.rich}</option>;
          })}
        </select>
      </div>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      <AddTodoForm addTodo={addTodo} />
    </>
  );
};

export default Main;
