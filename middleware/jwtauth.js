const jwt=require('jsonwebtoken')

const jwtAuth=async(req,res,next)=>{
    try {
        const token =req.headers.authorization.split(' ')[1]
        if(!token)
        {
            return res.status(401).json({error:'unauthorized'})
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRETKEY)

        req.user = { id: decoded.id };
        console.log('Decoded Token:', decoded); // See what is actually in the decoded token

        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({err:'invalid token '})
    }
}

module.exports=jwtAuth