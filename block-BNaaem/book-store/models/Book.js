let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let book = new Schema(
  {
    title: { type: String },
    discription: { type: String, required: true },
    author: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    category: { type: String },
    tags: [{ type: String }],
    commentId: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", book);