import metricsService from '@/services/metrics.service';
import taskService from "@/services/task.service";
import userSeed from "../../seeds/user-seed";
import userService from "@/services/user.service";
import moment from "moment";
import taskSeed from "../../seeds/task-seed";

describe("Testing Stories Analytics", function () {

    it("should return tasks created this week", async function () {
        const user = await userService.createNewUser(userSeed());
        // this simply means this task was finished -1 days ago from today which is yesterday
        // also means this task was started -2 days ago from today which is the day before yesterday
        await taskService.createNewTasks(user._id, [
            taskSeed(-1, -2),
            taskSeed(-1, -2),
        ]);

        const response = await metricsService.getUserWeekTasks(user._id);
        expect(response.length).toEqual(2);
    });

    it("should return tasks created last week", async function () {
        const user = await userService.createNewUser(userSeed());

        // this returns a date within last week, precisely 2 days before sunday of this week (friday)
        const offsetAmount = -2
        const offsetDate = moment().startOf("week").add(offsetAmount, "days").toDate();
        await taskService.createNewTasks(user._id, [
            taskSeed(-1, -3),
            taskSeed(-1, -4),
            taskSeed(-2, -5, offsetDate)
        ]);

        const response = await metricsService.getUserWeekTasks(user._id, -1);
        expect(response.length).toEqual(1);
    });

    it("should return tasks created two weeks ago", async function () {
        const user = await userService.createNewUser(userSeed());

        const offsetAmount = -2
        // this returns a date within last 2 weeks, precisely 2 days within last 2 weeks (tuesday)
        const offsetDate = moment().startOf("week").add(offsetAmount, "weeks").add(2, "days").toDate();
        // this returns a date within last 2 weeks, precisely 4 days within last 2 weeks (thursday)
        const secondOffsetDate = moment().startOf("week").add(offsetAmount, "weeks").add(4, "days").toDate();

        await taskService.createNewTasks(user._id, [
            taskSeed(-1, -1),
            taskSeed(-2, -5, offsetDate),
            taskSeed(-2, -3, offsetDate),
            taskSeed(-2, -3, secondOffsetDate),
        ]);

        const response = await metricsService.getUserWeekTasks(user._id, -2);
        expect(response.length).toEqual(3);
    });
});


