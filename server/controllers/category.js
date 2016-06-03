'use strict';

/**
 *  Module dependencies
 */
const _ = require('lodash');
const mongoose = require('mongoose');
const Category = mongoose.model('Category');
const Product = mongoose.model('Product');

/**
 *  Module exports
 */
module.exports.createCategory = createCategory;
module.exports.update = update;
module.exports.getCategories = getCategories;
module.exports.getCategoryById = getCategoryById;
module.exports.deleteCategory = deleteCategory;
module.exports.jsonCategory = jsonCategory;

function createCategory(req, res, next) {
  let category = _.pick(req.body, ['name', 'description']);

  Category.create(category, (err, result) => {
    if (err && (11000 === err.code || 11001 === err.code)) {
      return res.status(400).json({ message: 'Name is already in use.' });
    }
    req.resources.category = result;
    next();
  });
}
function update(req, res, next) {
  let category = req.resources.category;
  let body = _.pick(req.body, ['name', 'description']);
  Object.assign(category, body);

  category.save( (err, result) => { 
    if (err) {
      return next(err);
    }
    req.resources.category = result;
    next();
  });
}

function getCategories(req, res, next) {
  Category.find({}, (err, result) => {
    if (err) {
      return next(err);
    }
    req.resources.category = result;
    next();
  });
}

function getCategoryById(req, res, next) {
  let categoryId = req.params.id;
  Category.findById(categoryId, (err, result) => {
    if (err) {
      return next(err);
    }
    req.resources.category = result;
    next();
  });
}

function deleteCategory(req, res, next) {

  let categoryId = req.resources.category ? req.resources.category._id : null ;
  Product.remove({category : categoryId}, (err, result) => {
    if(err) {
      return next(err);
    }

    Category.remove({_id: categoryId}, (err, result) => {
      if (err) {
        return next(err);
      }
      next();
    });
  });
}

function jsonCategory(req, res, next) {
  res.json(req.resources.category);
}
