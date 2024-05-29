import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    checkedCategory: "",
  },
  reducers: {
    setCheckedCategory: (state, action) => {
      state.checkedCategory = action.payload;
    },
  },
});

export const { setCheckedCategory } = globalSlice.actions;

export default globalSlice.reducer;
