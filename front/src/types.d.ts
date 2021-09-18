// TYPES

interface Todo {
  id: number;
  text: string;
  complete: boolean;
  startDate: Date;
  endDate: Date;
  energy: number;
  category: string;
}

// FUNCTIONS

type ToggleTodo = (selectedTodo: Todo) => void;

type AddTodo = (todo: Todo) => void;

type DeleteTodo = (todo: Todo) => void;
