const Book = require("../models/book.model");
const UserBook = require("../models/userBook.model");

const UserBookController = () => {};

UserBookController.applyBook = async (req, res) => {
  const { bookId, userId, nums_of_copies } = req.body;
  const bookData = await Book.findById(bookId);
  if (bookData.num_of_copies >= nums_of_copies) {
    const applyBook = await UserBook.create({
      bookId,
      userId,
      nums_of_copies,
    });
    if (!applyBook) {
      return res.status(500).json("error while applying book");
    }
    const updateBook = await Book.findByIdAndUpdate(
      {
        _id: bookId,
      },
      {
        $set: {
          num_of_copies: bookData.num_of_copies - nums_of_copies,
        },
      },
      { new: true }
    );

    if (!updateBook) {
      return res.status(404).json("error while updating book");
    }
    return res.status(200).json("Book successfully applied");
  }
  return res.status(404).json("Books are not available");
};

UserBookController.returnBook = async (req, res) => {
  const { bookId, userId, nums_of_copies } = req.body;
  const bookData = await Book.findById(bookId);
  if (bookData) {
    const deleteUserBook = await UserBook.findOneAndDelete({
      bookId,
      userId,
    });
    if (!deleteUserBook) {
      return res.status(500).json("error while retuning book");
    }
    const updateBook = await Book.findByIdAndUpdate(
      {
        _id: bookId,
      },
      {
        $set: {
          num_of_copies: bookData.num_of_copies + nums_of_copies,
        },
      },
      { new: true }
    );

    if (!updateBook) {
      return res.status(404).json("error while updating book");
    }
    return res.status(200).json("Book successfully retuned");
  }
  return res.status(404).json("Books are not available");
};

UserBookController.getAppliedBook = async (req, res) => {
  const { userId } = req.body;
  if (userId) {
    const allAppliedBook = await UserBook.find({
      userId,
    });
    if (allAppliedBook) {
      return res.status(200).json(allAppliedBook);
    }
    return res.status(404).json("Book not available");
  }
  return res.status(400).json("Please select a book");
};

module.exports = UserBookController;
