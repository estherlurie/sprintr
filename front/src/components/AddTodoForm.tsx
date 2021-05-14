import React, { useState } from "react";

interface Props {
  addTodo: AddTodo;
}

export const AddTodoForm: React.FC<Props> = ({ addTodo }) => {
  const [text, setText] = useState("");
  const [energy, setEnergy] = useState(1);
  const [startDate, setStartDate] = useState(0);
  const [endDate, setEndDate] = useState(1);
  const [category, setCategory] = useState("");

  const handleChangeText = (e: any) => {
    setText(e.target.value);
  };

  const handleChangeEnergy = (e: any) => {
    let num = e.target.value;
    if (num >= 1 && num <= 5) {
      setEnergy(num);
    } else {
      alert("Energy must be a number between 1 and 5");
    }
  };

  const handleChangeCategory = (e: any) => {
    setCategory(e.target.value);
  };

  const handleChangeStartDate = (e: any) => {
    setStartDate(e.target.value);
  };

  const handleChangeEndDate = (e: any) => {
    setEndDate(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (errorCheck()) {
      let newTodo = {
        energy: energy,
        text: text,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        category: category,
        complete: false,
      };
      addTodo(newTodo);
      setText("");
    } else {
      alert("Make sure all field are filled out correctly!");
    }
  };

  const errorCheck = () => {
    let passed = true;
    if (text === "") {
      alert("Cannot submit empty text");
      passed = false;
    } else if (energy < 1 || energy > 5) {
      alert("Energy must be between 1 and 5 inclusive");
      passed = false;
    } else if (category === "") {
      alert("Cannot submit empty category");
      passed = false;
    }
    return passed;
  };

  return (
    <form>
      Text: <input type="text" value={text} onChange={handleChangeText} />
      Energy:{" "}
      <input type="number" value={energy} onChange={handleChangeEnergy} />
      Category:{" "}
      <input type="text" value={category} onChange={handleChangeCategory} />
      Start Date:{" "}
      <input type="date" value={startDate} onChange={handleChangeStartDate} />
      Complete By Date:{" "}
      <input type="date" value={endDate} onChange={handleChangeEndDate} />
      <button type="submit" onClick={handleSubmit}>
        Add Todo
      </button>
    </form>
  );
};
