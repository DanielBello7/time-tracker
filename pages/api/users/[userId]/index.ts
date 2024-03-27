import authorization from "@/middlewares/authorization";
import BaseError from "@/lib/base-error";
import dualAuthorization from "@/middlewares/dual-authorization";
import handleError from "@/middlewares/handle-error";
import router from "@/config/router";
import UserService from "@/services/user.service";
import joi from "joi";

const patchBodySchema = joi.object({
  country: joi.string(),
  name: joi.string(),
  position: joi.string(),
  phone: joi.string(),
  avatar: joi.string(),
});

const querySchema = joi.object({
  userId: joi.string().required()
});


// dual secured
// find user
// http://localhost:3000/api/users/:userId [get]
router.get("/api/users/:userId", dualAuthorization, async (req, res) => {
  const { error, value } = querySchema.validate(req.query);
  if (error)
    throw new BaseError(400, error.details[0].message);
  const response = await UserService.findUserUsingId(value.userId);
  return res.json({
    status: "OK",
    msg: "success",
    payload: response
  });
});


// secured
// delete user
// http://localhost:3000/api/users/:userId [delete]
router.delete("/api/users/:userId", authorization, async (req, res) => {
  const { value, error } = querySchema.validate(req.query);
  if (error) throw new BaseError(401, error.details[0].message);
  await UserService.findUserUsingId(value.userId);
  await UserService.deleteUser(value.userId);
  return res.json({ msg: "user account deleted" });
});


// secured
// update user
// http://localhost:3000/api/users/:userId [patch]
router.patch("/api/users/:userId", authorization, async (req, res) => {
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

  const response = await UserService.updateUserUsingId(queryValue.userId, {
    country: bodyValue.country,
    name: bodyValue.name,
    phone: bodyValue.phone,
    position: bodyValue.position,
    avatar: bodyValue.avatar,
  });

  return res.json({
    status: "OK",
    msg: "account updated",
    payload: response
  });
});


export default router.handler({ onError: handleError });
