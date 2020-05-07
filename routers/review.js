const express = require("express");
const Review = require("../models/review");
const auth = require('../middleware/auth')

const router = new express.Router();

router.get('/reviews/:id', async (req,res) => {
  try {
    const reviewId = req.params.id
    const limit = parseInt(req.query.limit)
    const skip = parseInt(req.query.skip)
    const sort = parseInt(req.query.sort)
    const result = await Review.find({movie: reviewId}).skip(skip).limit(limit).sort({createdAt: sort})
    //console.log(result)
    res.send(result)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/reviews/:id', async (req, res) => {
    try {
        res.send(await Review.findOne({movie: req.params.id}))
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post("/review", auth, async (req, res) => {
  try {
    const review = new Review({...req.body, owner: req.user._id});
    await review.save();
    res.send(review);
  } catch (e) {
    res.status(400).send(e);
  }
});


router.delete("/reviews/:id", async (req, res) => {
  try {
    let review = await Review.findOneAndDelete({movie: req.params.id})
    res.send(review)
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch("/reviews/:id", async (req, res) => {
    try {
        let review = await Review.findOneAndUpdate({movie:req.params.id}, req.body, {new: true})
        res.send(review)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    res.status(400).send({ error: "Invalid Updates" });
  }
  try {
    let user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
