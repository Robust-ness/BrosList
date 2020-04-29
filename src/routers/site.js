const express = require("express");
const Review = require("../models/review");
const auth = require('../middleware/auth')
const path = require('path')

const router = new express.Router();

router.get('/', async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, '../', 'pages', 'index.html'))
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/createlisting', async(req, res) => {
  res.sendFile(path.join(__dirname, '../', 'pages', 'post.html'))
})

module.exports = router;
