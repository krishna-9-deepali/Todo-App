import { createSlice } from "@reduxjs/toolkit";
// const todos =
//   localStorage.getItem("todos") !== null
//     ? JSON.parse(localStorage.getItem("todos"))
//     : [];
const todoslice = createSlice({
  name: "todo",
  initialState: [],
  reducers: {
    addtodo: (state, action) => {
      return (state = [...action.payload]);
    },

    deletetodo: (state, action) => {
      return (state = state.filter((item) => item.id !== action.payload));
    },

    updatetodo: (state, action) => {
      return (state = state.map((item) =>
        item.id === action.payload.id ? action.payload : item
      ));
    },

    toggleComplete: (state, action) => {
      return (state = state.map((item) =>
        item.id === action.payload
          ? { ...item, completed: !item.completed }
          : item
      ));
    },

    allTodos: (state = [], action) => {
      return (state = [...action.payload]);
    },
    activeTodos: (state = [], action) => {
      return (state = [...action.payload]);
      // return (state = state.filter((item) => item.completed === false));
    },
    completedTodos: (state = [], action) => {
      return (state = [...action.payload]);
      // return (state = state.filter((item) => item.completed === true));
    },
    clearedCompletedTodos: (state, action) => {
      return (state = state.filter((item) => item.completed === false));
      // return (state = [...action.payload]);
    },
  },
});
export const todoActions = todoslice.actions;
export default todoslice;
