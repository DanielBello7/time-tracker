import router from "@/lib/router";
import handleError from "@/lib/handle-error";
import joi from "joi";
import { importTaskSchema } from '@/lib/import-task-validator';
import BaseError from "@/lib/base-error";
import TasksService from "@/services/tasks.service";

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

  const confirmations = await Promise.all(value.tasks.map(async (item: any) => {
    try {
      const response = await TasksService.findTaskUsingId(item._id);
      return { data: item, exists: response }
    } catch (error) {
      return { data: item, exists: null }
    }
  }));

  console.log(confirmations);

  return res.json({
    status: "OK",
    msg: "success"
  });
});

export default router.handler({ onError: handleError });

