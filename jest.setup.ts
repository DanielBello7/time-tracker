import '@testing-library/jest-dom';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from "mongoose";

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


