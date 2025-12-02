const { Pool } = require('pg');

const connect = async () => {
    const pool = new Pool({
        connectionString: process.env.STRINGDB
    })
    try {
        const client = await pool.connect()
        console.log("Conectando a la base de datos");
        return client;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

module.exports = connect;