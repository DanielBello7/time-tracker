import type { Document } from "mongoose";
import mongoose from "mongoose";

export interface TOKEN {
  _id: string
  email: string
  otp: string
  createdAt: string
  updatedAt: string
}

export interface TOKEN_DOC extends Document {
  _id: typeof mongoose.Types.ObjectId
  email: string
  otp: string
  createdAt: Date
  updatedAt: Date
}

export type NEW_TOKEN = {
  email: string
  token: string
}

