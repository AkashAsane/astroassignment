const User=require("../models/usermodel")
const passport = require("passport");
const localStatergy=require('passport-local')


passport.use(
    new localStatergy(async (username,password,done)=>{
        try {
            const user=await User.findOne({username:username})
            if(!user) return done(null,false,{message:"incorrect username"})

            const isPassWordMatch=await user.comaprePassword(password)
            if(!isPassWordMatch)
            {
                return done(null,user)
            }else {
                return done(null, false, { message: "incorrect password" });
             }
        } catch (error) {
            return done(error)
        }
    })
)

module.exports=passport