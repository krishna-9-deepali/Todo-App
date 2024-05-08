import { configureStore } from "@reduxjs/toolkit";
import modeslice from "./modeslice";
import todoslice from "./todoSlice";

const todoStore = configureStore({
  reducer: {
    toggleMode: modeslice.reducer,
    todo: todoslice.reducer,
  },
});
export default todoStore;
