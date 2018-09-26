const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  answer: {
    type: String,
    required: true
  },
  poll: {
    type: Schema.Types.ObjectId,
    ref: "polls"
  },
  order: {
    type: Number,
    required: true
  },
  voted: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ]
});

module.exports = User = mongoose.model("answer", AnswerSchema);
