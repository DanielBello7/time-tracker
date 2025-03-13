import type { NextApiRequest, NextApiResponse } from "next";
import type { NextHandler } from "next-connect";
import { getServerSession } from "next-auth";
import { authenticationOptions } from "@/pages/api/auth/[...nextauth]";
import BaseError from "../lib/base-error";
import isTestMode from "@/lib/is-test-mode";

export default async function authorization(
  req: NextApiRequest, res: NextApiResponse, next: NextHandler
) {
  if (isTestMode()) return await next();
  const session = await getServerSession(req, res, authenticationOptions);
  if (session) return await next();
  throw new BaseError(401, "unauthorized");
}

