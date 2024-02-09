import type { UPLOAD_DOC } from "@/types/uploads.types";
import paginate from "mongoose-paginate-v2";
import mongoose from "mongoose";

const UploadSchema = new mongoose.Schema<UPLOAD_DOC>({
  uploadedBy: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true
  },
  url: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  mimetype: {
    type: String,
    required: true
  }
}, { timestamps: true });

UploadSchema.set("toJSON", {
  transform(_doc, ret, _options) {
    delete ret.__v
  },
});

UploadSchema.plugin(paginate);
const UploadsModel = mongoose.model<UPLOAD_DOC, mongoose.PaginateModel<UPLOAD_DOC>>("uploads", UploadSchema);
export default UploadsModel;
