import mongoose from "mongoose";

export type EXTERNAL_SHARED_TASK = {
	_id: string
	sharedTo: string
	sharedBy: {
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
	taskId: {
		_id: string
		type: "story" | "bug"
		title: string
		timeSpent: number
		timeInterval: "seconds" | "minutes" | "hours"
		body: string
		tags: string[]
		shortCode: number
		dateStarted: string
		createdBy: string
		createdAt: string
		updatedAt: string
		dateFinished: string
	}
	isActive: boolean
	isRead: boolean
	createdAt: string
	updatedAt: string
}

export interface EXTERNAL_SHARED_TASK_DOC extends mongoose.Document {
	_id: string
	sharedTo: string
	sharedBy: typeof mongoose.Types.ObjectId
	taskId: typeof mongoose.Types.ObjectId
	isActive: boolean
	isRead: boolean
	createdAt: Date
	updatedAt: Date
}

export type NEW_EXTERNAL_SHARED_TASK = {
	sharedTo: string
	sharedBy: typeof mongoose.Types.ObjectId | string
	taskId: typeof mongoose.Types.ObjectId | string
}

