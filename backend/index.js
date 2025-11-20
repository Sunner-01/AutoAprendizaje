import express from "express";
import cors from "cors";
import { Pool } from "pg";
import { PORT, FRONTEND_URL } from "./config.js";

const app = express();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(cors({
  origin: FRONTEND_URL
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend funcionando perfecto en Render 🚀");
});

app.get("/ping", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ message: "DB conectada", hora: result.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor arriba en puerto ${PORT}`);
});