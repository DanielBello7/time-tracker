import authorization from "@/lib/authorization";
import router from "@/lib/router";
import joi from "joi";
import handleError from "@/lib/handle-error";
import BaseError from "@/lib/base-error";
import ExternalSharedTaskService from "@/services/external-shared-task.service";

const querySchema = joi.object({
  taskId: joi.string().required()
});

const patchSchema = joi.object({
  isActive: joi.boolean()
});


// secured
// find external shared-task
// http://localhost:3000/api/shared-tasks/external/:taskId [get]
router.use(authorization).get("/api/shared-tasks/external/:taskId", async (req, res) => {
  const { error, value } = querySchema.validate(req.query);
  if (error)
    throw new BaseError(400, error.details[0].message);

  const response = await ExternalSharedTaskService.findExternalSharedTaskUsingTaskId(value.taskId);

  return res.json({
    status: "OK",
    msg: "success",
    payload: response
  });
});


// secured
// update external shared task status
// http://localhost:3000/api/shared-tasks/external/:taskId [patch]
router.use(authorization).patch("/api/shared-tasks/external/:taskId", async (req, res) => {
  const { error, value } = querySchema.validate(req.query);
  const { value: val } = patchSchema.validate(req.body);
  if (error)
    throw new BaseError(400, error.details[0].message);

  const response = await ExternalSharedTaskService.updateExternalSharedTaskStatus(value.taskId, {
    isActive: val.isActive
  }, false);

  return res.json({
    status: "OK",
    msg: "success",
    payload: response
  });
});


export default router.handler({ onError: handleError });

