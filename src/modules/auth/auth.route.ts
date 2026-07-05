import { Router } from "express";
import { userController } from "./auth.controller";

const router = Router();

router.post("/login", userController.loginUser);

export const authRouter = router;
