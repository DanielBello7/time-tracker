import { Types } from "mongoose";
import BaseError from "./base-error";

export default function isValidId(id: string): void {
  if (Types.ObjectId.isValid(id)) return
  throw new BaseError(400, "Provided string isn't a valid id");
}

