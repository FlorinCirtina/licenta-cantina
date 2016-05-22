'use strict';
const mongoose = require('mongoose');
let Todo = mongoose.model('Todo');
function getTest(req, res, next) {
	Todo.find(function(err, todos) {

      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err) {
          res.send(err);
      }
      console.log(todos);
      res.json(todos); // return all todos in JSON format
  });
}

module.exports.getTest = getTest;

