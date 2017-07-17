var mongoose = require("mongoose");
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
  username: {
    type: String,
    unique: true,
    required: true
  },
  join_date: {
    type: Date,
    default: Date.now
  },
  life_background: {
    type: String,
    required: true
  },
  political_lean: {
    type: String,
    required: true
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

var Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;