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

// Get list of people that you are following
exports.index = function(req, res) {
  res.json([
    {
      name : 'Jake',
      userId: '234yghj23h4m56',
      dateFollowed: Date.now(),
      score: 54,
      lastSeen: Date.now()
    },
    {
      name : 'Geoffrey',
      userId: '987yhgsiu4htdf3',
      dateFollowed: Date.now(),
      score: 77,
      lastSeen: Date.now()
    },
    {
      name : 'Stef',
      userId: 'lbkvjcxou8regr7e',
      dateFollowed: Date.now(),
      score: 81,
      lastSeen: Date.now()
    },
    {
      name : 'Collin',
      userId: '0978f8gusod78bvfd',
      dateFollowed: Date.now(),
      score: 88,
      lastSeen: Date.now()
    }
  ]);
};