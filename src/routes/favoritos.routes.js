/**
 * @swagger
 * components:
 *   schemas:
 *     Favorito:
 *       type: object
 *       properties:
 *         id_favorito:
 *           type: integer
 *           description: ID único del favorito
 *           example: 10
 *         id_pelicula:
 *           type: integer
 *           description: ID de la película
 *           example: 1
 *         id_usuario:
 *           type: integer
 *           description: ID del usuario
 *           example: 2
 *     FavoritoInput:
 *       type: object
 *       required:
 *         - id_pelicula
 *         - id_usuario
 *       properties:
 *         id_pelicula:
 *           type: integer
 *           description: ID de la película
 *           example: 1
 *         id_usuario:
 *           type: integer
 *           description: ID del usuario
 *           example: 2
 */
/**
 * @swagger
 * tags:
 *   name: Favoritos
 *   description: Endpoints para gestión de favoritos de películas
 */

/**
 * @swagger
 * /favorito/crear:
 *   post:
 *     summary: Agregar película a favoritos
 *     tags: [Favoritos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FavoritoInput'
 *     responses:
 *       201:
 *         description: Favorito creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Favorito'
 *       400:
 *         description: Error de validación
 */

/**
 * @swagger
 * /favoritos/user/{id}:
 *   get:
 *     summary: Obtener favoritos de un usuario
 *     tags: [Favoritos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de favoritos del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_usuario:
 *                   type: integer
 *                   example: 2
 *                 nombre_usuario:
 *                   type: string
 *                   example: "Juan Perez"
 *                 peliculas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_favorito:
 *                         type: integer
 *                         example: 10
 *                       id_pelicula:
 *                         type: integer
 *                         example: 1
 *                       tit_pelicula:
 *                         type: string
 *                         example: "Matrix"
 *                       filename:
 *                         type: string
 *                         example: "matrix.jpg"
 *                       ano_pelicula:
 *                         type: integer
 *                         example: 1999
 *                       director:
 *                         type: string
 *                         example: "Wachowski"
 *                       genero:
 *                         type: string
 *                         example: "Acción"
 *                       duracion:
 *                         type: integer
 *                         example: 120
 *       404:
 *         description: Usuario no encontrado
 */

/**
 * @swagger
 * /favorito/eliminar/{id}:
 *   delete:
 *     summary: Eliminar favorito por ID
 *     tags: [Favoritos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del favorito
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FavoritoInput'
 *     responses:
 *       200:
 *         description: Favorito eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Favorito eliminado correctamente"
 *       404:
 *         description: Favorito no encontrado
 */
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { authUsuario} = require('../middlewares/rolAuth');
const { verificarJWT } = require('../middlewares/validarJWT');
const { crearFavorito, buscarTodosFavUsuario, eliminarFavorito } = require('../controllers/favoritos.controller');


router.post('/favorito/crear',[
    check('id_pelicula')
        .notEmpty().withMessage('Se necesita el Id de pelicula')
        .bail()
        .trim()
        .isInt().withMessage('El id de pelicula tiene que ser un numero entero')
        .bail()
    ,check('id_usuario')
        .notEmpty().withMessage('Se necesita el Id de usuario')
        .bail()
        .trim()
        .isInt().withMessage('El id de usuario tiene que ser un numero entero')
        .bail()
    ,verificarJWT
    ,authUsuario
], crearFavorito);
router.get('/favoritos/user/:id',[
    check('id')
        .notEmpty().withMessage('Se necesita el Id del usuario')
        .bail()
        .trim()
        .isInt().withMessage('El id de usuario tiene que ser un numero entero')
        .bail()
    ,verificarJWT
    ,authUsuario
], buscarTodosFavUsuario);
router.delete('/favorito/eliminar/:id',[
    check('id')
        .notEmpty().withMessage('Se necesita el Id de favorito')
        .bail()
        .trim()
        .isInt().withMessage('El id tiene que ser un numero entero')
        .bail()
    ,check('id_pelicula')
        .notEmpty().withMessage('Se necesita el Id de pelicula')
        .bail()
        .trim()
        .isInt().withMessage('El id de pelicula tiene que ser un numero entero')
        .bail()
    ,check('id_usuario')
        .notEmpty().withMessage('Se necesita el Id de usuario')
        .bail()
        .trim()
        .isInt().withMessage('El id de usuario tiene que ser un numero entero')
        .bail()
    ,verificarJWT
    ,authUsuario
], eliminarFavorito);
module.exports = router;