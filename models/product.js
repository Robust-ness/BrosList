const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    postingTitle: {
        type: String,
        required: true
    },  
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    itemPicture: {
        type: Buffer,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
},
{
    timestamps: true
}
)

const Product = mongoose.model('product', productSchema)

module.exports = Product