import mongoose from "mongoose";
import type { TOKEN_DOC } from "@/types/tokens.types";

const TokenSchema = new mongoose.Schema<TOKEN_DOC>({
  email: {
    type: String,
    required: true
  },
  otp: {
    type: String,
    required: true
  }
}, { timestamps: true });


const initial = mongoose.models["tokens"] as unknown as mongoose.PaginateModel<TOKEN_DOC, {}, {}>
const TokenModel = initial || mongoose.model<TOKEN_DOC, mongoose.PaginateModel<TOKEN_DOC>>("tokens", TokenSchema);
export default TokenModel;
