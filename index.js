const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
})
.then(() => {
  console.log('MongoDB connected');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit process with failure
});

// Middleware
app.use(express.json()); // Parse JSON bodies

// Routes
const booksRouter = require('./routes/bookRoutes');
app.use('/books', booksRouter);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Book API');
});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Book API');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
