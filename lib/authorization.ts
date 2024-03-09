import type { NextApiRequest, NextApiResponse } from "next";
import type { NextHandler } from "next-connect";
import { getSession } from "next-auth/react";
import BaseError from "./base-error";

export default async function authorization(
  req: NextApiRequest, res: NextApiResponse, next: NextHandler
) {
  const session = await getSession({ req });
  if (session) return await next();
  throw new BaseError(401, "unauthorized");
}

