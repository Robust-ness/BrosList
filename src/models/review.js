const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    movie: {
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

const Review = mongoose.model('review', reviewSchema)

module.exports = Review