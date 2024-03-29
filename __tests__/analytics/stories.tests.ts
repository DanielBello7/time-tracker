import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from "mongoose";
import userSeed from "../seeds/user-seed";
import userService from "@/services/user.service";
import taskSeed from "../seeds/task-seed";
import taskService from "@/services/task.service";

describe.only("Testing Stories Analytics", function () {
    let mongod: MongoMemoryServer;

    beforeAll(async () => {
        const response = await MongoMemoryServer.create();
        mongod = response;
        return await mongoose.connect(response.getUri());
    });

    afterAll(async () => {
        await mongoose.connection.close();
        return await mongod.stop();
    });

    it("should", async function () {
        const user = await userService.createNewUser(userSeed());
        const seed = taskSeed(2, 1);

        console.log("date started", new Date(seed.dateStarted).toLocaleDateString("en-us", { dateStyle: "full" }));
        console.log("date finished", new Date(seed.dateFinished).toLocaleDateString("en-us", { dateStyle: "full" }))
        console.log(seed);
    });
});


