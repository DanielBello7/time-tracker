import type { TASK } from "./task.types";
import type { USER } from "./user.types";
import mongoose from "mongoose";

export type EXTERNAL_SHARED_TASK = {
  _id: string
  sharedTo: string
  sharedBy: USER
  taskId: TASK
  isActive: boolean
  isRead: boolean
  createdAt: string
  updatedAt: string
}

export interface EXTERNAL_SHARED_TASK_DOC {
  _id: string
  sharedTo: string
  sharedBy: typeof mongoose.Types.ObjectId
  taskId: typeof mongoose.Types.ObjectId
  isActive: boolean
  isRead: boolean
  createdAt: string
  updatedAt: string
}

export type NEW_EXTERNAL_SHARED_TASK = {
  sharedTo: string
  sharedBy: typeof mongoose.Types.ObjectId
  taskId: typeof mongoose.Types.ObjectId
}

