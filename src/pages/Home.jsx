import { Outlet } from "react-router-dom";
import MenuLateral from "../components/MenuLateral";
import "./Home.css"
const Home = () => {
  return (
    <div className="contenedor-home">
      <MenuLateral />
      <main className="contenido">
        <h1>Bienvenido </h1>
        <Outlet /> 
      </main>
    </div>
  );
};

export default Home;
