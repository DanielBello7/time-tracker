import mongoose from "mongoose";

export type UPLOAD = {
	_id: string
	uploadedBy: {
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
	url: string
	mimetype: string
	size: number
	createdAt: string
	updatedAt: string
}

export interface UPLOAD_DOC extends mongoose.Document {
	_id: string
	uploadedBy: typeof mongoose.Types.ObjectId
	url: string
	mimetype: string
	size: number
	createdAt: Date
	updatedAt: Date
}


