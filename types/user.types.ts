import type { Document } from "mongoose";

export type USER = {
  _id: string
  lastname: string
  position: string
  firstname: string
  email: string
  isEmailVerified: boolean
  country: string
  phone: string
  createdAt: string
  updatedAt: string
}

export interface USER_DOC extends Document {
  _id: string
  lastname: string
  position: string
  firstname: string
  email: string
  isEmailVerified: boolean
  country: string
  phone: string
  createdAt: string
  updatedAt: string
}

