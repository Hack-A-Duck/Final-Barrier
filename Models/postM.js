const mongoose = require('mongoose')

var Schema=mongoose.Schema

/*Zaroorat hi nahi pada*/

// const commentSchema=new Schema({
//     username:String,
//     cmnt:String
// })



const postschema =new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    }
    ,
    comment: []


})

const Postmodel=module.exports = mongoose.model('postmodel', postschema)
// const Commentmodel=module.exports=mongoose.model ('commentmodel',commentSchema)