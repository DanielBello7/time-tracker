import authorization from "@/lib/authorization";
import handleError from "@/lib/handle-error";
import router from "@/lib/router";
import joi from "joi";
import BaseError from "@/lib/base-error";
import metricsService from "@/services/metrics.service";


const querySchema = joi.object({
  userId: joi.string().required()
});

// secured
// get the analytics for a particular user
// http://localhost:3000/api/users/:userId/two-dimensions [get]
router.use(authorization).get("/api/users/:userId/two-dimensions", async (req, res) => {
  const { error, value } = querySchema.validate(req.query);
  if (error) throw new BaseError(400, error.details[0].message);
  const response = await metricsService.getUserInsightsData(value.userId);
  return res.json({
    status: "OK",
    msg: "success",
    payload: response
  });
});

export default router.handler({ onError: handleError });

