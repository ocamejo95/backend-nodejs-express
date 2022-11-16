/*
Rutas /api/medicos
 */
const {Router} = require('express');
const {check} = require('express-validator');
const {validarJWT} = require('../middlewares/validar-jwt');
const {validarCampos} = require('../middlewares/validar-campos');
const {getMedicos, createMedicos, updateMedicos, deleteMedicos} = require('../controllers/medico.controller');

const router = Router();

router.get('/', validarJWT, getMedicos);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
    check('hospital', 'El ID del hospital debe ser valido').isMongoId(),
    validarCampos], createMedicos);

router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),], updateMedicos);

router.delete('/:id', validarJWT, deleteMedicos);


module.exports = router;