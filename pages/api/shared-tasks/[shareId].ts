import authorization from "@/middlewares/authorization";
import SharedTaskService from "@/services/shared-task.service";
import BaseError from "@/lib/base-error";
import joi from "joi";
import handleError from "@/middlewares/handle-error";
import router from "@/config/router";

const querySchema = joi.object({
	shareId: joi.string().required()
});


// secured
// get user shared tasks
// http://localhost:3000/api/shared-tasks/:id [get]
router.get("/api/shared-tasks/:id", authorization, async (req, res) => {
	const { error, value } = querySchema.validate(req.query);
	if (error) throw new BaseError(400, error.details[0].message);
	const response = await SharedTaskService.findSharedTaskUsingId(value.shareId);
	return res.json({
		status: "OK",
		msg: "success",
		payload: response
	});
});


export default router.handler({ onError: handleError });
