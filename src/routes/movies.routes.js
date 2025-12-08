// Importar la clase o función Router del paquete express , y los controladores de peliculas.
const { Router } = require('express');

const { authUsuario, authAdmin } = require('../middlewares/rolAuth');
const { verificarJWT } = require('../middlewares/validarJWT');
const { upload, handleMulterErrors } = require('../middlewares/multer.middleware');
const { validateFiles } = require('../middlewares/validar.uploads');
const { validarInput } = require('../middlewares/validarInput');

const router = Router();

const {
    obtenerPeliculas,
    obtenerPeliculaPorId,
    obtenerPeliculaPorTitulo,
    crearNuevaPelicula,
    actualizarPelicula,
    borrarPelicula
} = require('../controllers/movies.controller');

const { validacionesPelicula, idValidaParam } = require('../middlewares/validar.movies')

//========== Rutas publicas ==========
// Obtener todas las peliculas --> GET /api/v1/peliculas
router.get('/peliculas', [verificarJWT, authUsuario], obtenerPeliculas);

// Obtener pelicula por titulo --> GET /api/v1/peliculas/busqueda?title=algo
router.get('/peliculas/busqueda', [verificarJWT, authUsuario], obtenerPeliculaPorTitulo);
// Obtener película por ID para usuarios
router.get('/peliculas/:id', [verificarJWT, authUsuario], obtenerPeliculaPorId);

//========== Rutas de administrador ==========
// Obtener todas las peliculas --> GET /api/v1/peliculas
router.get('/admin/peliculas', [verificarJWT, authAdmin], obtenerPeliculas);

// Obtener película por ID --> GET /api/v1/admin/peliculas/:id
router.get('/admin/peliculas/:id', [verificarJWT, authAdmin, ...idValidaParam, validarInput], obtenerPeliculaPorId);

// Crear nueva pelicula --> POST /api/v1/admin/peliculas
router.post(
    '/admin/peliculas',
    [
        verificarJWT,
        authAdmin,
        upload.single('imagen'),
        handleMulterErrors,
        validateFiles,
        ...validacionesPelicula,
        validarInput
    ],
    crearNuevaPelicula
);

// Actualizar película --> PUT /api/v1/admin/peliculas/:id
router.put(
    '/admin/peliculas/:id',
    [
        verificarJWT,
        authAdmin,
        ...idValidaParam,
        upload.single('imagen'),
        handleMulterErrors,
        validateFiles,
        ...validacionesPelicula,
        validarInput
    ],
    actualizarPelicula
);

// Borrar película --> DELETE /api/v1/admin/peliculas/:id
router.delete('/admin/peliculas/:id', [verificarJWT, authAdmin, ...idValidaParam, validarInput], borrarPelicula);

module.exports = router;