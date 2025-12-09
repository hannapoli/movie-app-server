/**
 * @swagger
 * components:
 *   schemas:
 *     AuthSignupInput:
 *       type: object
 *       required:
 *         - nombre_usuario
 *         - email
 *         - contrasena
 *       properties:
 *         nombre_usuario:
 *           type: string
 *           example: "Juan Perez"
 *         email:
 *           type: string
 *           example: "juan@email.com"
 *         contrasena:
 *           type: string
 *           example: "Password123!"
 *     AuthLoginInput:
 *       type: object
 *       required:
 *         - email
 *         - contrasena
 *       properties:
 *         email:
 *           type: string
 *           example: "juan@email.com"
 *         contrasena:
 *           type: string
 *           example: "Password123!"
 *     AuthResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: JWT generado
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         usuario:
 *           type: object
 *           properties:
 *             id_usuario:
 *               type: integer
 *               example: 1
 *             nombre_usuario:
 *               type: string
 *               example: "Juan Perez"
 *             email:
 *               type: string
 *               example: "juan@email.com"
 *             rol:
 *               type: string
 *               example: "user"
 */
/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Endpoints para registro, login y renovación de token
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthSignupInput'
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Error de validación
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthLoginInput'
 *     responses:
 *       200:
 *         description: Login exitoso, retorna token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Credenciales inválidas
 */

/**
 * @swagger
 * /auth/renovar:
 *   get:
 *     summary: Renovar el token de autenticación
 *     tags: [Autenticación]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token renovado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Token inválido o expirado
 */
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { registarUsuario, loginUsuario, renovarToken } = require('../controllers/auth.controller');
const { validarInput } = require('../middlewares/validarInput');
const { verificarJWT } = require('../middlewares/validarJWT');

//Registar un usuario:
router.post('/auth/signup', [
    check('nombre_usuario')
        .notEmpty().withMessage("Escriba el nombre").bail()
        .trim()
        .isString().withMessage("Escriba un nómbre válido")
        .isLength({ min: 3, max: 50 }).withMessage("Escriba un nómbre válido"),
    check("email")
        .trim()
        .normalizeEmail()
        .isEmail().withMessage("Escriba un correo electrónico válido.").bail()
        .isLength({ min: 5, max: 50 }).withMessage("Escriba un email válido válido"),
    check("contrasena", "La contraseña debe tener entre 6 y 10 caracteres, contener por lo menos una minúscula, una mayúscula, un número y un símbolo.")
        .isStrongPassword({ minLength: 6 }).bail(),
    validarInput], registarUsuario);

//Login de usuario:
router.post('/auth/login', [
    check("email")
        .trim()
        .normalizeEmail()
        .isEmail().withMessage("Escriba un correo electrónico válido.").bail()
        .isLength({ min: 5, max: 50 }).withMessage("Escriba un email válido válido"),
    check("contrasena", "La contraseña debe tener entre 6 y 10 caracteres, contener por lo menos una minúscula, una mayúscula, un número y un símbolo.")
        .isStrongPassword({ minLength: 6 }).bail(),
    validarInput
], loginUsuario);

//Validar y renovar token:
router.get('/auth/renovar', verificarJWT, renovarToken);

module.exports = router;