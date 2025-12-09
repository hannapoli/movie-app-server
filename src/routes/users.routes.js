/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         id_usuario:
 *           type: integer
 *           description: ID único del usuario
 *           example: 1
 *         nombre_usuario:
 *           type: string
 *           description: Nombre del usuario
 *           example: "Ana Lopez"
 *         email:
 *           type: string
 *           description: Email del usuario
 *           example: "ana@email.com"
 *         rol:
 *           type: string
 *           description: Rol del usuario
 *           example: "admin"
 *     UsuarioInput:
 *       type: object
 *       required:
 *         - nombre_usuario
 *         - email
 *         - contrasena
 *       properties:
 *         nombre_usuario:
 *           type: string
 *           example: "Ana Lopez"
 *         email:
 *           type: string
 *           example: "ana@email.com"
 *         contrasena:
 *           type: string
 *           example: "Ana123!"
 *     UsuarioDeleteInput:
 *       type: object
 *       required:
 *         - id_usuario
 *         - email
 *       properties:
 *         id_usuario:
 *           type: integer
 *           example: 1
 *         email:
 *           type: string
 *           example: "ana@email.com"
 */
/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Endpoints para gestión de usuarios
 */

/**
 * @swagger
 * /usuario/crear:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioInput'
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Error de validación
 */

/**
 * @swagger
 * /usuario/eliminar:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioDeleteInput'
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario eliminado correctamente"
 *       400:
 *         description: Error de validación
 */

/**
 * @swagger
 * /usuario/editar/{id}:
 *   put:
 *     summary: Editar usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioInput'
 *     responses:
 *       200:
 *         description: Usuario editado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Error de validación
 */

/**
 * @swagger
 * /usuario/obtener/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Datos del usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuario no encontrado
 */

/**
 * @swagger
 * /usuario/todos/{id}:
 *   get:
 *     summary: Obtener todos los usuarios (admin)
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario admin
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       403:
 *         description: No autorizado
 */
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { validarInput } = require('../middlewares/validarInput');
const { authUsuario, authAdmin } = require('../middlewares/rolAuth');
const { verificarJWT } = require('../middlewares/validarJWT');
const { eliminarUsuario, editarUsuario, obtenerUsuario, todosUser, crearusuario } = require('../controllers/users.controller'); 

router.post('/usuario/crear',[
    check('nombre_usuario')
        .notEmpty().withMessage("Escriba el nombre").bail()
        .trim()
        .isString().withMessage("Escriba un nómbre válido")
        .bail()
        .isLength({ min: 3, max: 50 }).withMessage("Escriba un nómbre válido")
        .bail(),
    check("email")
        .trim()
        .normalizeEmail()
        .isEmail().withMessage("Escriba un correo electrónico válido.").bail()
        .isLength({ min: 5, max: 50 }).withMessage("Escriba un email válido válido")
        .bail(),
    check("contrasena", "La contraseña debe tener entre 6 y 10 caracteres, contener por lo menos una minúscula, una mayúscula, un número y un símbolo.")
        .isStrongPassword({ minLength: 6 }).bail(),
    validarInput
    ,verificarJWT
    ,authAdmin
],crearusuario);

router.delete('/usuario/eliminar',[
    check('id_usuario')
        .notEmpty().withMessage('Se necesita el Id de usuario')
        .bail()
        .trim()
        .isInt().withMessage('El id de usuario tiene que ser un numero entero')
        .bail()
    ,check('email')
        .notEmpty().withMessage('Se necesita el Id de usuario')
        .bail()
        .trim()
        .isEmail().withMessage('El email tien que tener este formato email@emial.email')
        .bail()
    , verificarJWT
    ,authAdmin
], eliminarUsuario);

router.put('/usuario/editar/:id',[
    check('nombre_usuario')
        .notEmpty().withMessage("Escriba el nombre").bail()
        .trim()
        .isString().withMessage("Escriba un nómbre válido")
        .bail()
        .isLength({ min: 3, max: 50 }).withMessage("Escriba un nómbre válido")
        .bail(),
    check("email")
        .trim()
        .normalizeEmail()
        .isEmail().withMessage("Escriba un correo electrónico válido.").bail()
        .isLength({ min: 5, max: 50 }).withMessage("Escriba un email válido válido")
        .bail(),
    check("contrasena")
        .optional({ checkFalsy: true })
        .isStrongPassword({ minLength: 6 }).withMessage("La contraseña debe tener entre 6 y 10 caracteres, contener por lo menos una minúscula, una mayúscula, un número y un símbolo.")
        .bail(),
    validarInput
    ,verificarJWT
    ,authAdmin
], editarUsuario);


router.get('/usuario/obtener/:id',[
    check('id')
        .notEmpty().withMessage('Se necesita el Id de usuario')
        .bail()
        .trim()
        .isInt().withMessage('El id de usuario tiene que ser un numero entero')
        .bail()
    ,verificarJWT
], obtenerUsuario);
router.get('/usuario/todos/:id',[
    check('id')
        .notEmpty().withMessage('Se necesita el Id de usuario')
        .bail()
        .trim()
        .isInt().withMessage('El id de usuario tiene que ser un numero entero')
        .bail()
    ,verificarJWT
    ,authAdmin
], todosUser);



module.exports = router; 
