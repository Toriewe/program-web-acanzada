import express from "express";
import cors from "cors";
//import bcrypt from "bcryptjs";

const app = express();
const PORT = 4000;

app.use(cors(
    {
        origin: "http://localhost:5173",
    }
));

app.use(express.json());

let usuarios = [
    {
        id: 1,
        nombre: "Juan",
        email: "user@example.com"
    },
    {
        id: 2,
        nombre: "Pedro",
        email: "pedro@example.com"
    }
];

app.get("/api/usuarios", (req, res) => {
    res.json(usuarios);
});

app.get("/api/usuarios-mal", (req, res) => {
    res.json({ error: "no es una lista" });
});

app.post("/api/usuarios", (req, res) => {
    const nombre = typeof req.body?.nombre === "string" ? req.body.nombre.trim() : "";
    if (!nombre) {
        return res.status(400).json({ mensaje: "Nombre es requerido" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
