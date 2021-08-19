const express = require('express');
const myBodyParser = require("body-parser");

const app = express()
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.get('/',(req,res)=>{
    const tody = new Date();
    const currentDay = tody.getDay();
    var myday = ""; 
    switch(currentDay){
        case 1:
            myday = "Monday";
            break;
        case 2:
            myday = "Tuesday";
            break;
        case 3:
            myday = "Wednesday";
            break;
        case 4:
            myday = "Thursday ";
            break
    }
    res.render('list', {kindaDay: myday})
});
app.listen(3000, ()=>{
    console.log('welcome ');
})  