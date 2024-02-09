import type { Document } from "mongoose";

export type USER = {
  _id: string
  avatar: string | null
  lastname: string
  position: string
  email: string
  isEmailVerified: boolean
  country: string
  firstname: string
  phone: string
  createdAt: string
  updatedAt: string
}

export interface USER_DOC extends Document {
  _id: string
  avatar: string | null
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

