const {v4: uuidv4} = require('uuid');
const {updateImg} = require('../helpers/update-img');
const path = require('path');
const fs = require('fs');


const uploadImg = async (req, res) => {
    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['usuarios', 'medicos', 'hospitales'];

    // Validar tipos
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({message: 'No es un tipo valido'});
    }

    // Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({message: 'No hay archivo'});
    }

    // Procesar la imagen
    const file = req.files.img;
    const nombreCortado = file.name.split('.');
    const extensionFile = nombreCortado[nombreCortado.length - 1];

    // Validar extension
    const tiposExtension = ['png', 'jpg', 'gif', 'jpeg'];

    if (!tiposExtension.includes(extensionFile)) {
        return res.status(400).json({message: 'Extension no valida'});
    }

    //Generar nombre del archivo
    const nombreFile = `${uuidv4()}.${extensionFile}`;

    //Generar path
    const path = `./uploads/${tipo}/${nombreFile}`;

    //Usa mv() metodo para mover el archivo al servidor
    file.mv(path, (err) => {
        if (err) {
            console.log(err)
            return res.status(500).json({message: 'Error al mover la imagen'})
        }
    });

    //Actualizar imagen
    updateImg(tipo, id, nombreFile, path);

    res.status(200).json({message: 'Archivo subido', nombreFile})
}

const getImg = (req, res) => {
    const tipo = req.params.tipo;
    const img = req.params.img;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${img}`);
    if (fs.existsSync(pathImg)) {
        res.sendfile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendfile(pathImg);
    }


}

module.exports = {uploadImg, getImg};