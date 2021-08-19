const express = require('express');
const myBodyParser = require("body-parser");

const app = express()
app.set('view engine', 'ejs');

app.use(express.static("public"))
app.use(express.urlencoded({extended: true}));
let items = [];
app.get('/',(req,res)=>{
    const tody = new Date();
    const currentDay = tody.getDay();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    let day = tody.toLocaleDateString("en-US", options);
    res.render('list', {
        kindOfDay: day,
        newListItem: items
    });

    app.post('/',(req,res)=>{
        const newItem = req.body.newItem;
        items.push(newItem)
        res.redirect('/')
    });

});
app.listen(3000, ()=>{
    console.log('welcome ');
})  