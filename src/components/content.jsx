import { Outlet } from "react-router-dom";
import MenuLateral from "./MenuLateral";

const Content = () => {
  return (
    <div className="contenedor-principal">
      <MenuLateral />
      <main className="contenido">
        <Outlet />
      </main>
    </div>
  );
};

export default Content;
