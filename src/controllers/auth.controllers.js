const bcrypt = require('bcryptjs');
const { JWTgenerador } = require('../helpers/jwt');
const { crearUser } = require('../models/auth.model');

const registarUsuario = async (req, res) => {
    const { nombre_usuario, email, contrasena } = req.body;
    try {
        const salt = bcrypt.genSaltSync();
        const contrasenaEncriptada = bcrypt.hashSync(contrasena, salt);

        const values = {
            nombre_usuario,
            role_usuario: 'user',
            email,
            contrasena: contrasenaEncriptada
        };
        const data = await crearUser(values);


        const payload = {
            uid: data.id_usuario,
            nombre_usuario: data.nombre_usuario,
            role_usuario: data.role_usuario
        };

        const token = await JWTgenerador(payload);

        return res.status(201).json({
            ok: true,
            msg: "Usuario creado correctamente.",
            usuario: data,
            token
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: "Error del servidor. Consulte su administrador."
        });
    }
    // return result;
};

const loginUsuario = (req, res) => {
};

const renovarToken = () => { };

module.exports = {
    registarUsuario,
    loginUsuario,
    renovarToken
};