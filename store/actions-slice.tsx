import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type INITIAL_STATE = {
  showShareTaskDialog: boolean
  shareTaskList: string[]
  showDeleteTaskDialog: boolean
  deleteTaskList: string[]
  showDeleteSharedTaskDialog: boolean
  deleteSharedTaskList: string[]
}

const initialState: INITIAL_STATE = {
  deleteTaskList: [],
  showDeleteTaskDialog: false,
  shareTaskList: [],
  showShareTaskDialog: false,
  deleteSharedTaskList: [],
  showDeleteSharedTaskDialog: false
}

const actionsSlice = createSlice({
  name: "actions",
  initialState,
  reducers: {
    openDeleteTaskDialog: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        deleteTaskList: action.payload,
        showDeleteTaskDialog: true
      }
    },
    toggleDeleteTaskDialog: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        showDeleteTaskDialog: action.payload
      }
    },
    openShareTaskDialog: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        shareTaskList: action.payload,
        showShareTaskDialog: true
      }
    },
    toggleShareTaskDialog: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        showShareTaskDialog: action.payload
      }
    },
    resetShareTaskList: (state) => {
      return {
        ...state,
        shareTaskList: []
      }
    },
    resetDeleteTaskList: (state) => {
      return {
        ...state,
        deleteTaskList: []
      }
    },
    openDeleteSharedTaskDialog: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        deleteSharedTaskList: action.payload,
        showDeleteSharedTaskDialog: true
      }
    },
    toggleDeleteSharedTaskDialog: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        showDeleteSharedTaskDialog: action.payload
      }
    },
    resetDeleteSharedTaskList: (state) => {
      return {
        ...state,
        deleteSharedTaskList: []
      }
    }
  }
});

export const {
  openDeleteTaskDialog,
  openShareTaskDialog,
  resetDeleteTaskList,
  resetShareTaskList,
  toggleDeleteTaskDialog,
  toggleShareTaskDialog,
  openDeleteSharedTaskDialog,
  resetDeleteSharedTaskList,
  toggleDeleteSharedTaskDialog
} = actionsSlice.actions;
export default actionsSlice.reducer;

