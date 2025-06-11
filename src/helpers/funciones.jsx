import Swal from "sweetalert2";
export function Redirreccion(navigate, titulo, texto, ruta) {
  Swal.fire({
    title: titulo,
    text: texto,
    icon: "success",
    timer: 2000,
    showConfirmButton: false,
  }).then(() => {
    navigate(ruta);
  });
}

export function error() {
    Swal.fire({
  icon: "error",
  title: "ERROR...",
  text: "Dijitaste algun dato incorrecto !",
  footer: '<a href="#">Why do I have this issue?</a>'
});
    
}
export function token() {
    return(
      Math.random().toString(36).substring(2, 10) +
      Math.random().toString(36).substring(2, 10) +
      Math.random().toString(36).substring(2, 10)
  );
 
}