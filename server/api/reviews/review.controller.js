

var Place = require('../place/placeModel.js');
var User = require('../users/userModel.js');
var Review = ('/reviewModel.js');

var Promise = require('bluebird');





//adds a review to a business
//needs a userID, business ID and review object
/*
* Example review object
* {
*   reviewID: 79
*   score: 4 //out of 5
*   text: "This place was great!  We had fish which was fresh.  Service was slow though." 
* }

*/

var userIsLocal = function(userID, place_id){
  User.isLocal(userID, place_id)
};

    //look up user
    //check if there is a 'local' relationship with the business


exports.create = function(req, res){
  var userID = req.body.userID;
  var place_id = req.body.place_id;

  var review = req.body.review;


  //check if user is local to place_id
  // userIsLocal(userID, place_id)
  // .then(function(data){
  //   if(data.length > 1){
    //create a review
      Review.createUniqueReview(review)
      .then(function(data){
      //make a WRITES relationship from the user
        User.addRelationship({facebookID: userID}, review, 'WRITES');
      })
      .then(function(data){
      //make a HAS relationship from the business
        Place.addRelationship({place_id: place_id}, review)
      })
      .then(function(data){
      //update business score
      //currently does nothing
        Place.updateScore();
      })
      .then(function(data){
        res.json('Creation successful');
      });

  //   } else {
  //   //else
  //   //respond with an error
  //   res.json('User is not local to business');
  //   res.status(403)
  //   }
    
  // })
};

