class UI {
    constructor() {

         //Instanciar la API
         this.api = new API();

         //Crear los markers con LayerGroup
         this.markers = new L.LayerGroup();

         // Iniciar el mapa
         this.mapa = this.inicializarMapa();

    }

    inicializarMapa() {
         // Inicializar y obtener la propiedad del mapa
         const map = L.map('mapa').setView([19.390519, -99.3739778], 6);
         const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
         L.tileLayer(
             'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
             attribution: '&copy; ' + enlaceMapa + ' Contributors',
             maxZoom: 18,
             }).addTo(map);
         return map;
         }

         mostrarEstablecimientos() {
             this.api.obtenerDatos()
                .then(datos => {
                    //console.log(datos);
                    const resultado = datos.respuestaJSON.results;

                    //Ejecutar la función para mostrar los pines.
                    this.mostrarPines(resultado);
                })
        }

        mostrarPines(datos) {
            //console.log(datos);
            //Limpiar los markers
            this.markers.clearLayers(); //clearLayers() es una función propia de Leaflet

            //recorrer los establecimientos
            datos.forEach(dato => {
                //destructuring cogiendo las propiedades que nos interesa del objeto obtenido en la respuesta.
                const { latitude, longitude, calle, regular, premium } = dato;

                //crear PopUP usando una función propia de Leaflet de globos de información
                const opcionesPopup = L.popup()
                    .setContent(`<p>Calle: ${calle}</p>
                                 <p><b>Regular:</b> $ ${regular}</p>
                                 <p><b>Premium:</b> $ ${premium}</p>
                    `);

                //agregar el PIN
                const marker = new L.marker([
                    parseFloat(latitude),
                    parseFloat(longitude)
                ]).bindPopup(opcionesPopup)

                //agregamos los markers a la capa
                this.markers.addLayer(marker);
            });

            //agregar la capa de markers al mapa
            this.markers.addTo(this.mapa)
        }

        //Buscador
        obtenerSugerencias(busqueda) {
            this.api.obtenerDatos()
                .then(datos => {
                    //console.log(datos);
                    const resultados = datos.respuestaJSON.results;

                    //Enviar el JSON y la búsqueda para el filtrado
                    this.filtrarSugerencias(resultados,busqueda);
                    
                })
        }

        //filtra las sugerencias en base al input
        filtrarSugerencias(resultados,busqueda) {
            //filtrar con .filter
            //Con indexOf recorremos todo lo que hay en la propiedad calle del objeto y 
            //y lo que concuerda con la búsqueda (!== -1), lo filtra y lo retorna con filter.
            //ya que indexOf retona -1 cuando algo no concuerda con la búsqueda.
            const filtro = resultados.filter(filtro => filtro.calle.indexOf(busqueda) !== -1 );
            //console.log(filtro);
            
            //mostrar los pines
            this.mostrarPines(filtro);
        }
}