const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    edad: {
        type: Number,
        min: 0
    }
});

module.exports = mongoose.model('Usuario', usuarioSchema);
