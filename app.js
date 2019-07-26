//jshint esversion:6

const express = require('express'),
    bodyParser = require('body-parser'),
    ejs = require('ejs'),
    app = express();

const items = ['Buy Food', 'Cook Food', 'Eat Food'];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', (req, res)=> {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  let day = today.toLocaleDateString("en-US", options);

  res.render('list', {kindOfDay: day, newListItems: items});
});

app.post('/', (req, res)=> {
  let item = req.body.newItem;

  items.push(item);

  res.redirect("/");
});

const port = process.env.PORT || 3000;

app.listen(port, ()=> {
    console.log('server is up and running');
  });
