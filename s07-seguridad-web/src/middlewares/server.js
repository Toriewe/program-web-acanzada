require('dotenv').config();
const { crearApp } = require('./crearApp');

async function iniciar(){
    const app = await crearApp();
    const puerto = Number(process.env.PORT || 3000);

    app.listen(puerto, () => {
        console.log(`Servidor escuchando en http://localhost:${puerto}`);
    })
}

iniciar().catch(error => {
    console.error(error.message);
    process.exitCode = 1;
});
