const express = require('express');
const router = express.Router();
const { productController } = require("../../../controller/api/v1");

router.post('/', productController.create);



module.exports = router;