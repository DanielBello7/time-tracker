import handleError from "@/lib/handle-error";
import router from "@/lib/router";
import joi from "joi";
import TasksService from "@/services/tasks.service";
import BaseError from "@/lib/base-error";

const querySchema = joi.object({
  userId: joi.string().required()
});

// get tasks
// http://localhost:3000/api/tasks/users/:userId [get]
router.get("/api/tasks/users/:userId", async (req, res) => {
  const { error, value } = querySchema.validate(req.query);
  if (error)
    throw new BaseError(400, error.details[0].message);
  const response = await TasksService.getUserTasks(value.userId);
  return res.json({
    msg: "success",
    status: "OK",
    payload: response
  });
});

export default router.handler({ onError: handleError });

