import metricsService from '@/services/metrics.service';
import taskService from "@/services/task.service";
import userSeed from "../seeds/user-seed";
import userService from "@/services/user.service";
import moment from "moment";
import taskSeed from "../seeds/task-seed";

describe.only("Testing Stories Analytics", function () {

    it("should return accurate task metrics", async function () {
        const user = await userService.createNewUser(userSeed());

        await taskService.createNewTasks(user._id, [
            taskSeed(-1, -4, moment().startOf("week").add(2, "days").toDate(), "bug"),
            taskSeed(-3, -6, moment().startOf("week").add(1, "days").toDate(), "bug"),
            taskSeed(-2, -9, moment().startOf("week").add(4, "days").toDate(), "bug"),
            taskSeed(-3, -9, moment().startOf("week").add(3, "days").toDate(), "story"),
            taskSeed(-3, -9, moment().startOf("week").add(0, "days").toDate(), "story"),
            taskSeed(-2, -5, moment().startOf("week").add(-1, "weeks").add(2, "days").toDate(), "bug"),
            taskSeed(-2, -3, moment().startOf("week").add(-1, "weeks").add(1, "days").toDate(), "story"),
            taskSeed(-2, -3, moment().startOf("week").add(-1, "weeks").add(4, "days").toDate(), "story"),
        ]);

        const response = await metricsService.calculateWeekTaskMetrics(user._id, 0);
        expect(response.bugsCompleted).toEqual(3);
        expect(response.storiesCompleted).toEqual(2);
        expect(response.totalCompleted).toEqual(5);
        expect(response.perChangeDiffInBugs).toEqual(200);
        expect(response.perChangeDiffInTotal).toEqual(66.67);
        expect(response.perChangeDiggInStories).toEqual(0);
    });
});


