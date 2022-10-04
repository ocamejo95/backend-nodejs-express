require('dotenv').config();

const express = require('express');
const cors = require('cors');
const {dbConnection} = require('./database/config');


//Crear el servidor express
const app = express();

//Configurar cors
app.use(cors());

//Base de datos
dbConnection();


//Rutas
app.get('', (req, res) => {
    res.json({
        ok: true, message: 'Hola mundo'
    });
});


app.listen(process.env.PORT, () => {
    console.log('Server corriendo en el puerto' + process.env.PORT);
});