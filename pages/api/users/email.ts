import joi from "joi";
import router from "@/lib/router";
import handleError from "@/lib/handle-error";
import BaseError from "@/lib/base-error";
import UsersService from "@/services/user.service";

const postBodySchema = joi.object({
  userId: joi.string().required(),
  newEmail: joi.string().required()
});

// update user email
// http://localhost:3000/api/users/email [patch]
router.patch("/api/users/email", async (req, res) => {
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

