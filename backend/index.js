import express from "express";
import cors from "cors";
import { Pool } from "pg";
import { PORT, FRONTEND_URL } from "./config.js";

const app = express();

// Conexión usando DATABASE_URL (la forma más segura y recomendada en Render)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false   // Obligatorio para PostgreSQL interno de Render
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

// Prueba de conexión a la base de datos
app.get("/ping", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "¡Conexión a PostgreSQL exitosa!",
      hora_servidor_db: result.rows[0].now
    });
  } catch (error) {
    console.error("Error conectando a la DB:", error.message);
    res.status(500).json({ error: "Fallo en la base de datos", details: error.message });
  }
});

// Aquí pondrás tus demás rutas cuando las crees
// app.use("/api/auth", authRoutes);
// etc...

// ¡¡¡¡IMPORTANTE: usa la variable PORT dinámica!!!!
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});