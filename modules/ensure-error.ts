/**
 * makes sure an error is an error
 * @param data unknown
 * @returns Error
 */
export default function ensureError(data: unknown): Error {
  if (data instanceof Error) return data
  let stringified = "[unable to stringify]";
  try {
    stringified = JSON.stringify(data);
  } catch { }
  const error = new Error(stringified);
  return error;
}

