const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validarJWT } = require("./middlewares/validar-jwt");
const { permitirRoles } = require("./middlewares/roles");
const cors = require("cors");
const { corsOptions } = require("./cors-options");

async function crearApp() {
  const secreto = process.env.JWT_SECRET;
  if (!secreto || secreto.length < 48)
    throw new Error("Configurar JWT_SECRET con minimo 48 caracteres");
  const app = express();

  app.use(cors(corsOptions));
  app.use(express.json());

  const usuarios = [];

  let siguienteId = 1;

  if (process.env.DEMO_ADMIN_PASSWORD) {
    usuarios.push({
      id: siguienteId++,
      email: "admin@example.com",
      rol: "admin",
      hash: await bcrypt.hash(process.env.DEMO_ADMIN_PASSWORD, 10),
    });
  }

  app.get("/publico", (req, res) =>
    res.json({ mensaje: "Ruta pública disponible" }),
  );

  app.post("/registro", async (req, res) => {
    const { email, password } = req.body || {};
    if (
      typeof email !== "string" ||
      !email.includes("@") ||
      typeof password !== "string" ||
      password.length < 8
    ) {
      return res.status(400).json({ mensaje: "Email o contraseña inválidos" });
    }
    if (usuarios.some((u) => u.email === email)) {
      return res.status(400).json({ mensaje: "El email ya está registrado" });
    }

    const usuario = {
      id: siguienteId++,
      email,
      rol: "usuario",
      hash: await bcrypt.hash(password, 10),
    };
    usuarios.push(usuario);
    res
      .status(201)
      .json({ id: usuario.id, email: usuario.email, rol: usuario.rol });
  });

  app.post("/login", async (req, res) => {
    const { email, password } = req.body || {};
    const usuario = usuarios.find((u) => u.email === email);

    if (
      !usuario ||
      typeof password !== "string" ||
      !(await bcrypt.compare(password, usuario.hash))
    ) {
      return res
        .status(401)
        .json({ mensaje: "Email o contraseña incorrectos" });
    }
    const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, secreto, {
      expiresIn: "1h",
      algorithm: "HS256",
    });
    return res.json({ token, rol: usuario.rol });
  });

  app.get('/perfil', validarJWT, (req, res) => {
    res.json({ id: req.usuario.id, email: req.usuario.email, rol: req.usuario.rol });
  });

  app.get('/admin/dashboard', validarJWT, permitirRoles('admin'), (req, res) => {
    res.json({ mensaje: 'Bienvenido al dashboard de administración' });
  })

  return app;
}

module.exports = { crearApp };
