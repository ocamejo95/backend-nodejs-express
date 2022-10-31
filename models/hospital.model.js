const {Schema, model} = require('mongoose');

const HospitalSchema = Schema({
    nombre: {
        type: String, required: true
    },
    img: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    }
});

module.exports = model('Hospital', HospitalSchema);