import router from "@/config/router";
import handleError from "@/middlewares/handle-error";
import BaseError from "@/lib/base-error";
import joi from "joi";
import tokenService from "@/services/token.service";
import dualAuthorization from "@/middlewares/dual-authorization";

const postBodySchema = joi.object({
  otp: joi.string().required(),
});

// dual secured
// send otp email
// http://localhost:3000/api/actions/validate-otp/ [post]
router.post("/api/actions/validate-otp", dualAuthorization, async (req, res) => {
  const { error, value } = postBodySchema.validate(req.body);
  if (error)
    throw new BaseError(400, error.details[0].message);

  const response = await tokenService.findTokenUsingOtp(value.otp);
  const tokenTime = new Date(response.createdAt).getTime();
  const currentTime = new Date().getTime();
  if ((currentTime - tokenTime) > 300000)
    throw new BaseError(400, "token expired");
  await tokenService.deleteEmailTokens(response.email);

  res.json({
    status: "OK",
    msg: "token validation successful"
  });
});

export default router.handler({ onError: handleError });

