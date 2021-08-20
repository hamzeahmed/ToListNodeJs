const express = require('express');
const myBodyParser = require("body-parser");
const date = require(__dirname+'/date.js');
console.log(date)
const app = express()
app.set('view engine', 'ejs');
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}));
const items = [];
const workItems = [];
app.get('/',(req,res)=>{
    console.log(date())
    day = date()
    res.render('list', {
        ListTitle: day,
        newListItem: items
    });
});
app.post('/',(req,res)=>{
    const newItem = req.body.newItem;
    if(req.body.buttonPost === 'Work'){
        workItems.push(newItem);
        res.redirect('/work');
    }else{
        items.push(newItem);
        res.redirect('/');
    }
    
});

app.get('/work',(req,res)=>{
    let title = "Work"
    res.render('list',{
        ListTitle: title,
        newListItem: workItems
    });
});

app.get('/about', (req, res) =>{
    res.render("about")
})
app.listen(3000, ()=>{
    console.log('Listining Posrt 3000! ');
})  