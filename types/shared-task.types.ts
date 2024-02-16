import type { TASK } from "./task.types";
import type { USER } from "./user.types";
import mongoose from "mongoose";

export type SHARED_TASK = {
  id: string
  sharedBy: USER
  sharedTo: USER
  taskId: TASK
  createdAt: string
  isRead: boolean
  updatedAt: string
}

export interface SHARED_TASK_DOC {
  id: string
  sharedBy: typeof mongoose.Types.ObjectId
  sharedTo: typeof mongoose.Types.ObjectId
  taskId: typeof mongoose.Types.ObjectId
  createdAt: string
  isRead: boolean
  updatedAt: string
}

export type NEW_SHARED_TASK = {
  sharedBy: typeof mongoose.Types.ObjectId
  sharedTo: typeof mongoose.Types.ObjectId
  taskId: typeof mongoose.Types.ObjectId
}

