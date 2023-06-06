const express = require('express');
const router = express.Router();


const auth = require('./auth');
const product = require('./product');
router.use('/auth', auth);
router.use('/product', product);

module.exports = router;