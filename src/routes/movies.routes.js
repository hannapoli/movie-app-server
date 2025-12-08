/**
 * @swagger
 * tags:
 *   name: Películas
 *   description: Endpoints para gestión de películas
 */

/**
 * @swagger
 * /peliculas:
 *   get:
 *     summary: Obtener todas las películas (usuario)
 *     tags: [Películas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de películas
 */

/**
 * @swagger
 * /peliculas/busqueda:
 *   post:
 *     summary: Buscar película por título
 *     tags: [Películas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Matrix"
 *     responses:
 *       200:
 *         description: Película encontrada
 *       404:
 *         description: No encontrada
 */

/**
 * @swagger
 * /admin/peliculas:
 *   get:
 *     summary: Obtener todas las películas (admin)
 *     tags: [Películas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de películas
 *       403:
 *         description: No autorizado
 */

/**
 * @swagger
 * /admin/peliculas/{id}:
 *   get:
 *     summary: Obtener película por ID (admin)
 *     tags: [Películas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la película
 *     responses:
 *       200:
 *         description: Datos de la película
 *       404:
 *         description: No encontrada
 */

/**
 * @swagger
 * /admin/peliculas:
 *   post:
 *     summary: Crear nueva película
 *     tags: [Películas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               tit_pelicula:
 *                 type: string
 *                 example: "Matrix"
 *               ano_pelicula:
 *                 type: integer
 *                 example: 1999
 *               director:
 *                 type: string
 *                 example: "Wachowski"
 *               genero:
 *                 type: string
 *                 example: "Acción"
 *               duracion:
 *                 type: integer
 *                 example: 120
 *               imagen:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Película creada
 *       400:
 *         description: Error de validación
 */

/**
 * @swagger
 * /admin/peliculas/{id}:
 *   put:
 *     summary: Actualizar película por ID
 *     tags: [Películas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la película
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               tit_pelicula:
 *                 type: string
 *                 example: "Matrix Reloaded"
 *               ano_pelicula:
 *                 type: integer
 *                 example: 2003
 *               director:
 *                 type: string
 *                 example: "Wachowski"
 *               genero:
 *                 type: string
 *                 example: "Acción"
 *               duracion:
 *                 type: integer
 *                 example: 138
 *               imagen:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Película actualizada
 *       400:
 *         description: Error de validación
 */

/**
 * @swagger
 * /admin/peliculas/{id}:
 *   delete:
 *     summary: Eliminar película por ID
 *     tags: [Películas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la película
 *     responses:
 *       200:
 *         description: Película eliminada
 *       404:
 *         description: No encontrada
 */
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
router.post('/peliculas/busqueda', [verificarJWT, authUsuario], obtenerPeliculaPorTitulo);


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