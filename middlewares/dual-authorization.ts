import { authenticationOptions } from "@/pages/api/auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next";
import type { NextHandler } from "next-connect";
import validateJwt from "../lib/validate-jwt";
import BaseError from "../lib/base-error";
import { getServerSession } from "next-auth";
import isTestMode from "@/lib/is-test-mode";

export default async function dualAuthorization(
  req: NextApiRequest, res: NextApiResponse, next: NextHandler
) {
  if (isTestMode()) return await next();
  const auth_header = req.headers['authorization'];
  const token = auth_header ? auth_header.split(' ')[1] : "";;

  const response = validateJwt(token);
  const session = await getServerSession(req, res, authenticationOptions);

  if (session || response !== false) return await next();
  throw new BaseError(401, "Unauthorized");
}


