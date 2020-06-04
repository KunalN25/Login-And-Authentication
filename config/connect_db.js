// for connecting to mongodb

const mongoose = require('mongoose')
const db = require('./keys').MongoURI;  //DB config

module.exports = async () => {
            
    
    //Connect DB
        await mongoose.connect(db, { useNewUrlParser: true })
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.log(err));
        
        return db;
}