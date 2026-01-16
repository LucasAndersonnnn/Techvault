const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const authMiddleware = require('../middlewares/authMidleware.js');


router.post('/cadastro', userController.criarUsuario);

router.post('/login', userController.loginUsuario);

router.get('/perfil', authMiddleware, userController.perfilUsuario);

module.exports = router;
