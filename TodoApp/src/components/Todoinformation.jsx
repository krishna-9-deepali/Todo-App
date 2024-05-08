import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { todoActions } from "../store/todoSlice";
export default function Todoinformation() {
  const mode = useSelector((store) => store.toggleMode);
  const todoItems = useSelector((store) => store.todo);
  const dispatch = useDispatch();
  const [all, setAll] = useState(false);
  const [Completed, setCompleted] = useState(false);
  const [active, setactive] = useState(false);
  const [ClearCompleted, setClearCompleted] = useState(false);

  const handleAllTodos = () => {
    let alltodo =
      localStorage.getItem("todos") !== null
        ? JSON.parse(localStorage.getItem("todos"))
        : [];
    dispatch(todoActions.allTodos(alltodo));
    setAll((prev) => (prev = true));
    setCompleted((prev) => (prev = false));
    setactive((prev) => (prev = false));
    setClearCompleted((prev) => (prev = false));
  };
  const handleActiveTodos = () => {
    let alltodo =
      localStorage.getItem("todos") !== null
        ? JSON.parse(localStorage.getItem("todos"))
        : [];
    let activeTodos = alltodo.filter((item) => item.completed === false);
    dispatch(todoActions.activeTodos(activeTodos));
    setAll((prev) => (prev = false));
    setCompleted((prev) => (prev = false));
    setactive((prev) => (prev = true));
    setClearCompleted((prev) => (prev = false));
  };

  const handleCompletedTodos = () => {
    let alltodo =
      localStorage.getItem("todos") !== null
        ? JSON.parse(localStorage.getItem("todos"))
        : [];
    let completedTodos = alltodo.filter((item) => item.completed === true);
    dispatch(todoActions.completedTodos(completedTodos));
    setAll((prev) => (prev = false));
    setCompleted((prev) => (prev = true));
    setactive((prev) => (prev = false));
    setClearCompleted((prev) => (prev = false));
  };
  const handleClearCompletedTodos = () => {
    let alltodo =
      localStorage.getItem("todos") !== null
        ? JSON.parse(localStorage.getItem("todos"))
        : [];
    let clearcompletedTodos = alltodo.filter(
      (item) => item.completed === false
    );
    dispatch(todoActions.clearedCompletedTodos(clearcompletedTodos));
    setAll((prev) => (prev = false));
    setCompleted((prev) => (prev = false));
    setactive((prev) => (prev = false));
    setClearCompleted((prev) => (prev = true));
  };
  return (
    <div className={`todoInfo ${mode ? "" : "lightMode"}`}>
      <div>{todoItems.length} items left</div>
      <div className="todoMiddleInfo">
        <div
          className={`${all ? "category" : ""}`}
          onClick={handleAllTodos}
          style={{ cursor: "pointer" }}
        >
          All
        </div>
        <div
          className={`${active ? "category" : ""}`}
          onClick={handleActiveTodos}
          style={{ cursor: "pointer" }}
        >
          Active
        </div>
        <div
          className={`${Completed ? "category" : ""}`}
          onClick={handleCompletedTodos}
          style={{ cursor: "pointer" }}
        >
          completed
        </div>
      </div>
      <div
        className={`${ClearCompleted ? "category" : ""}`}
        onClick={handleClearCompletedTodos}
        style={{ cursor: "pointer" }}
      >
        clear completed
      </div>
    </div>
  );
}
