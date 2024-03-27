import authorization from "@/middlewares/authorization";
import BaseError from "@/lib/base-error";
import handleError from "@/middlewares/handle-error";
import router from "@/config/router";
import joi from "joi";
import TaskService from "@/services/task.service";

const postBodySchema = joi.object({
  tasks: joi.array().items(joi.object({
    type: joi.string().valid("bug", "story").required(),
    title: joi.string().required(),
    timeSpent: joi.number().required(),
    timeInterval: joi.string().valid("seconds", "minutes", "hours").required(),
    body: joi.string().required(),
    tags: joi.array().items(joi.string()).required(),
    dateStarted: joi.string().required(),
    dateFinished: joi.string().required()
  })).required(),
  userId: joi.string().required()
});

const deleteBodySchema = joi.object({
  tasks: joi.array().items(joi.string()).required()
});

const querySchema = joi.object({
  type: joi.string().valid("bug", "story"),
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
// create task
// http://localhost:3000/api/tasks [post]
router.post("/api/tasks", authorization, async (req, res) => {
  const { error, value } = postBodySchema.validate(req.body);
  if (error)
    throw new BaseError(400, error.details[0].message);
  const response = await TaskService.createNewTasks(value.userId, value.tasks);
  return res.json({
    status: "OK",
    msg: "tasks created",
    payload: response
  });
});


// secured
// get tasks
// http://localhost:3000/api/tasks [get]
router.get("/api/tasks", authorization, async (req, res) => {
  const { error, value } = querySchema.validate(req.query);
  if (error)
    throw new BaseError(400, error.details[0].message);

  const { page, limit, ...rest } = value;
  const response = await TaskService.getTasks(rest, { page, limit });

  return res.json({
    status: "OK",
    msg: "success",
    payload: response
  });
});


// secured
// delete tasks 
// http://localhost:3000/api/tasks [delete]
router.delete("/api/tasks", authorization, async (req, res) => {
  const { error, value } = deleteBodySchema.validate(req.body);
  if (error)
    throw new BaseError(400, error.details[0].message);

  await TaskService.deleteTasks(value.tasks);
  return res.json({
    status: "OK",
    msg: "delete success"
  });
});

export default router.handler({ onError: handleError });


