import BaseError from "@/lib/base-error";
import handleError from "@/lib/handle-error";
import router from "@/lib/router";
import UsersService from "@/services/users.service";
import joi from "joi";

const patchBodySchema = joi.object({
	country: joi.string(),
	name: joi.string(),
	position: joi.string(),
	phone: joi.string(),
});

const querySchema = joi.object({
	userId: joi.string().required()
});


// find user
// http://localhost:3000/api/users/:userId [get]
router.get("/api/users/:userId", async (req, res) => {
	const { error, value } = querySchema.validate(req.query);
	if (error)
		throw new BaseError(400, error.details[0].message);
	const response = await UsersService.findUserUsingId(value.userId);
	return res.json({
		status: "OK",
		msg: "success",
		payload: response
	});
});

// delete user
// http://localhost:3000/api/users/:userId [delete]
router.delete("/api/users/:userId", async (req, res) => {
	const { value, error } = querySchema.validate(req.query);
	if (error) throw new BaseError(401, error.details[0].message);
	await UsersService.findUserUsingId(value.userId);
	await UsersService.deleteUser(value.userId);
	return res.json({ msg: "user account deleted" });
});

// update user
// http://localhost:3000/api/users/:userId [patch]
router.patch("/api/users/:userId", async (req, res) => {
	const {
		error: bodyError,
		value: bodyValue
	} = patchBodySchema.validate(req.body);

	const {
		error: queryError,
		value: queryValue
	} = querySchema.validate(req.query);

	if (queryError)
		throw new BaseError(401, queryError.details[0].message);

	if (bodyError)
		throw new BaseError(401, bodyError.details[0].message);

	const response = await UsersService.updateUserUsingId(queryValue.userId, {
		country: bodyValue.country,
		name: bodyValue.name,
		phone: bodyValue.phone,
		position: bodyValue.position
	});

	return res.json({
		status: "OK",
		msg: "account updated",
		payload: response
	});
});

export default router.handler({ onError: handleError });
