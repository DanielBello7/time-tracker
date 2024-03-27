import authorization from "@/middlewares/authorization";
import joi from "joi";
import router from "@/config/router";
import handleError from "@/middlewares/handle-error";
import BaseError from "@/lib/base-error";
import UsersService from "@/services/user.service";

const postBodySchema = joi.object({
  userId: joi.string().required(),
  newEmail: joi.string().required()
});

// secured
// update user email
// http://localhost:3000/api/users/email [patch]
router.patch("/api/users/email", authorization, async (req, res) => {
  const { error, value } = postBodySchema.validate(req.body);
  if (error)
    throw new BaseError(400, error.details[0].message);
  const response = await UsersService.updateUserEmail(value.userId, value.newEmail)
  return res.json({
    msg: "OK",
    status: "success",
    payload: response
  });
});

export default router.handler({ onError: handleError });

