const express = require("express");
const BookController = require("./book.controller");
const UserBookController = require("../userBooks/userBooks.controller");
const BookRouter = express.Router();

// get All books

BookRouter.get("/", BookController.getAllBooks);
BookRouter.post("/", BookController.addBook);
BookRouter.get("/:id", BookController.getBookById);
BookRouter.put("/:id", BookController.updateBook);
BookRouter.delete("/:id", BookController.deleteBook);
BookRouter.post("/apply", UserBookController.applyBook);
// BookRouter.get("/return", BookController.getBook);

module.exports = BookRouter;
