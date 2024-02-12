import type { PaginateOptions, PaginateResult } from "mongoose";
import type { TASK, TASK_DOC } from "@/types/task.types";
import TasksModel from "@/models/tasks.model";

async function getTasks(): Promise<PaginateResult<TASK>> {
  const options: PaginateOptions = {
    limit: 1000,
    populate: ["createdBy"]
  }
  return await TasksModel.paginate({}, options);
}

async function findTaskUsingId(id: string): Promise<TASK_DOC> {
  const response = await TasksModel.findOne({ _id: id });
  if (response) return response;
  throw new Error("task not found");
}

export default {
  getTasks,
  findTaskUsingId
}

