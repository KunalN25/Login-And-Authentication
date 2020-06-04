//MAIN APP ROUTES AFTER LOGIN AND REGISTRATION

module.exports = (app) => {
    app.get('/login_success', checkAuthenticated , (req,res) => {
        res.render('login_success', {data: req.user})
    })
    
    function checkAuthenticated( req, res, next ) {
        if ( req.isAuthenticated()) {
            return next()
        }
        
        res.redirect('/login')
    }
}

