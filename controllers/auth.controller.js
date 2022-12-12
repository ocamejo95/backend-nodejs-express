const Usuario = require("../models/usuario.model");
const bcrypt = require('bcryptjs');
const {generarJWT} = require("../helpers/jwt");
const {verifyGoogle} = require("../helpers/google-verify");


const login = async (req, res) => {

    const {password, email} = req.body;

    try {


        //Verifiar email
        const usuarioDB = await Usuario.findOne({email});


        if (!usuarioDB) {
            return res.status(404).json({message: 'Email y Password no validos'});
        }

        //Verifiar password
        const validPasswoord = bcrypt.compareSync(password, usuarioDB.password);

        if (!validPasswoord) {
            return res.status(404).json({message: 'Email y Password no validos 2'});
        }

        //Generar Token - JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({token});


    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error inesperado... revisar logs'});
    }


}

const renewToken = async (req, res) => {
    const uid = req.uid;
    //Generar token-jwt
    const token = await generarJWT(uid);

    //Obtener usuario por uid
    const usuario = await Usuario.findById(uid);

    res.status(200).json({message: 'Nuevo token', token, usuario});

}

const googleSign = async (req, res) => {

    const tokenGoogel = req.body.token;
    try {

        const {name, email, picture} = await verifyGoogle(tokenGoogel);
        let usuario;

        const usuarioDB = await Usuario.findOne({email});
        if (usuarioDB) {
            usuario = usuarioDB;
            usuario.google = true;

        } else {
            usuario = new Usuario({
                nombre: name, email, password: '', img: picture, google: true
            });
        }

        await usuario.save();
        const token = await generarJWT(usuario.id);

        res.json({token});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'El token no es correcto'});
    }

}


module.exports = {login, renewToken, googleSign};