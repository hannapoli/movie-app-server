const connect = require('../configs/dbConnect');
const queriesPeliculas = require('./queriesPeliculas');

// Obtener todas las peliculas
const traerPeliculas = async () => {
    let cliente, result
    try {
        cliente = await connect();
        result = await cliente.query(queriesPeliculas.pedirPeliculas);
        return result.rows;
    } catch (error) {
        console.log(error);
        throw error
    } finally {
        cliente.release();
    }
}

// Obtener una pelicula por ID
const traerPeliculaPorId = async (id) => {
    let cliente, result
    try {
        cliente = await connect();
        result = await cliente.query(queriesPeliculas.pedirPeliculaPorId, [id]);
        return result.rows;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        cliente.release();
    }
}

// Obtener pelicula por titulo
const traerPeliculaPorTitulo = async (title) => {
    let cliente, result
    try {
        cliente = await connect();
        result = await cliente.query(queriesPeliculas.pedirPeliculaPorTitulo, [title]);
        return result.rows;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        cliente.release();
    }
}

const crearPelicula = async ({ tit_pelicula, id_upload, ano_pelicula, director, genero, duracion }) => {
    let cliente, result
    try {
        cliente = await connect();
        result = await cliente.query(queriesPeliculas.creandoPelicula, [tit_pelicula, id_upload, ano_pelicula, director, genero, duracion]);
        return result.rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        cliente.release();
    }
}

const editarPelicula = async (id, data) => {
    let cliente, result
    const { tit_pelicula, id_upload, ano_pelicula, director, genero, duracion } = data;
    try {
        cliente = await connect();
        result = await cliente.query(
            queriesPeliculas.editandoPelicula,
            [tit_pelicula, id_upload, ano_pelicula, director, genero, duracion, id]
        );
        return result.rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        cliente.release();
    }
    return result;
}

const eliminarPelicula = async (id) => {
    let cliente, result;
    try {
        cliente = await connect();
        result = await cliente.query(queriesPeliculas.eliminandoPelicula, [id]);
        return {
            msg: 'La imagen fue eliminada correctamente',
            data: result.rows[0]
        };
    } catch (error) {
        console.error(error)
        throw error;
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