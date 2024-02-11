import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { sync_database_connection } from "./database-connection";

const router = async () => {
  sync_database_connection();
  return createRouter<NextApiRequest, NextApiResponse>();
}

export default router;
