const express = require("express");
const multer = require('multer')

const User = require("../models/user");
const auth = require('../middleware/auth')
const upload = require('../middleware/upload')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const router = new express.Router();
const path = require('path')


// router.post('/users/me/profilePic' /*auth*/, upload.single('profilePic'), async (req, res) => {
//   try {
//     res.set("Content-Type", "image/png")
//     //console.log(req.body)
//     req.body.usedCamera=="true" ? res.send(Buffer.from(req.body.profilePic)) : res.send(req.file.buffer)
    

//   } catch (error) {
//     res.send(error)
//   }
// })

//Account Creation

router.get('/createaccount', async (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'pages', 'register.html'))
})

router.post("/users", upload.none(), async (req, res) => {
  try {
    console.log('creating: ' + req.body.email)
    if (await User.exists({username: req.body.username}) || await User.exists({email: req.body.email})) {
      throw new Error('Similar Account Already Exists.')
    }
    const user = new User(req.body);
    await user.save();
    const token = await user.generateToken()

    //res.send({user, token});
    //console.log(bcrypt.hash(req.body.email, 8))
    //res.redirect('/nextsteps').send
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'broslist.helpdesk@gmail.com',
        pass: 'whalensucks'
      }
    });
    const mailOptions = {
      from: 'broslist.helpdesk@gmail.com',
      to: req.body.email,
      subject: 'BrosList Account Verification',
      html:
           `

          <div class="main">
              <div><h1 class="text">Welcome to Broslist!</h1></div>
              <div><p class="text">This email will allow you to activate your account at Broslist so you can buy more high quality goods!</p></div>
              <a href="http://127.0.0.1:3000/verify/${jwt.sign(req.body.email, 'emailconfirm')}">Validate Now!</a>
          </div>
          
          `
    };
    transporter.sendMail(mailOptions, function (err, info) {
      if(err)
        throw new Error(err)
      else
        console.log(info);
        res.send('Account Created Successfully')
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/verify/:id', async (req, res) => {
  let user = await User.findOne({email: jwt.verify(req.params.id, 'emailconfirm')})
  await User.findByIdAndUpdate(user._id.toString(), {willExpireIn: null}, {new: true})
  res.send(user)
})

router.get('/nextsteps', async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, '../', 'pages', 'thankyou.html'))
  //   let user = await (await User.findOne({firstName: 'Bob'})).toJSON()
  //   //delete user.willExpireIn

  //   await User.findByIdAndUpdate(user._id.toString(), {willExpireIn: null}, {new: true})
  //   res.send(user)
  //   //await user.save()
  //   //console.log(user)
  //   //res.send(user)
  //   //res.send(await User.findById('5e92ab74452d095eb8803bba').firstName)
  // } catch (error) {
    
  }
})



router.get('/users/:id/profilePic', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user || !user.profilePic) {
      throw new Error()
    }
    res.set("Content-Type", "image/jpg")
    res.send(user.profilePic)
  } catch (error) {
    res.status(404).send()
  }
})

router.get('/users/me', auth, async (req,res) => {
  res.send(req.user)
})


router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateToken();

    res.send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens.filter(token => {
      return token.token !== req.token
    })
    await req.user.save()
    res.send('You have logged out')
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.get("/users", async (req, res) => {
  try {
    let users = await User.find({});
    res.send(users);
    console.log(users);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.get("/users/:id", async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

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
router.patch("/users/:id", auth, async (req, res) => {
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

router.get('/reviews/me', auth, async (req, res) => {
  const limit = parseInt(req.query.limit)
  const skip = parseInt(req.query.skip)
  const sort = parseInt(req.query.sort)
  await req.user.populate({
    path: 'reviews',
    options: {
      limit: parseInt(limit),
      skip: parseInt(skip),
      sort: {createdAt: sort}
    }
  }).execPopulate()
  res.send(req.user.reviews)
})



module.exports = router;
