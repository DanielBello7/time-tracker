import type { NextApiRequest, NextApiResponse } from "next";
import type { NextHandler } from "next-connect";
import { getServerSession } from "next-auth";
import { authenticationOptions } from "@/pages/api/auth/[...nextauth]";
import BaseError from "./base-error";

export default async function authorization(
  req: NextApiRequest, res: NextApiResponse, next: NextHandler
) {
  const session = await getServerSession(req, res, authenticationOptions);
  if (session) return await next();
  throw new BaseError(401, "unauthorized");
}

