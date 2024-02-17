import type { UPDATE_USER, NEW_USER, USER } from "@/types/user.types";
import type { PaginateResult } from "mongoose";
import UsersModel from "@/models/users.model";
import BaseError from "@/lib/base-error";
import database_connection from "@/lib/database-connection";
import validateId from "@/lib/validate-id";
import objectSanitize from "@/lib/object-sanitize";

database_connection();

async function confirmIfEmailIsRegistered(email: string): Promise<boolean> {
  const response = await UsersModel.findOne({ email });
  if (response) return true
  return false
}

async function createNewUser(data: NEW_USER): Promise<USER> {
  const check = await UsersModel.findOne({ email: data.email });
  if (check) throw new BaseError(401, "user already registered");
  const response = await new UsersModel({
    name: data.name,
    position: data.position,
    email: data.email,
    phone: data.phone,
    country: data.country,
    password: data.password
  }).save();
  const findNewUser = await UsersModel.findOne({ _id: response._id }).select("-password");
  if (findNewUser) return findNewUser;
  throw new BaseError(500, "cannot find newly created user");
}

async function findUserUsingId(id: string): Promise<USER> {
  validateId(id);
  const response = await UsersModel.findOne({ _id: id });
  if (response) return response
  throw new BaseError(404, "user not registered");
}

async function findUserUsingEmail(email: string): Promise<USER> {
  const response = await UsersModel.findOne({ email });
  if (response) return response;
  throw new BaseError(404, "user not registered");
}

async function getUsers(): Promise<PaginateResult<USER>> {
  return await UsersModel.paginate({}, {
    limit: 1000,
    select: "-password"
  });
}

async function updateUserUsingId(id: string, updates: UPDATE_USER): Promise<USER> {
  validateId(id);
  await findUserUsingId(id);
  const sanitized = objectSanitize(updates);
  const response = await UsersModel.findOneAndUpdate(
    { _id: id }, { $set: { ...sanitized } }, { upsert: false, new: true }
  ).select("-password");
  return response as USER;
}

async function updateUserUsingEmail(email: string, updates: UPDATE_USER): Promise<USER> {
  await findUserUsingEmail(email);
  const sanitized = objectSanitize(updates);
  const response = await UsersModel.findOneAndUpdate(
    { email }, { $set: { ...sanitized } }, { upsert: false, new: true }
  ).select("-password");
  return response as USER;
}

async function deleteUser(userId: string): Promise<void> {
  validateId(userId);
  await UsersModel.deleteOne({ _id: userId });
}

export default {
  findUserUsingEmail,
  deleteUser,
  getUsers,
  findUserUsingId,
  createNewUser,
  updateUserUsingEmail,
  updateUserUsingId,
  confirmIfEmailIsRegistered
}

