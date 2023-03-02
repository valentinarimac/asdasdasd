import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import listReducer from "../features/list/listSlice";
import taskReducer from "../features/task/taskSlice";
import selectedListReducer from "../features/selectedList/selectedListSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lists: listReducer,
    tasks: taskReducer,
    selectedList: selectedListReducer,
  },
});
