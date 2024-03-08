import authorization from "@/lib/authorization";
import SharedTaskService from "@/services/shared-task.service";
import BaseError from "@/lib/base-error";
import joi from "joi";
import handleError from "@/lib/handle-error";
import router from "@/lib/router";

const querySchema = joi.object({
  shareId: joi.string().required()
});

const patchSchema = joi.object({
  shareId: joi.string().required(),
  isActive: joi.boolean(),
  isRead: joi.boolean()
});


// secured
// get user shared tasks
// http://localhost:3000/api/shared-tasks/:id [get]
router.use(authorization).get("/api/shared-tasks/:id", async (req, res) => {
  const { error, value } = querySchema.validate(req.query);
  if (error)
    throw new BaseError(400, error.details[0].message);
  const response = await SharedTaskService.findSharedTaskUsingId(value.shareId);
  return res.json({
    status: "OK",
    msg: "success",
    payload: response
  });
});


// secured
// update a shared task status
// http://localhost:3000/api/shared-tasks/status [patch]
router.use(authorization).patch("/api/shared-tasks/status", async (req, res) => {
  const { error, value } = patchSchema.validate(req.body);
  if (error)
    throw new BaseError(400, error.details[0].message);

  const response = await SharedTaskService.updateSharedTaskStatus(value.shareId, {
    isActive: value.isActive,
    isRead: value.isRead
  });

  return res.json({
    status: "OK",
    msg: "success",
    payload: response
  });
});


export default router.handler({ onError: handleError });
