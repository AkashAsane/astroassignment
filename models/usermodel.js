const mongoose=require('mongoose')
const bcrypt = require("bcrypt");


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true,
    },
    email:{
        type:String,
        require:true,
        unique:true, 
    },
    password: {
        required: true,
        type: String,
    },
})


userSchema.pre("save",async function (next) {
    const user=this

    if(!user.isModified('password')) return next()

    try {
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(user.password,salt)
        user.password=hashedPassword;
        next();
    } catch (error) {
        next(error)
    }
})


userSchema.methods.comparePassword = async function (userpassword) {
    try {
      const isMatch = await bcrypt.compare(userpassword, this.password);
      return isMatch;
    } catch (error) {
      throw error;
    }
  };


const User=mongoose.model("User",userSchema)

module.exports=User