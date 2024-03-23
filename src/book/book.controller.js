const Book = require("../models/book.model");

const BookController = () => {};

BookController.getAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.find();
    if (!allBooks) {
      return res.status(404).send("Not book found");
    }
    return res.status(200).json(allBooks);
  } catch (error) {
    return res.status(500).send(error);
  }
};

BookController.getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json("Book not found");
    }
    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).send(error);
  }
};

BookController.updateBook = async (req, res) => {
  try {
    const bookData = req.body;
    const bookId = req.params.id;

    const book = await Book.updateOne({ _id: bookId }, bookData);
    console.log({ book });
    if (!book) {
      return res.status(500).json("Error occured while adding book");
    }
    return res
      .status(200)
      .json({ message: "Book updated successfully", data: book });
  } catch (error) {
    return res.status(500).json(error);
  }
};

BookController.addBook = async (req, res) => {
  try {
    const bookData = req.body;
    const book = await Book.create(bookData);
    if (!book) {
      return res.status(500).json("Error occured while adding book");
    }
    return res
      .status(201)
      .json({ message: "Book added successfully", data: book });
  } catch (error) {
    return res.status(500).json(error);
  }
};

BookController.deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    console.log(bookId);
    const book = await Book.findByIdAndDelete(bookId);
    if (!book) {
      return res.status(500).json("Error occured while deleting book");
    }
    return res
      .status(200)
      .json({ message: "Book deleted successfully", data: book });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = BookController;
