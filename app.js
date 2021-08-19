const express = require('express');
const myBodyParser = require("body-parser");

const app = express()
app.use(express.urlencoded({extended: true}));
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html")
});
app.listen(3000, ()=>{
    console.log('welcome ')
})