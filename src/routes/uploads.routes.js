/**
 * @swagger
 * components:
 *   schemas:
 *     ArchivoSubido:
 *       type: object
 *       properties:
 *         filename:
 *           type: string
 *           description: Nombre del archivo subido
 *           example: "imagen1.jpg"
 *         url:
 *           type: string
 *           description: URL de acceso al archivo
 *           example: "https://movie-app-server-gwvm.onrender.com/uploads/imagen1.jpg"
 */
/**
 * @swagger
 * tags:
 *   name: Uploads
 *   description: Endpoints para gestión de archivos subidos
 */

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Subir un solo archivo
 *     tags: [Uploads]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               imagen:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Archivo subido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArchivoSubido'
 *       400:
 *         description: Error de validación
 */

/**
 * @swagger
 * /uploads:
 *   post:
 *     summary: Subir múltiples archivos
 *     tags: [Uploads]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               imagenes:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Archivos subidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ArchivoSubido'
 *       400:
 *         description: Error de validación
 */

/**
 * @swagger
 * /uploads:
 *   get:
 *     summary: Listar archivos subidos
 *     tags: [Uploads]
 *     responses:
 *       200:
 *         description: Lista de archivos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ArchivoSubido'
 */

/**
 * @swagger
 * /uploads/{filename}:
 *   delete:
 *     summary: Eliminar archivo por nombre
 *     tags: [Uploads]
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del archivo
 *     responses:
 *       200:
 *         description: Archivo eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Archivo eliminado correctamente"
 *       404:
 *         description: Archivo no encontrado
 */
// Importaciones: router de express, middleware (personal), controlador

const { Router } = require('express');
const { upload, handleMulterErrors } = require('../middlewares/multer.middleware');
const { validateFiles } = require('../middlewares/validar.uploads');
const {
    uploadFile,
    uploadFiles,
    getFiles,
    deletfileControler
} = require('../controllers/uploads.controller');


// definir router para definir rutas separadas
const router = Router();

// definir ruta POST /upload
// Subir un solo archivo
router.post('/upload', upload.single('imagen'), handleMulterErrors, validateFiles, uploadFile);

// Subir múltiples archivos
router.post('/uploads', upload.array('imagenes', 10), validateFiles, uploadFiles);

// Listar archivos subidos
router.get('/uploads', getFiles);

// Eliminar un archivo por filename (param en la URL)
router.delete('/uploads/:filename', deletfileControler);

module.exports = router;