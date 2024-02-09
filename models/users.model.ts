import mongoose from "mongoose";
import type { USER_DOC } from "@/types/user.types";
import paginate from "mongoose-paginate-v2";

const UserSchema = new mongoose.Schema<USER_DOC>({
  lastname: {
    type: String,
    required: true
  },
  avatar: {
    type: String || null,
    default: null
  },
  position: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  country: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    default: ""
  }
}, { timestamps: true });

UserSchema.set("toJSON", {
  transform(_doc, ret) {
    delete ret.__v;
  }
});

UserSchema.plugin(paginate);
const UsersModel = mongoose.model<USER_DOC, mongoose.PaginateModel<USER_DOC>>("users", UserSchema);
export default UsersModel;
