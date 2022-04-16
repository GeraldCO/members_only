const passport = require("passport");


exports.auth_get = function (req, res, next){
    res.render('logIn', {
        title: "Log In",
        user: req.user,
        message : 'getting the message'
    })
}

exports.auth_post = passport.authenticate("local", {
    successRedirect: '/',
    failureRedirect: '/logIn'
});