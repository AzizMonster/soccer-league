import Joi from "joi";

export const userSchema = {
  create: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("PLAYER", "ADMIN", "SUPERADMIN"),
  }),
  update: Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    role: Joi.string().valid("PLAYER", "ADMIN", "SUPERADMIN"),
  }),
};
