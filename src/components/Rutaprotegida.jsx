import { Navigate } from "react-router-dom"
function RutaProtegida({proteger}) {
    let tokenAceeso = localStorage.getItem("token")
    return tokenAceeso ? proteger : <Navigate to= "/" />   
}

export default RutaProtegida