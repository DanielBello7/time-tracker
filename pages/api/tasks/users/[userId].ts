import handleError from "@/lib/handle-error";
import router from "@/lib/router";
import joi from "joi";
import TasksService from "@/services/tasks.service";
import BaseError from "@/lib/base-error";

const querySchema = joi.object({
  userId: joi.string().required(),
  search: joi.string()
});

// get tasks
// http://localhost:3000/api/tasks/users/:userId [get]
// http://localhost:3000/api/tasks/users/:userId?osearch=:search [get]
router.get("/api/tasks/users/:userId", async (req, res) => {
  const { error, value } = querySchema.validate(req.query);
  if (error)
    throw new BaseError(400, error.details[0].message);

  if (value.search) {
    const response = await TasksService.searchUserTasksUsingTitle(value.userId, value.search);
    return res.json({
      msg: "success",
      status: "OK",
      payload: response
    });
  }

  const response = await TasksService.getUserTasks(value.userId);
  return res.json({
    msg: "success",
    status: "OK",
    payload: response
  });
});

export default router.handler({ onError: handleError });

