var express = require("express");
var router = express.Router();
var Profile = require("../models/profile.js");

router.get("/profile", function(req, res) {
  Profile.find
})