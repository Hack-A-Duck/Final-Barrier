const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const ejs = require('ejs')
const BodyParser = require('body-parser')
// const postmodel = require('./Models/postM')     //for getting all the post so that we can display in index page


//mongoose connection
mongoose.connect('mongodb://localhost:27017/duck', { useNewUrlParser: true }, { useUnifiedTopology: true })

var db = mongoose.connection;

db.once('open', () => {
    console.log('DB connected...')
})

const app = express();

//middlewares
app.use(express.static('./static'))

app.use(BodyParser.urlencoded({extended:false}))
app.use(BodyParser.json())



//setting view engine(templates)
app.set('Views', path.join(__dirname, 'Views'))
app.set('view engine', 'ejs')

//routes post
const phalana = require('./Routes/admin_routes/postR')
app.use('/admin/post', phalana)

const phalana2 = require('./Routes/user_routes/postR')
app.use('/user/post', phalana2)

// app.get('/admin/', async(req, res) => {
//     const all_post = await postmodel.find()
//     // console.log(all_post)
//     res.render('admin/index', { all_post: all_post })
// })

app.listen(5000)
