import type { PaginateOptions, PaginateResult } from "mongoose";
import type { NEW_TASK, TASK, TASK_DOC, UPDATE_TASK } from "@/types/task.types";
import type { SHARED_TASK, SHARED_TASK_DOC } from "@/types/shared-task.types";
import TasksModel from "@/models/tasks.model";
import UsersService from "./users.service";
import validateId from "@/lib/validate-id";
import SharedTasksModel from "@/models/shared-tasks.model";
import BaseError from "@/lib/base-error";
import objectSanitize from "@/lib/object-sanitize";
import databaseConnection from "@/lib/database-connection";
import ExternalSharedTasksModel from "@/models/external-shared";
import type {
  EXTERNAL_SHARED_TASK,
  EXTERNAL_SHARED_TASK_DOC,
  NEW_EXTERNAL_SHARED_TASK
} from "@/types/external-shared.types";

databaseConnection();

type GET_TASKS_FILTER = {
  createdBy: string
  type: string
}

type FILTER_OPTIONS = {
  page: number
  limit: number
}

async function searchUserTasksUsingTitle(
  userId: string, title: string
): Promise<PaginateResult<TASK_DOC>> {
  const options: PaginateOptions = {
    limit: 1000,
    sort: { createdAt: "descending" },
    populate: [{ path: "createdBy", select: "-password" }],
  }
  const response = await TasksModel.paginate({
    createdBy: userId,
    title: {
      $regex: title
    }
  }, options);
  return response;
}

