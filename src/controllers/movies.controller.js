// Importar express-validator, y el modelo para poder intercatuar con la colección de peliculas
const { validationResult } = require('express-validator')
const modeloPelicula = require('../models/movie.model');



//((================== Controladores para el recurso peliculas ==================))\\

    // GET /api/v1/peliculas
// Devolver todas las peliculas que coincidan con la petición
const obtenerPeliculas = async (req, res) => {
    try {
        // Llamar al modelo para traer todas las películas
        const peliculas = await modeloPelicula.traerPeliculas();

        // Devolver un json con la lista de películas
        res.status(200).json({
            ok: true,
            msg: 'Películas obtenidas correctamente',
            data: peliculas
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error al intentar obtener las películas',
        });
    }
};

    // GET /api/v1/peliculas/:id
// Devolver la peliculas que coincidan con el 'id' de la petición
const obtenerPeliculaPorId = async (req, res) => {
    try {
        // Obtener el ID desde los parámetros de la URL
        const { id } = req.params;

        // Llamar al modelo para buscar la película
        const pelicula = await modeloPelicula.traerPeliculaPorId(id);

        // Verificar si existe la película existe
        if (!pelicula) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontraron resultados'
            });
        }

        res.status(200).json({
            ok: true,
            msg: 'Película obtenida correctamente',
            data: pelicula
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error interno al intentar obtener la pelicula',
        });
    }
};

    // GET /api/v1/peliculas/busqueda?titulo=algo
// Devolver la peliculas que coincidan con el 'titulo' de la petición o parte de el
const obtenerPeliculaPorTitulo = async (req, res) => {
    try {
        // Obtener el ID desde los parámetros de la URL
        const { title } = req.query;

        // Crear variable para manejar resultados
        let peliculas;

        if (title) {
            peliculas = await modeloPelicula.traerPeliculaPorTitulo(title)
        } else {
            peliculas = await modeloPelicula.traerPeliculas();
        }

        res.status(200).json({
            ok: true,
            msg: 'Películas obtenidas correctamente',
            data: peliculas
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error interno en la busqueda',
        });
    }
};

    // POST /api/v1/peliculas
// Crear una nueva pelicula y guardarla
const crearNuevaPelicula = async(req, res) => {
    try {
        // Verificar si existe la película existe
        if (!pelicula) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontraron resultados'
            });
        }

        const idNuevaPelicula = await modeloPelicula.crearPelicula(req.body);

        res.status(201).json({
            ok: true,
            msg: 'Película creada correctamente',
            id: idNuevaPelicula        
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error interno al intentar crear la película',
        });
    }
}


    // PUT /api/v1/editarPelicula/:id
// Actualizar una pelicula que coincidan con el 'id' de la petición
const actualizarPelicula = async(req, res) => {
    try {
        // Obtener el ID desde los parámetros de la URL
        const { id } = req.params;

        const pelicula = await modeloPelicula.traerPeliculaPorId(id);

        // Verificar si existe la película existe
        if (!pelicula) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontraron resultados'
            });
        }

        // Llamar al modelo para buscar la película
        const peliculaActualizada = await modeloPelicula.editarPelicula(id, req.body);

        res.status(200).json({
            ok: true,
            msg: 'Película actualizada correctamente',
            data: peliculaActualizada
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error interno al intentar editar la película',

        });
    }
}

    // DELETE /api/v1/eliminarPelicula/:id
// Elimonar la pelicula que coincidan con el 'id' de la petición
const borrarPelicula = async(req, res) => {
    try {
        const { id } = req.params;
        const pelicula = await modeloPelicula.traerPeliculaPorId(id);

        // Verificar si existe la película existe
        if (!pelicula) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontraron resultados'
            });
        }

        const resultado = await modeloPelicula.eliminarPelicula(id);

        res.status(200).json({
            ok: true,
            msg: 'Película borrada satisfactoriamente'
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error interno al intentar eliminar la película',
        });
    }
}

module.exports = {
    obtenerPeliculas,
    obtenerPeliculaPorId,
    obtenerPeliculaPorTitulo,
    crearNuevaPelicula,
    actualizarPelicula,
    borrarPelicula
};