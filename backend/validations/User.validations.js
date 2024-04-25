import Joi from "joi";
import pkg from "joi";
const { ref } = pkg;
export const registerValid = Joi.object({
  username: Joi.string().required().min(6).max(20).messages({
    "string.empty": "Username cannot be empty",
    "any.required": "Username is required",
    "string.min": "Minimum username length is {#limit} characters",
    "string.max": "Maximum username length is {#limit} characters",
  }),
  password: Joi.string().required().min(10).max(20).messages({
    "string.empty": "Password cannot be empty",
    "any.required": "Password is required",
    "string.min": "Minimum password length is {#limit} characters",
    "string.max": "Maximum password length is {#limit} characters",
  }),
  confirmPassword: Joi.string()
    .required()
    .min(10)
    .max(20)
    .valid(Joi.ref("password"))
    .messages({
      "string.empty": "Confirm password cannot be empty",
      "any.required": "Confirm password is required",
      "string.min": "Minimum confirm password length is {#limit} characters",
      "string.max": "Maximum confirm password length is {#limit} characters",
      "any.only": "Passwords do not match",
    }),
  email: Joi.string().required().email().messages({
    "string.empty": "Email cannot be empty",
    "any.required": "Email is required",
    "string.email": "Invalid email format",
  }),
});
// key chuan theo Joi cho de phat trien , dev co the dat theo quy tac rieng

export const loginValid = Joi.object({
  username: Joi.string().required().min(6).max(20).messages({
    "string.empty": "Username cannot be empty",
    "any.required": "Username is required",
    "string.min": "Minimum username length is {#limit} characters",
    "string.max": "Maximum username length is {#limit} characters",
  }),
  password: Joi.string().required().min(10).max(20).messages({
    "string.empty": "Password cannot be empty",
    "any.required": "Password is required",
    "string.min": "Minimum password length is {#limit} characters",
    "string.max": "Maximum password length is {#limit} characters",
  }),
});

export const createUserValid = Joi.object({
  username: Joi.string().required().min(6).max(50).messages({
    "string.empty": "Username cannot be empty",
    "any.required": "Username is required",
    "string.min": "Minimum username length is {#limit} characters",
    "string.max": "Maximum username length is {#limit} characters",
  }),
  password: Joi.string().required().min(10).max(50).messages({
    "string.empty": "Password cannot be empty",
    "any.required": "Password is required",
    "string.min": "Minimum password length is {#limit} characters",
    "string.max": "Maximum password length is {#limit} characters",
  }),
  confirmPassword: Joi.string()
    .required()
    .min(10)
    .max(50)
    .valid(Joi.ref("password"))
    .messages({
      "string.empty": "Confirm password cannot be empty",
      "any.required": "Confirm password is required",
      "string.min": "Minimum confirm password length is {#limit} characters",
      "string.max": "Maximum confirm password length is {#limit} characters",
      "any.only": "Passwords do not match",
    }),
  email: Joi.string().required().email().messages({
    "string.empty": "Email cannot be empty",
    "any.required": "Email is required",
    "string.email": "Invalid email format",
  }),
  role: Joi.string().required().min(3).max(100).messages({
    "string.empty": "Role cannot be empty",
    "any.required": "Role is required",
    "string.min": "Minimum  length is {#limit} characters",
    "string.max": "Maximum  length is {#limit} characters",
  }),
});
