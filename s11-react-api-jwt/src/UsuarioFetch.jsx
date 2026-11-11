import {useState } from "react";

export default function UsuarioFetch() {
    const [usuarios, setUsuario] = useState([]);
    const [mensaje, setMensaje] = useState("Pulsa consulta para comenzar");

    async function consultaUsuarios(){
        setMensaje("Consultando usuarios...");
        try {
            const response = await fetch("http://localhost:4000/api/usuarios");
            if (!response.ok) {
                throw new Error("Error en la solicitud");
            }
            const data = await response.json();
            setUsuario(data);
            setMensaje("Consulta realizada correctamente");
        } catch (error) {
            setUsuario([]);
            console.error("No se pudo consultar:", error.message);
        }
    }

    return (
        <section>
            <h2>Consulta de usuarios</h2>
            <button onClick={consultaUsuarios}>Consulta</button>
            <p>{mensaje}</p>

            <ul>
                {usuarios.map((usuario) => (
                    <li key={usuario.id}>
                        <strong>{usuario.nombre}</strong>
                    </li>
                ))}
            </ul>
        </section>
    )
}