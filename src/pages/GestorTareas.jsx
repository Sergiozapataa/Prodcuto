import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./Tarea.css"
const GestorTareas = () => {
  const [tareas, setTareas] = useState([]);
  const [nueva, setNueva] = useState({ titulo: "", materia: "", fecha: "", estado: "pendiente" });
  const [buscar, setBuscar] = useState("");
  const [editar, setEditar] = useState(null);

  const obtenerTareas = async () => {
    const res = await fetch("http://localhost:3000/tareas");
    const data = await res.json();
    setTareas(data);
  };

  useEffect(() => {
    obtenerTareas();
  }, []);

  const guardarTarea = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3000/tareas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nueva),
    });
    setNueva({ titulo: "", materia: "", fecha: "", estado: "pendiente" });
    obtenerTareas();
  };

  const eliminarTarea = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch(`http://localhost:3000/tareas/${id}`, { method: "DELETE" });
        obtenerTareas();
        Swal.fire("Eliminado", "La tarea ha sido eliminada", "success");
      }
    });
  };

  const completarTarea = async (id) => {
    const tarea = tareas.find((t) => t.id === id);
    const actualizada = { ...tarea, estado: "completada" };
    await fetch(`http://localhost:3000/tareas/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(actualizada),
    });
    obtenerTareas();
  };

  const actualizarTarea = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:3000/tareas/${editar.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editar),
    });
    setEditar(null);
    obtenerTareas();
  };

  const tareasFiltradas = tareas.filter(
    (t) =>
      t.materia.toLowerCase().includes(buscar.toLowerCase()) ||
      t.estado.toLowerCase().includes(buscar.toLowerCase())
  );

  const resumen = {
    total: tareas.length,
    completadas: tareas.filter((t) => t.estado === "completada").length,
    pendientes: tareas.filter((t) => t.estado === "pendiente").length,
  };

  return (
    <div>
      <h2>📌 Crear nueva tarea</h2>
      <form onSubmit={editar ? actualizarTarea : guardarTarea}>
        <input
          type="text"
          placeholder="Título"
          value={editar ? editar.titulo : nueva.titulo}
          onChange={(e) => (editar ? setEditar({ ...editar, titulo: e.target.value }) : setNueva({ ...nueva, titulo: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Materia"
          value={editar ? editar.materia : nueva.materia}
          onChange={(e) => (editar ? setEditar({ ...editar, materia: e.target.value }) : setNueva({ ...nueva, materia: e.target.value }))}
        />
        <input
          type="date"
          value={editar ? editar.fecha : nueva.fecha}
          onChange={(e) => (editar ? setEditar({ ...editar, fecha: e.target.value }) : setNueva({ ...nueva, fecha: e.target.value }))}
        />
        <select
          value={editar ? editar.estado : nueva.estado}
          onChange={(e) => (editar ? setEditar({ ...editar, estado: e.target.value }) : setNueva({ ...nueva, estado: e.target.value }))}
        >
          <option value="pendiente">Pendiente</option>
          <option value="completada">Completada</option>
        </select>
        <button type="submit">{editar ? "Actualizar tarea" : "Guardar tarea"}</button>
        {editar && <button onClick={() => setEditar(null)}>Cancelar</button>}
      </form>

      <h2>🔍 Buscar tareas</h2>
      <input type="text" placeholder="Buscar por materia o estado" value={buscar} onChange={(e) => setBuscar(e.target.value)} />

      <h2>📊 Resumen</h2>
      <div className="resumen-tareas">
        <div className="cuadro-resumen completadas">✅ Completadas: {resumen.completadas}</div>
        <div className="cuadro-resumen pendientes">🕒 Pendientes: {resumen.pendientes}</div>
        <div className="cuadro-resumen total">📋 Total: {resumen.total}</div>
      </div>

      <h2>📝 Lista de tareas</h2>
      <div className="tarjetas">
        {tareasFiltradas.map((tarea) => (
          <div className="tarjeta-tarea" key={tarea.id}>
            <h3>{tarea.titulo}</h3>
            <p>Materia: {tarea.materia}</p>
            <p>Fecha: {tarea.fecha}</p>
            <p>Estado: {tarea.estado}</p>
            <button onClick={() => completarTarea(tarea.id)}>Marcar completada</button>
            <button onClick={() => setEditar(tarea)}>Editar</button>
            <button onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GestorTareas;
