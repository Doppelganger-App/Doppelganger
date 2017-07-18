var path = require("path");
var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index_design.html"));
});

router.get("/dashboard", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/user_page_design.html"));
});

module.exports = router;