require('dotenv').config();

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


//Rutas
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/medicos', require('./routes/medico.routes'));
app.use('/api/hospitales', require('./routes/hospital.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/general', require('./routes/busqueda-general.routes'));
app.use('/api/upload', require('./routes/upload.routes'));


app.listen(process.env.PORT, () => {
    console.log('Server corriendo en el puerto' + ' ' + process.env.PORT);
});