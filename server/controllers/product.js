'use strict';

/**
 *  Module dependencies
 */
const _ = require('lodash');
const mongoose = require('mongoose');
const Product = mongoose.model('Product');

/**
 *  Module exports
 */
module.exports.createProduct = createProduct;
module.exports.update = update;
module.exports.getProducts = getProducts;
module.exports.getProductById = getProductById;
module.exports.deleteProduct = deleteProduct;
module.exports.jsonProduct = jsonProduct;

function createProduct(req, res, next) {
  let product = _.pick(req.body, ['name', 'description', 'price', 'category']);

  Product.create(product, (err, result) => {
    if (err && (11000 === err.code || 11001 === err.code)) {
      return res.status(400).json({ message: 'Name is already in use.' });
    }
    req.resources.product = result;
    next();
  });
}
function update(req, res, next) {
  let product = req.resources.product;
  let body = _.pick(req.body, ['name', 'description', 'price']);
  Object.assign(product, body);

  product.save( (err, result) => { 
    if (err) {
      return next(err);
    }
    req.resources.product = result;
    next();
  });
}

function getProducts(req, res, next) {
  Product.find({}).populate('category').exec( (err, result) => {
    if (err) {
      return next(err);
    }
    req.resources.product = result;
    next();
  });
}

function getProductById(req, res, next) {
  let productId = req.params.id;
  Product.findById(productId, (err, result) => {
    if (err) {
      return next(err);
    }
    req.resources.product = result;
    next();
  });
}

function deleteProduct(req, res, next) {
  let productId = req.resources.product ? req.resources.product._id : null ;

  Product.remove({_id: productId}, (err, result) => {
    if (err) {
      return next(err);
    }
    next();
  })
}

function jsonProduct(req, res, next) {
  res.json(req.resources.product);
}
