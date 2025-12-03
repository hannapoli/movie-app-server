// Importar queriPeliculas
const queriesPeliculas = require('./queriesPeliculas')

// Traer al traductor de postgreSQL desde dbConnect
const pool = require('../configs/dbConnect');

// Obtener todas las peliculas
const traerPeliculas = async () => {
    let cliente, result

    try {
        cliente = await pool();

        const respuesta = await cliente.query(queriesPeliculas.pedirPeliculas); // Traer desde Mpeliculas
        result = respuesta.rows; // Devolver los datos

    } catch (error) {
        console.log(error);
        throw error

    } finally {
        cliente.release(); // Finalizar la consulta
    } 
    return result;
}


// Obtener una pelicula por ID
const traerPeliculaPorId = async (id) => {
        let cliente, result
    try {
        cliente = await pool();

        const respuesta = await cliente.query(queriesPeliculas.pedirPeliculaPorId, [id]);
        result = respuesta.rows[0]; // Devolver solo la primera fila que coincide 

    } catch (error) {
        console.log(error);
        throw error

    } finally {
        cliente.release(); 
    } 
    return result;
}

// Obtener pelicula por titulo
const traerPeliculaPorTitulo = async(title) =>{
        let cliente, result
    try {
        cliente = await pool();

        const respuesta = await cliente.query(queriesPeliculas.pedirPeliculaPorTitulo, [`%${title}%`]);
        result = respuesta.rows;

    } catch (error) {
        console.log(error);
        throw error

    } finally {
        cliente.release(); 
    } 
    return result;
}


// Crear una película nueva
const crearPelicula = async(data) => {

        let cliente, result
        const { tit_pelicula, img_pelicula, ano_pelicula, director, genero, duracion } = data; // Desestruturar desde datos
        try {
        cliente = await pool();
        const respuesta = await cliente.query(queriesPeliculas.creandoPelicula, [tit_pelicula, img_pelicula, ano_pelicula, director, genero, duracion]);
        result = respuesta.rows[0].id_pelicula; // Devolver el ID de la nueva pelicula

    } catch (error) {
        console.log(error);
        throw error

    } finally {
        cliente.release(); 
    } 
    return result;
}


// Editar una película
const  editarPelicula = async(id, data) => {
    let cliente, result
    const { tit_pelicula, img_pelicula, ano_pelicula, director, genero, duracion } = data;

    try {
        cliente = await pool();
        const respuesta = await cliente.query(
        queriesPeliculas.editandoPelicula, 
        [tit_pelicula, img_pelicula, ano_pelicula, director, genero, duracion, id] 
    );
        result = respuesta.rows[0] // Devolver todo
    } catch (error) {
        console.log(error);
        throw error

    } finally {
        cliente.release(); 
    } 
    return result;
}


// Eliminar una pelicula
const eliminarPelicula = async (id) => { 
        let cliente;
    try {
        cliente = await pool();

        // Verificar si la película existe
        const peliculaExistente = await cliente.query(queriesPeliculas.verificarPelicula, [id]);

        if (peliculaExistente.rowCount === 0) { // No se han encontrado resultados..
            return { error: "La pelicula no existe" }
        }
        // Eliminar la película
        await cliente.query(queriesPeliculas.eliminandoPelicula, [id]);

        // Avisar de que todo salio bien
        return { message: 'Película eliminada correctamente' };
        
    } catch (error) {
        // Mensaje de error
        console.error("Error eliminando la película")
        return { error: "Error interno del servidor" }
    } finally {
        cliente.release();
    }
}

module.exports = {
    traerPeliculas,
    traerPeliculaPorId,
    traerPeliculaPorTitulo,
    crearPelicula,
    editarPelicula,
    eliminarPelicula
}