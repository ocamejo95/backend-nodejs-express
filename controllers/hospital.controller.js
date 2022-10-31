const Hospital = require("../models/hospital.model");


const getHospitales = (req, res) => {
    res.json('holaaaaaa perrooooo')
}

const createHospitales = async (req, res) => {

    const {nombre} = req.body;

    try {


    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error inesperado... revisar logs'});
    }


}

const updateHospitales = (req, res) => {
    res.json('holaaaaaa perrooooo')
}

const deleteHospitales = (req, res) => {
    res.json('holaaaaaa perrooooo')
}

module.exports = {getHospitales, createHospitales, updateHospitales, deleteHospitales}