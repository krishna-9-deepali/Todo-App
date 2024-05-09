import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { todoActions } from "../store/todoSlice";
import { todoInfoActions } from "../store/todoInfoSlice";
export default function Todoinformation() {
  const mode = useSelector((store) => store.toggleMode);
  const todoItems = useSelector((store) => store.todo);
  const { all, active, completed, clearCompleted } = useSelector(
    (store) => store.todoinfo
  );
  const dispatch = useDispatch();

  useEffect(() => {
    //if todo list is exist on refresh.
    if (todoItems.length > 0) {
      dispatch(
        todoInfoActions.changeMode({
          all: true,
          active: false,
          completed: false,
          clearCompleted: false,
        })
      );
    }
  }, []);

  const handleAllTodos = () => {
    let alltodo =
      localStorage.getItem("todos") !== null
        ? JSON.parse(localStorage.getItem("todos"))
        : [];
    dispatch(todoActions.allTodos(alltodo));
    dispatch(
      todoInfoActions.changeMode({
        all: true,
        active: false,
        completed: false,
        clearCompleted: false,
      })
    );
  };
  const handleActiveTodos = () => {
    let alltodo =
      localStorage.getItem("todos") !== null
        ? JSON.parse(localStorage.getItem("todos"))
        : [];
    let activeTodos = alltodo.filter((item) => item.completed === false);
    dispatch(todoActions.activeTodos(activeTodos));

    dispatch(
      todoInfoActions.changeMode({
        all: false,
        active: true,
        completed: false,
        clearCompleted: false,
      })
    );
  };

  const handleCompletedTodos = () => {
    let alltodo =
      localStorage.getItem("todos") !== null
        ? JSON.parse(localStorage.getItem("todos"))
        : [];
    let completedTodos = alltodo.filter((item) => item.completed === true);
    dispatch(todoActions.completedTodos(completedTodos));

    dispatch(
      todoInfoActions.changeMode({
        all: false,
        active: false,
        completed: true,
        clearCompleted: false,
      })
    );
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
    if (alltodo.filter((item) => item.completed === true).length > 0) {
      dispatch(
        todoInfoActions.changeMode({
          all: false,
          active: false,
          completed: false,
          clearCompleted: true,
        })
      );
    }

    localStorage.setItem("todos", JSON.stringify(clearcompletedTodos));
  };
  const displayItemsLeft = () => {
    let alltodo =
      localStorage.getItem("todos") !== null
        ? JSON.parse(localStorage.getItem("todos"))
        : [];
    let activeTodos = alltodo.filter((item) => item.completed === false);
    return `${activeTodos.length} Items Left`;
  };
  const displayItemsCompleted = () => {
    let alltodo =
      localStorage.getItem("todos") !== null
        ? JSON.parse(localStorage.getItem("todos"))
        : [];
    let activeTodos = alltodo.filter((item) => item.completed === true);
    return activeTodos.length;
  };
  return (
    <div className={`todoInfo ${mode ? "" : "lightMode"}`}>
      <div>
        {all === true ||
        active === true ||
        (clearCompleted === true && todoItems.length > 0)
          ? displayItemsLeft()
          : `${displayItemsCompleted()} Items Completed`}
      </div>
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
          className={`${completed ? "category" : ""}`}
          onClick={handleCompletedTodos}
          style={{ cursor: "pointer" }}
        >
          completed
        </div>
      </div>
      <div
        className={`${clearCompleted ? "category" : ""}`}
        onClick={handleClearCompletedTodos}
        style={{ cursor: "pointer" }}
      >
        clear completed
      </div>
    </div>
  );
}
