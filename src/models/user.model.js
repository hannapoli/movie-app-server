const { connect }  = require('../configs/dbConnect');
const queries = require("../models/queryUsuario");


//crear usuario
const crearUsario = async (body) =>{
    const { nombre_usuario, role_usuario, email, contrasena } = body;
    let cliente, result;
    try {
        cliente = await connect();
        const data = await cliente.query(queries.createUser, [nombre_usuario, role_usuario, email, contrasena]);
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
