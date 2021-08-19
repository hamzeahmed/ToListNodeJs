const express = require('express');
const myBodyParser = require("body-parser");

const app = express()
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
var items = [];
app.get('/',(req,res)=>{
    const tody = new Date();
    const currentDay = tody.getDay();
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    var day = tody.toLocaleDateString("en-US", options);
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