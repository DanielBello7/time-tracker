import router from "@/config/router";
import handleError from "@/middlewares/handle-error";
import joi from "joi";
import BaseError from "@/lib/base-error";
import UsersService from "@/services/user.service";
import dualAuthorization from "@/middlewares/dual-authorization";

const postBodySchema = joi.object({
  userId: joi.string().required(),
  newPassword: joi.string().required()
});

// dual secured
// update user password
// http://localhost:3000/api/users/password [patch]
router.patch("/api/users/password", dualAuthorization, async (req, res) => {
  const { error, value } = postBodySchema.validate(req.body);
  if (error)
    throw new BaseError(400, error.details[0].message);
  await UsersService.updateUserPassword(value.userId, value.newPassword);
  return res.json({
    msg: "OK",
    status: "success"
  });
});

export default router.handler({ onError: handleError });

