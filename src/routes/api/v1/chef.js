const express = require('express');
const router = express.Router();
const { chefController } = require("../../../controller/api/v1");

router.post('/', chefController.create);
router.get('/', chefController.index);



module.exports = router;