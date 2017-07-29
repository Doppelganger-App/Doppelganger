var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");
var Schema = mongoose.Schema;

var ProfileSchema = new Schema({
  name: {
    type: String,
    // unique: true,
    required: true,
    default: "Test"
  },
  local: {
    email: String,
    password: String
  },
  join_date: {
    type: Date,
    default: Date.now
  },
  life_background: {
    type: String,
    required: true,
    default: "STEM"
  },
  political_lean: {
    type: String,
    required: true,
    default: "left-leaning"
  },
  saved_videos: [{
    title: String,
    link: String
  }],
  saved_articles: [{
    title: String,
    link: String
  }],
  chatgroups: [{
    name: String,
    namespace: String,
    topics: [String]
  }]
});

ProfileSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

ProfileSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

var Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;