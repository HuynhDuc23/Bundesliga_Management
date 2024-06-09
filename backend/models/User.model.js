import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 20,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 10,
    },
    email: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 40,
      unique: true,
    },
    admin: {
      type: String,
      default: 'USER',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    passwordChangeAt: {
      type: String
    },
    passwordResetToken: {
      type: String
    },
    passwordResetExpires: {
      type: String
    },
    avatarUrl: {
      type: String,
      default: "data:image/jpeg;base64,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"
    }
    ,
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  },
  {
    timestamps: true,
  }
);
userSchema.plugin(mongoosePaginate);
export default mongoose.model("User", userSchema);

// !mgdb
