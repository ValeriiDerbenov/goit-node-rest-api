import Joi from "joi";
import { emailRegexp } from "../constants/user-constants.js";

export const sighupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const sighinSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const schemas = {
  sighupSchema,
  sighinSchema,
};
export default schemas;
