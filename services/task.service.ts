import type { NEW_TASK, TASK, TASK_DOC, UPDATE_TASK } from "@/types/task.types";
import type { PaginateOptions, PaginateResult } from "mongoose";
import type { PAGINATE_OPTIONS_FILTER } from "./shared-task.service";
import TasksModel from "@/models/tasks.model";
import UsersService from "./user.service";
import validateId from "@/lib/validate-id";
import SharedTasksModel from "@/models/shared-tasks.model";
import BaseError from "@/lib/base-error";
import objectSanitize from "@/lib/object-sanitize";
import databaseConnection from "@/lib/database-connection";

databaseConnection();

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

async function searchTasksUsingTaskTitle(
  title: string,
  filter?: Partial<TASKS_FILTER>,
  paginateOptions?: Partial<PAGINATE_OPTIONS_FILTER>
): Promise<PaginateResult<TASK_DOC>> {
  const sanitizedOptions = objectSanitize(paginateOptions ?? {});
  const sanitizedFilter = objectSanitize(filter ?? {});

  const options: PaginateOptions = {
    limit: 1000,
    sort: { createdAt: "descending" },
    populate: [{ path: "createdBy", select: "-password" }],
    ...sanitizedOptions
  }

  const response = await TasksModel.paginate({ title: { $regex: title }, ...sanitizedFilter }, options);
  return response;
}

async function findTaskUsingId(id: string): Promise<TASK_DOC> {
  validateId(id);
  const response = await TasksModel.findOne({ _id: id }).populate({
    path: "createdBy",
    select: "-password"
  });
  if (response) return response;
  throw new BaseError(404, "task not found");
}

async function getTasks(
  filter?: TASKS_FILTER,
  paginateOptions?: PAGINATE_OPTIONS_FILTER
): Promise<PaginateResult<TASK>> {
  const sanitized = objectSanitize(filter ?? {});
  const sanitizedOptions = objectSanitize(paginateOptions ?? {});

  const options: PaginateOptions = {
    limit: 1000,
    sort: { createdAt: "descending" },
    populate: [{ path: "createdBy", select: "-password" }],
    ...sanitizedOptions
  }
  const response = await TasksModel.paginate({ ...sanitized }, options);
  return response as any;
}

async function createNewTasks(
  userId: string, data: NEW_TASK[]
): Promise<TASK[]> {
  validateId(userId);
  await UsersService.findUserUsingId(userId);

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
      const findItem = await TasksModel.findOne({ _id: newTask._id }).populate({
        path: "createdBy",
        select: "-password"
      });
      if (findItem) return findItem
      throw new Error("error finding item");
    } catch (error) { return false }
  }));

  return response.filter((item) => item !== false) as any;
}

async function updateTask(
  taskId: string, updates: UPDATE_TASK
): Promise<TASK> {
  validateId(taskId);
  await findTaskUsingId(taskId);
  const santized = objectSanitize(updates);
  const response = await TasksModel.findOneAndUpdate(
    { _id: taskId },
    { $set: { ...santized } },
    { upsert: false, new: true }
  ).populate([{ path: "createdBy", select: "-password" }]) as unknown;
  return response as TASK
}

async function deleteTasks(taskIds: string[]): Promise<void> {
  await Promise.all(taskIds.map(async (item) => {
    validateId(item);
    await TasksModel.deleteOne({ _id: item });
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

async function saveUploadedImports(
  userId: string, uploads: TASK[]
): Promise<void> {
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
  saveUploadedImports
}

