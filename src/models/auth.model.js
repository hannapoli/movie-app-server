const connect = require('../configs/dbConnect');
const queriesAuth = require('./queriesAuth');

const crearUser = async ({ nombre_usuario, role_usuario, email, contrasena }) => {
    let client, result;
    try {
        client = await connect();
        console.log({ client })
        result = await client.query(queriesAuth.registro, [nombre_usuario, role_usuario, email, contrasena]);
        // result = await client.query('SELECT NOW()');
        return result.rows;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        client.release();
    }
};

module.exports = { crearUser }
