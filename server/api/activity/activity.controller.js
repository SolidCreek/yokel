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

// Get list of activities 
exports.index = function(req, res) {
  res.json([
    {
      timeOfEvent: Date.now(),
      event: 'eventType',
      value: 'if applicable'
    },
    {
      timeOfEvent: Date.now(),
      event: 'postLiked',
      value: { postId: 'f3we65tyg'}
    },
    {
      timeOfEvent: Date.now(),
      event: 'restaurantRated',
      value: {resutrantId: '87t45t3', score: 88}
    },
    {
      timeOfEvent: Date.now(),
      event: 'followed',
      value: {  name : 'Geoffrey',
                userId: '987yhgsiu4htdf3',
                dateFollowed: Date.now()
              }
    }
  ]);
};
