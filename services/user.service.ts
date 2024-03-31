import {
	type USER_WITH_PASSWORD,
	type UPDATE_USER,
	type USERS_FILTER,
	type NEW_USER,
	type USER_WITHOUT_PASSWORD
} from "@/types/user.types";
import type { PaginateOptions, PaginateResult } from "mongoose";
import type { PaginateFilterOptions } from "@/types/global.types";
import { variables } from "@/constants";
import bcrypt from "bcrypt";
import UsersModel from "@/models/users.model";
import BaseError from "@/lib/base-error";
import databaseConnection from "@/config/database-connection";
import isValidId from "@/lib/validate-id";
import objectSanitize from "@/lib/object-sanitize";
import toJson from "@/lib/to-json";

databaseConnection();

async function isEmailRegistered(email: string): Promise<boolean> {
	const response = await UsersModel.findOne({ email });
	if (response) return true
	return false
}

async function createNewUser(data: NEW_USER): Promise<USER_WITH_PASSWORD> {
	if (await isEmailRegistered(data.email)) throw new BaseError(401, "user already registered");
	const response = await new UsersModel({
		name: data.name,
		position: data.position,
		email: data.email,
		phone: data.phone,
		country: data.country,
		password: data.password
	}).save();
	return await findUserUsingIdWithPassword(response._id as unknown as string);
}

async function findUserUsingIdWithoutPassword(id: string): Promise<USER_WITHOUT_PASSWORD> {
	isValidId(id);
	const response = await UsersModel.findOne({ _id: id }).select("-password");
	if (response) return toJson(response);
	throw new BaseError(404, "user not registered");
}

async function findUserUsingIdWithPassword(id: string): Promise<USER_WITH_PASSWORD> {
	isValidId(id);
	const response = await UsersModel.findOne({ _id: id });
	if (response) return toJson(response);
	throw new BaseError(404, "user not registered");
}

async function findUserUsingEmailWithoutPassword(email: string): Promise<USER_WITHOUT_PASSWORD> {
	const response = await UsersModel.findOne({ email }).select("-password");
	if (response) return toJson(response);
	throw new BaseError(404, "user not registered");
}

async function findUserUsingEmailWithPassword(email: string): Promise<USER_WITH_PASSWORD> {
	const response = await UsersModel.findOne({ email });
	if (response) return toJson(response);
	throw new BaseError(404, "user not registered");
}

async function getUsers(
	filter: Partial<USERS_FILTER> = {}, paginate: Partial<PaginateFilterOptions> = {}
): Promise<PaginateResult<USER_WITHOUT_PASSWORD>> {
	const paginated = objectSanitize(paginate);
	const sanitized = objectSanitize(filter);

	const options: PaginateOptions = {
		limit: 1000,
		select: "-password",
		...paginated
	}

	return await UsersModel.paginate({
		...sanitized
	}, options);
}

async function updateUserUsingId(
	userId: string, updates: Partial<UPDATE_USER> = {}
): Promise<USER_WITHOUT_PASSWORD> {
	isValidId(userId);
	await findUserUsingIdWithoutPassword(userId);
	const sanitized = objectSanitize(updates);
	const response = await UsersModel.findOneAndUpdate(
		{ _id: userId },
		{ $set: { ...sanitized } },
		{ upsert: false, new: true }
	).select("-password");
	if (response) return toJson(response);
	throw new BaseError(500, "error updating user");
}

async function updateUserUsingEmail(
	email: string, updates: Partial<UPDATE_USER> = {}
): Promise<USER_WITHOUT_PASSWORD> {
	await findUserUsingEmailWithoutPassword(email);
	const sanitized = objectSanitize(updates);
	const response = await UsersModel.findOneAndUpdate(
		{ email },
		{ $set: { ...sanitized } },
		{ upsert: false, new: true }
	).select("-password");
	if (response) return toJson(response);
	throw new BaseError(500, "error updating user");
}

async function deleteUser(userId: string): Promise<void> {
	isValidId(userId);
	await UsersModel.deleteOne({ _id: userId });
}

async function confirmUserPassword(
	userId: string, password: string
): Promise<boolean> {
	const user = await findUserUsingIdWithPassword(userId);
	const confirm = bcrypt.compareSync(password, user.password);
	if (confirm) return true
	return false
}

async function updateUserEmail(userId: string, newEmail: string): Promise<USER_WITHOUT_PASSWORD> {
	const response = await UsersModel.findOneAndUpdate(
		{ _id: userId },
		{ $set: { email: newEmail } },
		{ upsert: false, new: true }
	).select("-password");
	if (response) return toJson(response);
	throw new BaseError(500, "error updating user");
}

async function updateUserPassword(
	userId: string, newPassword: string
): Promise<void> {
	await findUserUsingIdWithoutPassword(userId);
	const hashed = bcrypt.hashSync(newPassword, variables.ENV.HASH);
	await UsersModel.findOneAndUpdate(
		{ _id: userId },
		{ $set: { password: hashed } },
		{ upsert: false, new: true }
	);
}

async function validateUserEmail(userId: string): Promise<void> {
	await UsersModel.updateOne(
		{ _id: userId },
		{ $set: { isEmailVerified: true } }
	);
}

export default {
	updateUserEmail,
	updateUserPassword,
	validateUserEmail,
	findUserUsingEmailWithoutPassword,
	deleteUser,
	getUsers,
	findUserUsingIdWithoutPassword,
	findUserUsingIdWithPassword,
	confirmUserPassword,
	createNewUser,
	updateUserUsingEmail,
	updateUserUsingId,
	isEmailRegistered,
	findUserUsingEmailWithPassword
}


