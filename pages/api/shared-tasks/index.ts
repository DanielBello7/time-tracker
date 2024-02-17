import TasksService from "@/services/tasks.service";
import BaseError from "@/lib/base-error";
import router from "@/lib/router";
import handleError from "@/lib/handle-error";
import joi from "joi";
import UsersService from "@/services/users.service";
import sendEmail from "@/lib/send-email";

const querySchema = joi.object({
  createdBy: joi.string()
});

const postBodySchema = joi.object({
  tasks: joi.array().items(joi.object({
    taskId: joi.string().required(),
    sharedTo: joi.string().email().required(),
  })).required(),
  sharedBy: joi.string().required()
});

const deleteBodySchema = joi.object({
  tasks: joi.array().items(joi.string()).required()
});

type SHARED = {
  taskId: string
  sharedTo: string
}

// get user shared tasks
// http://localhost:3000/api/shared-tasks [get]
// http://localhost:3000/api/shared-tasks?createdBy=:userId [get]
router.get(async (req, res) => {
  const { value } = querySchema.validate(req.query)
  if (value.createdBy) {
    const response = await TasksService.getUserSharedTasks(value.createdBy);
    return res.json({
      msg: "success",
      status: "OK",
      payload: response
    });
  }
  const response = await TasksService.getSharedTasks();
  return res.json({
    status: "OK",
    msg: "success",
    payload: response
  });
});


// create shared tasks
// http://localhost:3000/api/shared-tasks [post]
router.post(async (req, res) => {
  const { error, value } = postBodySchema.validate(req.body);
  if (error)
    throw new BaseError(400, error.details[0].message);

  const userSharingTasks = await UsersService.findUserUsingId(value.sharedBy);

  const filtered: SHARED[] = Array.from(new Set(value.tasks));

  const seperatedPromises = filtered.map(async (current) => {
    const check = await UsersService.confirmIfEmailIsRegistered(current.sharedTo)
    return { check, ...current }
  });

  const seperated = await Promise.all(seperatedPromises);

  const results = seperated.reduce((total: any, current: any) => {
    const { check, ...rest } = current
    if (!check) {
      total.notRegistered = [...(total.notRegistered || []), rest]
    } else {
      total.registered = [...(total.registered || []), rest]
    }
    return total
  }, {});

  const registered = await Promise.all(results.registered.map(async (item: SHARED) => {
    try {
      return await TasksService.createNewSharedTasks(item.taskId, value.sharedBy, item.sharedTo);
    } catch (error) { return false }
  }));


  results.notRegistered.forEach((item: { taskId: string; sharedTo: string }) => {
    sendEmail({
      subject: "New Shared Task",
      to: [{ email: item.sharedTo }],
      textContent: `You've been shared an activity 
      task by ${userSharingTasks.name}, ${userSharingTasks.email}. Please 
      click the link below - ${item.taskId}`
    });
  });

  return res.json({
    status: "OK",
    msg: results.notRegistered.length > 0 ? `task shared, but some ${results.notRegistered.length} users shared to aren't registered` : "tasks shared",
    payload: registered.filter((item) => item !== false)
  });
});


// delete shared tasks
// http://localhost:3000/api/shared-tasks [delete]
router.delete(async (req, res) => {
  const { error, value } = deleteBodySchema.validate(req.body);
  if (error)
    throw new BaseError(400, error.details[0].message);
  await TasksService.deleteSharedTasks(value.tasks);
  return res.json({
    status: "OK",
    msg: "tasks deleted"
  });
});


export default router.handler({ onError: handleError });
