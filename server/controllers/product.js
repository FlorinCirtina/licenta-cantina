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
module.exports.addToCart = addToCart;
module.exports.deleteFromCart = deleteFromCart;
module.exports.clearCart = clearCart;
module.exports.getCart = getCart;
module.exports.update = update;
module.exports.getProducts = getProducts;
module.exports.getProductById = getProductById;
module.exports.deleteProduct = deleteProduct;
module.exports.jsonProduct = jsonProduct;

function createProduct(req, res, next) {
  let product = _.pick(req.body, ['name', 'price', 'category', 'description']);
  Product.create(product, (err, result) => {
    if (err && (11000 === err.code || 11001 === err.code)) {
      return res.status(400).json({ message: 'Name is already in use.' });
    }
    req.resources.product = result;
    next();
  });
}

function addToCart(req, res, next) {
  let product = req.body;
  product.quantity = 1;
  req.session.cart = req.session.cart || {};
  req.session.cart.products =  req.session.cart.products || [];
  req.session.cart.total =  req.session.cart.total || 0;
  let cartIndex;

  if(!req.session.cart.products.length) {
    req.session.cart.products.push(product);
    req.session.cart.total = product.price;
    return res.json(req.session.cart);
  }

  let productId = req.session.cart.products.find((c,index) => {
    cartIndex = index;
    return c._id == product._id
  });
  if(!productId) {
    req.session.cart.products.push(product);
    req.session.cart.total += product.price;
  }

  if(productId) {
    req.session.cart.products[cartIndex].quantity++;
    req.session.cart.total += productId.price;
  }

  return res.json(req.session.cart);
}

function deleteFromCart(req, res) {
  let product = req.body;
  let cartIndex;
  
  let productId = req.session.cart.products.find((c,index) => {
    cartIndex = index;
    return c._id == product._id
  });

  if(productId) {
    let productFromCart = req.session.cart.products[cartIndex];
    if(productFromCart.quantity > 1) {
      req.session.cart.products[cartIndex].quantity--;
      req.session.cart.total -= productId.price;
    } else {
      req.session.cart.products.splice(cartIndex, 1);
      req.session.cart.total -= productId.price;
    }
  }
  res.json(product);
}

function getCart(req, res, next) {
  res.json(req.session.cart);
}

function clearCart(req, res) {
  req.session.cart = {};
  res.json({});
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
  Product.find().sort({createdAt: -1}).populate('category').exec( (err, result) => {
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
