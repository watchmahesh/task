const express = require('express');
const router = express.Router();


const auth = require('./auth');
const product = require('./product');
const category = require('./category');
router.use('/auth', auth);
router.use('/product', product);
router.use('/category', category);

module.exports = router;