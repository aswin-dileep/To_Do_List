const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose')
//mongodb connections 
mongoose.connect("mongodb://localhost:27017/ToDoListDB")
//
const itemSchema = {
    name:String
}

const Item = mongoose.model('item',itemSchema);


//seting view engine
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs');

//setting public folder
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render('index')
})

app.listen('3000',(req,res)=>{
    console.log("server running in port 3000")
});