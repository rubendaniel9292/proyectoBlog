import Swal from 'sweetalert2';
//metodo para generar un alert despues de crear o actualiar un articulo
export const alertSucces = (message) => {
    Swal.fire({
        title: "Buen trabajo",
        text: message,
        icon: "success"
    });
}

export const alertError = (message) => {
    Swal.fire({
        title: "¡¡Error!!...",
        text: message,
        icon: "error",
        toast:true
    });
}

export const alertDelete = () => {
    const Toast = Swal.mixin({
        position: "center",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });
      Toast.fire({
        icon: "success",
        title: "Artículo eliminado correctamente"
      });
}
