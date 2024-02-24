import type { USER_DOC } from "@/types/user.types";
import { variables } from "@/constants";
import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import bcrypt from "bcrypt";
import ensureError from "@/lib/ensure-error";

const UserSchema = new mongoose.Schema<USER_DOC>({
  name: {
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
  password: {
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
  isOnboarded: {
    type: Boolean,
    default: false
  },
  allowNotifications: {
    type: Boolean,
    default: true
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

UserSchema.pre("save", async function (next: mongoose.CallbackWithoutResultAndOptionalError) {
  try {
    const user: USER_DOC = this;
    const password = await bcrypt.hash(user.password, variables.ENV.HASH);
    user.password = password;
    return next();
  } catch (error) {
    const err = ensureError(error);
    next(err);
  }
});

UserSchema.plugin(paginate);
const initial = mongoose.models["users"] as unknown as mongoose.PaginateModel<USER_DOC, {}, {}>
const UsersModel: mongoose.PaginateModel<USER_DOC, {}, {}> = initial || mongoose.model<USER_DOC, mongoose.PaginateModel<USER_DOC>>("users", UserSchema);
export default UsersModel;
