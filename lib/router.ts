import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import database_connection from "./database-connection";

database_connection();
const router = createRouter<NextApiRequest, NextApiResponse>();
export default router;
