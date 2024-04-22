import Joi from "joi";
import pkg from "joi";
const { ref } = pkg;
export const userValid = Joi.object({
  username: Joi.string().required().min(6).max(20).message({
    "empty.string": "username must be a string",
    "any.required": "username is required",
    "string.min": " Minimum username is 6 characters ",
    "string.max": "Max username is 6 characters",
  }),
  password: Joi.string().required().min(10).max(20).message({
    "empty.string": "password must be a string",
    "any.required": "password is required",
    "string.min": " Minimum password is 10 characters ",
    "string.max": "Max password is 20 characters",
  }),
  comfirmPassword: Joi.string()
    .required()
    .min(10)
    .max(20)
    .valid(Joi.ref("password"))
    .message({
      "empty.string": "password must be a string",
      "any.required": "password is required",
      "string.min": " Minimum password is 10 characters ",
      "string.max": "Max password is 20 characters",
      "any.only": "Passwords do not match",
    }),
  email: Joi.string().required().email().message({
    "string.empty": "Email cannot by empty",
    "any.required": "Email is required",
    "string.email": "Email not format",
  }),
});
