const { body, param } = require('express-validator');

const validacionesPelicula = [
    body('tit_pelicula')
        .trim()
        .notEmpty().withMessage('El título de la película es obligatorio')
        .isLength({ min: 2 }).withMessage('El titulo debe tener al menos 2 caracteres'),

    body('ano_pelicula')
        .notEmpty().withMessage('El año de la película es obligatorio')
        .toInt()
        .isInt({ min: 1800, max: new Date().getFullYear() })
        .withMessage('El año de la película no es válido: el año debe estar entre 1800 y el año actual.'),

    body('director')
        .trim()
        .notEmpty().withMessage('El director es obligatorio'),

    body('genero')
        .trim()
        .notEmpty().withMessage('El género es obligatorio'),

    body('duracion')
        .notEmpty().withMessage('La duración es obligatoria')
]

const idValidaParam = [
    param('id')
        .notEmpty().withMessage('El ID es obligatorio')
        .isInt({ min: 1 }).withMessage('El id debe ser un número entero positivo')
]

module.exports = {
    validacionesPelicula,
    idValidaParam
};