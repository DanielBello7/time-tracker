import { authenticationOptions } from "@/pages/api/auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next";
import type { NextHandler } from "next-connect";
import validateJwt from "./validate-jwt";
import BaseError from "./base-error";
import { getServerSession } from "next-auth";

export default async function dualAuthorization(
  req: NextApiRequest, res: NextApiResponse, next: NextHandler
) {
  const auth_header = req.headers['authorization'];
  const token = auth_header ? auth_header.split(' ')[1] : "";

  const response = validateJwt(token);
  const session = await getServerSession(req, res, authenticationOptions);

  if (session || response !== false) return await next();
  throw new BaseError(401, "Unauthorized");
}


