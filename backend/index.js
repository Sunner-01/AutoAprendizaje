import express from "express";
import cors from "cors";
import pg from "pg";                    // ← Importamos todo el paquete
const { Pool } = pg;                     // ← Sacamos Pool de ahí

import { PORT, FRONTEND_URL } from "./config.js";

const app = express();

// Conexión perfecta a Render PostgreSQL
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

// Ruta básica
app.get("/", (req, res) => {
  res.send("¡Backend AutoAprendizaje corriendo en Render! 🚀");
});

// Prueba de DB
app.get("/ping", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "¡Base de datos conectada exitosamente!",
      hora_db: result.rows[0].now
    });
  } catch (error) {
    console.error("Error en la DB:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Arranca en el puerto que Render te dé
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});