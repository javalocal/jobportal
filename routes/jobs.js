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
    var edu,peng,name, idcek, divisi,company,gender,cekid_user;
    const dataUser= await User.find({_id:addid.id});
    await dataUser.forEach((account)=>{
        peng=account.pengalaman_text;
        edu=account.pendidikan_text;
        name = account.first_name + ' ' + account.last_name;
        gender =account.gender;
        });
    const datacompany= await Jobs.find({_id:idjob});
        await datacompany.forEach((job)=>{
            company=job.name_com;
            divisi=job.divisi;
            });
        console.log(datacompany)
        const cek= await Apply.find({idjob:idjob})
        await cek.forEach((apply)=>{
           cekid_user = apply.iduser
            });
        if(addid.id==cekid_user){
            res.redirect('/jobvacancy/')     
        }else{
            const apply = new Apply({
                company:company,
                divisi:divisi,
                idjob:idjob,
                date:datestring(new Date),
                iduser:addid.id,
                gender:gender,
                name: name,
                last_edu: edu,
                pengalaman:peng,
                status: "Waiting List",
                deskripsi: "A waiting confirmation by company"
            })
            await apply.save((err, res) => {
                if (err) console.log(err);
                    else {
                        console.log('ok');
                    }
            })
    
                res.redirect('/jobvacancy/Myapplication')
        }
        
})




router.get('/Myapplication', async(req, res) => {
    var job;
    const dataapply= await Apply.find({iduser:addid.id});    
    res.render('pages/my_application', {data:dataapply, number:1});
})



module.exports = router;