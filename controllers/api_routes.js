var express = require("express");
var router = express.Router();
var Profile = require("../models/profile.js");
var Chat = require("../models/chatgroup.js");

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

router.post("/creategroup", function(req, res) {
  console.log(req.body);

  Chat.findOne({ 'name': req.body.name }, function(err, data) {
    if (err) throw err;

    if (!data) {
      var newChat = new Chat();
      newChat.name = req.body.name;
      newChat.namespace = req.body.name.toLowerCase().replace(/ /g, "_");
      newChat.topics = req.body.topics;
      newChat.admins.push(req.body.admins);
      newChat.member_names.push(req.body.memberName);

      if (req.body.politics === "left-leaning") {
        newChat.left_members = 1;
      } else {
        newChat.right_members = 1;
      }
      newChat.total_members = 1;
      newChat.welcome_message = req.body.welcomeMessage;

      newChat.save(function(err, group) {
        if (err) throw err;
        
        Profile.findOneAndUpdate({ 'local.email': req.body.admins }, { $push: { chatgroups: {
          name: group.name,
          namespace: group.namespace,
          topics: group.topics
        }}}, {new: true}, function(err, profile) {
          if (err) throw err;
          
          Chat.findByIdAndUpdate(group._id, {$push: {members: profile._id}}, {new: true}, function(err, update) {
            if (err) throw err;
            res.json(profile.chatgroups);
          });
        });
      });
    } else {
      res.json("name taken");
    }
  });
});

router.get("/getgroups/:lean", function(req, res) {
  console.log(req.params.lean);
  if (req.params.lean === "left-leaning") {
    Chat.find({}).where('left_members').lt(3).limit(5).sort({created_at: -1}).exec(function(err, docs) {
      if (err) throw err;
      res.json(docs);
    });
  } else {
    Chat.find({}).where('right_members').lt(3).limit(5).sort({created_at: -1}).exec(function(err, docs) {
      if (err) throw err;
      res.json(docs);
    });
  }
});

router.put("/joingroup/:email", function(req, res) {
  Profile.findOneAndUpdate({ 'local.email': req.params.email }, { $push: {chatgroups: req.body}}, { new: true }, function(err, profile) {
    if (err) throw err;

    if (profile.political_lean === "left-leaning") {
      Chat.findOneAndUpdate({ name: req.body.name }, {
        $push: {member_names: profile.name, members: profile._id},
        $inc: {left_members: 1, total_members: 1}
      },
      {new: true},
      function(err, update) {
        if (err) throw err;
        res.json(profile.chatgroups);
      });
    } else {
      Chat.findOneAndUpdate({ name: req.body.name }, {
        $push: {member_names: profile.name, members: profile._id},
        $inc: {right_members: 1, total_members: 1}
      },
      {new: true},
      function(err, update) {
        if (err) throw err;
        res.json(profile.chatgroups);
      });
    }
  });
});

router.get("/groupinfo/:room", function(req, res) {
  Chat.findOne({ namespace: req.params.room }, function(err, group) {
    if (err) throw err;
    res.json(group);
  });
});

module.exports = router;