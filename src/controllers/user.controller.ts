import { Request, Response, NextFunction } from "express";
import UserService from "@services/user.service";

const userService = new UserService();

class UserController {
  /**
   * Creates a new user.
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next middleware
   */
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.createUser(req.body);
      res.success(user);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieves all users.
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next middleware
   */
  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getUsers();
      res.success(users);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieves a user by ID.
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next middleware
   */
  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.getUserById(req.params.id);
      res.success(user);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Updates a user by ID.
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next middleware
   */
  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      res.success(user);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Deletes a user by ID.
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next middleware
   */
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const message = await userService.deleteUser(req.params.id);
      res.success(message);
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
