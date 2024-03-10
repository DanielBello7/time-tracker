import authorization from "@/lib/authorization";
import handleError from "@/lib/handle-error";
import TaskService from "@/services/task.service";
import router from "@/lib/router";
import joi from "joi";
import BaseError from "@/lib/base-error";

const querySchema = joi.object({
  userId: joi.string().required()
});


// secured
// delete all created tasks
// http://localhost:3000/api/tasks/reset/:userId [delete]
router.delete("/api/tasks/reset/:userId", authorization, async (req, res) => {
  const { error, value } = querySchema.validate(req.query);
  if (error)
    throw new BaseError(400, error.details[0].message);
  await TaskService.deleteAllUserTasks(value.userId);
  return res.json({
    msg: "success",
    status: "OK"
  });
});

export default router.handler({ onError: handleError });

