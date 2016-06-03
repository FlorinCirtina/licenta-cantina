'use strict';

const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authentication');
const categoryCtrl = require('../controllers/category');

router.post('/category', categoryCtrl.createCategory, categoryCtrl.jsonCategory);
router.put('/category/:id', categoryCtrl.getCategoryById, categoryCtrl.update, categoryCtrl.jsonCategory);
router.get('/categories', categoryCtrl.getCategories, categoryCtrl.jsonCategory);
router.get('/category/:id', categoryCtrl.getCategoryById, categoryCtrl.jsonCategory);
router.delete('/category/:id', categoryCtrl.getCategoryById, categoryCtrl.deleteCategory, categoryCtrl.jsonCategory);


module.exports = router;
