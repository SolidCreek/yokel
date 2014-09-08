

var Place = require('../place/placeModel.js');
var User = require('../users/userModel.js');
var Review = ('/reviewModel.js');

var Promise = require('bluebird');





//adds a review to a business
//needs a userID, business ID and review object
/*
* Example review object
* {
*   score: 4 //out of 5
*   text: "This place was great!  We had fish which was fresh.  Service was slow though." 
* }

*/

var userIsLocal = function(userID, placeID){
  User.isLocal(userID, placeID)
};

    //look up user
    //check if there is a 'local' relationship with the business


exports.create = function(req, res){
  var userID = req.body.userID;
  var place_id = req.body.place_id;

  var review = req.body.review;


  //check if user is local to placeID
  // userIsLocal(userID, placeID)
  // .then(function(data){
  //   if(data.length > 1){
    //create a review
    var reviewID = userID+place_id;
      Review.createUniqueReview({reviewID: reviewID})
      .then(function(data){
      //make a WRITES relationship from the user
        User.addRelationship({facebookID: userID}, review, 'WRITES');
      })
      .then(function(data){
      //make a HAS relationship from the business
        Place.addRelationship({placeID: placeID}, review)
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

