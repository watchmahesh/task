const express = require('express');
const router = express.Router();
const { authController } = require("../../../controller/api/v1");
const { userValidateMiddleware } = require('../../../middlewares/api/tokenValidationMiddleware');

router.post('/register', authController.registerUser);
router.post('/login', authController.login);
router.get('/profile', userValidateMiddleware, authController.getMyProfile);
router.post('/logout', authController.logout);


module.exports = router;