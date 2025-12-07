const connect = require('../configs/dbConnect');
const queriesAuth = require('./queriesAuth');

const crearUsuario = async ({ nombre_usuario, role_usuario, email, contrasena }) => {
    let cliente, result;
    try {
        cliente = await connect();
        result = await cliente.query(queriesAuth.registro, [nombre_usuario, role_usuario, email, contrasena]);
        return result.rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        cliente.release();
    }
};

const buscarUsuario = async (email) => {
    let cliente, result;
    try {
        cliente = await connect();
        result = await cliente.query(queriesAuth.login, [email]);
        return result.rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        cliente.release();
    }
};

const buscarUsuarioPorId = async (id_usuario) => {
    let cliente, result;
    try {
        cliente = await connect();
        result = await cliente.query(queriesAuth.renovarToken, [id_usuario]);
        return result.rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        cliente.release();
    }
};
const buscarUsuarioPoremil = async (email) => {
    let cliente, result;
    try {
        cliente = await connect();
        result = await cliente.query(queriesAuth.comprobarEmail, [email]);
        return result.rows;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        cliente.release();
    }
};


module.exports = { crearUsuario, buscarUsuario, buscarUsuarioPorId, buscarUsuarioPoremil }