import authorization from "@/lib/authorization";
import type { STATS } from "@/types/stats.types";
import handleError from "@/lib/handle-error";
import router from "@/lib/router";
import joi from "joi";
import BaseError from "@/lib/base-error";
import MetricsService from "@/services/metrics.service";

const querySchema = joi.object({
  userId: joi.string().required()
});

// secured
// get the metrics for a particular user
// http://localhost:3000/api/users/:userId/metrics [get]
router.get("/api/users/:userId/metrics", authorization, async (req, res) => {
  const { error, value } = querySchema.validate(req.query);
  if (error)
    throw new BaseError(400, error.details[0].message);
  const lastWeekStats = await MetricsService.calculateWeekTaskMetrics(value.userId, -1);

  const stats: STATS[] = [
    {
      amount: lastWeekStats.bugsCompleted,
      _id: "1",
      description:
        "This is an insight about the total amount of bugs completed last week",
      sub: `${lastWeekStats.perChangeDiffInBugs}% difference from the previous week`,
      title: "Bugs Insight",
    },
    {
      amount: lastWeekStats.storiesCompleted,
      _id: "2",
      description:
        "This is an insight about the total amount of stories completed last week",
      sub: `${lastWeekStats.perChangeDiggInStories}% difference from the previous week`,
      title: "Stories Insight",
    },
    {
      amount: lastWeekStats.totalCompleted,
      _id: "3",
      description:
        "This is an insight about the total amount of tasks completed last week",
      sub: `${lastWeekStats.perChangeDiffInTotal}% difference from the previous week`,
      title: "Tasks Insight",
    },
  ];

  return res.json({
    status: "OK",
    msg: "success",
    payload: stats
  });
});

export default router.handler({ onError: handleError });

