var express = require("express");
var router = express.Router();
var Profile = require("../models/profile.js");

// router.get("/profile", function(req, res) {
//   res.json("thanks");
// });

router.get("/completestorage/:email", function(req, res) {
  Profile.findOne({ 'local.email': req.params.email }, function(err, user) {
    if (err) throw err;
    res.json(user);
  });
});

router.put("/updateprofile", function(req, res) {
  console.log(req.body);
  Profile.findOneAndUpdate({ 'local.email': req.body.email }, {
    'name': req.body.username,
    'life_background': req.body.background,
    'political_lean': req.body.politics
  }, function(err, doc) {
    if (err) throw err;
    res.json("profile updated");
  });
});

router.put("/savevideo/:email", function(req, res) {
  console.log(req.body);
  Profile.findOneAndUpdate({ 'local.email': req.params.email }, { $push: { saved_videos: req.body }}, { new: true }, function(err, data) {
    if (err) throw err;
    res.json(data);
  });
});

router.put("/savearticle/:email", function(req, res) {
  console.log(req.body);
  Profile.findOneAndUpdate({ 'local.email': req.params.email }, { $push: { saved_articles: req.body }}, { new: true }, function(err, data) {
    if (err) throw err;
    res.json(data);
  });
});

router.put("/deletevideo/:email/:id", function(req, res) {
  console.log(req.params.id);
  Profile.findOneAndUpdate({'local.email': req.params.email}, { $pull: { saved_videos: {_id: req.params.id}}}, function(err, doc) {
    if (err) throw err;
    res.json("item deleted");
  });
});

router.put("/deletearticle/:email/:id", function(req, res) {
  console.log(req.params.id);
  Profile.findOneAndUpdate({'local.email': req.params.email}, { $pull: { saved_articles: {_id: req.params.id}}}, function(err, doc) {
    if (err) throw err;
    res.json("item deleted");
  });
});

module.exports = router;