import router from "@/lib/router";
import UsersService from "@/services/user.service";
import joi from "joi";
import handleError from "@/lib/handle-error";
import BaseError from "@/lib/base-error";
import authorization from "@/lib/authorization";

const postBodyQuery = joi.object({
  email: joi.string().email().required()
});

// secured
// check if email is registered
// http://localhost:3000/api/users/is-email-registered [post]
router.use(authorization).post("/api/users/is-email-registered", async (req, res) => {
  const { error, value } = postBodyQuery.validate(req.body);
  if (error)
    throw new BaseError(400, error.details[0].message);
  const response = await UsersService.checkEmail(value.email);
  return res.json({
    msg: "success",
    status: "OK",
    payload: response
  });
});

export default router.handler({ onError: handleError });
