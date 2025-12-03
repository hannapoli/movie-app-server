const express = require('express');
const router = express.Router();
const { eliminarUsuario, editarUsuario, obtenerUsuario } = require('../controllers/users.controller'); 

router.delete('/usuario/eliminar', eliminarUsuario);
router.put('/usuario/editar/:id', editarUsuario);
router.get('/usuario/obtener/:id', obtenerUsuario);



module.exports = router; 
