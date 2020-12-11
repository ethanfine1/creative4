const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

const bookSchema = new mongoose.Schema({
  title: String,
  path: String,
  author: String,
  description: String,
});

const Book = mongoose.model('Book', bookSchema);

router.put('/:id', async (req, res) => {
  var conditions = {_id: req.params.id};
  try{
    await Book.update(conditions, req.body);
    res.sendStatus(200);
  } catch (error) {
    //console.log(error);
    res.sendStatus(500);
  }

});

router.get('/', async (req, res) => {
  try {
    let topBooks = await Book.find().sort({
      created: -1
    });
    return res.send(topBooks);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Book.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    //console.log(error);
    res.sendStatus(500);
  }
});

router.post('/', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  const book = new Book({
    path: "/images/" + req.file.filename,
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
  });
  try {
    await book.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  model: Book,
  routes: router,
}
