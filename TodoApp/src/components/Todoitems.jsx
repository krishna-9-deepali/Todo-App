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
  const dispatch = useDispatch();
  useEffect(() => {
    // Update updateTodo when item.todo changes
    setUpdateTodo(item.todo);
  }, [item.todo]); // Watch for changes to item.todo

  const handledeletion = (id) => {
    dispatch(todoActions.deletetodo(id));
  };
  const handleUpdate = (id) => {
    dispatch(todoActions.updatetodo({ ...item, todo: updateTodo }));
    setIseditable(false);
    console.log("update call asve call", iseditable);
  };
  const toggleCompleted = () => {
    dispatch(todoActions.toggleComplete(item.id));
  };
  return (
    <>
      <div className={`todoItems ${mode ? "" : "lightMode "}`}>
        <div className="todoInnerItem inputWidth">
          <div
            class={`round-checkbox ${item.completed ? "check-display" : ""}  ${
              item.completed && !mode ? "check-display-black" : ""
            }`}
            onClick={toggleCompleted}
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
