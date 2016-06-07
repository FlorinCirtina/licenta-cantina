'use strict';

/**
 *  Module dependencies
 */
const _ = require('lodash');
const mongoose = require('mongoose');
const Order = mongoose.model('Order');

/**
 *  Module exports
 */
module.exports.createOrder = createOrder;
// module.exports.update = update;
module.exports.getOrders = getOrders;
// module.exports.getProductById = getProductById;
// module.exports.deleteProduct = deleteProduct;
module.exports.jsonOrder = jsonOrder;

function createOrder(req, res, next) {
  let order = {};
  order.user = req.user._id;
  order.products = [];
  let productObject = {
    product: '57520aa250e7d8e82c5dadc6',
    quantity: 1
  };

  order.products.push(productObject);

  console.log(order);
  Order.create(order, (err, result) => {
    // if (err && (11000 === err.code || 11001 === err.code)) {
    //   return res.status(400).json({ message: 'Name is already in use.' });
    // }
    req.resources.order = result;
    next();
  });
}
// function update(req, res, next) {
//   let product = req.resources.product;
//   let body = _.pick(req.body, ['name', 'description', 'price']);
//   Object.assign(product, body);

//   product.save( (err, result) => { 
//     if (err) {
//       return next(err);
//     }
//     req.resources.product = result;
//     next();
//   });
// }

function getOrders(req, res, next) {
  Order.find({}).populate('user').populate('products.product').exec( (err, result) => {
    if (err) {
      return next(err);
    }
    req.resources.order = result;
    next();
  });
}

// function getProductById(req, res, next) {
//   let productId = req.params.id;
//   Product.findById(productId, (err, result) => {
//     if (err) {
//       return next(err);
//     }
//     req.resources.product = result;
//     next();
//   });
// }

// function deleteProduct(req, res, next) {
//   let productId = req.resources.product ? req.resources.product._id : null ;

//   Product.remove({_id: productId}, (err, result) => {
//     if (err) {
//       return next(err);
//     }
//     next();
//   })
// }

function jsonOrder(req, res, next) {
  res.json(req.resources.order);
}
