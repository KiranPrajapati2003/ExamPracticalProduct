const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    discription: String,
    image: String,

    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categoryTbl'
    },
},
    {
        timestamps: true
    })


const product = mongoose.model('productdata', productSchema)
module.exports = product;