import authorization from "@/middlewares/authorization";
import SharedTaskService from "@/services/shared-task.service";
import ExternalSharedTaskService from "@/services/external-shared-task.service";
import BaseError from "@/lib/base-error";
import router from "@/config/router";
import handleError from "@/middlewares/handle-error";
import joi from "joi";
import UsersService from "@/services/user.service";
import sendEmail from "@/lib/send-email";

type SHARED = {
	taskId: string
	sharedTo: string
}

const querySchema = joi.object({
	sharedBy: joi.string(),
	sharedTo: joi.string(),
	taskId: joi.string(),
	isRead: joi.boolean(),
	isActive: joi.boolean(),
	createdAt: joi.string(),
	page: joi.number(),
	limit: joi.number()
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


// secured
// get user shared tasks
// http://localhost:3000/api/shared-tasks [get]
router.get("/api/shared-tasks", authorization, async (req, res) => {
	const { value } = querySchema.validate(req.query);
	const { page, limit, ...rest } = value;
	const response = await SharedTaskService.getSharedTasks(rest, { page, limit });
	return res.json({
		status: "OK",
		msg: "success",
		payload: response
	});
});


// secured
// create shared tasks
// http://localhost:3000/api/shared-tasks [post]
router.post("/api/shared-tasks", authorization, async (req, res) => {
	const { error, value } = postBodySchema.validate(req.body);
	if (error) throw new BaseError(400, error.details[0].message);

	const userSharingTasks = await UsersService.findUserUsingIdWithoutPassword(value.sharedBy);
	const filtered: SHARED[] = Array.from(new Set(value.tasks));

	const seperatedPromises = filtered.map(async (current) => {
		const check = await UsersService.isEmailRegistered(current.sharedTo)
		return { check, ...current }
	});

	const seperated = await Promise.all(seperatedPromises);

	const results = seperated.reduce((total: any, current: any) => {
		const { check, ...rest } = current
		if (!check) total.notRegistered = [...(total.notRegistered || []), rest]
		else total.registered = [...(total.registered || []), rest]
		return total
	}, { registered: [], notRegistered: [] });

	const registered = await Promise.all(results.registered.map(async (item: SHARED) => {
		try {
			return await SharedTaskService.createNewSharedTasks(item.taskId, value.sharedBy, item.sharedTo);
		} catch (error) { return false }
	}));

	results.notRegistered.forEach(async (item: { taskId: any; sharedTo: string }) => {
		try {
			const external = await ExternalSharedTaskService.createNewExternalSharedTask({
				taskId: item.taskId,
				sharedTo: item.sharedTo,
				sharedBy: value.sharedBy
			});
			sendEmail({
				subject: "New Shared Task",
				to: [{ email: item.sharedTo }],
				textContent: `You've been shared an activity 
        task by ${userSharingTasks.name}, ${userSharingTasks.email}. Please 
        click the link below - ${external._id}`
			});
		} catch (error) {
			return
		}
	});

	return res.json({
		status: "OK",
		msg: results.notRegistered.length > 0
			? `task shared, but some ${results.notRegistered.length} users shared to aren't registered`
			: "tasks shared",
		payload: registered.filter((item) => item !== false)
	});
});


// secured
// delete shared tasks
// http://localhost:3000/api/shared-tasks [delete]
router.delete("/api/shared-tasks", authorization, async (req, res) => {
	const { error, value } = deleteBodySchema.validate(req.body);
	if (error) throw new BaseError(400, error.details[0].message);
	await SharedTaskService.deleteSharedTasks(value.tasks);
	return res.json({
		status: "OK",
		msg: "tasks deleted"
	});
});


export default router.handler({ onError: handleError });
