import handleError from "@/lib/handle-error";
import TasksService from "@/services/task.service";
import router from "@/lib/router";
import joi from "joi";
import BaseError from "@/lib/base-error";

const querySchema = joi.object({
  userId: joi.string().required()
});

// delete all created tasks
// http://localhost:3000/api/tasks/reset/:userId [delete]
router.delete("/api/tasks/reset/:userId", async (req, res) => {
  const { error, value } = querySchema.validate(req.query);
  if (error)
    throw new BaseError(400, error.details[0].message);
  await TasksService.deleteAllUserTasks(value.userId);
  return res.json({
    msg: "success",
    status: "OK"
  });
});

export default router.handler({ onError: handleError });

