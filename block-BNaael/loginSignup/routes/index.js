var express = require('express');
var router = express.Router();
var auth = require("../middleware/auth")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//protected route
router.get("/dashboard" , auth.verifyToken , (req,res)=> {
  console.log(req.user) //It will provide us user information present in token
  res.json({access: "protected dashboard "})
})

module.exports = router;
