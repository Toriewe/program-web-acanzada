import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import "dotenv/config";
import { randomBytes } from "node:crypto";
import { existsSync, writeFileSync } from "node:fs";

if (existsSync(".env")) {
  console.log("Ya existe .env; se conserva su clave actual.");
} else {
  const secreto = randomBytes(32).toString("hex");
  writeFileSync(".env", `JWT_SECRET=${secreto}\n`, { mode: 0o600 });
  console.log("Archivo .env creado con una clave aleatoria.");
}

if (!process.env.JWT_SECRET) {
  throw new Error("Falta JWT_SECRET. Ejecuta: node generar-secreto.mjs");
}

const correoDemo = "alumno@demo.test";
// SOLO laboratorio: esta clave de ejemplo es pública; nunca reutilizarla.
const claveHash = await bcrypt.hash("Demo1234!", 10);

app.post("/api/login", async (req, res) => {
  const correo = typeof req.body?.correo === "string"
    ? req.body.correo.trim().toLowerCase()
    : "";
  const clave = typeof req.body?.clave === "string" ? req.body.clave : "";
  const claveCorrecta = await bcrypt.compare(clave, claveHash);
  if (correo !== correoDemo || !claveCorrecta) {
    return res.status(401).json({ mensaje: "Credenciales incorrectas" });
  }
  const token = jwt.sign(
    { sub: "usuario-demo", nombre: "Estudiante de prueba" },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
  res.json({ token });
});