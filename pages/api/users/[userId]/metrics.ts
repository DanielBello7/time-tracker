import handleError from "@/lib/handle-error";
import router from "@/lib/router";
import joi from "joi";
import BaseError from "@/lib/base-error";
import { STATS } from "@/types/stats.types";
import MetricsService from "@/services/metrics.service";

const querySchema = joi.object({
  userId: joi.string().required()
});

// get the metrics for a particular user
// http://localhost:3000/api/users/:userId/metrics [get]
router.get("/api/users/:userId/metrics", async (req, res) => {
  const { error, value } = querySchema.validate(req.query);
  if (error)
    throw new BaseError(400, error.details[0].message);

  const currentWeekTasks = await MetricsService.getUserWeekTasks(value.userId, 0);
  console.log(currentWeekTasks);

  return res.json({
    status: "OK",
    msg: "success"
  });
});

export default router.handler({ onError: handleError });

