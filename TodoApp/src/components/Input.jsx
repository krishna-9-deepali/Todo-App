import React, { useRef } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { IoMdAddCircle } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { todoActions } from "../store/todoSlice";
import { todoInfoActions } from "../store/todoInfoSlice";
export default function Input() {
  const todoItems = useSelector((store) => store.todo);
  const mode = useSelector((store) => store.toggleMode);
  const { all, active } = useSelector((store) => store.todoinfo);
  const dispatch = useDispatch();
  const inputTodoRef = useRef("");
  const handleTodoInput = (e) => {
    inputTodoRef.current.value = e.target.value;
  };
  const handleAddTodo = () => {
    const todo = inputTodoRef.current.value.trim();
    let alltodo =
      localStorage.getItem("todos") !== null
        ? JSON.parse(localStorage.getItem("todos"))
        : [];
    let newAddedtodo = { id: nanoid(), todo, completed: false };
    let newTodos = [newAddedtodo, ...alltodo];
    if (todo && todo !== "") {
      dispatch(todoActions.addtodo(newTodos));

      dispatch(
        todoInfoActions.changeMode({
          all: true,
          active: false,
          completed: false,
          clearCompleted: false,
        })
      );

      localStorage.setItem("todos", JSON.stringify(newTodos));
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
        className={`inputTag ${mode ? "input-dark-mode" : "lightMode"}`}
        placeholder="Create a new todo"
        ref={inputTodoRef}
        onChange={handleTodoInput}
        type="text"
        required
      />
    </div>
  );
}
