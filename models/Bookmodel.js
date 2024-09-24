const mongoose = require('mongoose')


const bookSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxLength:50,
        minLength:5
    },
    author:String,
    releaseYear:{
        type:Number,
    },
    isUpcoming:{
        type:Boolean,
        default:false
    },
    genre:{
        type:String,
        enum:["Horror","Romance","Adventure"]
    }
})



const bookModel = mongoose.model('Book',bookSchema)

module.exports = bookModel