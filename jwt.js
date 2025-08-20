require('dotenv').config()
const jwt=require('jsonwebtoken')



const jwtAuthMiddleware=(req, res, next)=>{

    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error:'Unarthorized'})

        try{
            const decoded= jwt.verify(token,process.env.JWT_SECRET)
            req.user=decoded
            next();


        }catch(err){
            console.error(err)
            res.status(401).json({error:"Invalid Token"})
        }


}
const JWT_SECRET='MySuperSecretKey1230'
const generateToken=(userinfo)=>{

    return jwt.sign(userinfo,JWT_SECRET);

}



module.exports={jwtAuthMiddleware,generateToken}