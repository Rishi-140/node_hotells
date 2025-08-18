/*var os=require('os');
var fs = require('fs')
var  notes=require('./notes')
var y =require('lodash');
const { stringify } = require('querystring');
const { xml } = require('jade/lib/doctypes');
 function subb(add){
        add();
 }

 console.log(subb(()=>{console.log('hi')}));

 var user=os.userInfo()
 console.log(user.username)

//fs.appendFile('Shub.txt','Hello'+ user.username +'!', ()=>{console.log('File is Created')});

var user=notes.age
var us=notes.gg(user+1,4)
console.log(us)
console.log(user)

var myarr=['person',1,2,32,32];
var sttri="Hello is very good " 
var fil=y.uniq(myarr);
console.log(sttri.split('').reverse('').join(''))
console.log(y.isNumber(sttri))
console.log(fil)

const jsontoS='{"name":"Rishikesh"}'; //Json string to object
const jsontoOb=JSON.parse(jsontoS)
console.log(jsontoOb.name)

const Stojson ={name:"ramesh" ,age:'25'} //object  to jsonstring
const SStojson= JSON.stringify(Stojson)
console.log(SStojson)*/

const Express = require('express')
const db = require('./db')
const app = Express()
const passport=require('./Auth')


const bodyparser = require('body-parser')
app.use(bodyparser.json());


require('dotenv').config()



const logRequest= (req ,res , next)=>{
    console.log(`[${new Date().toLocaleString()}] Request made to :${req.originalUrl}`);
    next();
}

app.use(logRequest);




app.get('/',(req,res)=>{
    res.send('welcome');
})



app.use(passport.initialize())

const menuroutes=require('./Routes/MenuRoutes')
app.use('/items',menuroutes)
 
const personroutes=require('./Routes/PersonRoutes');
app.use('/person',personroutes)


// const personroutes=require('./Routes/PersonRoutes');
// app.use('/updatevalue',personroutes)



const Port = process.env.PORT||4000





app.listen(Port, () => { console.log("server is on 4000 again") })











