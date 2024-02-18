import { persistStore, persistReducer } from 'redux-persist';
import { variables } from "@/constants";
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { Tuple, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import userSlice from './user-slice';

const encryptor = encryptTransform({ secretKey: "JAMES" });

const persistedUserConfig = {
  key: "user-account",
  storage,
  transforms: [encryptor]
}

const persistedUserReducerSlice = persistReducer(persistedUserConfig, userSlice);

const store = configureStore({
  reducer: {
    user: persistedUserReducerSlice
  },
  devTools: variables.NODE_ENV === "development",
  middleware: () => new Tuple()
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;

