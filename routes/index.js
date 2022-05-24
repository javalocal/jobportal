const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('pages/index')
})

router.get('/lowongan', (req, res) => {
    res.render('pages/job-resoult1')
})

router.get('/Myapplication', (req, res) => {
    res.render('pages/my_application')
})


router.get('/company', (req, res) => {
    res.render('pages/Company')
})


router.get('/Jobslist', (req, res) => {
    res.render('pages/listjobsvan')
})

router.get('/register', (req, res) => {
    res.render('pages/register')
})

module.exports = router;