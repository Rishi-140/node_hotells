const passport = require('passport')
const localstrategy= require('passport-local').Strategy
const Person = require('./models/Person')
passport.use(new localstrategy(async(USERNAME,PASSWORD,done)=>{
try{
   // console.log("Recevied Credential",USERNAME,PASSWORD)
    const user= await Person.findOne({username:USERNAME})
    if(!user){
        return done(null, false,{message:'Incorrect username'})
    }
    const ispasswordmatch=await user.comparePassword(PASSWORD)
    if(ispasswordmatch){
        return done(null,user)
    }
    else{
         return done(null, false,{message:'Incorrect password'})
    }}
    catch(err){
         return done(err)
    }
}))

module.exports=passport