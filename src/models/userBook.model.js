const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserBookModel = new Schema(
  {
    bookId: {
      type: mongoose.Types.ObjectId,
      ref: "book",
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    num_of_copies: Number,
  },
  { timestamps: true }
);

const UserBook = mongoose.model("user_book", UserBookModel);

module.exports = UserBook;
