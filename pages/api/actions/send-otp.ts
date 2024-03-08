import router from "@/lib/router";
import handleError from "@/lib/handle-error";
import generator from "otp-generator";
import BaseError from "@/lib/base-error";
import joi from "joi";
import sendEmail from "@/lib/send-email";
import otpEmail from "@/emails/otp-email";
import tokenService from "@/services/token.service";

const postBodySchema = joi.object({
  email: joi.string().email().required(),
});

// send otp email
// http://localhost:3000/api/actions/send-otp/ [post]
router.post("/api/actions/send-otp", async (req, res) => {
  const { error, value } = postBodySchema.validate(req.body);
  if (error)
    throw new BaseError(400, error.details[0].message);

  const token = generator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    specialChars: false,
    upperCaseAlphabets: false
  });

  await tokenService.createNewToken({ email: value.email, token });

  await sendEmail({
    subject: "Core Task OTP Verification Code",
    to: [{ email: value.email }],
    htmlContent: otpEmail(token)
  });
  res.json({
    status: "OK",
    msg: "success"
  });
});

export default router.handler({ onError: handleError });

