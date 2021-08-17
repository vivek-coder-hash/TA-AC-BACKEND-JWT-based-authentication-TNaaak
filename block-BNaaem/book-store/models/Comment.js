let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let comment = new Schema(
  {
    title: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    bookId: { type: Schema.Types.ObjectId, ref: "Book" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", comment);