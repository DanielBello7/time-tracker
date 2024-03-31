import type { EXTERNAL_SHARED_TASK_DOC } from "@/types/external-shared.types";
import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const ExternalSharedTaskSchema = new mongoose.Schema<EXTERNAL_SHARED_TASK_DOC>({
	sharedBy: {
		type: mongoose.Types.ObjectId,
		ref: "users",
		required: true
	},
	sharedTo: {
		type: [String],
		default: []
	},
	isActive: {
		type: Boolean,
		default: true
	},
	taskId: {
		type: mongoose.Types.ObjectId,
		ref: "tasks",
		required: true
	},
	isRead: {
		type: Boolean,
		default: false
	}
}, { timestamps: true });

ExternalSharedTaskSchema.plugin(paginate);
const initial = mongoose.models["external-shared-tasks"] as unknown as mongoose.PaginateModel<EXTERNAL_SHARED_TASK_DOC, {}, {}>
const ExternalSharedTasksModel = initial || mongoose.model<EXTERNAL_SHARED_TASK_DOC, mongoose.PaginateModel<EXTERNAL_SHARED_TASK_DOC>>("external-shared-tasks", ExternalSharedTaskSchema);
export default ExternalSharedTasksModel;
