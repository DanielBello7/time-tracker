import type { NextApiRequest, NextApiResponse } from "next";
import { createMocks } from "node-mocks-http";
import userSeed from "../seeds/user-seed";
import usersHandler from "@/pages/api/users/index";
import userIdHandler from "@/pages/api/users/[userId]/index";
import userStatusHandler from "@/pages/api/users/[userId]/status";
import userService from "@/services/user.service";
import userAuthenticateHandler from "@/pages/api/users/authenticate";
import userIsEmailRegisteredHandler from "@/pages/api/users/is-email-registered";
import userPasswordHandler from "@/pages/api/users/password";
import userEmailHandler from "@/pages/api/users/email/index";
import userIdEmailHandler from "@/pages/api/users/email/[email]";
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from "mongoose";

describe("Testing Users Route", function () {
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

    it("should create a new user", async function () {
        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            url: "/api/users/",
            method: "POST",
            body: userSeed()
        });
        await usersHandler(req, res);
        const response = res._getJSONData();
        expect(res.statusCode).toEqual(200)
        expect(response).toHaveProperty("payload");
        expect(response.payload).toHaveProperty("name");
    });

    it("should return a paginated list of users", async function () {
        await userService.createNewUser(userSeed());
        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            url: "/api/users/",
            method: "GET"
        });
        await usersHandler(req, res);
        const response = res._getJSONData();
        expect(res.statusCode).toEqual(200);
        expect(response).toHaveProperty("payload");
        expect(response.payload).toHaveProperty("docs");
        expect(response.payload.docs.length).toBeGreaterThanOrEqual(1);
    });

    it("should return a selected user", async function () {
        const user = await userService.createNewUser(userSeed());
        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            url: '/api/users/:userId/',
            method: "GET",
            query: { userId: user._id }
        });
        await userIdHandler(req, res);
        const response = res._getJSONData();
        expect(res.statusCode).toEqual(200)
        expect(response).toHaveProperty("payload");
        expect(response.payload).toHaveProperty("name");
        expect(response.payload.name).toEqual(user.name);
    });

    it("should return a filtered paginated response", async function () {
        await Promise.all(Array.from(["nigeria", "guinea", "guinea"], async (item) => {
            const user = await userService.createNewUser({
                ...userSeed(),
                country: item
            });
            return user;
        }));

        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            url: '/api/users/',
            method: "GET",
            query: { country: "guinea" }
        });
        await usersHandler(req, res);
        const response = res._getJSONData();
        expect(res.statusCode).toEqual(200);
        expect(response).toHaveProperty("payload");
        expect(response.payload).toHaveProperty("docs");
        expect(response.payload.docs.length).toEqual(2);
    });

    it("should delete a user", async function () {
        const user = await userService.createNewUser(userSeed());
        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            url: '/api/users/:userId/',
            method: "DELETE",
            query: { userId: user._id }
        });
        await userIdHandler(req, res);
        const {
            req: request,
            res: response
        } = createMocks<NextApiRequest, NextApiResponse>({
            url: '/api/users/:userId/',
            method: "GET",
            query: { userId: user._id }
        });
        await userIdHandler(request, response);
        expect(res.statusCode).toEqual(200);
        expect(response.statusCode).toEqual(404);
    });

    it("should update a user", async function () {
        const user = await userService.createNewUser(userSeed());
        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            url: '/api/users/:userId/',
            method: "PATCH",
            query: { userId: user._id },
            body: {
                position: "developer"
            }
        });
        await userIdHandler(req, res);
        const {
            req: request,
            res: response
        } = createMocks<NextApiRequest, NextApiResponse>({
            url: '/api/users/:userId/',
            method: "GET",
            query: { userId: user._id }
        });
        await userIdHandler(request, response);
        const resolved = response._getJSONData();
        expect(res.statusCode).toEqual(200);
        expect(response.statusCode).toEqual(200);
        expect(user.position).toEqual("undefined");
        expect(resolved).toHaveProperty("payload");
        expect(resolved.payload).toHaveProperty("position");
        expect(resolved.payload.position).toEqual("developer");
    });

    it("should update a user's status", async function () {
        const user = await userService.createNewUser(userSeed());
        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            url: '/api/users/:userId/status/',
            method: "PATCH",
            query: { userId: user._id },
            body: {
                isEmailVerified: true
            }
        });
        await userStatusHandler(req, res);
        const resolved = res._getJSONData();
        expect(user.isEmailVerified).toEqual(false);
        expect(res.statusCode).toEqual(200);
        expect(resolved).toHaveProperty("payload");
        expect(resolved.payload).toHaveProperty("isEmailVerified");
        expect(resolved.payload.isEmailVerified).toEqual(true);
    });

    it("should authenticate a user's password", async function () {
        const user = await userService.createNewUser(userSeed());
        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            url: '/api/users/authenticate/',
            method: "POST",
            body: {
                userId: user._id,
                password: "test"
            }
        });
        await userAuthenticateHandler(req, res);
        const resolved = res._getJSONData();
        expect(res.statusCode).toEqual(200);
        expect(resolved.payload).toEqual(true);
    });

    it("should confirm if a user is registered", async function () {
        const user = await userService.createNewUser(userSeed());
        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            url: '/api/users/is-email-registered/',
            method: "POST",
            body: { email: user.email }
        });
        await userIsEmailRegisteredHandler(req, res);
        const {
            req: request,
            res: response
        } = createMocks<NextApiRequest, NextApiResponse>({
            url: '/api/users/is-email-registered/',
            method: "POST",
            body: { email: "crazy@example.com" }
        });
        await userIsEmailRegisteredHandler(request, response);
        const resResolve = res._getJSONData();
        const responseResolve = response._getJSONData();
        expect(res.statusCode).toEqual(200);
        expect(response.statusCode).toEqual(200);
        expect(resResolve.payload).toEqual(true);
        expect(responseResolve.payload).toEqual(false);
    });

    it.skip("should update a user's password", async function () {
        const user = await userService.createNewUser(userSeed());
        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            url: '/api/users/password/',
            method: "DELETE",
            // body: {
            //     userId: user._id,
            //     newPassword: "test2"
            // }
        });
        await userPasswordHandler(req, res);
        const resResolved = res._getJSONData();
        console.log({ resResolved, sts: res.statusCode });

        // const {
        //     req: request,
        //     res: response
        // } = createMocks<NextApiRequest, NextApiResponse>({
        //     url: '/api/users/authenticate/',
        //     method: "POST",
        //     body: {
        //         userId: user._id,
        //         password: "test2"
        //     }
        // });
        // await userAuthenticateHandler(request, response);

        // const resResolved = res._getJSONData();
        // const responseResolved = response._getJSONData();

        // console.log({ resResolved, responseResolved });

        // expect(res.statusCode).toEqual(200);
        // expect(response.statusCode).toEqual(200);
        // expect(responseResolved.payload).toEqual(true);
    });

    it.skip("should update a user's email", async function () {
        const user = await userService.createNewUser(userSeed());
        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "PATCH",
            url: '/api/users/email',
            body: {
                userId: user._id,
                newEmail: "user@example.com"
            }
        });
        await userEmailHandler(req, res);
        const findUser = await userService.findUserUsingIdWithoutPassword(user._id);
        const resResolved = res._getJSONData();
        console.log(req.url, resResolved);
    });

    it("should get users using the email", async function () {
        const user = await userService.createNewUser(userSeed());
        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            url: '/api/users/email/:email/',
            method: "GET",
            query: { email: user.email }
        });
        await userIdEmailHandler(req, res);
        const result = res._getJSONData();
        expect(res.statusCode).toEqual(200);
        expect(result).toHaveProperty("payload");
        expect(result.payload).toHaveProperty("email");
        expect(result.payload.email).toEqual(user.email);
    });
});

