import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "@configs/prisma-client";
import env from "@configs/env.config";
import { APIError } from "@helpers/api-error.helper";
import { sendEmail } from "@helpers/email.helper";
//import { OAuth2Client } from "google-auth-library";
import axios from "axios";

//const googleClient = new OAuth2Client(env.GOOGLE_CLIENT_ID);

class AuthService {
  private generateToken(payload: object, expiresIn: string): string {
    const secret = env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }

    return jwt.sign(payload, secret, { expiresIn });
  }
  

  async signUp(data: { name: string; email: string; password: string }) {
    const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
    if (existingUser) throw new APIError({ code: 400, message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: { ...data, password: hashedPassword },
    });

    const token = this.generateToken({ id: user.id }, "1d");
    return { user, token };
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new APIError({ code: 401, message: "Invalid credentials" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new APIError({ code: 401, message: "Invalid credentials" });

    const token = this.generateToken({ id: user.id }, "1d");
    return { user, token };
  }

  async requestPasswordReset(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new APIError({ code: 404, message: "User not found" });

    const token = this.generateToken({ id: user.id }, "1h");
    await sendEmail(email, "Password Reset", `${env.HOST}/reset-password?token=${token}`);
  }

  async resetPassword(token: string, newPassword: string) {
    const secret = env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }
    try {
      const { id } = jwt.verify(token, secret) as { id: string };
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await prisma.user.update({ where: { id }, data: { password: hashedPassword } });
    } catch {
      throw new APIError({ code: 401, message: "Invalid or expired token" });
    }
    
  }

  /* async confirmEmail(token: string): Promise<void> {
    try {
      const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string };

      await prisma.user.update({
        where: { id: decoded.id },
        data: { emailVerified: true },
      });
    } catch (error) {
      throw new APIError(Errors.AUTH.INVALID_TOKEN, HttpStatusCodes.UNAUTHORIZED);
    }
  }
 */

  /* async googleLogin(idToken: string) {
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) throw new APIError({ code: 401, message: "Invalid Google token" });

    let user = await prisma.user.findUnique({ where: { email: payload.email } });
    if (!user) {
      user = await prisma.user.create({
        data: { email: payload.email, name: payload.name || "Google User", password: "" },
      });
    }

    const token = this.generateToken({ id: user.id }, "1d");
    return { user, token };
  } */

  /* async facebookLogin(accessToken: string) {
    const response = await axios.get(
      `https://graph.facebook.com/me?fields=id,name,email&access_token=${accessToken}`
    );

    const { email, name } = response.data;
    if (!email) throw new APIError({ code: 401, message: "Invalid Facebook token" });

    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: { email, name, password: "" },
      });
    }

    const token = this.generateToken({ id: user.id }, "1d");
    return { user, token };
  }*/
} 

export default AuthService;
