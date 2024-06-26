import authorization from "@/middlewares/authorization";
import handleError from "@/middlewares/handle-error";
import router from "@/config/router";
import joi from "joi";
import BaseError from "@/lib/base-error";
import MetricsService from "@/services/metrics.service";

const querySchema = joi.object({
  userId: joi.string().required()
});

// secured
// get the analytics for a particular user
// http://localhost:3000/api/users/:userId/three-dimensions [get]
router.get("/api/users/:userId/three-dimensions", authorization, async (req, res) => {
  const { error, value } = querySchema.validate(req.query);
  if (error)
    throw new BaseError(400, error.details[0].message);
  const response = await MetricsService.getUserPercentageData(value.userId);
  return res.json({
    status: "OK",
    msg: "success",
    payload: response
  });
});

export default router.handler({ onError: handleError });

