import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import confiq from "../confiq";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        name: string;
        role: string;
      };
    }
  }
}

export const auth =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get token from Authorization header
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized access",
        });
      }

      // Verify JWT
      const decoded = jwt.verify(token, confiq.jwt_secret as string) as {
        id: number;
        name: string;
        role: string;
      };

      // Save user information
      req.user = decoded;

      // Check role
      if (roles.length > 0 && !roles.includes(decoded.role)) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to access this resource",
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  };
