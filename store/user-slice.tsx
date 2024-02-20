import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { USER } from "@/types/user.types";
import type { DeepPartial } from "./types";
import updateObject from "@/lib/update-object";

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
		},
		updateUser: (state, action: PayloadAction<DeepPartial<USER>>) => {
			const updated = updateObject(state.user, action.payload);
			return {
				...state,
				user: updated
			}
		}
	}
});

export const { setCurrentUser, removeCurrentUser, updateUser } = userSlice.actions;
export default userSlice.reducer;

