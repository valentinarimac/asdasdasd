import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import listService from "./listService";

const initialState = {
  lists: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createList = createAsyncThunk(
  "lists/createList",
  async (name, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await listService.createList(name, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getLists = createAsyncThunk(
  "lists/getLists",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await listService.getLists(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteList = createAsyncThunk(
  "lists/deleteList",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await listService.deleteList(id, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    resetLists: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createList.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.lists.push(action.payload);
      })
      .addCase(createList.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(getLists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLists.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.lists = action.payload;
      })
      .addCase(getLists.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(deleteList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.lists = state.lists.filter((list) => list._id !== action.payload);
      })
      .addCase(deleteList.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

export const { resetLists } = listSlice.actions;
export default listSlice.reducer;
