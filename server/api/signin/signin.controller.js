/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var User = require('../users/userModel');

// Get list of things
exports.index = function(req, res) {
  
  res.json([
    {
      token: 'i76q2tgkrbd6i7wugyajdf'
    }
  ]);
};