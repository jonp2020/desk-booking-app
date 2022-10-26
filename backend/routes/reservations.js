const express = require("express");
const router = express.Router();

const {post_reservations, get_reservations} = require("../controllers/controller_database");

router.route("/").post(post_reservations).get(get_reservations);


// router.get("/", get_users);

module.exports = router;