import { variables } from "@/constants";
import { Tuple, configureStore } from "@reduxjs/toolkit";
import userSlice from './user-slice';

const store = configureStore({
  reducer: {
    user: userSlice
  },
  devTools: variables.NODE_ENV === "development",
  middleware: () => new Tuple()
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export default store;

