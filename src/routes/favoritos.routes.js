const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { authUsuario} = require('../middlewares/rolAuth');
const { verificarJWT } = require('../middlewares/validarJWT');
const { crearFavorito, buscarTodosFavUsuario, eliminarFavorito } = require('../controllers/favoritos.controller');


router.post('/favorito/crear',[
    check('id_pelicula')
        .notEmpty().withMessage('Se necesita el Id de pelicula')
        .bail()
        .trim()
        .isInt().withMessage('El id de pelicula tiene que ser un numero entero')
        .bail()
    ,check('id_usuario')
        .notEmpty().withMessage('Se necesita el Id de usuario')
        .bail()
        .trim()
        .isInt().withMessage('El id de usuario tiene que ser un numero entero')
        .bail()
    ,verificarJWT
    ,authUsuario
], crearFavorito);
router.get('/favoritos/user/:id',[
    check('id')
        .notEmpty().withMessage('Se necesita el Id del usuario')
        .bail()
        .trim()
        .isInt().withMessage('El id de usuario tiene que ser un numero entero')
        .bail()
    ,verificarJWT
    ,authUsuario
], buscarTodosFavUsuario);
router.delete('/favorito/eliminar/:id',[
    check('id')
        .notEmpty().withMessage('Se necesita el Id de favorito')
        .bail()
        .trim()
        .isInt().withMessage('El id tiene que ser un numero entero')
        .bail()
    ,check('id_pelicula')
        .notEmpty().withMessage('Se necesita el Id de pelicula')
        .bail()
        .trim()
        .isInt().withMessage('El id de pelicula tiene que ser un numero entero')
        .bail()
    ,check('id_usuario')
        .notEmpty().withMessage('Se necesita el Id de usuario')
        .bail()
        .trim()
        .isInt().withMessage('El id de usuario tiene que ser un numero entero')
        .bail()
    ,verificarJWT
    ,authUsuario
], eliminarFavorito);
module.exports = router;