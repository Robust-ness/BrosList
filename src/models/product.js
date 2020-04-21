const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },  

   
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    itemPicture: {
        type: Buffer
    }
},
{
    timestamps: true
}
)

const Product = mongoose.model('product', reviewSchema)

module.exports = Product