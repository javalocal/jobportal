const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('pages/index')
})

router.get('/lowongan', (req, res) => {
    res.render('pages/joblist')
})

router.get('/Myapplication', (req, res) => {
    res.render('pages/my_application')
})


router.get('/company', (req, res) => {
    res.render('pages/Company')
})

router.get('/Aboutus', (req, res) => {
    res.render('pages/Aboutus')
})

router.get('/Jobslist', (req, res) => {
    res.render('pages/listjobsvan')
})



module.exports = router;