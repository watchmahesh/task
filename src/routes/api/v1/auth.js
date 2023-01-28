const express = require('express');
const router = express.Router();
const { authController } = require("../../../controller/api/v1");

router.post('/register', authController.registerUser);


module.exports = router;