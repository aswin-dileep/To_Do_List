const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');

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

//parser connection
app.use(bodyParser.urlencoded({extended:true}));

//setting public folder
app.use(express.static("public"));

app.get("/",(req,res)=>{
    Item.find({},async (err,result)=>{
        if(!err){
            res.render('index',{Data:result})
        }
    })
   
})
app.post("/",(req,res)=>{
    const item = req.body.item;
    const data = new Item({name:item})
    data.save();
    res.redirect('/')
})

app.listen('3000',(req,res)=>{
    console.log("server running in port 3000")
});