import type { NextApiRequest, NextApiResponse } from "next";
import { createMocks } from "node-mocks-http";
import userService from "@/services/user.service";
import userSeed from "../../seeds/user-seed";
import taskSeed from "../../seeds/task-seed";
import taskService from "@/services/task.service";
import sharedTaskExternalHandler from "@/pages/api/shared-tasks/external/[taskId]";
import sharedTaskIdHandler from "@/pages/api/shared-tasks/[shareId]";
import sharedTaskSearchHandler from '@/pages/api/shared-tasks/search/[text]';
import sharedTaskResetHandler from "@/pages/api/shared-tasks/reset/[userId]";
import sharedTaskHandler from "@/pages/api/shared-tasks/index";
import sharedTaskStatusHandler from "@/pages/api/shared-tasks/status";
import sharedTaskService from "@/services/shared-task.service";
import externalSharedTaskService from "@/services/external-shared-task.service";

describe("Testing Shared Task Route", function () {


    it("should return a searched for shared task", async function () {
        const user1 = await userService.createNewUser(userSeed());
        const user2 = await userService.createNewUser(userSeed());

        const task = await taskService.createTask(user1._id, taskSeed());
        const shared = await sharedTaskService.createNewSharedTasks(task._id, user1._id, user2.email);

        const text = shared.taskId.title.slice(0, 2);
        const {
            req, res
        } = createMocks<NextApiRequest, NextApiResponse>({
            method: "GET",
            url: `/api/shared-tasks/search/${text}`,
            query: { text }
        });
        await sharedTaskSearchHandler(req, res);
        const response = res._getJSONData();
        expect(res.statusCode).toEqual(200);
        expect(response.payload.docs.length).toEqual(1);
    });

    it("should return a paginated response of shared tasks", async function () {
        const user1 = await userService.createNewUser(userSeed());
        const user2 = await userService.createNewUser(userSeed());

        const task = await taskService.createTask(user1._id, taskSeed());
        await sharedTaskService.createNewSharedTasks(task._id, user1._id, user2.email);

        const {
            req, res
        } = createMocks<NextApiRequest, NextApiResponse>({
            method: "GET",
            url: "/api/shared-tasks/"
        });

        await sharedTaskHandler(req, res);
        const response = res._getJSONData();
        expect(res.statusCode).toEqual(200);
        expect(response.payload.docs.length).toBeGreaterThanOrEqual(1);
    });

    it("should return a selected shared task", async function () {
        const user1 = await userService.createNewUser(userSeed());
        const user2 = await userService.createNewUser(userSeed());

        const task = await taskService.createTask(user1._id, taskSeed());
        const shared = await sharedTaskService.createNewSharedTasks(task._id, user1._id, user2.email);

        const {
            req, res
        } = createMocks<NextApiRequest, NextApiResponse>({
            method: "GET",
            url: `/api/shared-tasks/${shared._id}`,
            query: { shareId: shared._id }
        });

        await sharedTaskIdHandler(req, res);
        const response = res._getJSONData();
        expect(res.statusCode).toEqual(200);
        expect(response.payload.taskId.title).toEqual(task.title);
    });

    it("should update the status of a shared task", async function () {
        const user1 = await userService.createNewUser(userSeed());
        const user2 = await userService.createNewUser(userSeed());

        const task = await taskService.createTask(user1._id, taskSeed());
        const shared = await sharedTaskService.createNewSharedTasks(task._id, user1._id, user2.email);

        const {
            req, res
        } = createMocks<NextApiRequest, NextApiResponse>({
            method: "PATCH",
            url: `/api/shared-tasks/status/`,
            body: {
                shareId: shared._id,
                isActive: !shared.isActive
            }
        });
        await sharedTaskStatusHandler(req, res);
        const response = res._getJSONData();
        expect(res.statusCode).toEqual(200);
        expect(response.payload.isActive).toEqual(!shared.isActive);
    });

    it("should create a new shared task", async function () {
        const user1 = await userService.createNewUser(userSeed());
        const user2 = await userService.createNewUser(userSeed());

        const task = await taskService.createTask(user1._id, taskSeed());
        const {
            req, res
        } = createMocks<NextApiRequest, NextApiResponse>({
            method: "POST",
            url: `/api/shared-tasks`,
            body: {
                tasks: [
                    { taskId: task._id, sharedTo: user2.email }
                ],
                sharedBy: user1._id
            }
        });

        await sharedTaskHandler(req, res);
        const response = res._getJSONData();
        expect(res.statusCode).toEqual(200);
        expect(response.payload[0].taskId.title).toEqual(task.title);
    });

    it("should delete a set of shared tasks", async function () {
        const user1 = await userService.createNewUser(userSeed());
        const user2 = await userService.createNewUser(userSeed());

        const task = await taskService.createTask(user1._id, taskSeed());
        const shared = await sharedTaskService.createNewSharedTasks(task._id, user1._id, user2.email);
        const {
            req, res
        } = createMocks<NextApiRequest, NextApiResponse>({
            method: "DELETE",
            url: `/api/shared-tasks`,
            body: {
                tasks: [shared._id]
            }
        });

        await sharedTaskHandler(req, res);
        expect(res.statusCode).toEqual(200);
        expect(async () => await sharedTaskService.findSharedTaskUsingId(shared._id)).toThrow;
    });

    it("should reset a user's shared tasks", async function () {
        const user1 = await userService.createNewUser(userSeed());
        const user2 = await userService.createNewUser(userSeed());

        const task = await taskService.createTask(user1._id, taskSeed());
        await sharedTaskService.createNewSharedTasks(task._id, user1._id, user2.email);
        const {
            req, res
        } = createMocks<NextApiRequest, NextApiResponse>({
            method: "DELETE",
            url: `/api/shared-tasks/reset/${user2._id}`,
            query: { userId: user2._id }
        });
        await sharedTaskResetHandler(req, res);
        const response = await sharedTaskService.getSharedTasks({ sharedTo: user2._id });
        expect(res.statusCode).toEqual(200);
        expect(response.docs.length).toEqual(0);
    });

    it("should find an external shared task", async function () {
        const user1 = await userService.createNewUser(userSeed());

        const task = await taskService.createTask(user1._id, taskSeed());
        await externalSharedTaskService.createNewExternalSharedTask({
            sharedBy: user1._id,
            sharedTo: "gokebello@gmail.com",
            taskId: task._id
        });
        const {
            req, res
        } = createMocks<NextApiRequest, NextApiResponse>({
            method: "GET",
            url: `/api/shared-tasks/external/${task._id}`,
            query: { taskId: task._id }
        });
        await sharedTaskExternalHandler(req, res);
        const response = res._getJSONData();
        expect(res.statusCode).toEqual(200);
        expect(response.payload).toHaveProperty("sharedBy");
        expect(response.payload).toHaveProperty("taskId");
        expect(response.payload.taskId.title).toEqual(task.title);
    });

    it.only("should update an external shared task status", async function () {
        const user1 = await userService.createNewUser(userSeed());
        const task = await taskService.createTask(user1._id, taskSeed());
        const initial = await externalSharedTaskService.createNewExternalSharedTask({
            sharedBy: user1._id,
            sharedTo: "gokebello@gmail.com",
            taskId: task._id
        });
        const {
            req, res
        } = createMocks<NextApiRequest, NextApiResponse>({
            method: "PATCH",
            url: `/api/shared-tasks/external/${task._id}`,
            query: { taskId: task._id },
            body: { isActive: !initial.isActive }
        });
        await sharedTaskExternalHandler(req, res);
        const response = res._getJSONData();
        expect(res.statusCode).toEqual(200);
        expect(response.payload.isActive).toEqual(!initial.isActive)
    });
});


