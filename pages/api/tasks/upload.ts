import router from "@/lib/router";
import handleError from "@/lib/handle-error";
import joi from "joi";
import { importTaskSchema } from '@/lib/import-task-validator';
import BaseError from "@/lib/base-error";
import TasksService from "@/services/task.service";

const postBodySchema = joi.object({
  tasks: joi.array().items(importTaskSchema).required(),
  userId: joi.string().required()
});

// import tasks
// http://localhost:3000/api/tasks/upload [post]
router.post("/api/tasks/upload", async (req, res) => {
  const { error, value } = postBodySchema.validate(req.body);
  if (error)
    throw new BaseError(400, error.details[0].message);
  await TasksService.saveUploadedImports(value.userId, value.tasks);
  return res.json({
    status: "OK",
    msg: "success"
  });
});

export default router.handler({ onError: handleError });

