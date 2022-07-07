const mongoose = require("mongoose")
const logger = require("../logs/logger")

function connectDB(){
    const URL = process.env.DB_URL 
    try{
        mongoose.connect(URL)
        logger.info("connected to db")
    } catch(err){
        logger.error(err)
    }
}

module.exports = connectDB