import Joi from "joi";
export const userValid = Joi.object({
  username: Joi.string().required().min(6).max(20).message({
    "empty.string": "username must be a string",
    "any.required": "username is required",
    "string.min": " Minimum username is 6 characters ",
    "string.max": "Max username is 6 characters",
  }),
});
