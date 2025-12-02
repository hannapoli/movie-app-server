const connect = require('../configs/dbConnect');
const queries = require("../models/queryUsuario");

//crear usuario
const crearUsario = async (nombre_usuario, role_usuario="user", email, contrasena) =>{
    let cliente, result;
    try {
        cliente = await connect();
        //console.log(nombre_usuario, role_usuario, email, contrasena, "desde crearUsuario")
        const data = await cliente.query(queries.crearUsuario, [nombre_usuario, role_usuario, email, contrasena]);
        console.log(data, "desde data")
        result = data.rows;
        //console.log(result, "aqui el resultado")

    } catch (error) {
        console.log(error)
    } finally{
        cliente.release();
    }
    return result;
}


module.exports = {
    crearUsario
}
