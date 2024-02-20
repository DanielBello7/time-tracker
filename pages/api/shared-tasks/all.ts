import router from "@/lib/router";
import handleError from "@/lib/handle-error";
import BaseError from "@/lib/base-error";
import joi from "joi";
import TasksService from "@/services/tasks.service";

const querySchema = joi.object({
  userId: joi.string().required()
});

// delete all tasks shared to user
// http://localhost:3000/api/shared-tasks/all/:userId [delete]
router.delete("/api/shared-tasks/all/:userId", async (req, res) => {
  const { error, value } = querySchema.validate(req.query);
  if (error)
    throw new BaseError(400, error.details[0].message);
  await TasksService.deleteAllTaskSharedToUser(value.userId);
  return res.json({
    msg: "success",
    status: "OK"
  });
});

export default router.handler({ onError: handleError });

