const {Router} = require('express');
const contactosController = require('../controllers/contactos.controller');
const jwtValidator = require('../middlewares/jwtValidator');
const checkFields = require('../middlewares/validateFields');
const { check } = require("express-validator");

const router = Router();

router.get('/',
[   
    check('jwt').not().isEmpty(),
    checkFields
],
jwtValidator, contactosController.getContacts); //GET contactos.
router.get('/:id',[
    check('jwt').not().isEmpty(),
    checkFields
],jwtValidator,contactosController.getContactById); //GET contactos. BY ID

router.post('/',[
    check('jwt').not().isEmpty(),
    check('contact.name').not().isEmpty(),
    check('contact.lastname').not().isEmpty(),
    check('contact.email').not().isEmpty(),
    check('contact.message').not().isEmpty(),
    checkFields
],jwtValidator,contactosController.createContact); //POST contactos.

router.put('/:id',[
    check('jwt').not().isEmpty(),
    checkFields
],jwtValidator,contactosController.updateContact) //PUT contactos.

router.delete('/:id',[
    check('jwt').not().isEmpty(),
    checkFields
],jwtValidator,contactosController.deleteContact) //DELETE contactos. 

module.exports = router;