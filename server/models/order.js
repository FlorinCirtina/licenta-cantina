'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

let OrderSchema = new Schema({
  user: {
    type: ObjectId,
    ref : 'User',
    required: true
  },
  products:[
  {
    product: {
      type: ObjectId,
      ref : 'Product'
    },
    quantity: {
      type: Number,
      required: true
    }
  }
  ],
  total: {
    type: Number,
    required: true
  },
  paid: {
    type: Boolean,
    required: true,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', OrderSchema);
