import { Request, Response, NextFunction, RequestHandler } from "express";
import { Schema } from "joi";

/**
 * Validation middleware to validate request data.
 * @param {Schema} schema - Joi validation schema
 * @returns {RequestHandler} - Express middleware
 */
export const validate = (schema: Schema): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      res.status(400).json({
        success: false,
        message: "Validation error",
        details: error.details.map((detail) => detail.message),
      });
    } else {
      next(); // Proceed to the next middleware if validation passes
    }
  };
};
