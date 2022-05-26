const express = require('express')
const router = express.Router()
const Jobs = require ('../models/job');
const User = require('../models/user');
const Apply = require('../models/application');
const addid=require('../models/save_id');
const res = require('express/lib/response');
const { add } = require('nodemon/lib/rules');
const { redirect } = require('express/lib/response');

function datestring(today){
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    return today = dd + '-' + mm + '-' + yyyy;
}

router.get('/', async(req, res) => {
var edu;
var peng
    const dataUser = await User.find({_id:addid.id});
    await dataUser.forEach((account)=>{
    peng=account.pengalaman;
    edu=account.pendidikan_terakhir;
    });

    const dataJobs = await Jobs.find({edu:{$lte:edu}, pengalaman:{$gte:peng}});
    // console.log(dataUser)
    // console.log(dataJobs)
    res.render('pages/joblist',{job:dataJobs, val:null});
})

router.post('/search', async(req,res)=>{
    const search =req.body.search;
    console.log(search)
    var edu;
var peng
    const dataUser = await User.find({_id:addid.id});
    await dataUser.forEach((account)=>{
    peng=account.pengalaman;
    edu=account.pendidikan_terakhir;
    });

    const dataJobs = await Jobs.find({$or:[{divisi:search}, {name_com:search},{city:search}]});
    console.log(dataJobs)
    res.render('pages/joblist',{job:dataJobs, val:search});
})

router.get('/apply/:id', async(req,res)=>{
    const idjob= req.params.id;
    var edu,peng,name, idcek, divisi,company;
    const dataUser= await User.find({_id:addid.id});
    await dataUser.forEach((account)=>{
        peng=account.pengalaman_text;
        edu=account.pendidikan_text;
        name = account.first_name + ' ' + account.last_name;
        });
    const datacompany= await Jobs.find({_id:idjob});
        await datacompany.forEach((job)=>{
            company=job.name_com;
            divisi=job.divisi;
            });
        console.log(datacompany)
        const apply = new Apply({
            company:company,
            divisi:divisi,
            idjob:idjob,
            date:datestring(new Date),
            iduser:addid.id,
            name: name,
            last_edu: edu,
            pengalaman:peng,
            status: "Waiting List",
            deskripsi: "A waiting confirmation by company"
        })
        await apply.save((err, res) => {
            if (err) {   
            }
                else {
                    console.log('ok');
                }
        })
        const cek= await Apply.find({idjob:idjob})
        await cek.forEach((apply)=>{
           idcek=apply.idjob
            });
        if(idjob==idcek){
        res.redirect('/jobvacancy/')   
        }else{
            res.redirect('/jobvacancy/Myapplication')
        }
        
})




router.get('/Myapplication', async(req, res) => {
    var job;
    const dataapply= await Apply.find({iduser:addid.id});    
    res.render('pages/my_application', {data:dataapply, number:1});
})



module.exports = router;