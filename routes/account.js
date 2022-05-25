const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const User = require('../models/user');
const router = express.Router();
const fungsi=require('../models/fungsi_text')
const func=new fungsi();
var iddata;



router.get('/login_home', (req, res) => {
    res.render('pages/login')
    console.log(func.name);
})

router.get('/register', (req, res) => {
    res.render('pages/register')
})

router.post('/login', async (req,res) => {
    const email_ = req.body.email;
    const password_ = req.body.password;
    var emailok;
    var passwordok;
    var role;
    var name;
    var id;
    const data = await User.find({email:email_});
    await data.forEach((account)=>{
        emailok=account.email;
        passwordok=account.password;
        role=account.role;
        id=account._id;
        name=account.name
    });
    console.log(role);
    console.log(emailok); 
    if(email_==emailok){
        if(password_==passwordok){
            req.session.isLoggedIn = true;
            
            if(role=="co"){
                res.redirect('/company/home')
            func.savedata(name,id);
            console.log(func.name);
            }else{
                res.redirect('/lowongan') 
            }
            
        }else{
            res.render('pages/signin', {jenis:"login",error: 'Wrong Password'});
        }
    }else{
        res.render('pages/signin', {jenis:"login",error: 'Wrong Password or Email'});
    }
})


router.post('/regisCompany',async (req, res) => {
const role = "co";
const name = req.body.name;
const alamat = req.body.alamat_;
const prov = req.body.prov_;
const email1 = req.body.email_;
var email2;
const password = req.body.password_;
const conpassword = req.body.passwordcon_;

const data = await User.find({email:email1});
await data.forEach((account)=>{
    email2=account.email;
})
if(email1==email2){
    res.render('pages/register', {jenis:"register",error: 'Email sudah terdaftar'});
}else{
    if (password != conpassword) {
        res.render('pages/register', {jenis:"register", error: 'Password tidak sama!'})
    } else{
        const user = new User({
            role: role,
            name: name,
            email: email1,
            address: alamat,
            provinsi: prov,
            password: password

        })
        await user.save((err, res) => {
            if (err) console.error(err);
                else {
                    console.log('Sign up berhasil!');
                  
                }
        })
        res.redirect('/account/login_home')
    }
}


})

function diff_years(dt2, dt1) 
 {

  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
   diff /= (60 * 60 * 24);
  return Math.abs(Math.round(diff/365.25));
   
 }

router.post('/regisjob',async (req, res) => {
    const role = "job";
    const fname = req.body.fname;
    const lname = req.body.lname;
    const tmp_lahir_= req.body.tlahir;
    const tgl_lahir_ = req.body.tgllahir;
    const alamat = req.body.alamat;
    const prov=req.body.prov;
    const pndk_terakhir = req.body.pendidikan_akhir;
    const lmpndk = req.body.pendidikan;
    const jurusan = req.body.jurusan;
    const pengalaman = req.body.pengalaman;
    const skill = req.body.skill;
    const email1 = req.body.email;
    const password = req.body.password;
    const conpassword = req.body.passwordcon;
    const edu_text=func.endu(pndk_terakhir);
    const peng_text = func.peng(pengalaman);
    var email2;

    
    const umur = diff_years((new Date(tgl_lahir_)),(new Date()));
    console.log(umur);
    const data = await User.find({email:email1});
    await data.forEach((account)=>{
        email2=account.email;
    })
    if(email1==email2){
        res.render('pages/register', {jenis:"register",error: 'Email sudah terdaftar'});
    }else{
        if (password != conpassword) {
            res.render('pages/register', {jenis:"register", error: 'Password tidak sama!'})
        } else{
            const user = new User({
                role: role,
                first_name:fname,
                last_name:lname,
                tmp_lahir:tmp_lahir_,
                tgl_lahir:tgl_lahir_,
                pendidikan_akhir:pndk_terakhir,
                pendidikan:lmpndk,
                jurusan:jurusan,
                pengalaman: pengalaman,
                skill:skill,
                email: email1,
                address: alamat,
                provinsi: prov,
                password: password,
                umur : umur,
                pendidikan_text: edu_text,
                pengalaman_text: peng_text

    
            })
            await user.save((err, res) => {
                if (err) console.error(err);
                    else {
                        console.log('Sign up berhasil!');
                      
                    }
            })
            res.redirect('/account/login_home')
        }
    }
    
    
    })

module.exports = router;