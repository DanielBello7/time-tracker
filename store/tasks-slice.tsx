import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { SHARED_TASK } from "@/types/shared-task.types";
import type { TASK } from "@/types/task.types";

type INITIAL_STATE = {
  tasks: TASK[]
  sharedTasks: SHARED_TASK[]
}

const initialState: INITIAL_STATE = {
  sharedTasks: [],
  tasks: []
}

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTasks: (state, action: PayloadAction<TASK[]>) => {
      const current_state_ids = state.tasks.map((item) => item._id);
      const filtered = action.payload.filter((item) => !current_state_ids.includes(item._id));
      return {
        ...state,
        tasks: [
          ...filtered,
          ...state.tasks,
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
    }
  }
});

export const {
  addSharedTasks,
  addTasks,
  removeSharedTasks,
  removeTasks,
  resetSharedTasks,
  resetTasks
} = taskSlice.actions;
export default taskSlice.reducer;

