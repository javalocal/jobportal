const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('pages/index')
})

router.get('/company', (req, res) => {
    res.render('pages/Company')
})

router.get('/Aboutus', (req, res) => {
    res.render('pages/Aboutus')
})

router.get('/account', (req, res) => {
    res.render('account/profile')
})

module.exports = router;