import { Request, Response } from "express";
import { userService } from "./auth.service";


const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.loginUser(req.body);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: (error as Error).message,
      errors: null,
    });
  }
};

export const userController = {

  loginUser,
};
