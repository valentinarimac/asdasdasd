import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedList: {},
};

export const selectedListSlice = createSlice({
  name: "selectedList",
  initialState,
  reducers: {
    setSelectedList: (state, action) => {
      state.selectedList = action.payload;
    },
  },
});

export const { setSelectedList } = selectedListSlice.actions;
export default selectedListSlice.reducer;
