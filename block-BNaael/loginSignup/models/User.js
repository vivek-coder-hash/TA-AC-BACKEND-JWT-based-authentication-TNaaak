var mongoose = require("mongoose")
var bcrypt = require("bcrypt")
var jwt  = require("jsonwebtoken")
var Schema = mongoose.Schema

var userSchema = new Schema({
    name:{type:String , required:true} , 
    email: {type:String , required:true , unique:true} ,
    password:{type:String , minlength:5}
}, {timestamps:true})


//Custom pre saved hook defined before creating model
userSchema.pre("save" , async function(next) {
    console.log(this , "inside pre saved hook before hashed") // this reffer to document to be saved in database
   if(this.password && this.isModified("password")) {
      this.password = await bcrypt.hash(this.password , 10)
   }


    else{next()} // calling next will make document to saved in database

})  //saltround is integer from 8 to 32

userSchema.methods.verifyPassword = async function(password)  {
    //to handle error with async , await . we use try catch method .
    try {
        var result = await bcrypt.compare(password , this.password) 
    return result
        
    } catch (error) {
       return error  
    }
    
}

// All mongoose CRUD operation like User.create , it return us PROMISE . To handle this PROMISE earlier we were using callBack pattern .Now we will switch to async and await methods to handle bcrypt or mongoose CRUD

var User = mongoose.model("User" , userSchema)

//define method to generate token or where user going verify his/her identity
userSchema.methods.signToken = async function() {
    console.log(this) //this is ref. of user in users.js in routes line 50
    var payload = {userId : this.id  ,  email:this.email} //generate payload
      
    try {
        var token = await jwt.sign(payload , "thisissecret") //generate token , any client who signIn will never have access to secret
        return token

    } catch (error) {
        return error
        
    }
}


userSchema.methods.userJson = function(token) {
    return {
        name :this.name ,
        email:this.email,  // this ref. to actual user document
        token:token
    }
}

module.exports = User