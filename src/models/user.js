const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        default: 0
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('no "password"')
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('email is invalid')
            }
        }
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    profilePicture: {
        type: Buffer
    },
    createdAt: { 
        type: Date,
        default: Date.now 
    },
    willExpireIn: {
        type: Date,
        expires: '60m',
        default: Date.now
    }
}, {
    timestamps: true
})

userSchema.virtual('reviews', {
    ref: "review",
    localField: "_id",
    foreignField: "owner",
})

userSchema.virtual('products', {
    ref: "product",
    localField: "_id",
    foreignField: "owner",
})



userSchema.methods.generateToken = async function() {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 'okeysudo')
    user.tokens = user.tokens.concat({token})
    await user.save() 
    return token
}

userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()
    delete userObject.tokens
    delete userObject.password

    return userObject
}

userSchema.pre('save', async function(next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    if (!user) {
        throw new Error('unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('unable to login')
    } else {
        return user;
    }
}
const User = mongoose.model('User', userSchema)

module.exports = User 