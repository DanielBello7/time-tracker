import mongoose from "mongoose";
import type { TASK_DOC } from "@/types/task.types";
import paginate from "mongoose-paginate-v2";

const TaskSchema = new mongoose.Schema<TASK_DOC>({
  type: {
    type: String,
    required: true,
    enum: ["story", "bug"]
  },
  title: {
    type: String,
    required: true
  },
  timeSpent: {
    type: Number,
    required: true
  },
  timeInterval: {
    type: String,
    required: true,
    enum: ["seconds", "minutes", "hours"]
  },
  body: {
    type: String,
    required: true
  },
  shortCode: {
    type: Number,
    required: true
  },
  tags: [{
    type: String,
    default: []
  }],
  dateStarted: {
    type: Date,
    required: true
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true
  },
  dateFinished: {
    type: Date,
    required: true
  }
}, { timestamps: true });

TaskSchema.set("toJSON", {
  transform(_doc, ret) {
    delete ret.__v
  },
});

TaskSchema.plugin(paginate);
const initial = mongoose.models["tasks"] as unknown as mongoose.PaginateModel<TASK_DOC, {}, {}>
const TasksModel = initial || mongoose.model<TASK_DOC, mongoose.PaginateModel<TASK_DOC>>("tasks", TaskSchema);
export default TasksModel;
