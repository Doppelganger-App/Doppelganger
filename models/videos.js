var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var VideosSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
});

var Videos = mongoose.model("Videos", VideosSchema);

module.exports = Videos;