import joi from "joi";
import router from "@/config/router";
import handleError from "@/middlewares/handle-error";
import BaseError from "@/lib/base-error";
import UsersService from "@/services/user.service";
import dualAuthorization from "@/middlewares/dual-authorization";

const postBodySchema = joi.object({
  userId: joi.string().required(),
  password: joi.string().required()
});

// dual secured
// get auth with password
// http://localhost:3000/api/users/authenticate [post]
router.post("/api/users/authenticate", dualAuthorization, async (req, res) => {
  const { error, value } = postBodySchema.validate(req.body);
  if (error)
    throw new BaseError(400, error.details[0].message);
  const response = await UsersService.confirmUserPassword(value.userId, value.password);
  return res.json({
    msg: "OK",
    status: "success",
    payload: response
  });
});

export default router.handler({ onError: handleError });

