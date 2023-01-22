const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

    //Leer el token
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({message: 'No existe un token en la peticion'});
    }
    try {

        const bearer = token.split(" ");

        const bearerToken = bearer[1];

        const {uid} = jwt.verify(bearerToken, process.env.JWT_SECRET);
        req.uid = uid;

        next();

    } catch (error) {
        return res.status(401).json({message: 'Token no valido'});
    }

}
module.exports = {validarJWT}
