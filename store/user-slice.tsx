import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  account: {} as any
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action: PayloadAction<string>) => {
      return {
        ...state
      }
    }
  }
});

export const { getUser, } = userSlice.actions;
export default userSlice.reducer;

