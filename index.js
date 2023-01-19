require('dotenv').config();
const path = require('path');

const express = require('express');
const cors = require('cors');
const {dbConnection} = require('./database/config');


//Crear el servidor express
const app = express();

//Configurar cors
app.use(cors());

//Lectura y parseo del body
app.use(express.json());

//Base de datos
dbConnection();

//Directorio publico
app.use(express.static('public'));


//Rutas
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/medicos', require('./routes/medico.routes'));
app.use('/api/hospitales', require('./routes/hospital.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/general', require('./routes/busqueda-general.routes'));
app.use('/api/upload', require('./routes/upload.routes'));

app.use('*', (req, res) =>{
    res.sendfile(path.resolve( __dirname, 'public/index.htlm' ));
});


app.listen(process.env.PORT, () => {
    console.log('Server corriendo en el puerto' + ' ' + process.env.PORT);
});