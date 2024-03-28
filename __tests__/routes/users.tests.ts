import type { NextApiRequest, NextApiResponse } from "next";
import { createMocks } from "node-mocks-http";
import userSeed from "../seeds/user-seed";
import usersHandler from "@/pages/api/users";

describe("Testing Users Route", function () {

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
    }, 15000);
});

