import {
  type TASKS_FILTER,
  type NEW_TASK,
  type TASK,
  type UPDATE_TASK,
  type TASK_DOC,
} from "@/types/task.types";
import type { PaginateOptions, PaginateResult } from "mongoose";
import type { PaginateFilterOptions } from "@/types/global.types";
import TasksModel from "@/models/tasks.model";
import UsersService from "./user.service";
import isValidId from "@/lib/validate-id";
import SharedTasksModel from "@/models/shared-tasks.model";
import BaseError from "@/lib/base-error";
import objectSanitize from "@/lib/object-sanitize";
import databaseConnection from "@/config/database-connection";
import toJson from "@/lib/to-json";
import userService from "./user.service";

databaseConnection();

async function searchTasksUsingTaskTitle(
  title: string, filter: Partial<TASKS_FILTER> = {}, paginate: Partial<PaginateFilterOptions> = {}
): Promise<PaginateResult<TASK_DOC>> {
  const paginated = objectSanitize(paginate);
  const sanitized = objectSanitize(filter);

  const options: PaginateOptions = {
    limit: 1000,
    sort: { createdAt: "descending" },
    populate: [{ path: "createdBy", select: "-password" }],
    ...paginated
  }

  return await TasksModel.paginate({
    title: { $regex: title },
    ...sanitized
  }, options);
}

async function findTaskUsingId(id: string): Promise<TASK> {
  isValidId(id);
  const response = await TasksModel.findOne({ _id: id })
    .populate({ path: "createdBy", select: "-password" });
  if (response) return toJson(response);
  throw new BaseError(404, "task not found");
}

async function getTasks(
  filter: Partial<TASKS_FILTER> = {}, paginate: Partial<PaginateFilterOptions> = {}
): Promise<PaginateResult<TASK>> {
  const paginated = objectSanitize(paginate);
  const sanitized = objectSanitize(filter);

  const options: PaginateOptions = {
    limit: 1000,
    sort: { createdAt: "descending" },
    populate: [{ path: "createdBy", select: "-password" }],
    ...paginated
  }
  return await TasksModel.paginate({
    ...sanitized
  }, options);
}

async function createTask(createdBy: string, data: NEW_TASK): Promise<TASK> {
  isValidId(createdBy);
  await userService.findUserUsingIdWithoutPassword(createdBy);
  const response = await new TasksModel({
    shortCode: Math.floor(Math.random() * 9999999),
    title: data.title,
    type: data.type,
    timeSpent: data.timeSpent,
    timeInterval: data.timeInterval,
    body: data.body,
    tags: data.tags,
    dateStarted: data.dateStarted,
    createdBy,
    dateFinished: data.dateFinished,
  }).save();
  return await findTaskUsingId(response._id);
}

async function createNewTasks(
  userId: string, data: NEW_TASK[]
): Promise<TASK[]> {
  isValidId(userId);
  await UsersService.findUserUsingIdWithoutPassword(userId);
  const response = await Promise.all(data.map(async (item) => {
    try {
      const newTask = await new TasksModel({
        type: item.type,
        title: item.title,
        timeSpent: item.timeSpent,
        timeInterval: item.timeInterval,
        body: item.body,
        tags: item.tags,
        shortCode: Math.floor(Math.random() * 9999999),
        dateStarted: item.dateStarted,
        createdBy: userId,
        dateFinished: item.dateFinished,
      }).save();
      return await findTaskUsingId(newTask._id as unknown as string);
    } catch (error) { return false }
  }));
  return response.filter((item): item is TASK => item !== false);
}

async function updateTask(
  taskId: string, updates: Partial<UPDATE_TASK> = {}
): Promise<TASK> {
  isValidId(taskId);
  await findTaskUsingId(taskId);
  const santized = objectSanitize(updates);
  const response = await TasksModel.findOneAndUpdate(
    { _id: taskId },
    { $set: { ...santized } },
    { upsert: false, new: true }
  );
  if (response) return await findTaskUsingId(response._id as unknown as string);
  throw new BaseError(404, "error updating task");
}

async function deleteTasks(taskIds: string[]): Promise<void> {
  await Promise.all(taskIds.map(async (item) => {
    try {
      isValidId(item);
      await TasksModel.deleteOne({ _id: item });
    } catch { null }
  }));
}

async function deleteAllUserTasks(userId: string): Promise<void> {
  await TasksModel.deleteMany({ createdBy: userId });
  await SharedTasksModel.deleteMany({ sharedBy: userId });
}

async function handleUploadedTask(item: TASK, uploaderId: string): Promise<void> {
  const check = await TasksModel.findOne({ _id: item._id });
  if (!check) {
    await new TasksModel({
      _id: item._id,
      type: item.type,
      title: item.title,
      timeSpent: item.timeSpent,
      timeInterval: item.timeInterval,
      body: item.body,
      tags: item.tags,
      shortCode: item.shortCode,
      dateStarted: item.dateStarted,
      createdBy: uploaderId,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      dateFinished: item.dateFinished
    }).save();
    return
  }
  const checkUserId: any = check.createdBy;
  if (checkUserId === uploaderId) return
  const findShared = await SharedTasksModel.findOne({
    taskId: check._id, sharedTo: uploaderId
  });
  if (findShared) return
  await new SharedTasksModel({
    taskId: check._id,
    sharedBy: check.createdBy,
    sharedTo: uploaderId
  }).save();
  return
}

async function saveUploadedImports(userId: string, uploads: TASK[]): Promise<void> {
  await Promise.all(uploads.map(async (item) => {
    return await handleUploadedTask(item, userId);
  }));
}

export default {
  getTasks,
  deleteAllUserTasks,
  deleteTasks,
  createNewTasks,
  findTaskUsingId,
  updateTask,
  searchTasksUsingTaskTitle,
  saveUploadedImports,
  createTask
}

