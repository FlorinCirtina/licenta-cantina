'use strict';

const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authentication');
const productCtrl = require('../controllers/product');

router.post('/product', productCtrl.createProduct, productCtrl.jsonProduct);
router.put('/product/:id', productCtrl.getProductById, productCtrl.update, productCtrl.jsonProduct);
router.get('/products', productCtrl.getProducts, productCtrl.jsonProduct);
router.get('/product/:id', productCtrl.getProductById, productCtrl.jsonProduct);
router.delete('/product/:id', productCtrl.getProductById, productCtrl.deleteProduct, productCtrl.jsonProduct);


module.exports = router;
