const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },  
    reviewScore: {
        type:Number,
        min: 1,
        max: 5,
        required: true
    },
    reviewText: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
},
{
    timestamps: true
}
)

const Product = mongoose.model('product', reviewSchema)

module.exports = Product