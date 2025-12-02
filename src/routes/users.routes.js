const express = require('express');
const router = express.Router();
const { creandoUsuario, eliminarUsuario, editarUsuario, obtenerUsuario} = require('../controllers/users.controllers'); 

router.post('/usuario/crear', creandoUsuario);

//router.delete('/usuario/eliminar/:id', eliminarUsuario);

//router.put('/ususrio/editar/:id', editarUsuario);

//router.get('/usuario/obtener/:id', obtenerUsuario);

module.exports = router;  