import type { Document } from "mongoose";

export type USER_WITH_PASSWORD = {
	_id: string
	avatar: string | null
	password: string
	name: string
	position: string
	email: string
	isEmailVerified: boolean
	isOnboarded: boolean
	country: string
	phone: string
	allowNotifications: boolean
	createdAt: string
	updatedAt: string
}

export type USER_WITHOUT_PASSWORD = {
	_id: string
	avatar: string | null
	name: string
	position: string
	email: string
	isEmailVerified: boolean
	isOnboarded: boolean
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
	isOnboarded: boolean
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
	phone: string
	position: string
	name: string
	isOnboarded: boolean
	avatar: string
	country: string
	isEmailVerified: boolean
	allowNotifications: boolean
}

export type USERS_FILTER = {
	avatar: string | null
	name: string
	position: string
	email: string
	isEmailVerified: boolean
	isOnboarded: boolean
	country: string
	phone: string
	allowNotifications: boolean
	createdAt: string
}

