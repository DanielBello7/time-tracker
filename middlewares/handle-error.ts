import { NextApiRequest, NextApiResponse } from "next";
import convertError from "../lib/convert-error";

export default function handleError(
  err: unknown, _: NextApiRequest, res: NextApiResponse
) {
  const error = convertError(err);
  const statusCode = error.status;
  const msg = error.message;

  const response = {
    code: statusCode,
    msg,
    stack: error.stack,
    context: error.context
  }
  const { stack, context, ...rest } = response
  return res
    .status(statusCode).json(rest);
}

