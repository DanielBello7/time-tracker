import UsersService from "@/services/user.service";
import router from "@/config/router";
import handleError from "@/middlewares/handle-error";
import joi from "joi";
import BaseError from "@/lib/base-error";
import dualAuthorization from "@/middlewares/dual-authorization";

const querySchema = joi.object({
  email: joi.string().email().required()
});

// dual secured
// get users by email
// http://localhost:3000/api/users/:email [get]
router.get("/api/users/email/:email", dualAuthorization, async (req, res) => {
  const { error, value } = querySchema.validate(req.query);
  if (error) throw new BaseError(400, error.details[0].message);
  const response = await UsersService.findUserUsingEmailWithoutPassword(value.email);
  return res.json({
    status: "OK",
    msg: "success",
    payload: response
  });
});

export default router.handler({ onError: handleError });

