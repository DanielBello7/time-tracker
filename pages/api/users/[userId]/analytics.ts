import handleError from "@/lib/handle-error";
import router from "@/lib/router";
import joi from "joi";
import BaseError from "@/lib/base-error";

const querySchema = joi.object({
  userId: joi.string().required()
});

// get the analytics for a particular user
// http://localhost:3000/api/users/:userId/analytics [get]
router.get("/api/users/:userId/analytics", async (req, res) => {
  const { error, value } = querySchema.validate(req.query);
  if (error)
    throw new BaseError(400, error.details[0].message);
  return res.json({
    status: "OK",
    msg: "success"
  });
});

export default router.handler({ onError: handleError });

