import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from "mongoose";

if (TextEncoder) {
    let mongod: MongoMemoryServer;

    beforeAll(async () => {
        const response = await MongoMemoryServer.create();
        mongod = response;
        return await mongoose.connect(response.getUri());
    }, 15000);

    afterAll(async () => {
        await mongoose.connection.close();
        return await mongod.stop();
    });
}



