import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type INITIAL_STATE = {
  isSelectable: boolean
  selected: string[]
  isSharedSelectable: boolean
  sharedSelected: string[]
}

const initialState: INITIAL_STATE = {
  isSelectable: false,
  selected: [],
  isSharedSelectable: false,
  sharedSelected: []
}

const interfaceSlice = createSlice({
  name: "interface",
  initialState,
  reducers: {
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
    },
    changeIsSharedSelectable: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isSharedSelectable: action.payload
      }
    },
    addSharedSelected: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        sharedSelected: Array.from(new Set([...state.sharedSelected, ...action.payload]))
      }
    },
    removeSharedSelected: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        sharedSelected: state.sharedSelected.filter((item) => !action.payload.includes(item))
      }
    },
    resetSharedSelected: (state) => {
      return {
        ...state,
        sharedSelected: []
      }
    }
  }
});

export const {
  addSelected,
  changeIsSelectable,
  removeSelected,
  resetSelected,

  addSharedSelected,
  changeIsSharedSelectable,
  removeSharedSelected,
  resetSharedSelected
} = interfaceSlice.actions;
export default interfaceSlice.reducer;

