const express = require('express');
const session = require('express-session');
const router = express.Router();
const Jobs = require ('../models/job');
const fungsi=require('../models/fungsi_text')
const asle=new fungsi();

router.get('/add', (req, res) => {
    res.render('pages/addjobs')
    console.log(asle.name);
})

router.get('/home', (req, res) => {
    res.render('pages/Company')
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

const data = await User.find({_id:document.cookie});
     data.forEach((account)=>{
    name = account.name
    });

console.log(name);
const job = new Jobs({
    divisi:divisi,
    id_com:document.cookie,
    name_com:name,
    salary:gaji,
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
          
        }
})


})



module.exports = router;