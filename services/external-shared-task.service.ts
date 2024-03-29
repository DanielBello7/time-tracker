import {
	type NEW_EXTERNAL_SHARED_TASK,
	type EXTERNAL_SHARED_TASK,
} from "@/types/external-shared.types";
import BaseError from "@/lib/base-error";
import ExternalSharedTasksModel from "@/models/external-shared.model";
import objectSanitize from "@/lib/object-sanitize";
import databaseConnection from "@/config/database-connection";
import toJson from "@/lib/to-json";

databaseConnection();

async function findExternalSharedTaskUsingTaskId(
	taskId: string
): Promise<EXTERNAL_SHARED_TASK> {
	const response = await ExternalSharedTasksModel.findOne({ taskId })
		.populate([
			{ path: "sharedBy", select: "-password" },
			{ path: "taskId" }
		]);
	if (response) return toJson(response);
	throw new BaseError(404, "unable to find task");
}

async function findExternalSharedTaskUsingId(
	sharedId: string
): Promise<EXTERNAL_SHARED_TASK> {
	const response = await ExternalSharedTasksModel.findOne({ _id: sharedId })
		.populate([
			{ path: "sharedBy", select: "-password" },
			{ path: "taskId" }
		]);
	if (response) return toJson(response);
	throw new BaseError(404, "unable to find task");
}

async function createNewExternalSharedTask(
	data: NEW_EXTERNAL_SHARED_TASK
): Promise<EXTERNAL_SHARED_TASK> {
	const response = await new ExternalSharedTasksModel({
		sharedBy: data.sharedBy,
		taskId: data.taskId,
		sharedTo: data.sharedTo,
	}).save();
	return await findExternalSharedTaskUsingId(response._id as unknown as string);
}

async function updateExternalSharedTaskStatusUsingTaskId(
	taskId: string, updates: Partial<{ isActive: boolean; isRead: boolean }> = {}
): Promise<EXTERNAL_SHARED_TASK> {
	const sanitize = objectSanitize(updates);
	const response = await ExternalSharedTasksModel.findOneAndUpdate(
		{ taskId },
		{ $set: { ...sanitize } },
		{ new: true, upsert: false }
	);
	if (response) return await findExternalSharedTaskUsingId(response._id as unknown as string);
	throw new BaseError(404, "error updating task");
}

async function updateUserExternalSharedTasksStatusUsingTaskId(
	taskId: string, updates: Partial<{ isActive: boolean; isRead: boolean }> = {}
): Promise<void> {
	const sanitize = objectSanitize(updates);
	await ExternalSharedTasksModel.updateMany(
		{ taskId },
		{ $set: { ...sanitize } },
		{ upsert: false }
	);
}

export default {
	findExternalSharedTaskUsingId,
	createNewExternalSharedTask,
	updateExternalSharedTaskStatusUsingTaskId,
	findExternalSharedTaskUsingTaskId,
	updateUserExternalSharedTasksStatusUsingTaskId
}

