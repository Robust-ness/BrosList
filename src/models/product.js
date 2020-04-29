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
    },
    price: {
        type: Number,
        required: true
    }
},
{
    timestamps: true
}
)

const Product = mongoose.model('product', productSchema)

module.exports = Product