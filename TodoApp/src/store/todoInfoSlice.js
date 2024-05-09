import { createSlice } from "@reduxjs/toolkit";
const todoInfoSlice = createSlice({
  name: "todoinfo",
  initialState: {
    all: true,
    active: false,
    completed: false,
    clearCompleted: false,
  },
  reducers: {
    changeMode: (state, action) => {
      return (state = action.payload);
    },
  },
});
export const todoInfoActions = todoInfoSlice.actions;
export default todoInfoSlice;
