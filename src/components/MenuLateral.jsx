import { useNavigate, Link } from "react-router-dom"; 
import { Redirreccion } from "../helpers/funciones";

const MenuLateral = () => {
  const navigate = useNavigate();

  function cerrarSesion() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    Redirreccion(
      navigate,
      "Sesión finalizada",
      "En unos segundos cerrará la aplicación",
      "/"
    );
  }

  return (
    <aside className="parte_lateral">
        <img src="/Logo.jpg" alt="Logo" />
      <nav className="parte_lateral-nav">
        <Link to="/home">Inicio</Link>
        <Link to="Tareas">Tareas</Link>
        <button onClick={cerrarSesion} type="button">Cerrar sesión</button>
      </nav>
    </aside>
  );
};

export default MenuLateral;
