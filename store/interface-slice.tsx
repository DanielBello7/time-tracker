import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type INITIAL_STATE = {
  isSelectable: boolean
  selected: string[]
}

const initialState: INITIAL_STATE = {
  isSelectable: false,
  selected: []
}

const interfaceSlice = createSlice({
  name: "interface",
  initialState,
  reducers: {
    toggleIsSelectable: (state) => {
      return {
        ...state,
        isSelectable: !state.isSelectable
      }
    },
    changeIsSelectable: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isSelectable: action.payload
      }
    },
    addSelected: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        selected: Array.from(new Set([...state.selected, ...action.payload]))
      }
    },
    removeSelected: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        selected: state.selected.filter((item) => !action.payload.includes(item))
      }
    },
    resetSelected: (state) => {
      return {
        ...state,
        selected: []
      }
    }
  }
});

export const {
  addSelected,
  changeIsSelectable,
  removeSelected,
  resetSelected,
  toggleIsSelectable
} = interfaceSlice.actions;
export default interfaceSlice.reducer;

