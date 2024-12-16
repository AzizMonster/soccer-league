import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "@configs/env.config";
import { APIError } from "@helpers/api-error.helper";

interface DecodedToken {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

interface CustomRequest extends Request {
    user?: DecodedToken;
}

/**
 * Middleware to validate JWT and attach user information to the request object
 */
export const protect = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new APIError({ code: 401, message: "Unauthorized: No token provided" }, 401);
  }

  const token = authHeader.split(" ")[1];
  if (!env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as DecodedToken;
    req.user = decoded; // Attach decoded token payload to the request
    next();
  } catch (error) {
    throw new APIError({ code: 401, message: "Unauthorized: Invalid or expired token" }, 401);
  }
};

/**
 * Middleware to restrict access to specific roles
 * @param {string[]} roles - Allowed roles
 */
export const restrictTo = (...roles: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new APIError({ code: 403, message: "Forbidden: Access denied" }, 403);
    }

    if (!roles.includes(req.user.role)) {
      throw new APIError({ code: 403, message: "Forbidden: You do not have permission to perform this action" }, 403);
    }

    next();
  };
};
