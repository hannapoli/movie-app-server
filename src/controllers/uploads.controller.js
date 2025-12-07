// Importaciones
const fs = require('node:fs');
const path = require('node:path');
const connect = require('../configs/dbConnect')
const queriesUploads = require('../models/queries.uploads')
const { deleteFile } = require('../helpers/files.helper');


// Definir la función que manejara multer, del lado del servidor

const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                ok: false,
                msg: 'Archivo no encontrado'
            });
        }

        // Recoger datos adicionales del formulario
        const { filename, originalname, mimetype, size } = req.file;
        const { nombre, descripcion } = req.body;

        const cliente = await connect();

        // Insertar en la "base de datos"
        const result = await cliente.query(
            queriesUploads.crearUpload, [filename, originalname, mimetype, size, nombre || null, descripcion || null]
        );

        res.status(200).json({
            ok: true,
            msg: 'Archivo subido correctamente y guardado en la base de datos',
            file: req.file, // Información del archivo que multer guardará
            uploadId: result.rows[0].id // "id" del primer registro obtenido de la base de datos
        });

    } catch (error) {
        console.error(error)
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error al subir el archivo'
        });
    } finally {
        if (cliente) cliente.release();
    }
};

// Subir múltiples archivos 
const uploadFiles = async (req, res) => {
    try {
        let cliente;

        // Validar que se envíen archivos
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'No se encontraron archivos'
            });
        }

        cliente = await connect();

        const resultados = []
        // Recorrer los archivos y guardarlos en la base de datos
        for (const file of req.files) {
            // Recoger datos adicionales del formulario
            const { filename, originalname, mimetype, size } = file;
            const { nombre, descripcion } = req.body; // datos extra del formulario

            // Insertar en la base de datos
            const resultado = await cliente.query(
                queriesUploads.crearUpload, [filename, originalname, mimetype, size, nombre || null, descripcion || null]
            );
            resultados.push({
                uploadId: resultado.rows[0].id,  // ID del primer registro de la base de datos
                file // objeto con la información del archivo subido (filename, mimetype, size, etc.)
            });
        };

        res.status(200).json({
            ok: true,
            msg: 'Archivos subidos correctamente y guardados en la base de datos',
            files: resultados
        });

    } catch (error) {
        console.error(error)
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error al subir los archivos'
        });
    } finally {
        if (cliente) cliente.release(); // siempre liberar
    }
};

const getFiles = async (req, res) => {
    try {
        const carpeta = path.join(__dirname, '../public/uploads');
        const files = await fs.promises.readdir(carpeta);

        if (files.length === 0) {
            return res.status(200).json({
                ok: true,
                msg: 'No hay archivos subidos',
                files: []
            });
        }

        res.status(200).json({
            ok: true,
            files,
            total: files.length
        });

    } catch (error) {
        console.error('Error leyendo la carpeta:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al leer la carpeta'
        });
    }
};


// Eliminar un archivo (usa fs.promises.unlink internamente) por lo que es "async"
const deletfileControler = async (req, res) => {
    try {
        // Recoger el nombre
        const { filename } = req.params;
        const result = await deleteFile(filename)

        // comprobar si no hay resultado
        if (!result.ok) {
            return res.status(500).json({
                ok: false,
                msg: 'No se pudo eliminar el archivo',
                error: result.error?.message
            });
        }
        return res.status(200).json({
            ok: true,
            msg: 'Archivo eliminado correctamente'
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error inesperado'
        });
    }
};

module.exports = {
    uploadFile,
    uploadFiles,
    getFiles,
    deletfileControler
}