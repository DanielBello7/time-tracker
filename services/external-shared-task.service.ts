import {
	type NEW_EXTERNAL_SHARED_TASK,
	type EXTERNAL_SHARED_TASK,
} from "@/types/external-shared.types";
import BaseError from "@/lib/base-error";
import ExternalSharedTasksModel from "@/models/external-shared.model";
import objectSanitize from "@/lib/object-sanitize";
import databaseConnection from "@/config/database-connection";
import toJson from "@/lib/to-json";
import isValidId from "@/lib/validate-id";

databaseConnection();

async function checkIfDocumentExistsUsingTaskId(
	taskId: string
): Promise<EXTERNAL_SHARED_TASK | null> {
	isValidId(taskId);
	const response = await ExternalSharedTasksModel.findOne({ taskId })
		.populate([
			{ path: "sharedBy", select: "-password" },
			{ path: "taskId" }
		]);
	if (response) return toJson(response);
	return null;
}

async function findExternalSharedTaskUsingTaskId(
	taskId: string
): Promise<EXTERNAL_SHARED_TASK> {
	isValidId(taskId);
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
	isValidId(sharedId);
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
	[data.sharedBy, data.taskId].forEach((item: any) => isValidId(item));
	const response = await new ExternalSharedTasksModel({
		sharedBy: data.sharedBy,
		taskId: data.taskId,
		sharedTo: [data.sharedTo],
	}).save();
	return await findExternalSharedTaskUsingId(response._id as unknown as string);
}

async function updateExternalSharedTaskStatusUsingTaskId(
	taskId: string, updates: Partial<{ isActive: boolean; isRead: boolean }> = {}
): Promise<EXTERNAL_SHARED_TASK> {
	isValidId(taskId);
	const sanitize = objectSanitize(updates);
	const response = await ExternalSharedTasksModel.findOneAndUpdate(
		{ taskId },
		{ $set: { ...sanitize } },
		{ new: true, upsert: false }
	);
	if (response) return await findExternalSharedTaskUsingId(response._id as unknown as string);
	throw new BaseError(404, "error updating task");
}

async function addNewSharedToUsingTaskId(
	taskId: string, sharedTo: string
) {
	isValidId(taskId);
	const response = await ExternalSharedTasksModel.findOneAndUpdate(
		{ taskId },
		{ $push: { sharedTo } },
		{ new: true, upsert: false }
	);
	if (response) return await findExternalSharedTaskUsingId(response._id as unknown as string);
	throw new BaseError(404, "error updating task");
}

async function addNewSharedToUsingExternalSharedTaskId(
	id: string, sharedTo: string
) {
	isValidId(id);
	const response = await ExternalSharedTasksModel.findOneAndUpdate(
		{ _id: id },
		{ $push: { sharedTo } },
		{ new: true, upsert: false }
	);
	if (response) return await findExternalSharedTaskUsingId(response._id as unknown as string);
	throw new BaseError(404, "error updating task");
}

export default {
	findExternalSharedTaskUsingId,
	createNewExternalSharedTask,
	updateExternalSharedTaskStatusUsingTaskId,
	findExternalSharedTaskUsingTaskId,
	addNewSharedToUsingTaskId,
	addNewSharedToUsingExternalSharedTaskId,
	checkIfExistsUsingTaskId: checkIfDocumentExistsUsingTaskId
}

