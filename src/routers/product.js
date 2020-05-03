const express = require("express");
const Review = require("../models/review");
const auth = require("../middleware/auth");
const Product = require("../models/product");
const User = require("../models/user");
const upload = require('../middleware/upload')
const router = new express.Router();
const path = require('path')

router.post("/products/create", upload.single('itemPicture'), auth, async (req, res) => {
  try {
    if (req.body.price%1 != 0) {
      throw new Error('Price Invalid')
    }
    //console.log(req.body, req.user, req.file.buffer)
    const product = new Product({ ...req.body, owner: req.user._id, itemPicture: req.file.buffer });
    console.log(await product.save());
    res.send(product);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/createlisting', async(req, res) => {
  res.sendFile(path.join(__dirname, '../', 'pages', 'post.html'))
})

router.get("/product/:id", async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, '../', 'pages', 'item.html'))
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/product/:id/info", async (req, res) => {
  try {
    let product = await Product.findById(req.params.id)
    let prod = {...product.toObject()}
    prod.itemPicture = prod.itemPicture.toString('base64')
    //console.log(prod)
    res.send(prod)
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const reviewId = req.params.id;
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const sort = parseInt(req.query.sort);
    const result = await Review.find({ movie: reviewId })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: sort });
    console.log(result);
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/products/", async (req, res) => {
  try {
    let products = await Product.find({});
    res.send(products);
  } catch (error) {
    res.status(400).send(error);
  }
});



router.patch("/products/:id", async (req, res) => {
  try {
    let product = await Product.findOneAndUpdate(
      { product: req.params.id },
      req.body,
      { new: true }
    );
    res.send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/products/:id", async (req, res) => {
  try {
    //  if (Product.findById(req.params.id).owner =  )
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/products/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    res.status(400).send({ error: "Invalid Updates" });
  }
  try {
    let user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
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
