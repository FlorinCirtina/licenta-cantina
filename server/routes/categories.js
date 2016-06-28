'use strict';

const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authentication');
const categoryCtrl = require('../controllers/category');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.post('/category', authentication.ensured, authorization.isAdmin, categoryCtrl.createCategory, categoryCtrl.jsonCategory);
router.put('/category/:id', authentication.ensured, authorization.isAdmin, categoryCtrl.getCategoryById, categoryCtrl.update, categoryCtrl.jsonCategory);
router.get('/categories', categoryCtrl.getCategories, categoryCtrl.jsonCategory);
router.get('/category/:id', categoryCtrl.getCategoryById, categoryCtrl.jsonCategory);
router.delete('/category/:id', authentication.ensured, authorization.isAdmin, categoryCtrl.getCategoryById, categoryCtrl.deleteCategory, categoryCtrl.jsonCategory);


module.exports = router;
