import { getWeekLimitDates, getPercentageChangeDifference } from "@/lib/analysis";
import type { TASK } from "@/types/task.types";
import type { TASK_METRICS } from "@/types/stats.types";
import UsersService from "./users.service";
import TasksModel from "@/models/tasks.model";
import objectSanitize from "@/lib/object-sanitize";


async function getUserWeekTasks(
  userId: string, offset: number = 0, type?: "bug" | "story",
): Promise<TASK[]> {
  await UsersService.findUserUsingId(userId);
  const [weekStart, weekEnd] = getWeekLimitDates(offset);
  const sanitized = objectSanitize({
    createdBy: userId,
    createdAt: { $gte: weekStart, $lte: weekEnd },
    type
  });
  const response = await TasksModel.find(sanitized).populate(["createdBy"]);
  return response as any
}

async function calculateWeekTaskMetrics(
  userId: string, offset: number = 0
): Promise<TASK_METRICS> {
  const totalTasksForCurrentWeek = await getUserWeekTasks(userId, offset);
  const storiesTasksForCurrentWeek = totalTasksForCurrentWeek.filter((item) => item.type === "story");
  const bugsTasksForCurrentWeek = totalTasksForCurrentWeek.filter((item) => item.type === "bug");

  const resultForCurrentWeek = {
    bugsCompleted: bugsTasksForCurrentWeek.length,
    storiesCompleted: storiesTasksForCurrentWeek.length,
    totalCompleted: totalTasksForCurrentWeek.length,
    offset
  }

  const totalTasksForPreviousWeek = await getUserWeekTasks(userId, offset - 1);
  const storiesTasksForPreviousWeek = totalTasksForCurrentWeek.filter((item) => item.type === "story");
  const bugsTasksForPreviousWeek = totalTasksForCurrentWeek.filter((item) => item.type === "bug");

  const resultForPreviousWeek = {
    bugsCompleted: bugsTasksForPreviousWeek.length,
    storiesCompleted: storiesTasksForPreviousWeek.length,
    totalCompleted: totalTasksForPreviousWeek.length
  }

  const perChangeDiffInBugs = getPercentageChangeDifference(resultForCurrentWeek.bugsCompleted, resultForPreviousWeek.bugsCompleted);
  const perChangeDiggInStories = getPercentageChangeDifference(resultForCurrentWeek.storiesCompleted, resultForPreviousWeek.storiesCompleted);
  const perChangeDiffInTotal = getPercentageChangeDifference(resultForCurrentWeek.totalCompleted, resultForPreviousWeek.totalCompleted);

  return {
    ...resultForCurrentWeek,
    perChangeDiffInBugs,
    perChangeDiggInStories,
    perChangeDiffInTotal
  }
}

async function calculate3WeeksTaskMetrics(
  userId: string
): Promise<TASK_METRICS[]> {
  const measurements = [
    { id: "current-week", offset: 0 },
    { id: "last-week", offset: -1 },
    { id: "previous-week", offset: -2 }
  ]

  const response = await Promise.all(measurements.map(async (item) => {
    const result = await calculateWeekTaskMetrics(userId, item.offset);
    return result;
  }));
  return response;
}

export default {
  getUserWeekTasks,
  calculate3WeeksTaskMetrics,
  calculateWeekTaskMetrics
}

