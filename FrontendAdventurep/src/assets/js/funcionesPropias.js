function GenerarVentanaModal(mensaje){
    document.querySelector(id="txtmensaje").innerHTML=mensaje;
    var elem=document.querySelector('#VentanaModal');
    var instance = M.Modal.getInstance(elem);
    instance.open();
}