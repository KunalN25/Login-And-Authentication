//Login and registration routes
const bcrypt = require('bcrypt');
const User = require('../models/users'); //User Schema


module.exports = (app, passport) => {
                    
        app.get('/login',checkNotAuthenticated , (req,res) => {
            res.render('login');
        })

        

        app.get('/register',checkNotAuthenticated , (req,res) => {
            res.render('register');
        })

        app.post('/login',checkNotAuthenticated , passport.authenticate('local', {
            successRedirect: '/login_success',
            failureRedirect: '/login',
            failureFlash: true
        }))

        app.post('/register',checkNotAuthenticated ,  (req,res) => {
            const { username, email, password } = req.body; //Variables for request body 
                                                            //fields from the form
            let errors = [] ;
            try {
                User.findOne({ email: email})
                    .then(user => {
                        if(user){
                            errors.push({ msg: 'User already exists'});
                            console.log('user already exists')
                            
                        }
                        
                            if(errors.length!=0){
                                console.log(username + '' + email)
                                //If there are erros render them back to register page
                                res.render('register', { 
                                    errors,
                                    username,
                                    email,
                                    password    
                                });
                            }else {
                                const newUser = new User({
                                    username,
                                    email,
                                    password 
                                });
                                bcrypt.hash(password, 10, (err, hash) => {
                                    if(err) throw err;
                                    
                                    newUser.password = hash;
                                    newUser.save()
                                    .then( user => {
                                        req.flash('success_msg', 'Your are registered and ready to login')
                                        res.redirect('/login');
                                    })
                                    .catch(err => console.log(err));
                                });
                            
                                
                            }
                        
    
                            
                
                        });
            
                
            } catch(e) {
                console.log(e)
                res.render('/register')
            }
        })

        app.delete('/logout', (req, res) => {
            req.logout()
            res.redirect('/login')
        })

      

        function checkNotAuthenticated( req, res, next ) {
            if ( req.isAuthenticated()) {
            return  res.redirect('/login_success')
                
            }
            return next()
            
            
        }

};

