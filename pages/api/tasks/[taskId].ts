import authorization from "@/middlewares/authorization";
import TaskService from "@/services/task.service";
import router from "@/config/router";
import joi from "joi";
import handleError from "@/middlewares/handle-error";
import BaseError from "@/lib/base-error";

const querySchema = joi.object({
  taskId: joi.string().required()
});

const patchBodySchema = joi.object({
  body: joi.string(),
  dateFinished: joi.string(),
  dateStarted: joi.string(),
  tags: joi.array().items(joi.string()),
  timeInterval: joi.string().valid("seconds", "minutes", "hours"),
  timeSpent: joi.number(),
  title: joi.string(),
  type: joi.string().valid("bug", "story")
});


// secured
// get one task
// http://localhost:3000/api/tasks/:taskId [get]
router.get("/api/tasks/:taskId", authorization, async (req, res) => {
  const { error, value } = querySchema.validate(req.query);
  if (error)
    throw new BaseError(400, error.details[0].message);
  const response = await TaskService.findTaskUsingId(value.taskId);
  return res.json({
    status: "OK",
    msg: "success",
    payload: response
  });
});


// secured
// update one task
// http://localhost:3000/api/tasks/:taskId [patch]
router.patch("/api/tasks/:taskId", authorization, async (req, res) => {
  const {
    error: queryError,
    value: queryValue
  } = querySchema.validate(req.query);

  if (queryError)
    throw new BaseError(400, queryError.details[0].message);

  const {
    error,
    value
  } = patchBodySchema.validate(req.body);
  if (error)
    throw new BaseError(400, error.details[0].message);

  const response = await TaskService.updateTask(queryValue.taskId, {
    body: value.body,
    dateFinished: value.dateFinished,
    dateStarted: value.dateStarted,
    tags: value.tags,
    timeInterval: value.timeInterval,
    timeSpent: value.timespent,
    title: value.title,
    type: value.type
  });

  return res.json({
    status: "OK",
    msg: "task update success",
    payload: response
  });
});

export default router.handler({ onError: handleError });
