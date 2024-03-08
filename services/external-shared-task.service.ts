import type {
  EXTERNAL_SHARED_TASK_DOC,
  EXTERNAL_SHARED_TASK,
  NEW_EXTERNAL_SHARED_TASK
} from "@/types/external-shared.types";
import BaseError from "@/lib/base-error";
import ExternalSharedTasksModel from "@/models/external-shared.model";
import objectSanitize from "@/lib/object-sanitize";
import databaseConnection from "@/lib/database-connection";

databaseConnection();

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

export default {
  findExternalSharedTaskUsingId,
  createNewExternalSharedTask,
  updateExternalSharedTaskStatus,
  findExternalSharedTaskUsingTaskId,
}

