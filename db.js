var mongoose=require('mongoose')

const mongoURL= 'mongodb://127.0.0.1:27017/hotel'

mongoose.connect(mongoURL,{
    useNewUrlParser :true,
    useUnifiedTopology :true
})

const db=mongoose.connection;

// define event listner for database connection
db.on('connected',()=>{

    console.log('Connected to MongoDB')
})

db.on('disconnected',()=>{

    console.log('disconneted to MongoDB')
})

db.on('error',(err)=>{

    console.log('Error ',err)
})  

module.exports=db;