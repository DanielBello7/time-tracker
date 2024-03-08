import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import { getSession } from "next-auth/react";
import BaseError from "./base-error";

export default async function authorization(
  req: NextApiRequest, _: NextApiResponse, next: NextHandler
) {
  const session = await getSession({ req });
  if (session) return next();
  throw new BaseError(401, "unauthorized");
}

