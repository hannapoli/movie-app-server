const connect = require('../configs/dbConnect');
const queriesFav = require('./queriesFavoritos')

const crearFavorito = async (pelicula, user) =>{
    let cliente, result;
    try {
        cliente = await connect();
        const data = await cliente.query(queriesFav.createFav, [pelicula, user])
        //console.log(data)
        result = data.rows
    } catch (error) {
        console.log(error);
        throw error;
    } finally{
        cliente.release();
    }
    return result;
}
const todosFavoritosDeUser = async (user) =>{
    let cliente, result;
    try {
        cliente = await connect();
        const data = await cliente.query(queriesFav.todoLosFavUser, [user])
        console.log(data);
        result = data.rows
        console.log(result);
    } catch (error) {
        console.log(error);
        throw error;
    } finally{
        cliente.release();
    }
    return result;
}

const eliminarFavorito = async (idfav) =>{
    let cliente;
    try {
        cliente = await connect();
        await cliente.query(queriesFav.eliminarFav, [idfav])
    } catch (error) {
        console.log(error);
        throw error;
    } finally{
        cliente.release();
    }
}
const buscarExistencia = async (pelicula, user) =>{
    let cliente, result;
    try {
        cliente = await connect();
        const data = await cliente.query(queriesFav.buscarExiste, [pelicula, user])
        result = data.rows
    } catch (error) {
        console.log(error);
        throw error;
    } finally{
        cliente.release();
    }
    return result;
}

module.exports = {
    crearFavorito,
    todosFavoritosDeUser,
    eliminarFavorito,
    buscarExistencia
}