import { getPercentageChangeDifference } from "@/lib/analysis";
import type { TASK } from "@/types/task.types";
import type { TASK_METRICS } from "@/types/stats.types";
import UsersService from "./user.service";
import TasksModel from "@/models/tasks.model";
import moment from "moment";
import objectSanitize from "@/lib/object-sanitize";
import type {
	TWO_DIMENSIONS_CHART_DATA,
	THREE_DIMENSIONS_CHART_DATA
} from "@/types/stats.types";
import databaseConnection from "@/config/database-connection";
import toJson from "@/lib/to-json";

databaseConnection();

type WEEK_TASK_METRICS = TASK_METRICS & {
	title: string
}

/** 
 * This function returns tasks that were created within a certain week
 * The week offset controls the week to return in relation to the current week
 * offset 0 returns tasks created this week, offset 1 returns tasks created lastweek, offset -1 returns tasks created nextweek
 * @param userId String
 * @param offset Number
 * @param type String ["bug", "story"]
 */
async function getUserWeekTasks(
	userId: string, offset: number = 0, type?: "bug" | "story",
): Promise<TASK[]> {
	await UsersService.findUserUsingIdWithoutPassword(userId);

	const weekStart = moment().startOf("week").add(offset, "weeks").toDate();
	const weekEnd = moment().endOf("week").add(offset, "weeks").toDate();

	const sanitized = objectSanitize({
		createdBy: userId,
		dateFinished: { $gte: weekStart, $lte: weekEnd },
		type
	});
	const response = await TasksModel.find(sanitized).populate([{ path: "createdBy", select: "-password" }]);
	return toJson(response);
}


/**
 * This function calculates the percentage difference for a given week's task
 * It uses the previous week's tasks as a basis for comparison with the current week
 * @param userId String
 * @param offset Number
 * @param type ["bug", "story"]
 */
async function calculateUserWeekTasksMetrics(
	userId: string, offset: number = 0, type?: "bug" | "story"
): Promise<{ percentageDiff: number, currentWeekTasksCount: number, offset: number, type?: "bug" | "story", userId: string }> {
	const previousWeekTasksCount = (await getUserWeekTasks(userId, offset - 1, type)).length;
	const currentWeekTasksCount = (await getUserWeekTasks(userId, offset, type)).length;
	return {
		percentageDiff: getPercentageChangeDifference(currentWeekTasksCount, previousWeekTasksCount),
		currentWeekTasksCount,
		offset,
		type,
		userId
	}
}


/**
 * This returns the calculated metrics for all tasks and types of tasks for a particular user
 * @param userId String
 * @param offset Number
 * @returns Promise<TASK_METRICS>
 */
async function calculateWeekTaskMetrics(
	userId: string, offset: number = 0
): Promise<TASK_METRICS> {
	const taskMetricsForSelectedWeek = await calculateUserWeekTasksMetrics(userId, offset);
	const storyMetricsForSelectedWeek = await calculateUserWeekTasksMetrics(userId, offset, "story");
	const bugMetricsForSelectedWeek = await calculateUserWeekTasksMetrics(userId, offset, "bug");

	const resultForCurrentWeek = {
		bugsCompleted: bugMetricsForSelectedWeek.currentWeekTasksCount,
		storiesCompleted: storyMetricsForSelectedWeek.currentWeekTasksCount,
		totalCompleted: taskMetricsForSelectedWeek.currentWeekTasksCount,
		offset
	}

	return {
		...resultForCurrentWeek,
		perChangeDiffInBugs: bugMetricsForSelectedWeek.percentageDiff,
		perChangeDiggInStories: storyMetricsForSelectedWeek.percentageDiff,
		perChangeDiffInTotal: taskMetricsForSelectedWeek.percentageDiff
	}
}


/**
 * This calculates metrics for 3 weeks, current, previous, and last
 * @param userId String
 * @returns Promise<WEEK_TASK_METRICS[]>
 */
async function calculate3WeeksTaskMetrics(
	userId: string
): Promise<WEEK_TASK_METRICS[]> {
	const measurements = [
		{ id: "current-week", offset: 0, title: "Current Week" },
		{ id: "last-week", offset: -1, title: "Last Week" },
		{ id: "previous-week", offset: -2, title: "Previous Week" }
	]

	const response = await Promise.all(measurements.map(async (item) => {
		const result = await calculateWeekTaskMetrics(userId, item.offset);
		return { ...result, title: item.title }
	}));
	return response;
}

async function getUserInsightsData(userId: string): Promise<TWO_DIMENSIONS_CHART_DATA[]> {
	const res = await calculate3WeeksTaskMetrics(userId);
	const response: TWO_DIMENSIONS_CHART_DATA[] = res.map((item) => ({
		name: item.title,
		bd: item.bugsCompleted,
		sd: item.storiesCompleted
	}));
	return response;
}

async function getUserPercentageData(userId: string): Promise<THREE_DIMENSIONS_CHART_DATA[]> {
	const res = await calculate3WeeksTaskMetrics(userId);
	const response: THREE_DIMENSIONS_CHART_DATA[] = res.map((item) => ({
		name: item.title,
		bd: item.perChangeDiffInBugs,
		sd: item.perChangeDiggInStories,
		td: item.perChangeDiffInTotal
	}));
	return response;
}

export default {
	getUserWeekTasks,
	getUserInsightsData,
	getUserPercentageData,
	calculate3WeeksTaskMetrics,
	calculateWeekTaskMetrics,
	calculateUserWeekTasksMetrics
}

