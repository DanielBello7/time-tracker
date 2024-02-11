import type { UPDATE_USER, NEW_USER, USER } from "@/types/user.types";
import type { PaginateResult } from "mongoose";
import UsersModel from "@/models/users.model";

async function findUserUsingId(id: string): Promise<USER> {
  const response = await UsersModel.findOne({ _id: id });
  if (response) return response
  throw new Error("user not registered");
}

async function getUsers(): Promise<PaginateResult<USER>> {
  return await UsersModel.paginate({}, { limit: 1000 });
}

async function updateUserUsingId(id: string, updates: UPDATE_USER): Promise<USER> {
  await findUserUsingId(id);
  const response = await UsersModel.findOneAndUpdate(
    { _id: id }, updates, { upsert: false, new: true }
  );
  return response as USER;
}

async function updateUserUsingEmail(email: string, updates: UPDATE_USER): Promise<USER> {
  await findUserUsingEmail(email);
  const response = await UsersModel.findOneAndUpdate(
    { email }, updates, { upsert: false, new: true }
  );
  return response as USER;
}

async function findUserUsingEmail(email: string): Promise<USER> {
  const response = await UsersModel.findOne({ email });
  if (response) return response;
  throw new Error("user not registered");
}

async function createNewUser(data: NEW_USER): Promise<USER> {
  const check = await UsersModel.findOne({ email: data.email });
  if (check) throw new Error("user already registered");
  const response = await new UsersModel({
    name: data.name,
    position: data.position,
    email: data.email,
    phone: data.phone,
    country: data.country,
    password: data.password
  }).save();
  return response;
}

export default {
  findUserUsingEmail,
  getUsers,
  findUserUsingId,
  createNewUser,
  updateUserUsingEmail,
  updateUserUsingId,
}

