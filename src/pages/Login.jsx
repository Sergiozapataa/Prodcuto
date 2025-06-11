import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Redirreccion, token, error } from "../helpers/funciones";
import "./Login.css"

let apiusuarios = "http://localhost:3000/usuarios";

const Login = () => {
    const [getUsuario, setUsuario] = useState("");
    const [getContraseña, setContraseña] = useState("");
    const [usuarios, setUsuarios] = useState([]);
    let navigate = useNavigate();

    function getUsuarios() {
        fetch(apiusuarios)
            .then((response) => response.json())
            .then((data) => setUsuarios(data))
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        getUsuarios();
    }, []);

    function encontrarUsuario() {
        return usuarios.find(
            (usuario) =>
                getUsuario === usuario.usuario &&
                getContraseña === usuario.contrasena
        );
    }

    function iniciarSesion() {
        const usuarioEncontrado = encontrarUsuario();
        if (usuarioEncontrado) {
            let tokenAcceso = token();
            localStorage.setItem("token", tokenAcceso);
            localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));
            Redirreccion(
                navigate,
                "Bienvenido " + usuarioEncontrado.nombre,
                "En unos segundos serás redirigido al inicio",
                "/home"
            );
        } else {
            error();
        }
    }

    return (
        <form className="formulario">
            <h2>Iniciar Sesión</h2>
            <input
                onChange={(e) => setUsuario(e.target.value)}
                type="text"
                className="input"
                placeholder="Nombre de usuario"
            />
            <input
                onChange={(e) => setContraseña(e.target.value)}
                type="password"
                className="input"
                placeholder="Contraseña"
            />
            <button type="button" onClick={iniciarSesion}>
                Iniciar sesión
            </button>
            
               <Link className ="enlace "to="/registro">¿No tienes cuenta?</Link>
            
        </form>
    );
};

export default Login;
