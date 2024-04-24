import mongoose from "mongoose";
const seasonSchema = new mongoose.Schema(
  {
    year_start: {
      type: Number,
      required: true,
      minlength: 1,
      maxlength: 4,
      unique: true,
    },
    year_end: {
      type: Number,
      required: true,
      minlength: 1,
      maxlength: 4,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
seasonSchema.plugin(mongoosePaginate);
export default mongoose.model("Season", seasonSchema);
