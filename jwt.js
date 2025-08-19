const jwt=require('jsonwebtoken')

require('dotenv').config()

const jwtAuthMiddleware=(req,res,next)=>{

    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error:'Unarthorized'})

        try{
            const i=process.env.JWT_SECRET
            const decoded= jwt.verify(token,i)
            req.user=decoded
            next();


        }catch(err){
            console.log(err)
            res.status(401).json({error:"Invalid Token"})
        }


}

const generateToken=(userdata)=>{

    return jwt.sign(userdata,i)
}

module.exports={jwtAuthMiddleware,generateToken}