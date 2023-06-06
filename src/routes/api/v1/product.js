const express = require('express');
const router = express.Router();
const { productController } = require("../../../controller/api/v1");

router.post('/', productController.create);
router.get('/product-by-category', productController.getProductByCategoryId);



module.exports = router;