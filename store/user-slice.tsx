import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { USER_WITH_PASSWORD } from "@/types/user.types";
import type { DeepPartial } from "./types";
import updateObject from "@/lib/update-object";

type INITIAL_STATE = {
	user: USER_WITH_PASSWORD
}

const initialState: INITIAL_STATE = {
	user: {} as USER_WITH_PASSWORD
}

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setCurrentUser: (state, action: PayloadAction<USER_WITH_PASSWORD>) => {
			return {
				...state,
				user: action.payload
			}
		},
		removeCurrentUser: (state) => {
			return {
				...state,
				user: {} as USER_WITH_PASSWORD
			}
		},
		updateUser: (state, action: PayloadAction<DeepPartial<USER_WITH_PASSWORD>>) => {
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

