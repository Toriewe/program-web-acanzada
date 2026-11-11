const url = 'http://localhost:4000/api/usuarios';

try {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Error en la solicitud");
    }
    const usuarios = await response.json();
    console.log(usuarios);
    
} catch (error) {
    console.error("No se pudo consultar:", error.message);
}