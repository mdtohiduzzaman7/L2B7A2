import express from "express";
import { Pool } from "pg";
import { initDB } from "./database/db";
import { userRouter } from "./modules/user/user.route";
import { authRouter } from "./modules/auth/auth.route";
import { issueRouter } from "./modules/issuse/issuse.router";
import cors from "cors";
import { globalErrorHandler } from "./middleware/globalError";

export const app = express();

app.use(express.json());
app.use(cors());

const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Welcome to the DevPulse Assignment API!");
}); 

app.use("/api/auth/", userRouter);
app.use("/api/auth/", authRouter);
app.use("/api/issues", issueRouter);

app.use(globalErrorHandler);




what is your name