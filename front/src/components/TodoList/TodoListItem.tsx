import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

interface Props {
  todo: Todo;
  toggleTodo: ToggleTodo;
}

export const TodoListItem: React.FC<Props> = ({ todo, toggleTodo }) => {
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
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
    </>
  );
};
