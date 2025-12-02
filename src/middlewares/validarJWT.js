const jwt = require("jsonwebtoken");

const verificarJWT = (req, res, next) => {

    const token = req.headers["authorization"]?.split(' ')[1];

    if (!token) {
        return res.status(403).json({
            ok: false,
            msg: "No hay token en la petición."
        });
    };
    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        const userToken = {
            uid: payload.uid,
            nombre_usuario: payload.nombre_usuario,
            role_usuario: payload.role_usuario
        };

        req.userToken = userToken;
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Token no válido."
        });
    }
}

module.exports = { verificarJWT };