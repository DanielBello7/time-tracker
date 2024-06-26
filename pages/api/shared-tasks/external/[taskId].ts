import authorization from "@/middlewares/authorization";
import router from "@/config/router";
import joi from "joi";
import handleError from "@/middlewares/handle-error";
import BaseError from "@/lib/base-error";
import ExternalSharedTaskService from "@/services/external-shared-task.service";

const querySchema = joi.object({
	taskId: joi.string().required()
});

const patchSchema = joi.object({
	isActive: joi.boolean()
});


// secured
// find external shared-task using task id
// http://localhost:3000/api/shared-tasks/external/:taskId [get]
router.get("/api/shared-tasks/external/:taskId", authorization, async (req, res) => {
	const { error, value } = querySchema.validate(req.query);
	if (error) throw new BaseError(400, error.details[0].message);
	const response = await ExternalSharedTaskService.findExternalSharedTaskUsingTaskId(value.taskId);
	return res.json({
		status: "OK",
		msg: "success",
		payload: response
	});
});


// secured
// update external shared task status using task id
// http://localhost:3000/api/shared-tasks/external/:taskId [patch]
router.patch("/api/shared-tasks/external/:taskId", authorization, async (req, res) => {
	const { error, value } = querySchema.validate(req.query);
	const { value: val } = patchSchema.validate(req.body);
	if (error) throw new BaseError(400, error.details[0].message);
	const response = await ExternalSharedTaskService.updateExternalSharedTaskStatusUsingTaskId(value.taskId, {
		isActive: val.isActive
	});

	return res.json({
		status: "OK",
		msg: "success",
		payload: response
	});
});


export default router.handler({ onError: handleError });

