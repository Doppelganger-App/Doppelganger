var express = require("express");
var router = express.Router();
var Profile = require("../models/profile.js");

router.get("/profile", function(req, res) {
  res.json("thanks");
});

module.exports = router;