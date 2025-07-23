const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async function (){
    try{
        await mongoose.connect(config.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Mongodb connected");

    }catch(error){
        console.log("Error", error);
    }
}

module.exports = connectDB;
