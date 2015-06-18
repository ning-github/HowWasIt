var db = require('../config');
var Review = require('../models/review');

var Reviews = new db.Collection();

Reviews.model = Review;

module.exports = Reviews;
