const express = require('express');
const router = express.Router();

router.get('/valen', (req, res) => {
    res.render('pages/index')
})


module.exports = router;