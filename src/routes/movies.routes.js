// Importar la clase o función Router del paquete express , y los controladores de peliculas.
const { Router } = require('express');

const { authUsuario, authAdmin } = require('../middlewares/rolAuth');
const { verificarJWT } = require('../middlewares/validarJWT');

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
router.post('/peliculas/busqueda',[verificarJWT, authUsuario], obtenerPeliculaPorTitulo);


    //========== Rutas de administrador ==========
// Obtener película por ID --> GET /api/v1/admin/peliculas/:id
router.get('/admin/peliculas/:id', [verificarJWT, authAdmin, idValidaParam], obtenerPeliculaPorId); 

// Crear nueva pelicula --> POST /api/v1/admin/peliculas
router.post('/admin/peliculas', [verificarJWT, authAdmin, validacionesPelicula], crearNuevaPelicula);

// Actualizar película --> PUT /api/v1/admin/peliculas/:id
router.put('/admin/peliculas/:id', [verificarJWT, authAdmin, idValidaParam, validacionesPelicula], actualizarPelicula);

// Borrar película --> DELETE /api/v1/admin/peliculas/:id
router.delete('/admin/peliculas/:id', [verificarJWT, authAdmin, idValidaParam], borrarPelicula);

module.exports = router;