const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');

//mongodb connections 
mongoose.connect("mongodb://localhost:27017/ToDoListDB")
//
const itemSchema = {
    name: String
}
const customSchema = {
    name: String,
    item: [itemSchema]
};

const Item = mongoose.model('item', itemSchema);
const Custom = mongoose.model('Custom', customSchema);

const sample = new Item({ name: "hello world" })
const sample1 = new Item({ name: "new data" });
const samp3 = [sample, sample1];

//seting view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

//parser connection
app.use(bodyParser.urlencoded({ extended: true }));

//setting public folder
app.use(express.static("public"));

app.get("/", (req, res) => {
    Item.find({}, async (err, result) => {
        if (!err) {
            res.render('index', { Data: result, Title: "MY TO Do List" })
        }
    })

})
app.post("/", (req, res) => {
    const item = req.body.item;
    const Title = req.body.Title;
    const data = new Item({ name: item })
        data.save();
    res.redirect('/')
})

app.post("/delete", (req, res) => {
    const ItemId = req.body.ListId
    Item.findByIdAndRemove(ItemId, (err) => {
        if (!err) {
            console.log("successfully deleted");
        }
    })
    res.redirect('/')
})

app.get("/:customTitle", (req, res) => {
    const customTitle = req.params.customTitle;

    Custom.findOne({ name: customTitle }, (err, result) => {
        if (!err) {
          if(!result){
            const newItem = new Custom({name:Custom});
            newItem.save();
            res.redirect("/"+customTitle);
          }else{
            res.render('index', { Title: customTitle, Data: result.item })
          }
        }
       
    })

})


app.listen('3000', (req, res) => {
    console.log("server running in port 3000")
});