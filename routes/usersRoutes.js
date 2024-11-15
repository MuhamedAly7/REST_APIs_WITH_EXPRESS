
const express = require('express');

const router = express.Router();

const usersController = require('../controllers/UsersController');

const verifyToken = require('../middlewares/verifyToken');

router.route('/')
            .get(verifyToken, usersController.getAllUsers);

router.route('/register')
            .post(usersController.register);

router.route('/login')
            .post(usersController.login);

module.exports = router;