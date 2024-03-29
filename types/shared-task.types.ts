import type { TASK } from "./task.types";
import type { USER } from "./user.types";
import mongoose from "mongoose";

export type SHARED_TASK = {
  _id: string
  sharedBy: USER
  sharedTo: USER
  taskId: TASK
  createdAt: string
  isRead: boolean
  isActive: boolean
  updatedAt: string
}

export interface SHARED_TASK_DOC {
  _id: string
  sharedBy: typeof mongoose.Types.ObjectId
  sharedTo: typeof mongoose.Types.ObjectId
  taskId: typeof mongoose.Types.ObjectId
  createdAt: string
  isRead: boolean
  isActive: boolean
  updatedAt: string
}

export type NEW_SHARED_TASK = {
  sharedBy: typeof mongoose.Types.ObjectId
  sharedTo: typeof mongoose.Types.ObjectId
  taskId: typeof mongoose.Types.ObjectId
}

