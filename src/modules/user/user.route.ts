import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import { pool } from "../../database/db";
import { userController } from "./user.controller";



const router = Router();

router.post("/signup", userController.createUser);

export const userRouter = router;
