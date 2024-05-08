import React, { useRef } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { todoActions } from "../store/todoSlice";
export default function Input() {
  const todoItems = useSelector((store) => store.todo);
  const mode = useSelector((store) => store.toggleMode);
  const dispatch = useDispatch();
  const inputTodoRef = useRef("");
  const handleTodoInput = (e) => {
    inputTodoRef.current.value = e.target.value;
  };
  const handleAddTodo = () => {
    const todo = inputTodoRef.current.value.trim();
    console.log(todo);
    let alltodo =
      localStorage.getItem("todos") !== null
        ? JSON.parse(localStorage.getItem("todos"))
        : [];
    if (todo && todo !== "") {
      dispatch(todoActions.addtodo({ allTodo: alltodo, todo: todo }));
    }
    inputTodoRef.current.value = "";
  };
  return (
    <div className={`inputField ${mode ? "" : "lightMode"}`}>
      <IoMdAddCircle
        className={` ${mode ? "dark Onhover" : "check-display Onhover-light"} `}
        style={{ height: "100%", cursor: "pointer" }}
        onClick={handleAddTodo}
      />
      <input
        className={`inputTag ${mode ? "input-light-mode" : "lightMode"}`}
        placeholder="Create a new todo"
        ref={inputTodoRef}
        onChange={handleTodoInput}
        type="text"
        required
      />
    </div>
  );
}
