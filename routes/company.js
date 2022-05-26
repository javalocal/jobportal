const express = require('express');
const session = require('express-session');
const router = express.Router();
const Jobs = require ('../models/job');
const fungsi=require('../models/fungsi_text')
const addid=require('../models/save_id')
const func=new fungsi();
const User = require('../models/user');
const Apply = require('../models/application');
const req = require('express/lib/request');
const { render } = require('express/lib/response');

function datestring(today){
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    return today = dd + '-' + mm + '-' + yyyy;
}

router.get('/add', (req, res) => {
    res.render('pages/addjobs')
    console.log(addid.id);
})

router.get('/home', async(req, res)=>{
const data = await Jobs.find({id_com:addid.id})
var adaapaga=false;
if (data!=null){
    adaapaga=true;
}
res.render('pages/Company', {job:data, cek:adaapaga})
})

router.get('/info/:id', async(req,res)=>{
    const id=req.params.id;
    const cek= await Apply.find({idjob:id})
res.render('pages/listjobsvan',{data:cek,id:id, number:1})
})

router.post('/addjobs', async(req, res) => {
const divisi = req.body.divisi;
const minusia= req.body.minusia;
const maxusia=req.body.maxusia;
const last_edu =req.body.last_edu;
const edu_text=func.endu(last_edu);
const pengalaman=req.body.pengalaman;
const peng_text=func.peng(pengalaman);
const gaji=req.body.gaji;
const keriteria =req.body.keriteria;
const fasilitas =req.body.fasilitas;
const location =req.body.lokasi;
const city = req.body.city;
var name

const date = datestring(new Date())
const data = await User.find({_id:addid.id});
    await data.forEach((account)=>{
    name = account.name
    });

console.log(name);
const job = new Jobs({
    divisi:divisi,
    id_com:addid.id,
    name_com:name,
    salary:gaji,
    date:date,
    location:location,
    city:city,
    last_edu:edu_text,
    edu:last_edu,
    pengalaman:pengalaman,
    pengalaman_text:peng_text,
    kriteria:keriteria,
    fasilitas:fasilitas,
    min_umur:minusia,
    max_umur:maxusia


})
await job.save((err, res) => {
    if (err) console.error(err);
        else {
            console.log('add job ok');
            res.redirect('/company/home')
          
        }
})


})



module.exports = router;