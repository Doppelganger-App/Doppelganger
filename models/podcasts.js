var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PodcastsSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
});

var Podcasts = mongoose.model("Podcasts", PodcastsSchema);

module.exports = Podcasts;