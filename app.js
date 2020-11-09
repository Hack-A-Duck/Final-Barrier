if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const ejs = require('ejs')
const bcrypt = require('bcrypt')
const session = require('express-session')
const flash = require('express-flash')
const passport = require('passport')
const methodoverride=require('method-override')
const Passmodel = require('./Models/passM')
const { isNotAuthenticated }=require('./config/auth')


const initializePassport = require('./config/passport')
initializePassport(passport,
    email => { return Passmodel.find(user => user.email === email) },
    id => {
        return Passmodel.find(user => user.id === id)

    })

//mongoose connection

// mongoose.connect('mongodb://localhost:27017/duck', { useNewUrlParser: true , useUnifiedTopology: true })
// var db = mongoose.connection;
// db.once('open', () => {
//     console.log('DB connected...')
// })

const mongoAtlasUri="mongodb+srv://shubham12:1234@cluster0.lurz9.mongodb.net/<dbname>?retryWrites=true&w=majority"

try {
    // Connect to the MongoDB cluster
     mongoose.connect(
      mongoAtlasUri,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log(" Mongoose is connected")
    );

  } catch (e) {
    console.log("could not connect");
  }

const app = express();

//middlewares
app.use(flash())
app.use(session({
    // key: "admin",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('./static'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(methodoverride('_method'))


// Authentication 
// var auth=function(req,res,next){
//     if(req.session&&)
// }



//setting view engine(templates)
app.set('Views', path.join(__dirname, 'Views'))
app.set('view engine', 'ejs')

//admin register
app.get('/register',isNotAuthenticated, (req, res) => {
    res.render('register')
})
app.post('/register', isNotAuthenticated,async (req, res) => {
    try {
        const hashpassword = await bcrypt.hash(req.body.password, 10)
        const newuser = new Passmodel({
            username: req.body.username,
            email: req.body.email,
            password: hashpassword
        })
        let z = await newuser.save()
        res.redirect('/admin/login')

    } catch (error) {
        console.log(error)

    }

})

//admin login page 
app.get('/admin/login',isNotAuthenticated, (req, res) => {
    res.render('login')
})

//admin check
app.post('/admin/login',isNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/admin/post',
    failureRedirect: '/admin/login',
    failureFlash: true
}))


app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/admin/login')
})


//routes post
const phalana = require('./Routes/admin_routes/postR')
app.use('/admin/post', phalana)


const phalana2 = require('./Routes/user_routes/postR')
// const { allowedNodeEnvironmentFlags } = require('process')
app.use('/user/post', phalana2)



app.listen(5000, () => { console.log("started at 5000") })
