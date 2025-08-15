const express=require('express')
const route=express.Router()
const Menuitems=require('./../Menuitems')


route.post('/', async (req, res) => {
    try {

        const data = req.body
        const newitems = new Menuitems(data);


        const response = await newitems.save();
        console.log('Data Saved');
        // res.status(200).json(response);
        res.status(200).json({ message: "Person Data saved successfully" });


    }
    catch (err) {

        console.log(err);
        res.status(500).json({ error: 'Internal Server Issue' })

    }

});
//router js 

route.get('/', async (req, res) => {

    try {
        const data = await Menuitems.find()
        console.log("fetched Succesfully");
        res.status(200).json(data)

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Issue' })

    }
})
route.delete('/:id',async(req,res)=>{
    try{
        const deleteid= req.params.id;
        const response= await Menuitems.findByIdAndDelete(deleteid)
        if(!response){
            return res.status(404).json({error: "person not found"})
        }
        console.log("person deleted")
         res.status(200).json({error:'deleted successfully'})

    }catch(err){
        console.log(err)
         res.status(500).json({error:'Internal server issue'}) 
         console.log("Commited by shubham on 15 august 2025")


    }
    
})


module.exports=route;