import metricsService from '@/services/metrics.service';
import taskService from "@/services/task.service";
import userSeed from "../../seeds/user-seed";
import userService from "@/services/user.service";
import moment from "moment";
import taskSeed from "../../seeds/task-seed";

describe("Testing Stories Analytics", function () {

    it("should return accurate task metrics", async function () {
        const user = await userService.createNewUser(userSeed());

        await taskService.createNewTasks(user._id, [
            taskSeed(moment().startOf("week").add(2, "days").toISOString(), "bug"),
            taskSeed(moment().startOf("week").add(1, "days").toISOString(), "bug"),
            taskSeed(moment().startOf("week").add(4, "days").toISOString(), "bug"),
            taskSeed(moment().startOf("week").add(3, "days").toISOString(), "story"),
            taskSeed(moment().startOf("week").add(0, "days").toISOString(), "story"),
            taskSeed(moment().startOf("week").add(-1, "weeks").add(2, "days").toISOString(), "bug"),
            taskSeed(moment().startOf("week").add(-1, "weeks").add(1, "days").toISOString(), "story"),
            taskSeed(moment().startOf("week").add(-1, "weeks").add(4, "days").toISOString(), "story"),
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


