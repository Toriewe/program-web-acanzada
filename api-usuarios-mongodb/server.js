const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const connectDB = require('./config/database');
const usuarioRoutes = require('./routes/usuarioRoutes');
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api', usuarioRoutes);

async function iniciarServidor() {
    try {
        await connectDB();
        const PORT = process.env.PORT || 3001;

        app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto {${PORT}} http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
        process.exit(1);
    }
};

iniciarServidor();

app.get('/health', (req, res) => {
    res.send({estado: 'ok'});
});

