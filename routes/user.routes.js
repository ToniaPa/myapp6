const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.get('/findall', userController.findAll); //παίρνουμε όλους τους χρήστες
router.get('/findone/:username', userController.findOne); //παίρνουμε ένανς χρήστη
router.post('/create', userController.create)
router.patch('/update',userController.update);
router.delete('/delete/:username',userController.delete);

module.exports = router;