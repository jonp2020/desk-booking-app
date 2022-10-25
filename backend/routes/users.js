const express = require("express");
const router = express.Router();

const {get_users} = require("../controllers/controller_database");

router.route("/").get(get_users);

// router.get("/", get_users);

module.exports = router;