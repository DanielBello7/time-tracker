import authorization from "@/middlewares/authorization";
import SharedTaskService from "@/services/shared-task.service";
import BaseError from "@/lib/base-error";
import joi from "joi";
import handleError from "@/middlewares/handle-error";
import router from "@/config/router";

const patchSchema = joi.object({
    shareId: joi.string().required(),
    isActive: joi.boolean(),
    isRead: joi.boolean()
});

// secured
// update a shared task status
// http://localhost:3000/api/shared-tasks/status [patch]
router.patch("/api/shared-tasks/status", authorization, async (req, res) => {
    const { error, value } = patchSchema.validate(req.body);
    if (error) throw new BaseError(400, error.details[0].message);
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
