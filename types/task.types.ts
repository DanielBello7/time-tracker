import type { Document } from "mongoose";
import mongoose from "mongoose";

export type TASK = {
	_id: string
	type: "story" | "bug"
	title: string
	timeSpent: number
	timeInterval: "seconds" | "minutes" | "hours"
	body: string
	tags: string[]
	shortCode: number
	dateStarted: string
	createdBy: {
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
	createdAt: string
	updatedAt: string
	dateFinished: string
}

export interface TASK_DOC extends Document {
	_id: string
	type: "story" | "bug"
	title: string
	timeSpent: number
	timeInterval: "seconds" | "minutes" | "hours"
	body: string
	tags: string[]
	shortCode: number
	dateStarted: Date
	createdBy: typeof mongoose.Types.ObjectId
	createdAt: Date
	updatedAt: Date
	dateFinished: Date
}

export type NEW_TASK = {
	type: "story" | "bug"
	title: string
	timeSpent: number
	timeInterval: "seconds" | "minutes" | "hours"
	body: string
	tags: string[]
	dateStarted: string
	dateFinished: string
}

export type UPDATE_TASK = {
	type: "story" | "bug"
	title: string
	timeSpent: number
	timeInterval: "seconds" | "minutes" | "hours"
	body: string
	tags: string[]
	dateStarted: string
	dateFinished: string
}

export type TASKS_FILTER = {
	type: "story" | "bug"
	timeSpent: number
	timeInterval: "seconds" | "minutes" | "hours"
	shortCode: number
	dateStarted: string
	createdBy: string
	createdAt: string
	dateFinished: string
}


