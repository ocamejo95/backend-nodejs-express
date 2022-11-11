const Medico = require('../models/medico.model');



const getMedicos = async (req, res) => {

    const medico = await Medico.find().populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img');

    res.status(200).json(medico);
}

const createMedicos = async (req, res) => {

    const uid = req.uid;
    const medico = new Medico({usuario: uid, ...req.body});

    try {

        const medicoDB = await medico.save();
        res.status(200).json(medicoDB);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error inesperado... revisar logs'});
    }
}

const updateMedicos = (req, res) => {
    res.json('holaaaaaa perrooooo')
}

const deleteMedicos = async (req, res) => {
    const uid = req.params.id;

    try {

        const medicoDB = await Medico.findById(uid);
        if (!medicoDB) {
            return res.status(404).json({message: 'No se encontro el medico con ese id'});
        }

        await Medico.findByIdAndDelete(uid);
        res.status(200).json({message: 'Medico eliminado correctamente'});


    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error inesperado... revisar logs'});
    }

}

module.exports = {getMedicos, createMedicos, updateMedicos, deleteMedicos}