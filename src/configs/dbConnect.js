const {Pool} = require('pg');

const connect = async () => {
    const pool = new Pool({
        connectionString: process.env.STRINGDB
    })
    try {
        await pool.connect()
        console.log(pool, "AAAAAAAAAAAAAA")
        return pool;

    } catch (error) {
        console.log(error)
    } finally{
        console.log("Conexion terminada")
    }
}


module.exports= connect;