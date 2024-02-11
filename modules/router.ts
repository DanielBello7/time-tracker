import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { NodeRouter } from "next-connect/dist/types/node";
import { sync_database_connection } from "./database-connection";

const router = async (): Promise<NodeRouter<NextApiRequest, NextApiResponse>> => {
  sync_database_connection();
  return createRouter<NextApiRequest, NextApiResponse>();
}

export default router;
