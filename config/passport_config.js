const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');
const mongoose = require('mongoose')


//Load User Model Schema
const User = require('../models/users');

function initialize(passport) {

    const authenticateUser = async (email, password, done) => {
       
        //Match User
        User.findOne({ email: email })
            .then(user => {
                if(!user) {
                    return done(null, false, { message: 'No user'});
                }

                try {
                    //Match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err) throw err;

                        if(isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Incorrect passsword'});
                        }
                    })
                } catch (error) {
                    return done(error);
                }
                
            })

        
           
        
        
    }

    //Use the local strategy
    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
   
    //For serializing user data during sessions
    passport.serializeUser((user, done) => { done(null, user.id) })
    passport.deserializeUser((id, done) => { 
        User.findById(id, (err, user) => {
            done(err, user);
        });
       
    });

}

module.exports = initialize