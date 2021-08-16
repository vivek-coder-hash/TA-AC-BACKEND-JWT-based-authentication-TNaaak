var jwt = require("jsonwebtoken")

module.exports = {
    verifyToken: async (req,res,next)=> {
       console.log(req.headers) // check header of token
       //capture token
       var token = req.headers.authorization

       try {
        if(token) {
            var payload =  await jwt.verify(token , "thisissecret" )
            req.user = payload  // information inside payload will be added to req object ,where we added user key with value of payload
            next()
         }

        else {
            //if there is no token or client has not passed token
         res.status(400).json({error:"Token/Authentication required"})
        }
           
       } catch (error) {
          next(error) // pass error to errorHandler middleware 
       }
       

    }    //In this middleware , our job is to check whether token is created or not.
         //Every time user logged in ,we create token and pass it to client and client should put token in localStorage .
         // when request come for protected routes , we look for header of token . 
         //when we request /api/protected , we have to pass token also .
}