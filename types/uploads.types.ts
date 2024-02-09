import type { Document } from "mongoose";
import type { USER } from "./user.types";
import mongoose from "mongoose";

export type UPLOAD = {
  _id: string
  uploadedBy: USER
  url: string
  mimetype: string
  size: number
  createdAt: string
  updatedAt: string
}

export interface UPLOAD_DOC extends Document {
  _id: string
  uploadedBy: typeof mongoose.Types.ObjectId
  url: string
  mimetype: string
  size: number
  createdAt: string
  updatedAt: string
}

