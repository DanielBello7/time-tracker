import type { NEW_TOKEN, TOKEN_DOC } from "@/types/tokens.types";
import BaseError from "@/lib/base-error";
import TokenModel from "@/models/token.model";
import { isValid } from "date-fns";

async function findTokenUsingOtp(
  value: string
): Promise<TOKEN_DOC> {
  const response = await TokenModel.findOne({ otp: value });
  if (response) return response;
  throw new BaseError(404, "token not available");
}

async function findTokenUsingId(
  tokenId: string
): Promise<TOKEN_DOC> {
  isValid(tokenId);
  const response = await TokenModel.findOne({ _id: tokenId });
  if (response) return response;
  throw new BaseError(404, "token unavailable");
}

async function createNewToken(
  data: NEW_TOKEN
): Promise<TOKEN_DOC> {
  const response = await new TokenModel({
    otp: data.token,
    email: data.email
  }).save();
  return response;
}

async function deleteEmailTokens(
  email: string
): Promise<void> {
  await TokenModel.deleteMany({ email });
}

async function deleteTokenUsingOtp(
  otp: string
): Promise<void> {
  await TokenModel.deleteOne({ otp });
}

export default {
  deleteEmailTokens,
  deleteTokenUsingOtp,
  createNewToken,
  findTokenUsingId,
  findTokenUsingOtp
}

