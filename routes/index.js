var express = require('express');
const { route } = require('../app');
var router = express.Router();
var userController = require("../controllers/userController");
var authController = require("../controllers/authController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Express',
    user: req.user
   });
});


router.get('/success', (req, res)=>{
  console.log(req.user);
})
//authentication routes
router.get('/log-in', authController.auth_get);
router.post('/log-in', authController.auth_post);

router.get('/', function(req, res, next){
  res.render('signUp' , { title: "Sign Up"});
});

// get the Sign Up form
router.get("/sign-up", userController.user_create_get);
router.post("/sign-up", userController.user_create_post);

module.exports = router;