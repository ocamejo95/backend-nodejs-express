const Usuario = require("../models/usuario.model");
const bcrypt = require('bcryptjs');
const {generarJWT} = require("../helpers/jwt");


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
        const token = await generarJWT(usuarioDB.id, usuarioDB.nombre)

        res.json({token});


    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error inesperado... revisar logs'});
    }


}

const renewToken = async (req, res) => {

    const uid = req.uid;
    const token = await generarJWT(uid);

    res.status(200).json({message: 'Nuevo token', token});

}


module.exports = {login, renewToken};