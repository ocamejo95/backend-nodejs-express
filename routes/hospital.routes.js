/*
Rutas /api/hospiatles
 */
const {Router} = require('express');
const {check} = require('express-validator');
const {getHospitales, createHospitales, updateHospitales, deleteHospitales} = require('../controllers/hospital.controller');

const router = Router();

router.get('/',[], getHospitales);

router.post('/',[],  createHospitales);

router.put('/',[],  updateHospitales);

router.delete('/',[], deleteHospitales);


module.exports = router;