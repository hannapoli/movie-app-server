const queries = {
    crearUsuario: `
        INSERT INTO usuarios(nombre_usuario, role_usuario, email, contrasena)
        VALUES($1, $2, $3, $4);
    `,

    obtenerUsuarioPorEmail: `
        SELECT * FROM usuarios WHERE email = $1;
    `,

    eliminarUsuario: `
        DELETE FROM usuarios WHERE id_usuario = $1;
    `,

    editarUsuario: `
        UPDATE usuarios
        SET nombre_usuario = $1, email = $2, role_usuario = $3
        WHERE id_usuario = $4;
    `
};

module.exports = queries;

