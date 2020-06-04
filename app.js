if (process.env.NODE_ENV = 'production')    {
    require('dotenv').config()
}



const express = require('express')
const app = express()
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const loginRegistration = require('./routes/login_registration');  //Login And registration routes
const requests = require('./routes/requests');
const index = require('./routes/index')
const initializePassport = require('./config/passport_config')//Initialize passport config
const dbConnect = require('./config/connect_db')

initializePassport(passport)

db = dbConnect();


app.set('view engine', 'ejs')
app.use(express.static('./assets'))
app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

//Global variables for error messages
app.use( (req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();

});
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

requests(app, db);

loginRegistration(app, passport);

index(app);


app.listen(3000)
