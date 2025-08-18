const express = require('express')
const route = express.Router()
const Menuitems = require('./../Menuitems')


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
route.delete('/', async (req, res) => {
    try {
        const deleteid = req.body.name;
        const response = await Menuitems.findOneAndDelete(deleteid)
        if (!response) {
            return res.status(404).json({ error: "person not found" })
        }
        console.log("person deleted")
        res.status(200).json({succesfully: 'deleted successfully' })

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal server issue' })
        

    }

})


module.exports = route;