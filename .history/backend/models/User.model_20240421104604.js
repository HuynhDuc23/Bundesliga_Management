import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
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
    maxlength: 20,
    unique: true,
  },
});
