import type { NEW_TOKEN, TOKEN } from "@/types/tokens.types";
import isValidId from "@/lib/validate-id";
import BaseError from "@/lib/base-error";
import toJson from "@/lib/to-json";
import TokenModel from "@/models/token.model";

async function findTokenUsingOtp(value: string): Promise<TOKEN> {
  const response = await TokenModel.findOne({ otp: value });
  if (response) return toJson(response);
  throw new BaseError(404, "token not available");
}

async function findTokenUsingId(tokenId: string): Promise<TOKEN> {
  isValidId(tokenId);
  const response = await TokenModel.findOne({ _id: tokenId });
  if (response) return toJson(response);
  throw new BaseError(404, "token unavailable");
}

async function createNewToken(data: NEW_TOKEN): Promise<TOKEN> {
  const response = await new TokenModel({
    otp: data.token,
    email: data.email
  }).save();
  return toJson(response);
}

async function deleteEmailTokens(email: string): Promise<void> {
  await TokenModel.deleteMany({ email });
}

async function deleteTokenUsingOtp(otp: string): Promise<void> {
  await TokenModel.deleteOne({ otp });
}

export default {
  deleteEmailTokens,
  deleteTokenUsingOtp,
  createNewToken,
  findTokenUsingId,
  findTokenUsingOtp
}

