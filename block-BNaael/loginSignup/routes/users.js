var express = require('express');
var router = express.Router();

var User = require("../models/User")

/* GET users listing. */
//request on /api/users will come here
router.get('/', function(req, res, next) {
  res.json({message:"User Information"});
});

router.get("/register" , (req,res,next)=> {
 // console.log(req.flash("error")) // whether we are able to capture error or not
  res.render("register.ejs" , {error : req.flash("error")[0]})
})

router.post("/register" , async (req ,res,next)=> {
  // Earlier in callBack patter either we get result or error . But in async ,await method we get result immediately but we have to wait for it.
  try {
    var user = await User.create(req.body)
  console.log(user)
  //create token during registration
  var token = await user.signToken() 
  res.status(201).json({user: user.userJson(token)}) //send user with code 201 to client as response
  } catch (error) {
    next(error)
  }
})


// login handler
router.post("/login" , async (req,res,next)=> {
   var {email, password} = req.body
   if(!email || !password) {
     return res.status(400).json({error:"Email/Password required"})
   }

   
   try {
    var user =await User.findOne({email})
    if(!user) {
      return res.status(400).json({error: "Email not registered"})
    }

   var result = await user.verifyPassword(password)  //result will be either true or false . In case of error , in case of error it will be handled by catch block. 
   console.log(user,result) // result true mean saved password is same as entered password of user.

   if(!result) {
     return res.status(400).json({error:"password incorrect"})
   }
   //create token for logged in user . we will generate token everytime when user logged in
    var token = await user.signToken() //user is instance of UserSchema , everytime when we call singnToken() , it go to User.js and call singToken method 
     console.log(token) //whether token is generated or not
     res.json({user:user.userJson(token)}) //send user method userJson as response
     
   } catch (error) {
     next(error) //if error occurs , pass it to error handler middleware
   }

})

module.exports = router;
