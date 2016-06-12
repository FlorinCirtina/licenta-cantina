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
module.exports.update = update;
module.exports.getOrders = getOrders;
module.exports.getOrderById = getOrderById;
// module.exports.deleteProduct = deleteProduct;
module.exports.jsonOrder = jsonOrder;

function createOrder(req, res, next) {
  let order = {};
  order.user = req.user._id;
  order.total = req.body.total;
  order.products = [];
  let products = req.body.products;

  for(var i = 0; i < products.length; i++) {
    var data = products[i];
    var productObject = {
      product: data._id,
      quantity : data.quantity
    };
    order.products.push(productObject);
  }

  Order.create(order, (err, result) => {
    if(err) {
      return next(err);
    }
    req.session.cart = {};
    req.resources.order = result;
    next();
  });
}

function update(req, res, next) {
  let order = req.resources.order;
  let body = _.pick(req.body, ['paid']);
  Object.assign(order, body);

  order.save( (err, result) => { 
    if (err) {
      return next(err);
    }
    req.resources.order = result;
    next();
  });
}

function getOrders(req, res, next) {
  let where = {};

  if(req.query.myOrders == 'true') {
    where.user = req.user._id
  };

  Order.find(where).populate('user').populate('products.product')
  .sort({createdAt: -1})
  .exec( (err, result) => {
    if (err) {
      return next(err);
    }
    req.resources.order = result;
    next();
  });
}

function getOrderById(req, res, next) {
  let orderId = req.params.id;
  Order.findById(orderId, (err, result) => {
    if (err) {
      return next(err);
    }
    req.resources.order = result;
    next();
  });
}

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
