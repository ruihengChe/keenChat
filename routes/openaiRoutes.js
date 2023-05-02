const express = require('express');
const router = express.Router();

//从controller中引入
const { generateImage } = require('../controller/openaiController.js');

router.post('/generateimage', generateImage);

module.exports = router;