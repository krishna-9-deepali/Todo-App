import React, { useEffect } from "react";
import { FaSave } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { todoActions } from "../store/todoSlice";
import { useState } from "react";
export default function Todoitems({ item }) {
  const [iseditable, setIseditable] = useState(false);
  const [updateTodo, setUpdateTodo] = useState(item.todo);
  const mode = useSelector((store) => store.toggleMode);
  const { all, active, completed, clearCompleted } = useSelector(
    (store) => store.todoinfo
  );
  const dispatch = useDispatch();
  useEffect(() => {
    // Update updateTodo when item.todo changes
    setUpdateTodo(item.todo);
  }, [item.todo]); // Watch for changes to item.todo

  const handledeletion = (id) => {
    let alltodo =
      localStorage.getItem("todos") !== null
        ? JSON.parse(localStorage.getItem("todos"))
        : [];
    let todosAfterDeletion = alltodo.filter((item) => item.id !== id);
    dispatch(todoActions.deletetodo(id));
    localStorage.setItem("todos", JSON.stringify(todosAfterDeletion));
  };
  const handleUpdate = (id) => {
    let alltodo =
      localStorage.getItem("todos") !== null
        ? JSON.parse(localStorage.getItem("todos"))
        : [];
    let newState = alltodo.map((item) =>
      item.id === id ? { ...item, todo: updateTodo } : item
    );
    localStorage.setItem("todos", JSON.stringify(newState));
    dispatch(todoActions.updatetodo({ ...item, todo: updateTodo }));
    setIseditable(false);
  };
  const toggleCompleted = (id) => {
    let alltodo =
      localStorage.getItem("todos") !== null
        ? JSON.parse(localStorage.getItem("todos"))
        : [];
    let newState = alltodo.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    localStorage.setItem("todos", JSON.stringify(newState));
    dispatch(todoActions.toggleComplete(id));
    //get data from local storage.
    let alltodos =
      localStorage.getItem("todos") !== null
        ? JSON.parse(localStorage.getItem("todos"))
        : [];
    //update  active and  completed todos.
    if (active) {
      let activetodo = alltodos.filter((todo) => todo.completed === false);

      dispatch(todoActions.activeTodos(activetodo));
    }
    if (completed) {
      let completedTodo = alltodos.filter((todo) => todo.completed === true);
      dispatch(todoActions.completedTodos(completedTodo));
    }
  };
  return (
    <>
      <div className={`todoItems ${mode ? "" : "lightMode "}`}>
        <div className="todoInnerItem inputWidth">
          <div
            className={`round-checkbox ${
              item.completed ? "check-display" : ""
            }  ${item.completed && !mode ? "check-display-black" : ""}`}
            onClick={() => toggleCompleted(item.id)}
          >
            <TiTick />
          </div>

          {/* <input
            type="checkbox"
            id="myCheckbox"
            checked={item.completed}
            onChange={toggleCompleted}
            className="round-checkbox"
          /> */}
          <textarea
            rows="1"
            cols="100"
            id="myTextarea"
            className={`inputTag ${mode ? "" : "lightMode"} ${
              iseditable ? "outline" : ""
            } ${!mode && iseditable ? "outlinelight" : ""} ${
              item.completed ? "text-line-through" : ""
            }`}
            onChange={(e) => {
              setUpdateTodo(e.target.value);
            }}
            value={updateTodo}
            style={{ fontSize: "1.5rem" }}
            readOnly={!iseditable}
          ></textarea>
        </div>
        <div className="todoInnerItem">
          {!iseditable ? (
            <button
              className={`editbutton  edit-save-button ${
                mode ? "" : "lightMode"
              }`}
              disabled={item.completed}
              onClick={() => setIseditable((prev) => !prev)}
            >
              <FaEdit />
            </button>
          ) : (
            <button
              className={`editbutton ${mode ? "" : "lightMode"}`}
              onClick={() => handleUpdate(item.id)}
            >
              <FaSave />
            </button>
          )}

          <RiDeleteBin5Fill
            className={`delete-button ${mode ? "" : "lightMode"}`}
            style={{ fontSize: "1.3rem" }}
            onClick={() => handledeletion(item.id)}
          />
        </div>
      </div>
    </>
  );
}
