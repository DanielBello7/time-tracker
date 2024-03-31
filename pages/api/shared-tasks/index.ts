import authorization from "@/middlewares/authorization";
import SharedTaskService from "@/services/shared-task.service";
import ExternalSharedTaskService from "@/services/external-shared-task.service";
import BaseError from "@/lib/base-error";
import router from "@/config/router";
import handleError from "@/middlewares/handle-error";
import joi from "joi";
import UsersService from "@/services/user.service";
import sendEmail from "@/lib/send-email";
import shareTask from "@/templates/share-task";
import { EXTERNAL_SHARED_TASK } from "@/types/external-shared.types";

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

	await UsersService.findUserUsingIdWithoutPassword(value.sharedBy);
	const filtered: SHARED[] = Array.from(new Set(value.tasks));

	const seperated = await Promise.all(filtered.map(async (current) => {
		const check = await UsersService.isEmailRegistered(current.sharedTo)
		return { check, ...current }
	}));

	const results = seperated.reduce((total: any, current: any) => {
		const { check, ...rest } = current
		if (!check) total.notRegistered = [...(total.notRegistered || []), rest]
		else total.registered = [...(total.registered || []), rest]
		return total
	}, { registered: [], notRegistered: [] });

	const registered = await Promise.all(results.registered.map(async (item: SHARED) => {
		const check = await SharedTaskService.getSharedTasks({
			sharedBy: value.sharedBy,
			taskId: item.taskId,
		});
		const find = check.docs.filter((task) => task.sharedTo.email === item.sharedTo);
		if (find.length > 0) return
		return await SharedTaskService.createNewSharedTasks(item.taskId, value.sharedBy, item.sharedTo);
	}));

	results.notRegistered.forEach(async (item: { taskId: any; sharedTo: string }) => {
		let external: EXTERNAL_SHARED_TASK;
		const check = await ExternalSharedTaskService.checkIfExistsUsingTaskId(item.taskId);
		if (check !== null) {
			external = check;
			if (!check.sharedTo.includes(item.sharedTo)) {
				await ExternalSharedTaskService.addNewSharedToUsingTaskId(item.taskId, item.sharedTo);
			}
		}
		else {
			external = await ExternalSharedTaskService.createNewExternalSharedTask({
				taskId: item.taskId,
				sharedTo: item.sharedTo,
				sharedBy: value.sharedBy
			});
		}
		sendEmail({
			to: [{ email: item.sharedTo }],
			subject: "New Shared Task",
			textContent: shareTask(external)
		});
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
