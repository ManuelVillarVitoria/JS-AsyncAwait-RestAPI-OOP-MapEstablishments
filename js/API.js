class API {

    async obtenerDatos() {

        const total = 1000;//Bajamos el número de 11.000 a 1.000 para no obtener respuestas tan lentas.
        
         //Añadimos al final del link de la API: ?pageSize=${total}, ya que en la respuesta del objeto
         // vemos: pagination: {pageSize: 11000, page: 1, total: 10018}. Y por tanto añadimos esta propiedad.
         //Al mezclar propiedades, cambiamos las comillas sencillas por template strings.
        const datos = await fetch (`https://api.datos.gob.mx/v1/precio.gasolina.publico?pageSize=${total}`);

        const respuestaJSON = await datos.json();

        return {
            respuestaJSON
        }
    }
}