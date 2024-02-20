import router from "@/lib/router";
import handleError from "@/lib/handle-error";
import BaseError from "@/lib/base-error";
import joi from "joi";
import sendEmail from "@/lib/send-email";

const postBodySchema = joi.object({
  otp: joi.string().required(),
  email: joi.string().email().required(),
});

// send otp email
// http://localhost:3000/api/users/otp/ [post]
router.post("/api/users/otp", async (req, res) => {
  const { error, value } = postBodySchema.validate(req.body);
  if (error)
    throw new BaseError(400, error.details[0].message);
  await sendEmail({
    subject: "Task Manager OTP Verification",
    to: [{ email: value.email }],
    textContent: `This is your otp, don't share it ${value.otp}`
  });
  res.json({
    status: "OK",
    msg: "success"
  });
});

export default router.handler({ onError: handleError });

