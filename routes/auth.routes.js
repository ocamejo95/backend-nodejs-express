/*
Rutas /api/auth
 */
const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt');
const {login, renewToken, googleSign} = require('../controllers/auth.controller');

const router = Router();

router.post('/', [
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(), validarCampos], login);

router.post('/google', [
    check('token', 'El token de google es obligatorio').not().isEmpty(), validarCampos], googleSign);

router.get('/renew', validarJWT, renewToken);

module.exports = router;