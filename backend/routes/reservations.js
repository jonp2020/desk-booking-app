const express = require("express");
const router = express.Router();

const {post_reservations, get_reservations, delete_reservation} = require("../controllers/controller_database");

router.route("/").post(post_reservations).get(get_reservations).delete(delete_reservation);


// router.get("/", get_users);

module.exports = router;