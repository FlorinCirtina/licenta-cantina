'use strict';
const express = require('express');
const router = express.Router();
const testController = require('../controllers/test');

router.get('/api/todos', testController.getTest);

module.exports = router;
