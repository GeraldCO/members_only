const User = require('../models/User');
const {body, validationResult} = require('express-validator');
var bcrypt = require('bcryptjs');

exports.user_create_get = function( req, res ){
    res.render('signUp', { title: "Sign Up"});
}

exports.user_create_post =[
    //name and lastname must be at text at least 3 chars long 
    body("name").trim().isLength({ min: 3 }).escape().withMessage("Name must be at least 3 chars long"),
    body("lastname").trim().isLength({ min: 3 }).escape().withMessage("Lastname must be at least 3 chars long"),
    //username must be an email
    body("username").trim().isEmail().isLength({ min: 3 }).escape().withMessage("Username must be an email"),
    //password must be at least 6 chars long
    body("password").trim().isLength({ min: 6 }).escape().withMessage("Password must be at least 6 characters long"),
    body("confirmPassword").trim().isLength({ min: 6 }).escape().withMessage("Confirm Password must be at least 6 characters long")
    .custom(async (value, { req }) => {
        // Use the custom method w/ a CB func to ensure that both passwords match, return an error if so
        if (value !== req.body.password) throw new Error('Passwords must be the same');
        return true;
      }),
    async (req , res, next) => {

        //extract the validation errors from a request.
        const errors = validationResult(req);

        //create a user object with escaped and trimmed data.

        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(req.body.password, 10, function(err, hash) {
                if (err) reject(err);
                resolve(hash);
            });
        });
    
        var user = new User({
            name: req.body.name,
            lastname: req.body.lastname,
            username: req.body.username,
            password: hashedPassword
        });
    
        if(!errors.isEmpty()){
            //there are arrors. Render the form again with sanitized values/ errors messages
            res.render('signUp', { 
                title: 'Sign up',
                user: user,
                errors: errors.array()
            });
        } else{
            //Data from form is valid
            //check if User with same username already exists.
            User.findOne({ 'username': req.body.username })
                .exec( function(err, found_user){
                    if(err) { return next(err); }

                    if(found_user){
                        //User exists, send error message
                        res.render('signUp', {
                            title: 'Sign up',
                            message: 'User already exists'
                        })
                    }else{
                        user.save(function(err){
                            if(err) return next(err);
                        })
                        res.redirect("/");
                    }
                });
        }    
  }
];