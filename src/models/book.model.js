const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookModel = new Schema({
  title: String,
  author: String,
  publisher: String,
  department: String,
  semeter: Number,
  url: String,
  num_of_copies: Number,
});

const Book = mongoose.model("book", BookModel);

module.exports = Book;
