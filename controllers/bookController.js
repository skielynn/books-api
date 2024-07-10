const Book = require('../models/book');

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book == null) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createBook = async (req, res) => {
  const book = new Book({
    title: req.body.title,
    description: req.body.description,
    year: req.body.year,
    quantity: req.body.quantity,
    imageURL: req.body.imageURL
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//
const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const seedBooks = async (req, res) => {
  const booksToSeed = [
    {
      title: "The Shinobi Initiative",
      description: "The reality-bending adventures of a clandestine service agency in the year 2166",
      year: 2014,
      quantity: 10,
      imageURL: "https://imgur.com/LEqsHy5.jpeg"
    },
    {
      title: "Tess the Wonder Dog",
      description: "The tale of a dog who gets super powers",
      year: 2007,
      quantity: 3,
      imageURL: "https://imgur.com/cEJmGKV.jpg"
    },
    {
      title: "The Annals of Arathrae",
      description: "This anthology tells the intertwined narratives of six fairy tales.",
      year: 2016,
      quantity: 8,
      imageURL: "https://imgur.com/VGyUtrr.jpeg"
    },
    {
      title: "Wâˆ€RP",
      description: "A time-space anomaly folds matter from different points in earth's history in on itself, sending six unlikely heroes on a race against time as worlds literally collide.",
      year: 2010,
      quantity: 4,
      imageURL: "https://imgur.com/qYLKtPH.jpeg"
    }
  ];

  try {
    await Book.insertMany(booksToSeed);
    res.status(200).json({ message: 'Seed successful' });
  } catch (err) {
    console.error('Seed error:', err);
    res.status(400).json({ message: 'Seed unsuccessful' });
  }
};

const getHelloWorld = (req, res) => {
  res.send('Hello world');
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  seedBooks
};
