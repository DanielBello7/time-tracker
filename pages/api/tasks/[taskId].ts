import TasksService from "@/services/tasks.service";
import router from "@/lib/router";
import joi from "joi";
import handleError from "@/lib/handle-error";
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
  timeSpent: joi.string(),
  title: joi.string(),
  type: joi.string().valid("bug", "story")
});

// get one task
// http://localhost:3000/api/tasks/:taskId [get]
router.get(async (req, res) => {
  const { error, value } = querySchema.validate(req.query);
  if (error)
    throw new BaseError(400, error.details[0].message);

  const response = await TasksService.findTaskUsingId(value.taskId);
  return res.json({
    status: "OK",
    msg: "success",
    payload: response
  });
});

// update one task
// http://localhost:3000/api/tasks/:taskId [patch]
router.patch(async (req, res) => {
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

  const response = await TasksService.updateTask(queryValue.taskId, {
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