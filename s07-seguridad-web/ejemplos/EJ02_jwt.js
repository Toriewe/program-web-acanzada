require('dotenv').config();

const jwt = require('jsonwebtoken');
const secreto = process.env.JWT_SECRET;

if(!secreto || secreto.length < 48) throw new Error("Configurar JWT_SECRET con minimo 48 caracteres");

const token = jwt.sign({ id:10, rol: usuario }, secreto, { expiresIn: '1h', algorithm: 'HS256' });
