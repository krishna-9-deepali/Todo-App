import { createSlice, nanoid } from "@reduxjs/toolkit";
const todos =
  localStorage.getItem("todos") !== null
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
const todoslice = createSlice({
  name: "todo",
  initialState: todos,
  reducers: {
    addtodo: (state, action) => {
      const alltodos = action.payload.allTodo;
      console.log(alltodos);
      const todoItem = {
        id: nanoid(),
        todo: action.payload.todo,
        completed: false,
      };
      let newState = [todoItem, ...alltodos];
      localStorage.setItem("todos", JSON.stringify(newState));
      return (state = [todoItem, ...alltodos]);
      // return (state = [todoItem, ...state]);
    },
    deletetodo: (state, action) => {
      let newState = state.filter((item) => item.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(newState));
      return (state = state.filter((item) => item.id !== action.payload));
    },
    updatetodo: (state, action) => {
      let newState = state.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      console.log(action.payload, action);
      localStorage.setItem("todos", JSON.stringify(newState));
      return (state = state.map((item) =>
        item.id === action.payload.id ? action.payload : item
      ));
    },
    toggleComplete: (state, action) => {
      let newState = state.map((item) =>
        item.id === action.payload
          ? { ...item, completed: !item.completed }
          : item
      );
      localStorage.setItem("todos", JSON.stringify(newState));

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
      let newState = [...action.payload];
      localStorage.setItem("todos", JSON.stringify(newState));
      return (state = [...action.payload]);
    },
  },
});
export const todoActions = todoslice.actions;
export default todoslice;
