const ui = new UI();

document.addEventListener('DOMContentLoaded',() => {
    ui.mostrarEstablecimientos();
})

//habilitar búsqueda de establecimientos
const buscador = document.querySelector('#buscar input');

buscador.addEventListener('input',() => {
     //console.log(buscador.value);//muestra lo que escribes en el buscador
    //Decimos que empieze a buscar cuando hayamos colocado más de 5 carácteres, 
    // para que filtre con más precisión los resultados
    if(buscador.value.length > 5) {
         console.log(buscador.value);
        //buscar en la API
        ui.obtenerSugerencias(buscador.value);
    }
})