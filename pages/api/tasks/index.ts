import BaseError from "@/lib/base-error";
import handleError from "@/lib/handle-error";
import router from "@/lib/router";
import joi from "joi";
import TasksService from "@/services/task.service";

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
  createdBy: joi.string(),
  type: joi.string().valid("bug", "story"),
  page: joi.number(),
  limit: joi.number()
});

// create task
// http://localhost:3000/api/tasks [post]
router.post("/api/tasks", async (req, res) => {
  const { error, value } = postBodySchema.validate(req.body);
  if (error)
    throw new BaseError(400, error.details[0].message);
  const response = await TasksService.createNewTasks(value.userId, value.tasks);
  return res.json({
    status: "OK",
    msg: "tasks created",
    payload: response
  });
});

// get tasks
// http://localhost:3000/api/tasks [get]
// http://localhost:3000/api/tasks?createdBy=userid [get]
// http://localhost:3000/api/tasks?type=type [get]
router.get("/api/tasks", async (req, res) => {
  const { error, value } = querySchema.validate(req.query);
  if (error)
    throw new BaseError(400, error.details[0].message);
  const response = await TasksService.getTasks({
    createdBy: value.createdBy,
    type: value.type
  }, {
    page: value.page,
    limit: value.limit
  });
  return res.json({
    status: "OK",
    msg: "success",
    payload: response
  });
});

// delete tasks 
// http://localhost:3000/api/tasks [delete]
router.delete("/api/tasks", async (req, res) => {
  const { error, value } = deleteBodySchema.validate(req.body);
  if (error)
    throw new BaseError(400, error.details[0].message);

  await TasksService.deleteTasks(value.tasks);
  return res.json({
    status: "OK",
    msg: "delete success"
  });
});

export default router.handler({ onError: handleError });


