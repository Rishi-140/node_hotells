const express = require('express')
const router = express.Router()
const Person = require('./../models/Person');
const {jwtAuthMiddleware,generateToken} = require('./../jwt')
require('dotenv').config()
router.post('/signup', async (req, res) => {
    try {

        const data = req.body
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('Data Saved');
        const token = generateToken(response.username)
        console.log("Token is :", token)
        res.status(200).json({ response: response , token :token });
    }
    catch(err){

        console.log(err);
        res.status(500).json({ error: 'Internal Server Issue' })

    }

});


router.get('/', async (req, res) => {

    try {
        const data = await Person.find()
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
