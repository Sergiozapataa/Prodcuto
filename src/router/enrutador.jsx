import RutaProtegida from "../components/Rutaprotegida";
import Home from "../pages/Home";
import Login from "../pages/login";
import GestorTareas from "../pages/GestorTareas"
import Registro from "../pages/Registro"
export let enrutador = [
 {
    path : "/home/",
    element : <RutaProtegida proteger={<Home />}/>,
    children: [
      {
        path: "Tareas",
        element: <GestorTareas />,
      },
     
    ] ,
    },
        {
        path: "/",
        element: <Login/>
        }, 
  {
    path: "/registro",
    element: <Registro />,
  },

    ];
    





