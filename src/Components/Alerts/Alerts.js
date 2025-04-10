import Swal from 'sweetalert2'

export class Alert{
    constructor(){
        this.title='TITULO PRUEBA';
        this.texto='TEXTO PRUEBA';

    }

    Delete(callback,{titulo=false,texto=false}=false){
        Swal.fire({
            title: titulo?titulo:"Advertencia!",
            text: texto?texto:'Eliminarás este elemento de forma permanente. ¿Estás seguro?',
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Borrar!"
          }).then((result) => {
            if (result.isConfirmed) {
              callback()
            }
          });
    }

    SuccessConfirm(callback,{titulo=false,texto=false}=false){
      Swal.fire({
          title: titulo?titulo:"Proceso Exitoso!",
          // text: texto?texto:'Eliminarás este elemento de forma permanente. ¿Estás seguro?',
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, Borrar!"
        }).then((result) => {
          if (result.isConfirmed) {
            callback()
          }
        });
    }

    Success({titulo=false,confirmar=false}=false){
        Swal.fire({
            // position: "top-end",
            icon: "success",
            title: titulo?titulo:"Proceso Exitoso!",
            showConfirmButton: confirmar?confirmar:false,
            timer: confirmar?false:1500
          });
    }

    Error({titulo=false,texto=false}=false){
        Swal.fire({
            icon: "error",
            title: "Error...",
            text: texto?texto:"Algo salio mal",
            
            // footer: '<a href="#">Why do I have this issue?</a>'
          });
    }

    ErrorSistem({titulo=false,texto=false}=false){
        Swal.fire({
            title: "Error de sistema (404)",
            text: "Por favor, contactar a soporte",
            icon: "question"
          });
    }

}