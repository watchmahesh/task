const express = require('express');
const router = express.Router();
const { categoryController } = require("../../../controller/api/v1");

router.get('/', categoryController.index);
router.post('/', categoryController.create);



module.exports = router;