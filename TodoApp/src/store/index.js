import { configureStore } from "@reduxjs/toolkit";
import modeslice from "./modeslice";
import todoslice from "./todoSlice";
import todoInfoSlice from "./todoInfoSlice";

const todoStore = configureStore({
  reducer: {
    toggleMode: modeslice.reducer,
    todo: todoslice.reducer,
    todoinfo: todoInfoSlice.reducer,
  },
});
export default todoStore;
