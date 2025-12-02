const express = require('express');
const router = express.Router();
const { crearFavorito, buscarTodosFavUsuario, eliminarFavorito } = require('../controllers/favoritos.controller')

router.post('/favorito/crear', crearFavorito);
router.get('/favoritos/user/:id', buscarTodosFavUsuario);
router.delete('/favorito/eliminar/:id', eliminarFavorito);



module.exports = router;