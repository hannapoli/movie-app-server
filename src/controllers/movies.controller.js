// Importar el modelo para poder intercatuar con la colección de peliculas
const modeloPelicula = require('../models/movie.model');
const modeloFavorito = require('../models/favorito.model');
const modeloUpload = require('../models/upload.model');
const { deleteFile } = require('../helpers/files.helper')

//((================== Controladores para el recurso peliculas ==================))\\

// Devolver todas las peliculas que coincidan con la petición
const obtenerPeliculas = async (req, res) => {
    try {
        // Llamar al modelo para traer todas las películas
        const peliculas = await modeloPelicula.traerPeliculas();

        // Devolver un json con la lista de películas
        return res.status(200).json({
            ok: true,
            msg: 'Películas obtenidas correctamente',
            data: peliculas
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error al intentar obtener las películas',
        });
    }
};

// Devolver la peliculas que coincidan con el 'id' de la petición
const obtenerPeliculaPorId = async (req, res) => {
    try {
        // Obtener el ID desde los parámetros de la URL
        const { id } = req.params;

        // Llamar al modelo para buscar la película
        const pelicula = await modeloPelicula.traerPeliculaPorId(id);

        // Verificar si existe la película existe
        if (pelicula.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontraro la pelicula'
            });
        }

        return res.status(200).json({
            ok: true,
            msg: 'Película obtenida correctamente',
            data: pelicula
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error interno al intentar obtener la pelicula',
        });
    }
};

// Buscar películas por título (o parte del título)
const obtenerPeliculaPorTitulo = async (req, res) => {
    try {
        // 1. Obtenemos el título desde query
        const titulo = req.query.title || req.params.titulo;


        if (!titulo || titulo.trim() === "") {
            return res.status(400).json({
                ok: false,
                msg: "Debes enviar un título para buscar películas."
            });
        }


        // 2. Llamamos al modelo usando el título correcto
        const peliculas = await modeloPelicula.traerPeliculaPorTitulo(titulo);


        // 3. Si no hay resultados
        if (peliculas.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: "No se encontraron películas con ese título."
            });
        }


        // 4. Respuesta correcta
        return res.status(200).json({
            ok: true,
            msg: "Películas obtenidas correctamente",
            data: peliculas
        });


    } catch (error) {
        console.log("Error en obtenerPeliculaPorTitulo:", error);


        return res.status(500).json({
            ok: false,
            msg: "Error interno en la búsqueda",
        });
    }
};


// Crear una nueva pelicula y guardarla
const crearNuevaPelicula = async (req, res) => {
    console.log(req.body)
    const { tit_pelicula } = req.body
    // Guardar el nombre del archivo subido(si lo hay), para posible rollback
    const nombreImgSubida = req.file?.filename
    let uploadId = null;

    try {
        const existe = await modeloPelicula.traerPeliculaPorTitulo(tit_pelicula);
        //console.log(existe)
        if (existe.length > 0) {
            // Si la película existe, eliminar la imagen recién subida
            if (nombreImgSubida) {
                await deleteFile(nombreImgSubida);
            }
            return res.status(404).json({
                ok: false,
                msg: 'Esta pelicula ya existe',
            });
        }

        // Si viene un archivo de imagen, crear registro en uploads
        if (req.file) {
            const uploadData = {
                filename: req.file.filename,
                originalname: req.file.originalname,
                mimetype: req.file.mimetype,
                size: req.file.size,
                nombre: `${tit_pelicula} Poster`
            };

            const uploadRegistro = await modeloUpload.crearUpload(uploadData);
            uploadId = uploadRegistro.id_upload;
        }

        // Asignar el id_upload al cuerpo de la petición
        req.body.id_upload = uploadId;

        const idNuevaPelicula = await modeloPelicula.crearPelicula(req.body);

        return res.status(201).json({
            ok: true,
            msg: 'Película creada correctamente',
            id: idNuevaPelicula
        });

    } catch (error) {
        console.error(error);
        // Rollback si se subio la imagen pero fallo la base de datos
        if (nombreImgSubida) {
            try {
                await deleteFile(nombreImgSubida)
            } catch (errBorrando) {
                console.error(
                    `Error al intentar hacer rollback de la imagen (${nombreImgSubida}):`,
                    errBorrando
                );
            }
        }

        return res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error interno al intentar crear la película',
        });
    }
}

