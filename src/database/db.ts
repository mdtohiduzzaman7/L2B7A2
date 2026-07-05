import { Pool } from "pg";
import confiq from "../confiq";

export const pool = new Pool({
  connectionString: confiq.database_url,
});

export const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,

      role VARCHAR(20) NOT NULL DEFAULT 'contributor'
      CHECK (role IN ('contributor', 'maintainer')),

      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS issues (
      id SERIAL PRIMARY KEY,

      title VARCHAR(150) NOT NULL,

      description TEXT NOT NULL
      CHECK (char_length(description) >= 20),

      type VARCHAR(30) NOT NULL
      CHECK (type IN ('bug', 'feature_request')),

      status VARCHAR(30) NOT NULL DEFAULT 'open'
      CHECK (status IN ('open', 'in_progress', 'resolved')),

      reporter_id INT NOT NULL,

      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
};


initDB()