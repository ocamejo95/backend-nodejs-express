const Hospital = require("../models/hospital.model");



const getHospitales = async (req, res) => {

    const hospital = await Hospital.find().populate('usuario', 'nombre img');

    res.status(200).json(hospital);
}

const createHospitales = async (req, res) => {

    const uid = req.uid;
    const hospital = new Hospital({usuario: uid, ...req.body});

    try {

        const hospitalDB = await hospital.save();
        res.status(200).json(hospitalDB);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error inesperado... revisar logs'});
    }


}

const updateHospitales = (req, res) => {
    res.json('holaaaaaa perrooooo')
}

const deleteHospitales = async (req, res) => {
    const uid = req.params.id;

    try {

        const hospitalDB = await Hospital.findById(uid);
        if (!hospitalDB) {
            return res.status(404).json({message: 'No se encontro el hospital con ese id'});
        }

        await Hospital.findByIdAndDelete(uid);
        res.status(200).json({message: 'Hospital eliminado correctamente'});


    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error inesperado... revisar logs'});
    }
}

module.exports = {getHospitales, createHospitales, updateHospitales, deleteHospitales}