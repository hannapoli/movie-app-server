const connect = require('../configs/dbConnect');
const queriesUploads = require('./queries.uploads');

const crearUpload = async ({ filename, originalname, mimetype, size, nombre, descripcion }) => {
    let cliente, result;
    try {
        cliente = await connect();
        result = await cliente.query(queriesUploads.crearUpload, [filename, originalname, mimetype, size, nombre, descripcion]);
        return result.rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        cliente.release();
    }
};

// Obtener todas las imágenes
const traerUploads = async () => {
    let cliente, result;
    try {
        cliente = await connect();
        result = await cliente.query(queriesUploads.pedirUploads);
        return result.rows;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        cliente.release();
    }
};

const traerUploadPorId = async (id) => {
    let cliente, result;
    try {
        cliente = await connect();
        result = await cliente.query(queriesUploads.pedirUploadPorId, [id]);
        return result.rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        cliente.release();
    }
};

const editarUpload = async (id, data) => {
    let cliente, result;
    const { filename, originalname, mimetype, size, nombre, descripcion } = data;
    try {
        cliente = await connect();
        result = await cliente.query(
            queriesUploads.editandoUpload,
            [filename, originalname, mimetype, size, nombre, descripcion, id]
        );
        return result.rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        cliente.release();
    }
};

const eliminarUpload = async (id) => {
    let cliente, result;
    try {
        cliente = await connect();
        result = await cliente.query(queriesUploads.eliminandoUpload, [id]);
        return {
            msg: 'La imagen fue eliminada correctamente',
            data: result.rows[0]
        };
    } catch (error) {
        throw error;
    } finally {
        cliente.release();
    }
};

module.exports = {
    crearUpload,
    traerUploads,
    traerUploadPorId,
    editarUpload,
    eliminarUpload
};
