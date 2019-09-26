//jshint esversion:6

const express = require('express'),
    bodyParser = require('body-parser'),
    ejs = require('ejs'),
    date = require(__dirname + "/date.js"),
    app = express();

const items = ['Buy Food', 'Cook Food', 'Eat Food'];
const workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', (req, res) => {

  const day = date.getDate();

  res.render('list', {listTitle: day, newListItems: items});
});

app.post('/', function(req, res){
  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req, res){
  res.render("List", {listTitle: "Work List", newListItems: workItems});
});

app.post("/work", function(req, res){
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

const port = process.env.PORT || 3000;

app.listen(port, ()=> {
    console.log('server is up and running');
  });
