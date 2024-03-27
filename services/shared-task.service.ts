import type { SHARED_TASK, SHARED_TASK_DOC, SHARED_TASK_FILTER } from "@/types/shared-task.types";
import type { PaginateResult, PaginateOptions } from "mongoose";
import { PaginateFilterOptions } from "@/types/global.types";
import BaseError from "@/lib/base-error";
import objectSanitize from "@/lib/object-sanitize";
import isValidId from "@/lib/validate-id";
import UserService from "./user.service";
import TaskService from "./task.service";
import SharedTasksModel from "@/models/shared-tasks.model";
import databaseConnection from "@/config/database-connection";
import toJson from "@/lib/to-json";

databaseConnection();

async function searchSharedTasksUsingTaskTitle(
  title: string,
  filter: Partial<SHARED_TASK_FILTER> = {},
  paginate: Partial<PaginateFilterOptions> = {}
): Promise<PaginateResult<SHARED_TASK_DOC>> {
  const sanitized = objectSanitize(filter);
  const paginated = objectSanitize(paginate);

  const options: PaginateOptions = {
    sort: { createdAt: "descending" },
    limit: 1000,
    populate: [
      { path: "sharedTo", select: "-password" },
      { path: "sharedBy", select: "-password" },
      {
        path: "taskId",
        match: {
          title: { $regex: title }
        }
      }
    ],
    ...paginated
  }

  const response = await SharedTasksModel.paginate({
    ...sanitized
  }, options);
  const adjusted = response.docs.filter((item) => item.taskId !== null);
  response.docs = adjusted
  return response;
}

async function findSharedTaskUsingId(
  sharedTaskId: string
): Promise<SHARED_TASK> {
  isValidId(sharedTaskId);
  const response = await SharedTasksModel.findOne({ _id: sharedTaskId })
    .populate([
      { path: "sharedTo", select: "-password" },
      { path: "sharedBy", select: "-password" },
      { path: "taskId" }
    ]);
  if (response) return toJson(response);
  throw new BaseError(404, "task not found");
}

async function getSharedTasks(
  filter: Partial<SHARED_TASK_FILTER> = {}, paginate: Partial<PaginateFilterOptions> = {}
): Promise<PaginateResult<SHARED_TASK>> {
  const sanitized = objectSanitize(filter);
  const paginated = objectSanitize(paginate);

  const options: PaginateOptions = {
    limit: 1000,
    sort: { createdAt: "descending" },
    populate: [
      { path: "sharedTo", select: "-password" },
      { path: "sharedBy", select: "-password" },
      { path: "taskId" }
    ],
    ...paginated
  }
  return await SharedTasksModel.paginate({
    ...sanitized
  }, options);
}

async function createNewSharedTasks(
  taskId: string, from: string, toEmail: string
): Promise<SHARED_TASK> {
  isValidId(taskId);

  await UserService.findUserUsingId(from);
  const sharedToUser = await UserService.findUserUsingEmail(toEmail);

  if (sharedToUser._id === from) throw new BaseError(400, "you cannot share to yourself");
  const response = await TaskService.findTaskUsingId(taskId);

  const newShared = await new SharedTasksModel({
    sharedBy: from,
    sharedTo: sharedToUser._id,
    taskId: response._id
  }).save();
  return await findSharedTaskUsingId(newShared._id as unknown as string);
}

async function deleteSharedTasks(taskIds: string[]): Promise<void> {
  await Promise.all(taskIds.map(async (item) => {
    try {
      isValidId(item);
      await SharedTasksModel.deleteOne({ _id: item });
    } catch { null }
  }));
}

async function deleteAllTaskSharedToUser(userId: string): Promise<void> {
  await SharedTasksModel.deleteMany({ sharedTo: userId });
}

async function updateSharedTaskStatus(
  id: string, data: Partial<{ isActive: boolean; isRead: boolean }>
): Promise<SHARED_TASK> {
  const sanitize = objectSanitize(data);
  const response = await SharedTasksModel.findOneAndUpdate(
    { _id: id },
    { $set: { ...sanitize } },
    { new: true, upsert: false }
  );
  if (response) return await findSharedTaskUsingId(response._id as unknown as string);
  throw new BaseError(404, "unable to update shared task");
}

export default {
  searchSharedTasksUsingTaskTitle,
  findSharedTaskUsingId,
  getSharedTasks,
  deleteSharedTasks,
  deleteAllTaskSharedToUser,
  updateSharedTaskStatus,
  createNewSharedTasks
}

