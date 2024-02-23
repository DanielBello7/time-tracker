import type { TASK } from "@/types/task.types";
import { getWeekLimitDates } from "@/lib/analysis";
import TasksModel from "@/models/tasks.model";
import UsersService from "./users.service";
import UsersModel from "@/models/users.model";

async function getUserWeekTasks(
  userId: string, offset: number = 0, type?: "bug" | "story",
): Promise<TASK[]> {
  await UsersService.findUserUsingId(userId);
  const [weekStart, weekEnd] = getWeekLimitDates(offset);
  const response = await TasksModel.find({
    createdBy: userId,
    createdAt: {
      $gte: weekStart,
      $lte: weekEnd
    },
    type
  }).populate(["createdBy"]);
  return response as any
}


export default {
  getUserWeekTasks
}

