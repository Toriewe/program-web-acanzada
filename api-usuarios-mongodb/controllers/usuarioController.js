const usuario = require('../models/usuario');

exports.crearUsuario = async (req, res) => {
    try {
        const nuevoUsuario = await usuario.create(req.body);
        res.status(201).json(nuevoUsuario);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.listarUsuarios = async (req, res) => {
    try {
        const usuarios = await usuario.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}