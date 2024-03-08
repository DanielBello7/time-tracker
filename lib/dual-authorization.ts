import type { NextApiRequest, NextApiResponse } from "next";
import type { NextHandler } from "next-connect";
import BaseError from "./base-error";
import { getSession } from "next-auth/react";
import validateJwt from "./validate-jwt";

export default async function dualAuthorization(
  req: NextApiRequest, _: NextApiResponse, next: NextHandler
) {
  const auth_header = req.headers['authorization'];
  const token = auth_header ? auth_header.split(' ')[1] : "";
  const response = validateJwt(token);
  const session = await getSession({ req });
  if (session || response) return next();
  throw new BaseError(401, "Unauthorized");
}


