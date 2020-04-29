const express = require("express");
const Review = require("../models/review");
const auth = require('../middleware/auth')

const router = new express.Router();

router.get('/epic', async (req, res) => {
  try {
    //res.sendFile(path.join(__dirname, '../', 'pages', 'index.html'))
    res.send('okay')
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router;
