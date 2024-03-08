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

const TokenModel = mongoose.model("tokens", TokenSchema);
export default TokenModel;

