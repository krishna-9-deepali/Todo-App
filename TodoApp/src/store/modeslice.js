import { createSlice } from "@reduxjs/toolkit";
const modeslice = createSlice({
  name: "mode",
  initialState: true,
  reducers: {
    toggleMode: (state, action) => {
      return (state = !state);
    },
  },
});
export const modeActions = modeslice.actions;
export default modeslice;
