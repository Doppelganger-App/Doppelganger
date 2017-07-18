var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");
var Schema = mongoose.Schema;

var PodcastSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

var VideosSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

var ProfileSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    default: "Test"
  },
  local: {
    username: String,
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
  saved_podcasts: [PodcastSchema],
  saved_videos: [VideosSchema]
  // saved_podcasts: [{
  //   type: Schema.Types.ObjectId,
  //   ref: "Podcasts"
  // }],
  // saved_videos: [{
  //   type: Schema.Types.ObjectId,
  //   ref: "Videos"
  // }],
  // saved_articles: [{
  //   type: Schema.Types.ObjectId,
  //   ref: "Articles"
  // }]
});

ProfileSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};



var Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;