import { Request, Response, NextFunction } from "express";
import AuthService from "@services/auth.service";

const authService = new AuthService();

class AuthController {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const { user, token } = await authService.signUp(req.body);
      res.status(201).json({ success: true, data: { user, token } });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const { user, token } = await authService.login(email, password);
      res.json({ success: true, data: { user, token } });
    } catch (error) {
      next(error);
    }
  }

  async requestPasswordReset(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.requestPasswordReset(req.body.email);
      res.json({ success: true, message: "Password reset email sent" });
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, newPassword } = req.body;
      await authService.resetPassword(token, newPassword);
      res.json({ success: true, message: "Password updated successfully" });
    } catch (error) {
      next(error);
    }
  }

  /* async googleLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { idToken } = req.body;
      const { user, token } = await authService.googleLogin(idToken);
      res.json({ success: true, data: { user, token } });
    } catch (error) {
      next(error);
    }
  }

  async facebookLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { accessToken } = req.body;
      const { user, token } = await authService.facebookLogin(accessToken);
      res.json({ success: true, data: { user, token } });
    } catch (error) {
      next(error);
    }
  } */
}

export default AuthController;
