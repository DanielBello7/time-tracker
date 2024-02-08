import type { USER } from "./user.types";
import type { Document } from "mongoose";

export type TASK = {
  _id: string
  type: "story" | "bug"
  title: string
  timeSpent: number
  timeInterval: "seconds" | "minutes" | "hours"
  body: string
  tags: string[]
  dateStarted: string | Date
  createdBy: USER
  createdAt: string | Date
  updatedAt: string | Date
  dateFinished: string | Date
}

export interface TASK_DOC extends Document {
  _id: string
  type: "story" | "bug"
  title: string
  timeSpent: number
  timeInterval: "seconds" | "minutes" | "hours"
  body: string
  tags: string[]
  dateStarted: Date
  createdBy: string
  createdAt: Date
  updatedAt: Date
  dateFinished: Date
}

