const express = require("express");
const app = express();
const port = process.env.port || 3000;
const bodyParser = require('body-parser')
require("./db/mongoose");
const productRouter = require('./routers/product')
const userRouter = require('./routers/user')
const reviewRouter = require('./routers/review')
const bcrypt = require('bcryptjs')
const fs = require('fs')
const path = require('path')

// const testfunc = async () => {
//   const pass = '123'
//   const hashedpass = await bcrypt.hash(pass, 8)
//   console.log(pass, hashedpass)

//   const isMatch = await bcrypt.compare('123', hashedpass)
//   console.log(isMatch)
// }

// testfunc()
// let thing = fs.readFileSync(__dirname + '/public/img/profilePic.png')
// thing = 'data:image/png;base64,' + Buffer.from(thing).toString('base64')
// console.log(thing)

   app.use(express.json())
      .use(productRouter)
      .use(express.urlencoded({extended: false}))
      .use(express.static(__dirname + '/public'))
      .use(userRouter)
      .use(reviewRouter)

app.listen(port, () => {
  console.log("Listening on port " + port);
});


const jwt = require('jsonwebtoken')

// const testfunc = async () => {
//   const token = jwt.sign({_id: ''}, 'obeysudo', {
//     expiresIn: '7 days'
//   })
//   console.log(token)
//   const data = jwt.verify(token, 'obeysudo')
//   console.log(data)
// }

// testfunc()

const Review = require('./models/review')
const User = require('./models/user')

// const test = async() => {
//   const review = await Review.findById('5e3304e3df6f693908189bc1')
//   await review.populate('owner').execPopulate()
//   console.log(review.owner)
// }


// const test = async() => {
//   const user = await User.findById('5e2091adc79fdb54acb4dc55')
//   await user.populate('reviews').execPopulate()
//   console.log(user.reviews)
// }

// test()