async function searchUserSharedTasksUsingName(
  userId: string, title: string
): Promise<PaginateResult<SHARED_TASK_DOC>> {
  const options: PaginateOptions = {
    sort: { createdAt: "descending" },
    limit: 1000,
    populate: [
      {
        path: "sharedTo",
        select: "-password"
      },
      {
        path: "sharedBy",
        select: "-password"
      },
      {
        path: "taskId",
        match: {
          title: { $regex: title }
        }
      }
    ]
  }
  const response = await SharedTasksModel.paginate(
    { sharedBy: userId },
    options
  );
  const adjusted = response.docs.filter((item) => item.taskId !== null) as any;
  response.docs = adjusted
  return response
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

async function findSharedTaskUsingId(
  sharedTaskId: string
): Promise<SHARED_TASK> {
  validateId(sharedTaskId);
  const response = await SharedTasksModel.findOne({ _id: sharedTaskId }).populate([
    {
      path: "sharedTo",
      select: "-password"
    },
    {
      path: "sharedBy",
      select: "-password"
    },
    {
      path: "taskId"
    }
  ]);
  if (response) return response as any
  throw new BaseError(404, "task not found");
}

async function getTasks(filter?: GET_TASKS_FILTER, opt?: FILTER_OPTIONS): Promise<PaginateResult<TASK>> {
  const sanitized = objectSanitize(filter ?? {});
  const sanitizedOpts = objectSanitize(opt ?? {});
  const options: PaginateOptions = {
    limit: 1000,
    sort: { createdAt: "descending" },
    populate: [{ path: "createdBy", select: "-password" }],
    ...sanitizedOpts
  }
  return await TasksModel.paginate({ ...sanitized }, options);
}

async function getSharedTasks(): Promise<PaginateResult<SHARED_TASK>> {
  const options: PaginateOptions = {
    limit: 1000,
    sort: { createdAt: "descending" },
    populate: [
      {
        path: "sharedTo",
        select: "-password"
      },
      {
        path: "sharedBy",
        select: "-password"
      },
      {
        path: "taskId"
      }
    ]
  }
  const response = await SharedTasksModel.paginate({}, options);
  return response as any;
}

async function getUserTasks(userId: string, filter?: FILTER_OPTIONS): Promise<PaginateResult<TASK>> {
  validateId(userId);
  const sanitized = objectSanitize(filter ?? {});
  const options: PaginateOptions = {
    limit: 1000,
    sort: { createdAt: "descending" },
    populate: [{ path: "createdBy", select: "-password" }],
    ...sanitized
  }
  return await TasksModel.paginate({ createdBy: userId }, options);
}

async function getUserSharedTasks(
  userId: string
): Promise<PaginateResult<SHARED_TASK>> {
  validateId(userId);
  const options: PaginateOptions = {
    limit: 1000,
    sort: { createdAt: "descending" },
    populate: [
      {
        path: "sharedTo",
        select: "-password"
      },
      {
        path: "sharedBy",
        select: "-password"
      },
      {
        path: "taskId"
      }
    ]
  }
  return await SharedTasksModel.paginate({ sharedTo: userId }, options);
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

async function createNewSharedTasks(
  taskId: string, from: string, toEmail: string
): Promise<SHARED_TASK> {
  validateId(taskId);

  await UsersService.findUserUsingId(from);
  const sharedToUser = await UsersService.findUserUsingEmail(toEmail);

  if (sharedToUser._id === from)
    throw new BaseError(400, "you cannot share to yourself");

  const response = await findTaskUsingId(taskId);

  const newShared = await new SharedTasksModel({
    sharedBy: from,
    sharedTo: sharedToUser._id,
    taskId: response._id
  }).save();

  const found = await SharedTasksModel.findOne({ _id: newShared._id }).populate([
    {
      path: "sharedTo",
      select: "-password"
    },
    {
      path: "sharedBy",
      select: "-password"
    },
    {
      path: "taskId",
      select: "-password"
    }
  ]) as unknown;
  if (found) return found as SHARED_TASK;
  throw new BaseError(500, "Unable to find newly created shared task");
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

async function deleteSharedTasks(taskIds: string[]): Promise<void> {
  await Promise.all(taskIds.map(async (item) => {
    validateId(item);
    await SharedTasksModel.deleteOne({ _id: item });
  }));
}

async function deleteAllUserTasks(userId: string): Promise<void> {
  await TasksModel.deleteMany({ createdBy: userId });
  await SharedTasksModel.deleteMany({ sharedBy: userId });
}

async function deleteAllTaskSharedToUser(
  userId: string
): Promise<void> {
  await SharedTasksModel.deleteMany({ sharedTo: userId });
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

async function updateSharedTaskStatus(
  id: string, data: Partial<{ isActive: boolean; isRead: boolean }>
): Promise<void> {
  const sanitize = objectSanitize(data);
  await SharedTasksModel.updateOne(
    { _id: id }, { $set: sanitize }
  );
}

async function updateExternalSharedTaskStatus(
  taskId: string, data: Partial<{ isActive: boolean; isRead: boolean }>, all: boolean
): Promise<EXTERNAL_SHARED_TASK_DOC> {
  const sanitize = objectSanitize(data);
  if (all) {
    const response = await ExternalSharedTasksModel.findOneAndUpdate(
      { taskId },
      { $set: sanitize },
      { new: true }
    );
    return response as any
  } else {
    await ExternalSharedTasksModel.updateMany(
      { taskId },
      { $set: sanitize }
    );
    return await ExternalSharedTasksModel.findOne({ taskId }) as any;
  }
}

async function createNewExternalSharedTask(
  data: NEW_EXTERNAL_SHARED_TASK
): Promise<EXTERNAL_SHARED_TASK> {
  const response = await new ExternalSharedTasksModel({
    sharedBy: data.sharedBy,
    taskId: data.taskId,
    sharedTo: data.sharedTo,
  }).save();
  return response as any
}

async function findExternalSharedTaskUsingId(
  sharedId: string
): Promise<EXTERNAL_SHARED_TASK> {
  const response = await ExternalSharedTasksModel
    .findOne({ _id: sharedId })
    .populate([
      {
        path: "sharedBy"
      },
      {
        path: "taskId",
        populate: ["createdBy"]
      }
    ]);
  if (response) return response as any
  throw new BaseError(404, "unable to find task");
}

async function findExternalSharedTaskUsingTaskId(
  taskId: string
): Promise<EXTERNAL_SHARED_TASK> {
  const response = await ExternalSharedTasksModel
    .findOne({ taskId })
    .populate([
      {
        path: "sharedBy"
      },
      {
        path: "taskId",
        populate: ["createdBy"]
      }
    ]);
  if (response) return response as any
  throw new BaseError(404, "unable to find task");
}

export default {
  createNewExternalSharedTask,
  getTasks,
  findExternalSharedTaskUsingId,
  findExternalSharedTaskUsingTaskId,
  updateExternalSharedTaskStatus,
  createNewSharedTasks,
  deleteAllUserTasks,
  deleteAllTaskSharedToUser,
  updateSharedTaskStatus,
  deleteTasks,
  getSharedTasks,
  deleteSharedTasks,
  getUserSharedTasks,
  createNewTasks,
  findTaskUsingId,
  getUserTasks,
  updateTask,
  searchUserTasksUsingTitle,
  findSharedTaskUsingId,
  searchUserSharedTasksUsingName,
  saveUploadedImports
}

