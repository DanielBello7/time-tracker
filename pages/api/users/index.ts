import { NEW_USER } from "@/types/user.types";
import { defaults } from "@/constants";
import UsersService from "@/services/user.service";
import router from "@/config/router";
import handleError from "@/middlewares/handle-error";
import joi from "joi";
import BaseError from "@/lib/base-error";
import authorization from "@/middlewares/authorization";
import dualAuthorization from "@/middlewares/dual-authorization";
import taskService from "@/services/task.service";

const postBodySchema = joi.object({
	country: joi.string().required(),
	email: joi.string().required(),
	name: joi.string().required(),
	password: joi.string().required(),
	phone: joi.string().required(),
	position: joi.string().required()
});

const usersQuerySchema = joi.object({
	avatar: joi.string(),
	name: joi.string(),
	position: joi.string(),
	email: joi.string().email(),
	isEmailVerified: joi.boolean(),
	isOnboarded: joi.boolean(),
	country: joi.string(),
	phone: joi.string(),
	allowNotifications: joi.boolean(),
	createdAt: joi.string(),
	page: joi.number(),
	limit: joi.number()
});


// secured
// get users
// http://localhost:3000/api/users?...rest [get]
router.get("/api/users", authorization, async (req, res) => {
	const { value } = usersQuerySchema.validate(req.query);
	const { page, limit, ...rest } = value;
	const response = await UsersService.getUsers(rest, { page, limit });
	return res.json({
		status: "OK",
		msg: "success",
		payload: response
	});
});


// dual secured
// create new user
// http://localhost:3000/api/users [post]
router.post("/api/users", dualAuthorization, async (req, res, _) => {
	const { error, value } = postBodySchema.validate(req.body);
	if (error) throw new BaseError(400, error.details[0].message);
	const required: NEW_USER = {
		country: value.country,
		email: value.email,
		name: value.name,
		password: value.password,
		phone: value.phone,
		position: value.position
	}
	const response = await UsersService.createNewUser(required);
	await taskService.createNewTasks(response._id, [
		defaults.newBugTask,
		defaults.newStoryTask
	]);
	res.json({
		status: "OK",
		msg: "success",
		payload: response
	});
});


export default router.handler({ onError: handleError });

