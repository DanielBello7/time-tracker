import type { Document } from "mongoose";

export type USER = {
  _id: string
  avatar: string | null
  password: string
  name: string
  position: string
  email: string
  isEmailVerified: boolean
  country: string
  phone: string
  allowNotifications: boolean
  createdAt: string
  updatedAt: string
}

export interface USER_DOC extends Document {
  _id: string
  avatar: string | null
  name: string
  password: string
  position: string
  email: string
  isEmailVerified: boolean
  country: string
  phone: string
  allowNotifications: boolean
  createdAt: string
  updatedAt: string
}

export type NEW_USER = {
  name: string
  position: string
  password: string
  email: string
  country: string
  phone: string
}

export type UPDATE_USER = {
  phone?: string
  position?: string
  name?: string
  country?: string
}