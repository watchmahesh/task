const express = require('express');
const router = express.Router();


const auth = require('./auth');
const product = require('./product');
const category = require('./category');
const chef = require('./chef');
router.use('/auth', auth);
router.use('/product', product);
router.use('/category', category);
router.use('/chef', chef);

module.exports = router;