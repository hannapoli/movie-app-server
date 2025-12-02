const queriesAuth = {
    registro: `INSERT INTO usuarios (nombre_usuario, role_usuario, email, contrasena) VALUES ($1, $2, $3, $4) RETURNING *`
}

module.exports = queriesAuth;
