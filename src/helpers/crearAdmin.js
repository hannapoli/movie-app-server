const bcrypt = require('bcryptjs');
const { crearUsuario } = require('../models/auth.model');

const crearAdmin = async () => {
    const contrasena = 'admin123A!wA';
    const contrasenaEncriptada = bcrypt.hashSync(contrasena, bcrypt.genSaltSync());
    const values = {
        nombre_usuario: 'Maider',
        role_usuario: 'administrador',
        email: 'adminmaider@example.com',
        contrasena: contrasenaEncriptada
    };
    try {
        const usuario = await crearUsuario(values);
        console.log('Administrador creado:', usuario);
    } catch (error) {
        console.error('Error al crear administrador:', error);
    }
}

crearAdmin();