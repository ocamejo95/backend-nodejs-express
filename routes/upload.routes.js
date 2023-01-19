/*
Rutas /api/upload
 */
const {Router} = require('express');
const {validarJWT} = require('../middlewares/validar-jwt');
const fileUpload = require('express-fileupload');
const {uploadImg, getImg} = require('../controllers/upload.controller');

const router = Router();

router.use(fileUpload());

router.put('/:tipo/:id', validarJWT, uploadImg);

router.get('/:tipo/:img', getImg);

module.exports = router;
