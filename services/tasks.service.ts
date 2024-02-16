import type { PaginateOptions, PaginateResult } from "mongoose";
import type { NEW_TASK, TASK, TASK_DOC, UPDATE_TASK } from "@/types/task.types";
import type { SHARED_TASK } from "@/types/shared-task.types";
import TasksModel from "@/models/tasks.model";
import database_connection from "@/lib/database-connection";
import UsersService from "./users.service";
import validateId from "@/lib/validate-id";
import SharedTasksModel from "@/models/shared-tasks.model";
import BaseError from "@/lib/base-error";

database_connection();

async function findTaskUsingId(id: string): Promise<TASK_DOC> {
  validateId(id);
  const response = await TasksModel.findOne({ _id: id }).populate(["createdBy"]);
  if (response) return response;
  throw new BaseError(404, "task not found");
}

async function findSharedTask(sharedTaskId: string): Promise<SHARED_TASK> {
  validateId(sharedTaskId);
  const response = await SharedTasksModel.findOne({ _id: sharedTaskId }).populate([
    "sharedTo", "sharedBy", "taskId"
  ]);
  if (response) return response as any
  throw new BaseError(404, "task not found");
}

async function getTasks(): Promise<PaginateResult<TASK>> {
  const options: PaginateOptions = {
    limit: 1000,
    populate: ["createdBy"]
  }
  return await TasksModel.paginate({}, options);
}

async function getSharedTasks(): Promise<PaginateResult<SHARED_TASK>> {
  const options: PaginateOptions = {
    limit: 1000,
    populate: ["sharedTo", "sharedBy", "taskId"]
  }
  const response = await SharedTasksModel.paginate({}, options);
  if (response) return response as any
  throw new BaseError(404, "task not found");
}

async function getUserTasks(userId: string): Promise<PaginateResult<TASK>> {
  validateId(userId);
  const options: PaginateOptions = {
    limit: 1000,
    populate: ["createdBy"]
  }
  return await TasksModel.paginate({ createdBy: userId }, options);
}

async function getUserSharedTasks(userId: string): Promise<PaginateResult<SHARED_TASK>> {
  validateId(userId);
  const options: PaginateOptions = {
    limit: 1000,
    populate: ["sharedTo", "sharedBy", "taskId"]
  }
  return await SharedTasksModel.paginate({ sharedTo: userId }, options);
}

async function createNewTasks(userId: string, data: NEW_TASK[]): Promise<TASK[]> {
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
        shortCode: Math.random() * 9999999,
        dateStarted: item.dateStarted,
        createdBy: userId,
        dateFinished: item.dateFinished,
      }).save();
      const findItem = await TasksModel.findOne({ _id: newTask._id }).populate(["createdBy"]);
      if (findItem) return findItem
      throw new Error("error finding item");
    } catch (error) { return false }
  }));

  const filtered = response.filter((item) => item !== false) as unknown;

  return filtered as TASK[];
}

async function createNewSharedTasks(tasks: string[], from: string, to: string): Promise<SHARED_TASK[]> {
  await UsersService.findUserUsingId(from);

  await UsersService.findUserUsingId(to);

  const response = await Promise.all(tasks.map(async (item) => {
    try {
      validateId(item);
      const findTask = await findTaskUsingId(item);
      return await new SharedTasksModel({
        sharedBy: from,
        sharedTo: to,
        taskId: findTask._id
      }).save();
    } catch (error) { return false }
  }));

  const populated = await Promise.all(response.map(async (item) => {
    if (item === false) return
    try {
      const found = await SharedTasksModel.findOne({ _id: item._id }).populate(["sharedTo", "sharedBy", "taskId"]);
      if (found) return found;
      throw new Error("not found");
    } catch (error) {
      return false;
    }
  }));

  const filtered = populated.filter((item) => item !== false) as unknown;

  return filtered as SHARED_TASK[];
}

async function updateTask(taskId: string, updates: UPDATE_TASK): Promise<TASK> {
  validateId(taskId);
  await findTaskUsingId(taskId);
  const response = await TasksModel.findOneAndUpdate(
    { _id: taskId },
    { $set: { ...updates } },
    { upsert: false, new: true }
  ).populate(["createdBy"]) as unknown;
  return response as TASK
}

async function deleteTasks(taskIds: string[]): Promise<void> {
  await Promise.all(taskIds.map(async (item) => {
    validateId(item);
    await TasksModel.deleteOne({ _id: item });
  }));
}

async function deleteSharedTasks(taskIds: string[]): Promise<void> {
  await Promise.all(taskIds.map(async (item) => {
    validateId(item);
    await SharedTasksModel.deleteOne({ _id: item });
  }));
}

export default {
  getTasks,
  createNewSharedTasks,
  deleteTasks,
  getSharedTasks,
  deleteSharedTasks,
  getUserSharedTasks,
  createNewTasks,
  findTaskUsingId,
  getUserTasks,
  updateTask,
  findSharedTask
}

