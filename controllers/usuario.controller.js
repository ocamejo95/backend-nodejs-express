const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');
const {generarJWT} = require("../helpers/jwt");


const getUsuarios = async (req, res) => {

    const usuarios = await Usuario.find({}, 'nombre email role  google');

    res.status(200).json(usuarios);
}

const createUsuarios = async (req, res) => {

    const {email, password} = req.body;

    try {
        const emailExiste = await Usuario.findOne({email});

        if (emailExiste) {
            return res.status(400).json({message: 'El email ya esta registrado'});
        }

        const usuario = new Usuario(req.body);
        //Encriptar password
        const salt = bcrypt.genSaltSync(10);
        usuario.password = bcrypt.hashSync(password, salt);

        //Guardar usuario
        await usuario.save();

        //Generar Token -JWT
        const token = await generarJWT(usuario.id, usuario.nombre)
        res.json({usuario, token});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error inesperado... revisar logs'});
    }


}

const updateUsuarios = async (req, res) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({message: 'No se encontro el usuario'});
        }

        const {password, google, ...campos} = req.body;
        if (usuarioDB.email !== email) {

            const emailExiste = await Usuario.findOne({email})
            if (emailExiste) {
                return res.status(400).json({message: 'Ya existe un usuario con ese email'});
            }
        }
        campos.email = email;

        const userUpdate = await Usuario.findByIdAndUpdate(uid, campos, {new: true});
        res.status(200).json(userUpdate);


    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error inesperado... revisar logs'});
    }


}

const deleteUsuarios = async (req, res) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({message: 'No se encontro el usuario con ese id'});
        }

        await Usuario.findByIdAndDelete(uid);
        res.status(200).json({message: 'Usuario eliminado correctamente'});


    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error inesperado... revisar logs'});
    }


}


module.exports = {getUsuarios, createUsuarios, updateUsuarios, deleteUsuarios};