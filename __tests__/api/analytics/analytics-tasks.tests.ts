import metricsService from '@/services/metrics.service';
import taskService from "@/services/task.service";
import userSeed from "../../seeds/user-seed";
import userService from "@/services/user.service";
import moment from "moment";
import taskSeed from "../../seeds/task-seed";

describe("Testing Stories Analytics", function () {

    it("should return tasks created this week", async function () {
        const user = await userService.createNewUser(userSeed());
        await taskService.createNewTasks(user._id, [
            taskSeed(),
            taskSeed(),
        ]);

        const response = await metricsService.getUserWeekTasks(user._id);
        expect(response.length).toEqual(2);
    });

    it("should return tasks created last week", async function () {
        const user = await userService.createNewUser(userSeed());

        // this returns a date within last week, precisely 2 days before sunday of this week (friday)
        const offsetAmount = -2
        const offsetDate = moment().startOf("week").add(offsetAmount, "days").toISOString()
        await taskService.createNewTasks(user._id, [
            taskSeed(),
            taskSeed(),
            taskSeed(offsetDate)
        ]);

        const response = await metricsService.getUserWeekTasks(user._id, -1);
        expect(response.length).toEqual(1);
    });

    it("should return tasks created two weeks ago", async function () {
        const user = await userService.createNewUser(userSeed());

        const offsetAmount = -2
        // this returns a date within last 2 weeks, precisely 2 days within last 2 weeks (tuesday)
        const offsetDate = moment().startOf("week").add(offsetAmount, "weeks").add(2, "days").toISOString();
        // this returns a date within last 2 weeks, precisely 4 days within last 2 weeks (thursday)
        const secondOffsetDate = moment().startOf("week").add(offsetAmount, "weeks").add(4, "days").toISOString();

        await taskService.createNewTasks(user._id, [
            taskSeed(),
            taskSeed(offsetDate),
            taskSeed(offsetDate),
            taskSeed(secondOffsetDate),
        ]);

        const response = await metricsService.getUserWeekTasks(user._id, -2);
        expect(response.length).toEqual(3);
    });
});


