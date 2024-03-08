import UsersService from "@/services/user.service";
import router from "@/lib/router";
import handleError from "@/lib/handle-error";
import joi from "joi";
import BaseError from "@/lib/base-error";
import dualAuthorization from "@/lib/dual-authorization";

const querySchema = joi.object({
  email: joi.string().email().required()
});

// dual secured
// get users by email
// http://localhost:3000/api/users/:email [get]
router.use(dualAuthorization).get("/api/users/email/:email", async (req, res) => {
  const { error, value } = querySchema.validate(req.query);
  if (error)
    throw new BaseError(400, error.details[0].message);

  const response = await UsersService.findUserUsingEmail(value.email);
  return res.json({
    status: "OK",
    msg: "success",
    payload: response
  });
});

export default router.handler({ onError: handleError });

