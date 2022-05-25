const express = require('express')
const router = express.Router()
const Jobs = require ('../models/job');
const User = require('../models/user');
const addid=require('../models/save_id')


router.get('/', async(req, res) => {
var location;
    const dataUser = await User.find({_id:addid.id});
    await dataUser.forEach((account)=>{
    location = account.provinsi;
    });

    const dataJobs = await Jobs.find({city:location});
    console.log(dataUser)
    console.log(dataJobs)
    res.render('pages/joblist',{jobs:dataJobs, user:dataUser});
})


router.get('/Myapplication', (req, res) => {
    res.render('pages/my_application')
})



module.exports = router;