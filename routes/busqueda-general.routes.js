/*
Rutas /api/general:busqueda
 */
const {Router} = require('express');
const {check} = require('express-validator');
const {validarJWT} = require('../middlewares/validar-jwt');
const {validarCampos} = require('../middlewares/validar-campos');

const {getAll, getColeccion} = require('../controllers/busqueda-general.controller');

const router = Router();

router.get('/:busqueda', validarJWT, getAll);

router.get('/coleccion/:tabla/:busqueda', validarJWT, getColeccion);


module.exports = router;