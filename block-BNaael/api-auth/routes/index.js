var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//protected route
router.get("/protected" , auth.verifyToken , (req,res)=> {
  console.log(req.user) //It will provide us user information present in token
  res.json({access: "protected resource "})
})

module.exports = router;
