import pkg from "joi";
const { required } = pkg;
import mongoose from "mongoose";
const roleSchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      required: true,
    },
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Role", roleSchema);
