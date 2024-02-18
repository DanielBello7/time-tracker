import TasksService from "@/services/tasks.service";
import BaseError from "@/lib/base-error";
import joi from "joi";
import handleError from "@/lib/handle-error";
import router from "@/lib/router";

const querySchema = joi.object({
  id: joi.string().required()
});

// get user shared tasks
// http://localhost:3000/api/shared-tasks/:id [get]
router.get("/api/shared-tasks/:id", async (req, res) => {
  const { error, value } = querySchema.validate(req.query);
  if (error)
    throw new BaseError(400, error.details[0].message);
  const response = await TasksService.findSharedTaskUsingId(value.id);
  return res.json({
    status: "OK",
    msg: "success",
    payload: response
  });
});


export default router.handler({ onError: handleError });
