import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import databaseConnection from "./database-connection";

databaseConnection();
const router = createRouter<NextApiRequest, NextApiResponse>();
export default router;
