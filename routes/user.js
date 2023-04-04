
const { Router } = require('express');
const { check } = require('express-validator');

const { usuarioGet, 
    usuarioPost, 
    usuarioDelete, 
    usuarioPatch, 
    usuarioPut 
} = require('../controllers/users');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// Rutas

router.get('/', usuarioGet);

router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    check('password','El password debe de ser mas de 6 letras').isLength({ min: 6}),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuarioPost);

router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuarioPut);

router.patch('/', usuarioPatch);

router.delete('/', usuarioDelete);

module.exports = router