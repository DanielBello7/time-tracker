import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { SHARED_TASK } from "@/types/shared-task.types";
import type { TASK } from "@/types/task.types";

type INITIAL_STATE = {
  tasks: TASK[]
  sharedTasks: SHARED_TASK[]
  taskType: string
  search: string
  page: number
  hasMore: boolean
  sharedTaskPage: number
  sharedTaskHasMore: boolean
}

const initialState: INITIAL_STATE = {
  sharedTasks: [],
  tasks: [],
  taskType: "",
  search: "",
  hasMore: true,
  page: 1,
  sharedTaskPage: 1,
  sharedTaskHasMore: true
}

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    updatePage: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        page: action.payload
      }
    },
    updateHasMore: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        hasMore: action.payload
      }
    },
    updateSharedTaskPage: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        sharedTaskPage: action.payload
      }
    },
    updateSharedTaskHasMore: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        sharedTaskHasMore: action.payload
      }
    },
    addTasks: (state, action: PayloadAction<TASK[]>) => {
      const current_state_ids = state.tasks.map((item) => item._id);
      const filtered = action.payload.filter((item) => !current_state_ids.includes(item._id));
      return {
        ...state,
        tasks: [
          ...state.tasks,
          ...filtered,
        ]
      }
    },
    addSharedTasks: (state, action: PayloadAction<SHARED_TASK[]>) => {
      const current_state_ids = state.sharedTasks.map((item) => item._id);
      const filtered = action.payload.filter((item) => !current_state_ids.includes(item._id));
      return {
        ...state,
        sharedTasks: [
          ...filtered,
          ...state.sharedTasks,
        ]
      }
    },
    removeTasks: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        tasks: state.tasks.filter((item) => !action.payload.includes(item._id))
      }
    },
    removeSharedTasks: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        sharedTasks: state.sharedTasks.filter((item) => !action.payload.includes(item._id))
      }
    },
    resetTasks: (state) => {
      return {
        ...state,
        tasks: []
      }
    },
    resetSharedTasks: (state) => {
      return {
        ...state,
        sharedTasks: []
      }
    },
    setTaskType: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        taskType: action.payload
      }
    },
    setSearch: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        search: action.payload
      }
    }
  }
});

export const {
  addSharedTasks,
  updateHasMore,
  updatePage,
  addTasks,
  removeSharedTasks,
  removeTasks,
  resetSharedTasks,
  resetTasks,
  setSearch,
  setTaskType,
  updateSharedTaskHasMore,
  updateSharedTaskPage
} = taskSlice.actions;
export default taskSlice.reducer;

