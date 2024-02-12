import BaseError from "@/lib/base-error";
import ensureError from "@/lib/ensure-error";

export default function convertError(error: unknown) {
  if (error instanceof BaseError) return error;
  let err = ensureError(error);
  const baseError = new BaseError(500, err.message, {
    cause: err,
    context: JSON.stringify(err, Object.getOwnPropertyNames(err))
  });
  return baseError;
}

