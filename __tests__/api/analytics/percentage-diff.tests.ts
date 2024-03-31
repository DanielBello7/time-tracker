import { getPercentageChangeDifference } from '@/lib/analysis';
import metricsService from '@/services/metrics.service';
import taskService from "@/services/task.service";
import userSeed from "../../seeds/user-seed";
import userService from "@/services/user.service";
import moment from "moment";
import taskSeed from "../../seeds/task-seed";

describe("Testing Stories Analytics", function () {

    it("should return the percentage difference between two numbers where the second is an edge case", function () {
        const current = 200;
        const previous = 0;
        const percentageDiff = getPercentageChangeDifference(current, previous);
        expect(percentageDiff).toEqual(0);
    });

    it("should return the percentage difference between two numbers where the first is an edge case", function () {
        const current = 0;
        const previous = 329;
        const percentageDiff = getPercentageChangeDifference(current, previous);
        expect(percentageDiff).toEqual(-100);
    });

    it("should return the percentage difference between two numbers", function () {
        const current = 500;
        const previous = 230;
        const percentageDiff = getPercentageChangeDifference(current, previous);
        expect(percentageDiff).toEqual(117.39);
    });

    it("should return the percentage difference between two varied numbers", function () {
        const current = 200;
        const previous = 930;
        const percentageDiff = getPercentageChangeDifference(current, previous);
        const value = -78.49;
        expect(percentageDiff).toEqual(value);
    });

    it("should return the percentage difference for current week tasks", async function () {
        const user = await userService.createNewUser(userSeed());

        await taskService.createNewTasks(user._id, [
            taskSeed(moment().startOf("week").add(2, "days").toISOString()),
            taskSeed(moment().startOf("week").add(1, "days").toISOString()),
            taskSeed(moment().startOf("week").add(4, "days").toISOString()),
            taskSeed(moment().startOf("week").add(3, "days").toISOString()),
            taskSeed(moment().startOf("week").add(0, "days").toISOString()),
            taskSeed(moment().startOf("week").add(-1, "weeks").add(2, "days").toISOString()),
            taskSeed(moment().startOf("week").add(-1, "weeks").add(1, "days").toISOString()),
            taskSeed(moment().startOf("week").add(-1, "weeks").add(4, "days").toISOString()),
        ]);

        const response = await metricsService.calculateUserWeekTasksMetrics(user._id, 0);
        expect(response.currentWeekTasksCount).toEqual(5);
        expect(response.percentageDiff).toEqual(66.67);
    });

    it("should return the percentage difference for last week tasks", async function () {
        const user = await userService.createNewUser(userSeed());

        await taskService.createNewTasks(user._id, [
            taskSeed(moment().startOf("week").add(2, "days").toISOString()),
            taskSeed(moment().startOf("week").add(1, "days").toISOString()),
            taskSeed(moment().startOf("week").add(4, "days").toISOString()),
            taskSeed(moment().startOf("week").add(3, "days").toISOString()),
            taskSeed(moment().startOf("week").add(0, "days").toISOString()),

            taskSeed(moment().startOf("week").add(-1, "weeks").add(2, "days").toISOString()),
            taskSeed(moment().startOf("week").add(-1, "weeks").add(1, "days").toISOString()),
            taskSeed(moment().startOf("week").add(-1, "weeks").add(4, "days").toISOString()),

            taskSeed(moment().startOf("week").add(-2, "weeks").add(2, "days").toISOString()),
            taskSeed(moment().startOf("week").add(-2, "weeks").add(4, "days").toISOString()),
            taskSeed(moment().startOf("week").add(-2, "weeks").add(1, "days").toISOString()),
            taskSeed(moment().startOf("week").add(-2, "weeks").add(4, "days").toISOString()),
            taskSeed(moment().startOf("week").add(-2, "weeks").add(1, "days").toISOString()),
            taskSeed(moment().startOf("week").add(-2, "weeks").add(1, "days").toISOString()),
        ]);

        const expected = -50;
        const response = await metricsService.calculateUserWeekTasksMetrics(user._id, -1);
        expect(response.currentWeekTasksCount).toEqual(3);
        expect(response.percentageDiff).toEqual(expected);
    });

    it("should return the percentage difference for last two week tasks", async function () {
        const user = await userService.createNewUser(userSeed());

        await taskService.createNewTasks(user._id, [
            taskSeed(moment().startOf("week").add(2, "days").toISOString()),
            taskSeed(moment().startOf("week").add(-1, "weeks").add(2, "days").toISOString()),
            taskSeed(moment().startOf("week").add(-2, "weeks").add(2, "days").toISOString()),
            taskSeed(moment().startOf("week").add(-2, "weeks").add(4, "days").toISOString()),
            taskSeed(moment().startOf("week").add(-2, "weeks").add(1, "days").toISOString()),
            taskSeed(moment().startOf("week").add(-2, "weeks").add(4, "days").toISOString()),
            taskSeed(moment().startOf("week").add(-2, "weeks").add(1, "days").toISOString()),
            taskSeed(moment().startOf("week").add(-2, "weeks").add(1, "days").toISOString()),
        ]);

        const expected = 0;
        const response = await metricsService.calculateUserWeekTasksMetrics(user._id, -2);
        expect(response.currentWeekTasksCount).toEqual(6);
        expect(response.percentageDiff).toEqual(expected);
    });

    it("should return the percentage difference for current week tasks differently", async function () {
        const user = await userService.createNewUser(userSeed());

        await taskService.createNewTasks(user._id, [
            taskSeed(moment().startOf("week").add(-1, "weeks").add(2, "days").toISOString()),
            taskSeed(moment().startOf("week").add(-1, "weeks").add(1, "days").toISOString()),
        ]);

        const expected = -100;
        const response = await metricsService.calculateUserWeekTasksMetrics(user._id, 0);
        expect(response.currentWeekTasksCount).toEqual(0);
        expect(response.percentageDiff).toEqual(expected);
    });
});


