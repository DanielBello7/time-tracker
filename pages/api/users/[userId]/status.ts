import authorization from "@/lib/authorization";
import BaseError from "@/lib/base-error";
import handleError from "@/lib/handle-error";
import router from "@/lib/router";
import UsersService from "@/services/user.service";
import joi from "joi";

const patchBodySchema = joi.object({
  isOnboarded: joi.boolean(),
  isEmailVerified: joi.boolean(),
  allowNotifications: joi.boolean()
});

const querySchema = joi.object({
  userId: joi.string().required()
});


// secured
// update user
// http://localhost:3000/api/users/:userId/status [patch]
router.use(authorization).patch("/api/users/:userId/status", async (req, res) => {
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
    isEmailVerified: bodyValue.isEmailVerified,
    allowNotifications: bodyValue.allowNotifications,
    isOnboarded: bodyValue.isOnboarded
  });

  return res.json({
    status: "OK",
    msg: "account updated",
    payload: response
  });
});

export default router.handler({ onError: handleError });
