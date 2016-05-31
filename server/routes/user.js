'use strict';

const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authentication');
const userCtrl = require('../controllers/user');

// router.post('/register', accountCtrl.register);

router.put('/user/:id', userCtrl.getUserById, userCtrl.update, userCtrl.jsonUser);
router.get('/users', userCtrl.getUsers, userCtrl.jsonUser);
router.get('/user/:id', userCtrl.getUserById, userCtrl.jsonUser);


module.exports = router;
