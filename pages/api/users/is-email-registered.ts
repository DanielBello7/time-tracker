import router from "@/config/router";
import UsersService from "@/services/user.service";
import joi from "joi";
import handleError from "@/middlewares/handle-error";
import BaseError from "@/lib/base-error";
import dualAuthorization from "@/middlewares/dual-authorization";

const postBodyQuery = joi.object({
  email: joi.string().email().required()
});

// dual secured
// check if email is registered
// http://localhost:3000/api/users/is-email-registered [post]
router.post("/api/users/is-email-registered", dualAuthorization, async (req, res) => {
  const { error, value } = postBodyQuery.validate(req.body);
  if (error)
    throw new BaseError(400, error.details[0].message);
  const response = await UsersService.isEmailRegistered(value.email);
  return res.json({
    msg: "success",
    status: "OK",
    payload: response
  });
});

export default router.handler({ onError: handleError });
