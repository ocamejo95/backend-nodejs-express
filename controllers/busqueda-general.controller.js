const Usuario = require('../models/usuario.model');
const Medico = require('../models/medico.model');
const Hospital = require('../models/hospital.model');


const getAll = async (req, res) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');


    const [usuarios, medicos, hospitales] = await Promise.all([Usuario.find({nombre: regex}), Medico.find({nombre: regex}), Hospital.find({nombre: regex}),])

    res.json({usuarios, medicos, hospitales});
}

const getColeccion = async (req, res) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');
    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({nombre: regex}).populate('usuario', 'nombre img')
                .populate('hospital', 'nombre img');
            break;

        case 'hospitales':
            data = await Hospital.find({nombre: regex}).populate('usuario', 'nombre img');
            break;

        case 'usuarios':
            data = await Usuario.find({nombre: regex});
            break;

        default:
            return res.status(400).json({message: 'La tabla tiene que ser usuarios/medicos/hospiatles'});

    }

    res.status(200).json({data});
}


module.exports = {getAll, getColeccion}