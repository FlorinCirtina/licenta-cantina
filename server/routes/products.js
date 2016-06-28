'use strict';

const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authentication');
const productCtrl = require('../controllers/product');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.post('/product', authentication.ensured, authorization.isAdmin, productCtrl.createProduct, productCtrl.jsonProduct);
router.post('/cart', productCtrl.addToCart, productCtrl.jsonProduct);
router.get('/cart', productCtrl.getCart, productCtrl.jsonProduct);
router.delete('/cart', productCtrl.clearCart);
router.put('/cart', productCtrl.deleteFromCart);
router.put('/product/:id', authentication.ensured, authorization.isAdmin, productCtrl.getProductById, productCtrl.update, productCtrl.jsonProduct);
router.get('/products', productCtrl.getProducts, productCtrl.jsonProduct);
router.get('/product/:id', productCtrl.getProductById, productCtrl.jsonProduct);
router.delete('/product/:id', authentication.ensured, authorization.isAdmin, productCtrl.getProductById, productCtrl.deleteProduct, productCtrl.jsonProduct);


module.exports = router;
