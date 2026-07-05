import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../../database/db";
import dotenv from "dotenv";
dotenv.config();

const loginUser = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;

  // Check user exists
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  if (result.rows.length === 0) {
    throw new Error("Invalid email or password");
  }

  const user = result.rows[0];

  // Compare password
  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    throw new Error("Invalid email or password");
  }

    // Generate JWT

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    },
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at,
    },
  };
};

export const userService = {
  loginUser,
};
