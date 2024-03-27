import mongoose from "mongoose";

export type SHARED_TASK = {
	_id: string
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
	sharedTo: {
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
	createdAt: string
	isRead: boolean
	isActive: boolean
	updatedAt: string
}

export interface SHARED_TASK_DOC extends mongoose.Document {
	_id: string
	sharedBy: typeof mongoose.Types.ObjectId
	sharedTo: typeof mongoose.Types.ObjectId
	taskId: typeof mongoose.Types.ObjectId
	isRead: boolean
	isActive: boolean
	createdAt: Date
	updatedAt: Date
}

export type NEW_SHARED_TASK = {
	sharedBy: typeof mongoose.Types.ObjectId | string
	sharedTo: typeof mongoose.Types.ObjectId | string
	taskId: typeof mongoose.Types.ObjectId | string
}

export type SHARED_TASK_FILTER = {
	sharedBy: typeof mongoose.Types.ObjectId | string
	sharedTo: typeof mongoose.Types.ObjectId | string
	taskId: typeof mongoose.Types.ObjectId | string
	isRead: boolean
	isActive: boolean
	createdAt: string
}


