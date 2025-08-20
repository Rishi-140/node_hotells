const express = require('express')
const router = express.Router()
const Person = require('./../models/Person');
require('dotenv').config()
const {jwtAuthMiddleware,generateToken} = require('./../jwt');
const { json } = require('body-parser');

router.post('/signup', async (req, res) => {
    try {

        const data = req.body
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('Data Saved');
        const payload={id : response.id,username :response.username}
        console.log(JSON.stringify(payload))
        const token = generateToken(payload)
        console.log("Token is :", token)
        res.status(200).json({ response: response , token :token });
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Issue' })

    }

});

router.post('/login', async(req,res)=>{
    try{

        const {username,password}=req.body;
        const user = await Person.findOne({username:username})
        if(!user||!(await user.comparePassword(password))){

            return res.status(401).json({error:'Invalid username or password'})
        }
        const payload={id : user.id,username :user.username}
        const token= generateToken(payload)
        res.json({token})


    }catch(err){

        console.log(err)
        res.status(500).json({error:'Internal Server error'})
    }

})

router.get('/profile',jwtAuthMiddleware, async (req, res) => {

    try {
        const dataid=req.user
        const datar=dataid.id
        const data = await Person.findOne(datar)
        console.log("fetched Succesfully");
        res.status(200).json(data)

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Issue' })

    }
})


router.get('/:worktype', async (req, res) => {

    try {
        const workType = req.params.worktype;
        if (workType == 'chef' || workType == 'waiter' || workType == 'manager') {
            const response = await Person.find({ work: workType })

            console.log("fetched succesfully")
            res.status(200).json(response)
        } else {
            res.status(404).json({ error: 'Invalid worktype' })
        }


    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal server issue' })

    }
})

// router.put('/:id' ,async(req,res)=>{
//     try{
//         const personid= req.params.id;
//         const updatepersondata=req.body;
//         const response= await Person.findByIdAndUpdate(personid,updatepersondata,{
//             new:true,//return the update document
//             runValidators:true,//run the mongoose validation 
//         })

//         if(!response){
//             return res.status(404).json({error: "person not found"})
//         }
//         console.log("data upadate")
//        // res.status(200).json(response)
//        res.status(200).json({sucess:"data "})


//     }catch(err){
//         console.log(err)
//          res.status(500).json({error:'Internal server issue'})  

//     }

// })

router.put('/', async (req, res) => {
    try {
        //const personid = req.params.id;
        const updatepersondata = req.body;
        const nameToFind = req.body.age;
        console.log("value", nameToFind);
        console.log("updatepersondata",updatepersondata)
        // const vldid = req.body._id;  
        // console.log("id", vldid);
        const response = await Person.findOneAndUpdate(
            { age: nameToFind },    // Filter by name
            updatepersondata, {
            new: true,//return the update document
            runValidators: true,//run the mongoose validation 
        })
        if (!response) {
            return res.status(404).json({ error: "person not found" })
        }
        console.log("data upadate")
        // res.status(200).json(response)
        res.status(200).json({ sucess: "data updated" })


    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal server issue' })

    }

})

router.delete('/', async (req, res) => {
    try {
        const deleteid = req.body.id;
        const response = await Person.findByIdAndDelete(deleteid)
        if (!response) {
            return res.status(404).json({ error: "person not found" })
        }
        console.log("person deleted")
        res.status(200).json({ error: 'deleted successfully' })

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal server issue' })

    }

}) 

module.exports = router;