// Actualizar una pelicula que coincidan con el 'id' de la petición
const actualizarPelicula = async (req, res) => {
    let nuevoUploadId = null;
    let antiguoUploadId = null;
    let antiguoFilename = null;
    const nombreImgSubida = req.file?.filename;

    try {
        const { id } = req.params;
        const pelicula = await modeloPelicula.traerPeliculaPorId(id);
        console.log(pelicula);
        if (pelicula.length === 0) {
            // Si no existe la película, eliminar la imagen recién subida
            if (nombreImgSubida) {
                await deleteFile(nombreImgSubida);
            }
            return res.status(404).json({
                ok: false,
                msg: 'No se encontraron resultados'
            });
        }

        // Si se sube una nueva imagen, crear registro en uploads
        if (req.file) {
            const uploadData = {
                filename: req.file.filename,
                originalname: req.file.originalname,
                mimetype: req.file.mimetype,
                size: req.file.size,
                nombre: `${req.body.tit_pelicula || pelicula[0].tit_pelicula} Poster`
            };

            const uploadRegistro = await modeloUpload.crearUpload(uploadData);
            nuevoUploadId = uploadRegistro.id_upload;

            // Guardar el id_upload anterior para eliminarlo después
            antiguoUploadId = pelicula[0].id_upload;
            antiguoFilename = pelicula[0].filename;

            // Asignar el nuevo id_upload
            req.body.id_upload = nuevoUploadId;
        } else {
            // Si no se sube imagen nueva, mantener el id_upload actual
            req.body.id_upload = pelicula[0].id_upload;
        }

        const peliculaActualizada = await modeloPelicula.editarPelicula(id, req.body);

        if (antiguoFilename) {
            await deleteFile(antiguoFilename);
        }
        if (antiguoUploadId) {
            await modeloUpload.eliminarUpload(antiguoUploadId);
        }

        return res.status(200).json({
            ok: true,
            msg: 'Película actualizada correctamente',
            data: peliculaActualizada
        });

    } catch (error) {
        console.error(error);
        // Rollback: si se creó un nuevo upload pero falló algo, eliminarlo
        if (nombreImgSubida) {
            try {
                await deleteFile(nombreImgSubida);
                if (nuevoUploadId) {
                    await modeloUpload.eliminarUpload(nuevoUploadId);
                }
            } catch (errBorrando) {
                console.error('Error en rollback:', errBorrando);
            }
        }
        return res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error interno al intentar editar la película',
        });
    }
}

// Elimonar la pelicula que coincidan con el 'id' de la petición
const borrarPelicula = async (req, res) => {
    try {
        const { id } = req.params
        const pelicula = await modeloPelicula.traerPeliculaPorId(id);
        // Verificar si existe la película existe
        console.log(pelicula);
        if (pelicula.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'La pelicula con ese id no existe'
            });
        }

        // Guardar id_upload y filename para eliminarlos después
        const uploadId = pelicula[0].id_upload;
        const nombreImagen = pelicula[0].filename;

        //ahora verificaremos si tiene alguna relacion en favoritos
        const buscadoEnfav = await modeloFavorito.buscarTodosFavidPeli(id);
        console.log(buscadoEnfav);

        //si existe las eliminamos
        if (buscadoEnfav.length > 0) {
            await modeloFavorito.eliminarFavoritoPelis(id);
        }

        // Eliminar la pelicula de la base de datos
        await modeloPelicula.eliminarPelicula(id);

        // Eliminar el archivo físico si existe
        if (nombreImagen) {
            const resultadoArchivo = await deleteFile(nombreImagen);

            if (!resultadoArchivo.ok) {
                console.error(
                    `No se pudo eliminar la imagen asociada (${nombreImagen}):`,
                    resultadoArchivo.error
                );
                // No romper la respues, dejarlo logeado
            }
        }

        // Eliminar el registro de upload si existe
        if (uploadId) {
            try {
                await modeloUpload.eliminarUpload(uploadId);
            } catch (error) {
                console.error(`No se pudo eliminar el registro de upload (${uploadId}):`, error);
                // No romper la respuesta, solo logear
            }
        }

        // respuesta final
        return res.status(200).json({
            ok: true,
            msg: 'Película borrada satisfactoriamente'
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
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
