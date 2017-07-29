var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ChatSchema = new Schema({
	name: {
		type: String,
    unique: true,
    required: true
	},
  namespace: {
    type: String,
    required: true
  },
  topics: [String],
  welcome_message: {
    type: String
  },
  admins: [String],
  right_members: {
    type: Number,
    default: 0
  },
  left_members: {
    type: Number,
    default: 0
  },
  total_members: {
    type: Number,
    default: 0
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: "Profile"
  }],
  member_names: [String],
  messages: [{
    author: String,
    message: String,
    created_at: {
      type: Date,
      default: Date.now
    } 
  }],
  created_at: {
    type: Date,
    default: Date.now
  }
});

var Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;