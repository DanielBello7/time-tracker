import type { Document } from "mongoose";
import mongoose from "mongoose";

export interface TOKEN_DOC extends Document {
  _id: typeof mongoose.Types.ObjectId
  email: string
  otp: string
  createdAt: Date | string
  updatedAt: Date | string
}

