import Joi from "joi";
import dotenv from "dotenv";

import { NodeEnvs } from "@constants/misc.constant";

dotenv.config();

const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string()
        .valid(...Object.values(NodeEnvs))
        .required(),
    HOST: Joi.string().required(),
    PORT: Joi.number().required(),
    DATABASE_URL: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    EMAIL_USER: Joi.string().required(),
    EMAIL_PASS: Joi.string().required(),
})
    .unknown()
    .required();

const { error } = envVarsSchema.validate(process.env);

if (error) throw new Error(`Env config validation error: ${error.message}`);

export default {
    NODE_ENV: process.env.NODE_ENV,
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS
} as const;