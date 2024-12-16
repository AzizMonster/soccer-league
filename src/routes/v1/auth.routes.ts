import express, { Router } from "express";
import { validate } from "@middlewares/validator.middleware";
import AuthController from "@controllers/auth.controller";
import { authSchema } from "@validators/auth.validator";

const authRouter: Router = express.Router();
const authController = new AuthController();

authRouter.post("/signup", validate(authSchema.signUp), authController.signUp);
authRouter.post("/login", validate(authSchema.login), authController.login);
authRouter.post("/request-password-reset", validate(authSchema.email), authController.requestPasswordReset);
authRouter.post("/reset-password", validate(authSchema.resetPassword), authController.resetPassword);


export default authRouter;
