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



const generateToken = (userinfo) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is missing");
    }
    return jwt.sign(userinfo, process.env.JWT_SECRET);
};

module.exports={jwtAuthMiddleware,generateToken}