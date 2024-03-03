import type { SHARED_TASK, SHARED_TASK_DOC } from "@/types/shared-task.types";
import type { PaginateResult, PaginateOptions } from "mongoose";
import BaseError from "@/lib/base-error";
import objectSanitize from "@/lib/object-sanitize";
import validateId from "@/lib/validate-id";
import UserService from "./user.service";
import TaskService from "./task.service";
import SharedTasksModel from "@/models/shared-tasks.model";
import databaseConnection from "@/lib/database-connection";

databaseConnection();

export type SHARED_TASK_FILTER = {
  sharedBy: string
  sharedTo: string
  taskId: string
  isRead: boolean
  isActive: boolean
  createdAt: string
}

export type PAGINATE_OPTIONS_FILTER = {
  page: number
  limit: number
}

async function searchSharedTasksUsingTaskTitle(
  title: string, filter?: SHARED_TASK_FILTER
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
  const sanitized = objectSanitize(filter ?? {});
  const response = await SharedTasksModel.paginate(
    { ...sanitized },
    options
  );
  const adjusted = response.docs.filter((item) => item.taskId !== null) as any;
  response.docs = adjusted
  return response
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

async function getSharedTasks(
  filter?: Partial<SHARED_TASK_FILTER>, paginateOptions?: Partial<PAGINATE_OPTIONS_FILTER>
): Promise<PaginateResult<SHARED_TASK>> {
  const sanitizedFilter = objectSanitize(filter ?? {});
  const sanitizedOptions = objectSanitize(paginateOptions ?? {});

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
    ],
    ...sanitizedOptions
  }
  const response = await SharedTasksModel.paginate({ ...sanitizedFilter }, options);
  return response as any;
}

async function createNewSharedTasks(
  taskId: string, from: string, toEmail: string
): Promise<SHARED_TASK> {
  validateId(taskId);

  await UserService.findUserUsingId(from);
  const sharedToUser = await UserService.findUserUsingEmail(toEmail);

  if (sharedToUser._id === from)
    throw new BaseError(400, "you cannot share to yourself");

  const response = await TaskService.findTaskUsingId(taskId);

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

async function deleteSharedTasks(
  taskIds: string[]
): Promise<void> {
  await Promise.all(taskIds.map(async (item) => {
    validateId(item);
    await SharedTasksModel.deleteOne({ _id: item });
  }));
}

async function deleteAllTaskSharedToUser(
  userId: string
): Promise<void> {
  await SharedTasksModel.deleteMany({ sharedTo: userId });
}

async function updateSharedTaskStatus(
  id: string, data: Partial<{ isActive: boolean; isRead: boolean }>
): Promise<SHARED_TASK> {
  const sanitize = objectSanitize(data);
  const response = await SharedTasksModel.findOneAndUpdate(
    { _id: id }, { $set: sanitize }, { new: true, upsert: false }
  );
  if (response) return response as any;
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

