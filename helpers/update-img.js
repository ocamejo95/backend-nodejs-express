const fs = require('fs');
const Usuario = require('../models/usuario.model');
const Medico = require('../models/medico.model');
const Hospital = require('../models/hospital.model');


const borrarPathViejo = (path) => {
    if (fs.existsSync(path)) {
        //Borrar path viejo
        fs.unlinkSync(path)
    }
}


const updateImg = async (tipo, id, nombreFile) => {
    let pathViejo = '';

    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                return false;
            }
            pathViejo = `./uploads/medicos/${medico.img}`;
            borrarPathViejo(pathViejo);

            medico.img = nombreFile;
            await medico.save();
            return true;

            break;

        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                return false;
            }
            pathViejo = `./uploads/usuarios/${usuario.img}`;
            borrarPathViejo(pathViejo);

            usuario.img = nombreFile;
            await usuario.save();
            return true;

            break;

        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                return false;
            }
            pathViejo = `./uploads/hospitales/${hospital.img}`;
            borrarPathViejo(pathViejo);

            hospital.img = nombreFile;
            await hospital.save();
            return true;


            break;
    }
}

module.exports = {updateImg};