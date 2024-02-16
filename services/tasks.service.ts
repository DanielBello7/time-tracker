import type { PaginateOptions, PaginateResult } from "mongoose";
import type { NEW_TASK, TASK, TASK_DOC, UPDATE_TASK } from "@/types/task.types";
import type { SHARED_TASK } from "@/types/shared-task.types";
import TasksModel from "@/models/tasks.model";
import database_connection from "@/lib/database-connection";
import UsersService from "./users.service";
import SharedTasksModel from "@/models/shared-tasks.model";

database_connection();

async function findTaskUsingId(id: string): Promise<TASK_DOC> {
  const response = await TasksModel.findOne({ _id: id });
  if (response) return response;
  throw new Error("task not found");
}

async function findSharedTask(sharedTaskId: string): Promise<SHARED_TASK> {
  const response = await SharedTasksModel.findOne({ _id: sharedTaskId }).populate([
    "sharedTo", "sharedBy", "taskId"
  ]);
  if (response) return response as any
  throw new Error("task not found");
}

async function getTasks(): Promise<PaginateResult<TASK>> {
  const options: PaginateOptions = {
    limit: 1000,
    populate: ["createdBy"]
  }
  return await TasksModel.paginate({}, options);
}

async function getUserTasks(userId: string): Promise<PaginateResult<TASK>> {
  const options: PaginateOptions = {
    limit: 1000,
    populate: ["createdBy"]
  }
  return await TasksModel.paginate({ createdBy: userId }, options);
}

async function getUserSharedTasks(userId: string): Promise<PaginateResult<SHARED_TASK>> {
  const options: PaginateOptions = {
    limit: 1000,
    populate: ["sharedTo", "sharedBy", "taskId"]
  }
  return await SharedTasksModel.paginate({ sharedTo: userId }, options);
}

async function createNewTasks(userId: string, data: NEW_TASK[]): Promise<TASK[]> {
  await UsersService.findUserUsingId(userId);
  const response = await Promise.all(data.map(async (item) => {
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
    const findItem = await TasksModel.findOne({ _id: newTask._id }, { populate: ["createdBy"] });
    if (findItem) return findItem
  })) as unknown;

  return response as TASK[]
}

async function shareTasks(tasks: string[], from: string, to: string): Promise<SHARED_TASK[]> {
  await UsersService.findUserUsingId(from);
  await UsersService.findUserUsingId(to);

  const response = await Promise.all(tasks.map(async (item) => {
    try {
      const findTask = await findTaskUsingId(item);
      const res = await new SharedTasksModel({
        sharedBy: from,
        sharedTo: to,
        taskId: findTask._id
      }).save();
      return res;
    } catch (error) {
      return false
    }
  }));
  const filtered = response.filter((item) => item !== false) as unknown;
  return filtered as SHARED_TASK[]
}

async function updateTask(taskId: string, updates: UPDATE_TASK): Promise<TASK> {
  await findTaskUsingId(taskId);
  const response = await TasksModel.findOneAndUpdate(
    { _id: taskId },
    { $set: { ...updates } },
    { upsert: false, new: true }
  ) as unknown;
  return response as TASK
}

async function deleteTasks(taskIds: string[]): Promise<void> {
  await Promise.all(taskIds.map(async (item) => {
    await TasksModel.deleteOne({ _id: item });
  }));
}

async function deleteSharedTasks(taskIds: string[]): Promise<void> {
  await Promise.all(taskIds.map(async (item) => {
    await SharedTasksModel.deleteOne({ _id: item });
  }));
}

export default {
  getTasks,
  shareTasks,
  deleteTasks,
  deleteSharedTasks,
  getUserSharedTasks,
  createNewTasks,
  findTaskUsingId,
  getUserTasks,
  updateTask,
  findSharedTask
}

