import { useState } from "react";
import Swal from "sweetalert2";
import "./Registro.css"
const Registro = () => {
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: "",
    usuario: "",
    contrasena: "",
  });

  const manejarCambio = (e) => {
    setNuevoUsuario({
      ...nuevoUsuario,
      [e.target.name]: e.target.value,
    });
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();

    if (!nuevoUsuario.nombre || !nuevoUsuario.usuario || !nuevoUsuario.contrasena) {
      Swal.fire("Error", "Todos los campos son obligatorios", "error");
      return;
    }

    try {
      const respuesta = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoUsuario),
      });

      if (respuesta.ok) {
        Swal.fire("Éxito", "Usuario creado correctamente", "success");
        setNuevoUsuario({ nombre: "", usuario: "", contrasena: "" });
      } else {
        Swal.fire("Error", "No se pudo crear el usuario", "error");
      }
    } catch (error) {
      console.error("Error al crear usuario:", error);
      Swal.fire("Error", "Ocurrió un error de red", "error");
    }
  };

  return (
    <form onSubmit={manejarSubmit} className="formulario-crear-usuario">
      <h2>Crear nuevo usuario</h2>
      <input
        type="text"
        name="nombre"
        placeholder="Nombre completo"
        value={nuevoUsuario.nombre}
        onChange={manejarCambio}
      />
      <input
        type="text"
        name="usuario"
        placeholder="Nombre de usuario"
        value={nuevoUsuario.usuario}
        onChange={manejarCambio}
      />
      <input
        type="password"
        name="contrasena"
        placeholder="Contraseña"
        value={nuevoUsuario.contrasena}
        onChange={manejarCambio}
      />
      <button type="submit">Guardar usuario</button>
    
    </form>
  );
};

export default Registro;
