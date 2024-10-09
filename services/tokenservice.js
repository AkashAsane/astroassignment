const jwt=require('jsonwebtoken')

const generateToken=(userdata)=>{
    console.log('User Data:', userdata); 
    return jwt.sign({ id: userdata.id }, process.env.JWT_SECRETKEY);
}

module.exports=generateToken