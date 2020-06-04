// GET/POST REQUESTS
const User = require('../models/users'); //User Schema


module.exports = (app, db) => {
   
    
   app.get('/users', async (req,res) => {
    
        let users = [];
        const cursor = User.find().cursor();
        //Loop through the database documents usng cursor
        for(let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
            users.push(doc);
            // console.log(doc);
        }
    
        res.json(users)
   });

}