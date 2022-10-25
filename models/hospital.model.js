const {Schema, model} = require('mongoose');

const HospitalSchema = Schema({
    nombre: {
        type: String, required: true
    },
    email: {
        type: String, required: true, unicode: true
    },
    password: {
        type: String, required: true
    },
    img: {
        type: String
    },
    role: {
        type: String, required: true, default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    },
})

module.exports = model('Hospital', HospitalSchema);