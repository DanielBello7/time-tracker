import type { NextApiRequest, NextApiResponse } from "next";
import { createMocks } from "node-mocks-http";
import userSeed from "../../seeds/user-seed";
import taskUploadHandler from "@/pages/api/tasks/upload";
import taskResetHandler from "@/pages/api/tasks/reset/[userId]";
import taskSearchHandler from "@/pages/api/tasks/search/[text]";
import userService from "@/services/user.service";
import taskService from "@/services/task.service";
import taskSeed from "../../seeds/task-seed";
import taskIdHandler from "@/pages/api/tasks/[taskId]";
import taskHandler from "@/pages/api/tasks/index";

describe("Testing Tasks Route", function () {

    it("should return a paginated list of tasks", async function () {
        const user = await userService.createNewUser(userSeed());
        await taskService.createNewTasks(user._id, Array.from(new Array(3), () => {
            return taskSeed();
        }));
        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            url: "/api/tasks/",
            method: "GET"
        });
        await taskHandler(req, res);
        const response = res._getJSONData();
        expect(res.statusCode).toEqual(200);
        expect(response.payload.docs.length).toBeGreaterThanOrEqual(3);
    });

    it("should return a selected task using it's id", async function () {
        const user = await userService.createNewUser(userSeed());
        const tasks = await taskService.createNewTasks(user._id, [taskSeed()]);
        const taskId = tasks[0]._id;
        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "GET",
            url: `/api/tasks/${taskId}/`,
            query: { taskId }
        });
        await taskIdHandler(req, res);
        const response = res._getJSONData();
        expect(res.statusCode).toEqual(200);
        expect(response.payload).toHaveProperty("createdBy");
    });

    it("should create a new task", async function () {
        const user = await userService.createNewUser(userSeed());
        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "POST",
            url: "/api/tasks",
            body: {
                tasks: [taskSeed()],
                userId: user._id
            }
        });
        await taskHandler(req, res);
        const response = res._getJSONData();
        expect(res.statusCode).toEqual(200);
        expect(response.payload.length).toBeGreaterThanOrEqual(1);
    });

    it("should delete a task", async function () {
        const user = await userService.createNewUser(userSeed());
        const tasks = await taskService.createNewTasks(user._id, [taskSeed()]);
        const taskId = tasks[0]._id;
        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "DELETE",
            url: `/api/tasks`,
            body: {
                tasks: [taskId]
            }
        });
        await taskHandler(req, res);
        const response = res._getJSONData();
        expect(res.statusCode).toEqual(200);
        expect(response.msg).toEqual("delete success");
    });

    it("should upload an imported task", async function () {
        const user1 = await userService.createNewUser(userSeed());
        const user2 = await userService.createNewUser(userSeed());
        const tasks = await taskService.createNewTasks(user1._id, [taskSeed()]);
        const { __v, ...rest }: any = tasks[0]
        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "POST",
            url: `/api/tasks/upload`,
            body: {
                userId: user2._id,
                tasks: [{
                    ...rest,
                    createdBy: {
                        avatar: tasks[0].createdBy.avatar,
                        email: tasks[0].createdBy.email,
                        name: tasks[0].createdBy.name
                    }
                }]
            }
        });
        await taskUploadHandler(req, res);
        expect(res.statusCode).toEqual(200);
    });

    it("should reset a user's tasks", async function () {
        const user = await userService.createNewUser(userSeed());
        await taskService.createNewTasks(user._id, Array.from(new Array(3), () => taskSeed()));
        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "DELETE",
            url: `/api/tasks/reset/${user._id}`,
            query: { userId: user._id }
        });
        await taskResetHandler(req, res);
        const confirmation = await taskService.getTasks({ createdBy: user._id });
        expect(res.statusCode).toEqual(200);
        expect(confirmation.docs.length).toEqual(0);
    });

    it("should be able to return tasks searched by title", async function () {
        const user = await userService.createNewUser(userSeed());
        const tasks = await taskService.createNewTasks(user._id, [
            taskSeed(),
            taskSeed(),
            taskSeed(),
        ]);
        const text = tasks[0].title.slice(0, 2);
        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "GET",
            url: `/api/tasks/search/${text}`,
            query: { text }
        });
        await taskSearchHandler(req, res);
        const response = res._getJSONData();
        expect(res.statusCode).toEqual(200);
        expect(response.payload.docs.length).toBeGreaterThanOrEqual(1);
        expect(response.payload.docs[0].title).toEqual(tasks[0].title);
    });
});


