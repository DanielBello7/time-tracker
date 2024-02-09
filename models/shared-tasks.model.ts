import type { SHARED_TASK_DOC } from "@/types/shared-task.types";
import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const SharedTaskSchema = new mongoose.Schema<SHARED_TASK_DOC>({
  sharedBy: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true
  },
  sharedTo: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true
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

SharedTaskSchema.set("toJSON", {
  transform(_doc, ret) {
    delete ret.__v
  },
});

SharedTaskSchema.plugin(paginate);
const SharedTasksModel = mongoose.model<SHARED_TASK_DOC, mongoose.PaginateModel<SHARED_TASK_DOC>>("shared-tasks", SharedTaskSchema);
export default SharedTasksModel;
