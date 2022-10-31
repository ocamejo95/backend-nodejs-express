/*
Rutas /api/medicos
 */
const {Router} = require('express');
const {check} = require('express-validator');
const {getMedicos, createMedicos, updateMedicos, deleteMedicos} = require('../controllers/medico.controller');

const router = Router();

router.get('/', [], getMedicos);

router.post('/', [], createMedicos);

router.put('/:id', [], updateMedicos);

router.delete('/:id', [], deleteMedicos);


module.exports = router;