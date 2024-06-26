import React, { useState, useEffect } from "react";
import Todoheading from "./Todoheading";
import Input from "./Input";
import Todoitems from "./Todoitems";
import Todoinformation from "./Todoinformation";
import { todoActions } from "../store/todoSlice";
import { useSelector, useDispatch } from "react-redux";

export default function Container() {
  const todoItems = useSelector((store) => store.todo);
  console.log(todoItems);
  const dispatch = useDispatch();
  useEffect(() => {
    let alltodo =
      localStorage.getItem("todos") !== null
        ? JSON.parse(localStorage.getItem("todos"))
        : [];
    dispatch(todoActions.allTodos(alltodo));
  }, []);

  return (
    <>
      <div className="outerDiv">
        <Todoheading />
        <Input />

        {todoItems.length === 0 ? (
          <div
            style={{
              color: "white",
              margin: "2rem 0",
              textTransform: "capitalize",
              wordSpacing: "0.2rem",
              lineHeight: "2rem",
              fontSize: "1.5rem",
            }}
          >
            {/* 😃 */}
            No Todos To Show in selected category click all for available
            todolist.or add more todos.or choose other category .
          </div>
        ) : (
          todoItems.map((item) => <Todoitems key={item.id} item={item} />)
        )}

        <Todoinformation />
        <div style={{ textTransform: "capitalize", marginTop: "1rem" }}>
          Note: Selected items are displayed in the Completed category, while
          deselected items are shown in the Active category.
        </div>
      </div>
    </>
  );
}
