class API {

    async obtenerDatos() {

        const total = 11000;
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