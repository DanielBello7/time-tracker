import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { USER } from "@/types/user.types";

type INITIAL_STATE = {
	user: USER
}

const initialState: INITIAL_STATE = {
	user: {} as USER
}

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setCurrentUser: (state, action: PayloadAction<USER>) => {
			return { ...state, user: action.payload }
		},
		removeCurrentUser: (state) => {
			return { ...state, user: {} as USER }
		}
	}
});

export const { setCurrentUser, removeCurrentUser } = userSlice.actions;
export default userSlice.reducer;

