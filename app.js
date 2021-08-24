const express = require('express');
const _ = require('lodash');
const myBodyParser = require("body-parser");
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}));
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin-hamze:hamze1122@cluster0.r5u1n.mongodb.net/todoLisDB', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const todoschema = new mongoose.Schema({
    name: String
});
const Todo = new mongoose.model("Todo", todoschema);
const todo =  new Todo({
    name: "Caano Doon"
});
const todo1 =  new Todo({
    name: "Caano Cab"
});

const todo3 =  new Todo({
    name: "Caano shub"
});
const defaultTodos = [todo, todo1, todo3];
const listSchema = mongoose.Schema({
    name: String,
    items: [todoschema]
});

const List = mongoose.model("List", listSchema);

app.get('/',(req,res)=>{
    Todo.find({}, (err,foundedTodos)=>{
        if(foundedTodos){
            if(foundedTodos.length == 0){
                Todo.insertMany(defaultTodos,(err)=>{
                    if(err){
                        console.log(err)
                    }else{
                        console.log("Sucessfully added to the Model")
                        res.redirect("/")
                    }
                });

            }else{
                res.render('list', {
                    ListTitle: "Today",
                    newListItem: foundedTodos
                });
            }
        }
    });
});

app.get('/:topic',(req, res) =>{
    const dynamicTitle = req.params.topic;
    List.findOne({name: dynamicTitle}, (err,results)=>{
        if(!err){
            if(results){
                res.render("list",{
                    ListTitle: results.name ,
                    newListItem: results.items
                });
            }else{
                const  myList = new List({
                    name: dynamicTitle,
                    items: defaultTodos
                });
                myList.save();
                // res.render("list",{
                //     ListTitle: dynamicTitle,
                //     newListItem: defaultTodos
                // });
                res.redirect("/"+dynamicTitle);
            }
        }
    })
});
app.post('/',(req,res)=>{
    const newItem =  req.body.newItem;
    const ListName = _.capitalize(req.body.list)
    console.log(ListName)
    const itemPost  = new Todo({
        name: newItem
    });
    if(ListName === "Today"){
        itemPost.save();
        res.redirect('/');
    }else{
        List.findOne({name:ListName}, (err, founList)=>{
            if(!err){
                founList.items.push(itemPost);
                founList.save();
                res.redirect("/"+ ListName);
            }else{
                console.log(err)
            }
            
        });
    }
    
});


app.post('/delete',(req,res)=>{
    const checkedItem = req.body.checkedItem;
    const ListName = req.body.hiddenInput;
    if(ListName === "Today"){
        Todo.deleteOne({_id: checkedItem},(err)=>{
            if(err){
                console.log(err);
            }else{
                console.log("Sucessfully Deleted")
                res.redirect('/')
            }
        })
    }else{
        List.findOneAndUpdate({name: ListName},{$pull:{items: {_id: checkedItem}}},(err, foundList)=>{
            if(!err){
                res.redirect('/'+ListName);
            }
        })

    }
});

// app.get('/work',(req,res)=>{
//     let title = "Work"
//     res.render('list',{
//         ListTitle: title,
//         newListItem: workItems
//     });
// });

// app.get('/about', (req, res) =>{
//     res.render("about")
// })
let port = process.env.PORT;
if(port == null ||  port == ""){
    port = 3000;
}
app.listen(port, ()=>{
    console.log('Listining Posrt 3000! ');
})  