
const express = require('express')

const app = express()

const mongoose = require('mongoose')

app.use(express.json())


const bookModel = require('./models/Bookmodel')




// Connecting to our MongoDB database through the library db
mongoose.connect('mongodb://127.0.0.1:27017/library')
.then(()=>{console.log("connected to my database")})
.catch(()=>{console.log("Something went wrong Error")})


// model








// CRUD


app.get('/books',(req,res)=>{

    console.log("async .then")

    // find(): returns all the books in my collection
    bookModel.find()
    .then((allBooks)=>{
        console.log(allBooks)
        res.json(allBooks)
    })
    .catch((err)=>{
        console.log(err)
    })

})


app.get('/books',async (req,res)=>{

    console.log("async method")


    // find(): returns all the books in my collection

    try{
        let allBooks = await bookModel.find()
        res.json(allBooks)
    }
    catch(err){
        console.log(err)
    }

})


app.post("/books",(req,res)=>{



       console.log(req.body)

       if(req.body.releaseYear > 2024){
        req.body.isUpcoming = true
       }

    bookModel.create(req.body)
    .then((createdBook)=>{
        console.log(createdBook)
        res.json(createdBook)
    })
    .catch((err)=>{
        console.log(err)
        res.json(err)
    })
 
})


app.post("/books",async(req,res)=>{

    try{
        let createdBook =await bookModel.create(req.body)
        res.json(createdBook)
    }catch(err){
        console.log(err)
    }


})


app.get("/books/:id",(req,res)=>{
    
    console.log(req.params.id)

    // findById(): gets the book by the id
    bookModel.findById(req.params.id)
    .then((foundBook)=>{
        res.json(foundBook)
    })
    .catch((err)=>{
        console.log(err)
    })
}) 


app.delete('/books/:id',(req,res)=>{

    bookModel.findByIdAndDelete(req.params.id)
    .then((deletedBook)=>{
        res.json(deletedBook)
    })
    .catch((err)=>{
        console.log(err)
    })
})



app.put('/books/:id',(req,res)=>{

    
// 2 arguments: id, and object to be updated
// third optional argument: {new:true} to return the upated object
bookModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
.then((updatedBook)=>{
    res.json(updatedBook)
})  


})





 /* 

READ:

.find(): fetches all the documents

.find({rating:10}): fetches all the documents that have a 10 rating

.findOne({title:"Barbie"}): fetches 1 document based on the query given in the argument. Will return barbie movie document

.findById('65f12531dc4084e350bd5f4f'): fetches 1 document based on the id given in the arguement



CREATE:

.create({title:"New Movie",director:"John Smith"}): will create a new document with the field values given in the arguement. Argument is an object

.insertMany([{title:"Star Wars",director:"George Lucas"},{title:"Star Wars 2",director:"George Lucas"}]): will create many new documents with the field values given in the arguement. Argument is an array of objects


UPDATE:

.updateOne({title:"Star Wars"}, {rating:9}): will find the movie with the query from the first arugment and change the rating to 9. 

.updateMany({director:"George Lucas"}, {rating:9}): will find all the movies with the director being george lucas and change the rating to 9. 

.findByIdAndUpdate('65f12531dc4084e350bd5f4f',{title:"Changed Title"}): Finds a document by its _id and updates it.



DELETE:

.deleteOne(): deletes 1 document based on the query in the arument

.deleteMany(): deletes all the documents that match the query provided in the arguemnt

.findByIdAndDelete('65f12531dc4084e350bd5f4f')
*/



// bookModel.updateMany({releaseYear:{$gt:2020}},{name:"CHANGED WITH UPDATE MANY"})
// .then((foundBook)=>{
//     console.log(foundBook)
// })



// Adding many books
/* bookModel.insertMany([
    {
        "name":"new book 1",
        "author":"Toni",
        "releaseYear":2024
    },
    {
        "name":"new book2",
        "author":"Toni",
        "releaseYear":2024
     },
     {
        "name":"new book 3",
        "author":"Toni",
        "releaseYear":2024
     }
])
 */











app.listen(5005,()=>{
    console.log("Listening on port 5005")
})
