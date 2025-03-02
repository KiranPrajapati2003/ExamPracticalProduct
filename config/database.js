const mongoose = require('mongoose');

require('dotenv').config();
let url = process.env.DB_URL;


const db = async () => {
    try {
        await mongoose.connect(url);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
    }
}

module.exports = db;
