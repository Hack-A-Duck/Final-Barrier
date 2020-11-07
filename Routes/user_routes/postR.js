const express = require('express')
const router = express.Router()

const postmodel = require('../../Models/postM')
const commentmodel = require('../../Models/postM')

router.get('/', async(req, res) => {
    const all_post = await postmodel.find().sort({date:'desc'})
    // console.log(all_post)
    res.render('user/indexU', { all_post: all_post })
})

//ADD COMMENT:-
// router.get('/add_comment', (req, res) => {
//     const Postmodel=new postmodel()
//     res.render('user/add_comment',{Postmodel:Postmodel})

// })

router.post('/add_comment', async(req, res) => {
    
    const addcommentin=await postmodel.findById(req.body.getid)
    
    
    // console.log(addcommentin)

    try {
        
         console.log(req.body.getid)
         console.log(req.body.username)
        console.log(req.body.write_comment)
        console.log(req.body.timeofcomment)
        
        // const updatedpost=await postmodel.updateOne({_id:(req.params.getid)},{$push:{comment:{username:"gaurav123",write_comment:"main hoon gaurav123"}}})

        // const updatedpost=await postmodel.update({"_id":ObjectId(req.body.getid)},{$push:{"comment":{username:(req.body.username),commentwritten:(req.body.write_comment)}}})
        
        const updatedpost=await addcommentin.comment.push({username:(req.body.username),cmnt:(req.body.write_comment),time:(req.body.timeofcomment)})
         let z=await addcommentin.save()

        res.redirect('/user/post/')
        
    } catch (error) {
        console.error(error)
    }
    

})



// router.post('/add_comment', async (req, res) => {
//     const newcomment = await new postmodel({
//         title : req.body.title,
//         desc : req.body.desc,
//         date : req.body.date
//     })
//     console.log(newcomment)

//     try {
//         const a1 = await newpost.save()
//         res.redirect('/')

//     } catch (error) {
//         console.error(error)

//     }

// })

//FIND POST BY ID:-
router.get('/:id',async(req,res)=>{
    const grabbyid= await postmodel.findById(req.params.id)
    res.render('user/selectedpostU',{grabbyid:grabbyid})
})

//EDITING POST
// router.get('/edit/:id',async(req,res)=>{
//     const grabbyidforedit=await postmodel.findById(req.params.id)
//     res.render('admin/editpost',{grabbyidforedit:grabbyidforedit})
// })

// router.post('/edit/:id',async(req,res)=>{

//     const a1=await postmodel.findById(req.params.id)
//     console.log(a1)

//     const a2= {}
//     a2.title=req.body.title
//     a2.desc=req.body.desc
//     // a2.date=req.body.date
//     console.log(a2)

//     try {
//         const updatedpost=await postmodel.updateOne({_id:(req.params.id)},a2)
//         console.log(updatedpost)
//         res.redirect('/')
        
//     } catch (error) {
//         console.error(error)
//     }



// })

module.exports=router


