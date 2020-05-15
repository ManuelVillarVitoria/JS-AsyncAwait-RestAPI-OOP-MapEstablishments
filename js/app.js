const ui = new UI();

document.addEventListener('DOMContentLoaded',() => {
    ui.mostrarEstablecimientos();
})

//habilitar búsqueda de establecimientos
const buscador = document.querySelector('#buscar input');

buscador.addEventListener('input',() => {
     //console.log(buscador.value);//muestra lo que escribes en el buscador
    //Decimos que empieze a buscar cuando hayamos colocado más de 3 carácteres, 
    // para que filtre con más precisión los resultados
    if(buscador.value.length > 3) {
         //console.log(buscador.value);
        // Obtener sugerencias que sean parte de la busqueda
        ui.obtenerSugerencias(buscador.value);
    } else if(buscador.value.length === 0) {
        // Mostrar los pines
        ui.mostrarEstablecimientos();
    }
})