import { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUser(req.body);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: (error as Error).message,
      errors: null,
    });
  }
};

export const userController = {
  createUser,
};
