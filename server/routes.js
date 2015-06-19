var friendsController = require("./controllers/friendsController");
var router = require("express").Router();

for (var route in friendsController) {
	router.route("/friends/" + route)
		.get(friendsController[route].get)
		.post(friendsController[route].post);
}

module.exports = router;