var mongoose = require("mongoose")
var bcrypt = require("bcrypt")
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

module.exports = User