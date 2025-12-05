const { verificarJWT } = require('./validarJWT');

//Comprobar el rol usuario / administrador

const authUsuario = [verificarJWT, (req, res, next) => {
    if (req.userToken.role_usuario === 'user') return next();
    return res.status(403).json({
        ok: false,
        msg: 'Solo usuarios'
     });
}];

const authAdmin = [verificarJWT, (req, res, next) => {
    if (req.userToken.role_usuario === 'administrador') return next();
    return res.status(403).json({
        ok: false,
        msg: 'Solo administradores'
     });
}];

module.exports = {
    authUsuario,
    authAdmin
}