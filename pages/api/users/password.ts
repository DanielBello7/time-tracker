import router from "@/lib/router";
import handleError from "@/lib/handle-error";
import joi from "joi";
import BaseError from "@/lib/base-error";
import UsersService from "@/services/user.service";

const postBodySchema = joi.object({
  userId: joi.string().required(),
  newPassword: joi.string().required()
});

// update user password
// http://localhost:3000/api/users/password [patch]
router.patch("/api/users/password", async (req, res) => {
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

