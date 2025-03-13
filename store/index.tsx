import { variables } from "@/constants";
import { Tuple, configureStore } from "@reduxjs/toolkit";
import userSlice from './user-slice';
import tasksSlice from "./tasks-slice";
import interfaceSlice from "./interface-slice";
import actionsSlice from "./actions-slice";

const store = configureStore({
  reducer: {
    tasks: tasksSlice,
    user: userSlice,
    interface: interfaceSlice,
    actions: actionsSlice
  },
  devTools: variables.NODE_ENV === "development",
  middleware: () => new Tuple()
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export default store;

