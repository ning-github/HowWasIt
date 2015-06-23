var friendsController = require("./controllers/friendsController");
var reviewsController = require("./controllers/reviewsController");
var router = require("express").Router();
var authController = require("./controllers/authController");

for (var route in friendsController) {
	router.route("/friends/" + route)
		.get(friendsController[route].get)
		.post(friendsController[route].post);
}

for (var route in reviewsController) {
  router.route("/reviews/" + route)
    .get(reviewsController[route].get)
    .post(reviewsController[route].post);
}

for (var route in authController) {
  router.route("/" + route)
    .post(authController[route].post);
}

module.exports = router;