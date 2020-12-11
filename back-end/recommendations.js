const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const recommendationSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
});

const Recommendation = mongoose.model('recommendation', recommendationSchema);

router.get('/', async (req, res) => {
  try {
    let recs = await Recommendation.find().sort({
      created: -1
    });
    return res.send(recs);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Recommendation.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    //console.log(error);
    res.sendStatus(500);
  }
});

router.post('/', async (req, res) => {
  // Just a safety check
  const recommendation = new Recommendation({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
  });
  try {
    await recommendation.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  model: Recommendation,
  routes: router,
}
