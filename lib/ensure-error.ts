import { AxiosError } from "axios";

/**
 * makes sure an error is an error
 * @param data unknown
 * @returns Error
 */
export default function ensureError(err: unknown): Error {
  if (err instanceof AxiosError) {
    err.response?.data.msg
      ? err.message = err.response?.data.msg
      : null
  }
  if (err instanceof Error) return err;
  let stringified = "[Error cannot be stringified]";
  try {
    stringified = JSON.stringify(err);
  } catch { }
  const error = new Error(stringified);
  return error;
}
