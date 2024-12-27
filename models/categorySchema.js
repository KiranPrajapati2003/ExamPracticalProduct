const { default: mongoose } = require("mongoose");

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    image:String    
})

const category = mongoose.model('categoryTbl',categorySchema) ;
module.exports = category