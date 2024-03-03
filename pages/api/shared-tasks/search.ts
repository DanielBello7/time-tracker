import joi from "joi";
import handleError from "@/lib/handle-error";
import router from "@/lib/router";
import BaseError from "@/lib/base-error";
import TasksService from "@/services/task.service";

const querySchema = joi.object({
  createdBy: joi.string().required(),
  search: joi.string().required()
});


// search shared-tasks
// http://localhost:3000/api/shared-tasks/search?createdBy={}&search={} [get]
router.get("/api/shared-tasks/search", async (req, res) => {
  const { value, error } = querySchema.validate(req.query);
  if (error)
    throw new BaseError(400, error.details[0].message);

  const response = await TasksService.searchUserSharedTasksUsingName(value.createdBy, value.search);
  return res.json({
    msg: "OK",
    status: "success",
    payload: response
  });
});

export default router.handler({ onError: handleError });

