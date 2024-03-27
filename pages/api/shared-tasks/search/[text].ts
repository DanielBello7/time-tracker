import authorization from "@/middlewares/authorization";
import joi from "joi";
import handleError from "@/middlewares/handle-error";
import router from "@/config/router";
import BaseError from "@/lib/base-error";
import SharedTaskService from "@/services/shared-task.service";

const querySchema = joi.object({
  text: joi.string().required(),
  sharedBy: joi.string(),
  sharedTo: joi.string(),
  taskId: joi.string(),
  isRead: joi.boolean(),
  isActive: joi.boolean(),
  createdAt: joi.boolean(),
  page: joi.number(),
  limit: joi.number()
});


// secured
// search shared-tasks
// http://localhost:3000/api/shared-tasks/search/:text?...rest [get]
router.get("/api/shared-tasks/search/:text", authorization, async (req, res) => {
  const { value, error } = querySchema.validate(req.query);
  if (error)
    throw new BaseError(400, error.details[0].message);

  const { text, page, limit, ...rest } = value;

  const response = await SharedTaskService.searchSharedTasksUsingTaskTitle(text, rest, { page, limit });
  return res.json({
    msg: "OK",
    status: "success",
    payload: response
  });
});


export default router.handler({ onError: handleError });

