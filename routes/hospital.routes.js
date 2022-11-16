/*
Rutas /api/hospiatles
 */
const {Router} = require('express');
const {check} = require('express-validator');
const {validarJWT} = require('../middlewares/validar-jwt');
const {validarCampos} = require('../middlewares/validar-campos');
const {
    getHospitales,
    createHospitales,
    updateHospitales,
    deleteHospitales
} = require('../controllers/hospital.controller');

const router = Router();

router.get('/', validarJWT, getHospitales);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre del hospital es obligatorio').not().isEmpty(),
    check('usuario', 'El ID del usuario debe ser valido').isMongoId(),
    validarCampos], createHospitales);

router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre del hospital es obligatorio').not().isEmpty()], updateHospitales);

router.delete('/:id', validarJWT, deleteHospitales);


module.exports = router;