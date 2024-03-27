import authorization from "@/middlewares/authorization";
import handleError from "@/middlewares/handle-error";
import router from "@/config/router";
import joi from "joi";
import TaskService from "@/services/task.service";
import BaseError from "@/lib/base-error";

const querySchema = joi.object({
  text: joi.string().required(),
  type: joi.string().valid("story", "bug"),
  timeSpent: joi.number(),
  timeInterval: joi.string().valid("seconds", "minutes", "hours"),
  shortCode: joi.number(),
  dateStarted: joi.string(),
  createdBy: joi.string(),
  createdAt: joi.string(),
  dateFinished: joi.string(),
  page: joi.number(),
  limit: joi.number()
});


// secured
// get tasks
// http://localhost:3000/api/tasks/search/:text?...rest [get]
router.get("/api/tasks/search/:text", authorization, async (req, res) => {
  const { error, value } = querySchema.validate(req.query);
  if (error)
    throw new BaseError(400, error.details[0].message);

  const { text, page, limit, ...rest } = value;

  const response = await TaskService.searchTasksUsingTaskTitle(text, rest, { page, limit });
  return res.json({
    msg: "success",
    status: "OK",
    payload: response
  });
});

export default router.handler({ onError: handleError });

