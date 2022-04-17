var express = require('express');
const { route } = require('../app');
var router = express.Router();
var userController = require("../controllers/userController");
var authController = require("../controllers/authController");
var messageController = require("../controllers/messageController");


/* GET home page. */
router.get('/', messageController.index);

//authentication routes
router.get('/log-in', authController.auth_get);
router.post('/log-in', authController.auth_post);

//log-out
router.get('/log-out', (req, res)=>{
  req.logout();
  res.redirect('/');

});

//messages routes
router.get('/create-message', messageController.createMessageGet);
router.post('/create-message', messageController.createMessagePost);

//main route
router.get('/', function(req, res, next){
  res.render('signUp' , { title: "Sign Up"});
});

// get the Sign Up form
router.get("/sign-up", userController.user_create_get);
router.post("/sign-up", userController.user_create_post);

module.exports = router;