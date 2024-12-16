import express, { Router } from "express";
import { validate } from "@middlewares/validator.middleware";
import UserController from "@controllers/user.controller";
import { userSchema } from "@validators/user.validation";

const userRouter: Router = express.Router();
const userController = new UserController();

userRouter.route("/")
  .get(userController.getUsers)
  .post(validate(userSchema.create), userController.createUser);

  userRouter.route("/:id")
  .get( userController.getUserById)
  .put(validate(userSchema.update), userController.updateUser)
  .delete( userController.deleteUser);
  

export default userRouter;
