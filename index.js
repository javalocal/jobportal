const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const mongoose = require('mongoose')

const app = express()

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(session({
    secret: 'som3_secre3t_keys',
    cookie: {}
}))


mongoose.connect(('mongodb+srv://admin:crIra5r5kFTUnEgf@jobsportal.lf7xx.mongodb.net/jobsportal?retryWrites=true&w=majority'), (err, res) => {
    if (err) {
        console.error(err);
    }
    else {
        console.log('Database terhubung!')
    }
})


app.use(function(req, res, next) {
    res.locals.session = req.session;
    res.locals.isLoggedIn = req.session.isLoggedIn;
    
    next();
});

const indexRouter = require('./routes/index');
const accountRouter= require('./routes/account');
// const accountRouter = require('./routes/account');
// const ThingtodoRouter = require('./routes/Thingtodo');
// const transprtRouter =require('./routes/transport');
// const promoRouter= require('./routes/promo');
// const akomodasiRouter= require('./routes/Hotelbooking');
// const mybookRouter=require('./routes/mybooking');

app.use('/', indexRouter);
app.use('/account', accountRouter);
// app.use('/Thingtodo',ThingtodoRouter);
// app.use('/transport', transprtRouter);
// app.use('/promo', promoRouter);
// app.use('/accommodation', akomodasiRouter);
// app.use('/mybook', mybookRouter);

// const port = process.env.PORT || 3000
app.listen('3000', ()=> {
    console.log('Server sudah berjalan di port 3000')
})