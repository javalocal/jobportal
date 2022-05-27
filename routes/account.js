const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const User = require('../models/user');
const router = express.Router();
const fungsi=require('../models/fungsi_text')
const addid=require('../models/save_id');
// const { add } = require('nodemon/lib/rules');
// const addid=data();
const func=new fungsi();



router.get('/logout', (req, res) => {
    req.session.isLoggedIn = false;
    addid.id=null;
    res.redirect('/');
    console.log(func.name);
})

router.get('/login_home', (req, res) => {
    res.render('pages/login')
    console.log(func.name);
})

router.get('/register', (req, res) => {
    res.render('pages/register', {jenis:"ok"})
})

router.post('/login', async (req,res) => {
    const email_ = req.body.email;
    const password_ = req.body.password;
    var emailok;
    var passwordok;
    var role;
    var name;
    var id;
    var edu;
    var peng;
    const data = await User.find({email:email_});
    await data.forEach((account)=>{
        emailok=account.email;
        passwordok=account.password;
        role=account.role;
        id=account._id;
        name=account.name
    });
    if(email_==emailok){
        if(password_==passwordok){
            req.session.isLoggedIn = true;
            addid.id=id;
            if(role=="co"){
                res.redirect('/company/home')
            console.log(addid.id);
            }else{
                res.redirect('/jobvacancy') 
                console.log(addid.id);
            }
            
        }else{
            res.render('pages/login', {jenis:"login",error: 'Wrong Password'});
        }
    }else{
        res.render('pages/login', {jenis:"login",error: 'Wrong Password or Email'});
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
if(name== null || name=='' ||alamat=="" || alamat==null || prov =="" || prov == null){
    res.render('pages/register', {error: 'error form ada yang kosong!'});
}else if(email1==email2){
    res.render('pages/register', {error: 'Email sudah terdaftar'});
}else{
    if (password != conpassword) {
        res.render('pages/register', {error: 'Password tidak sama!'})
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



router.get('/profile', async (req,res)=>{
    const data = await User.find({_id:addid.id});
    res.render('pages/profile', {data:data, type:"profile"})
})

router.get('/cv', async (req,res)=>{
    const data = await User.find({_id:addid.id});
    res.render('pages/profile', {data:data, type:"cv"})
})

router.get('/email', async (req,res)=>{
    const data = await User.find({_id:addid.id});
    res.render('pages/profile', {data:data, type:"email"})
})


router.get('/upass', async (req,res)=>{
    const data = await User.find({_id:addid.id});
    res.render('pages/profile', {data:data, type:"pass"})
})

router.post('/upasss', async (req,res)=>{
    const data = await User.find({_id:addid.id});
    var password
    await data.forEach((account)=>{
        password = account.password;
    })
    const newpass = req.body.npass;
    const newpass_ =req.body.npass_;
    const oldpass =req.body.pass;

    if(newpass == newpass_){
        if (oldpass == password){
            await User.updateOne({_id:addid.id},{$set:{password:newpass}})
            
            
            res.redirect('/account/profile')

        }else{
            res.render('pages/profile', {error: 'Password tidak sama!',type :"pass",  data:data})
        }
    }else{
        res.render('pages/profile', {error: 'Password baru tidak sama!', type:"pass", data:data})
    }

})

router.post('/uemail', async (req,res)=>{
    const data = await User.find({_id:addid.id});
    const email = req.body.email;
    const oldpass =req.body.pass;
    var password,email_;
    await data.forEach((account)=>{
        password = account.password;
    })

    const datacek = await User.find({email:email});
    await datacek.forEach((account)=>{
        email_ =account.email;
    })

    if(email != email_){
        if (oldpass == password){
            await User.updateOne({_id:addid.id},{$set:{email:email}});
            

            res.redirect('/account/profile')
        }else{
            res.render('pages/profile', {error: 'Password tidak sama!',type :"email",  data:data})
        }
    }else{
        res.render('pages/profile', {error: 'email sudah terdaftar', type:"email", data:data})
    }
})



router.post('/regisjob',async (req, res) => {
    const role = "job";
    const fname = req.body.fname;
    const lname = req.body.lname;
    const gender= req.body.gender;
    const tgl_lahir_ = req.body.tgllahir;
    const alamat = req.body.alamat;
    const prov=req.body.provinsi;
    const pndk_terakhir = req.body.pendidikan_akhir;
    const lmpndk = req.body.pendidikan;
    const jurusan = req.body.jurusan;
    const pengalaman = req.body.pengalaman;
    const skill = req.body.skill;
    const email1 = req.body.email;
    const password = req.body.password;
    const conpassword = req.body.passwordcon;
    const nomor = req.body.nomor;
    const ket = req.body.ket;
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
                gender:gender,
                tgl_lahir:tgl_lahir_,
                pendidikan_terakhir:pndk_terakhir,
                pendidikan:lmpndk,
                jurusan:jurusan,
                pengalaman: pengalaman,
                skill:skill,
                email: email1,
                nomor: nomor,
                ket: ket,
                address: alamat,
                provinsi: prov,
                password: password,
                umur : umur,
                pendidikan_text: edu_text,
                pengalaman_text: peng_text

    
            })
            await user.save((err, res) => {
                if (err) {
                    console.error(err)
                    
                }
                    else {
                        console.log('Sign up berhasil!');
                      
                    }
            })
            res.redirect('/account/login_home')
        }
    }
    
    
    })

module.exports = router;