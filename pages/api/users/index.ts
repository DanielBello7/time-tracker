import { NEW_USER } from "@/types/user.types";
import UsersService from "@/services/users.service";
import router from "@/lib/router";
import handleError from "@/lib/handle-error";
import joi from "joi";
import BaseError from "@/lib/base-error";

const postBodySchema = joi.object({
  country: joi.string().required(),
  email: joi.string().required(),
  name: joi.string().required(),
  password: joi.string().required(),
  phone: joi.string().required(),
  position: joi.string().required()
});

// get users
// http://localhost:3000/api/users [get]
router.get(async (_, res) => {
  const response = await UsersService.getUsers();
  return res.json({
    status: "OK",
    msg: "success",
    payload: response
  });
});

// create new user
// http://localhost:3000/api/users [post]
router.post(async (req, res, _) => {
  const { error, value } = postBodySchema.validate(req.body);
  if (error) throw new BaseError(400, error.details[0].message);
  const required: NEW_USER = {
    country: value.country,
    email: value.email,
    name: value.name,
    password: value.password,
    phone: value.phone,
    position: value.role
  }
  const response = await UsersService.createNewUser(required);
  res.json({
    status: "OK",
    msg: "success",
    payload: response
  });
});

export default router.handler({ onError: handleError });

