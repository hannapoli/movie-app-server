/**
 * @swagger
 * components:
 *   schemas:
 *     Pelicula:
 *       type: object
 *       properties:
 *         id_pelicula:
 *           type: integer
 *           description: ID único de la película
 *           example: 1
 *         tit_pelicula:
 *           type: string
 *           description: Título de la película
 *           example: "Matrix"
 *         ano_pelicula:
 *           type: integer
 *           description: Año de la película
 *           example: 1999
 *         director:
 *           type: string
 *           description: Director de la película
 *           example: "Wachowski"
 *         genero:
 *           type: string
 *           description: Género de la película
 *           example: "Acción"
 *         duracion:
 *           type: integer
 *           description: Duración en minutos
 *           example: 120
 *         filename:
 *           type: string
 *           description: Nombre de la imagen
 *           example: "matrix.jpg"
 *     PeliculaInput:
 *       type: object
 *       required:
 *         - tit_pelicula
 *         - ano_pelicula
 *         - director
 *         - genero
 *         - duracion
 *       properties:
 *         tit_pelicula:
 *           type: string
 *           example: "Matrix"
 *         ano_pelicula:
 *           type: integer
 *           example: 1999
 *         director:
 *           type: string
 *           example: "Wachowski"
 *         genero:
 *           type: string
 *           example: "Acción"
 *         duracion:
 *           type: integer
 *           example: 120
 *         imagen:
 *           type: string
 *           format: binary
 */
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pelicula'
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pelicula'
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pelicula'
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pelicula'
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
 *             $ref: '#/components/schemas/PeliculaInput'
 *     responses:
 *       201:
 *         description: Película creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pelicula'
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
 *             $ref: '#/components/schemas/PeliculaInput'
 *     responses:
 *       200:
 *         description: Película actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pelicula'
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Película eliminada correctamente"
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

// Obtener película por ID --> GET /api/v1/peliculas/:id
router.get('/peliculas/:id', [verificarJWT, authUsuario, ...idValidaParam, validarInput], obtenerPeliculaPorId);

// Obtener pelicula por titulo --> POST /api/v1/peliculas/busqueda
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