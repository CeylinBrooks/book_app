'use strict';

const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
require ('dotenv').config();

const app = express();
const PORT = process.env.PORT;

//ERROR
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', error => console.log(error));
// .catch(error => {
//   console.log(error);
//   res.status(500).send('Houston we have a problem!');



const booksArr = [
  {name: 'Dr.Suess', date: null }
];

app.use(express.static('./public'));
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');

//Routes
app.get('pages/searches/new.ejs', handleNew, (req,res) => {
  res.render();
})

//TODO: render to home route
app.get('/views/pages/index.ejs')

app.post('/searches', (req, res) => {
  console.log(req.body);
  booksArr.push(req.body);
  res.redirect('/hello');
});

//TODO: Need to change to working API, once API key is gotten


function Book (bookDescription) {
  this.title = bookDescription.title || 'book title';
  this.author = 'author';
  // If this condition is true use the condition after the ? if it is not use the condtion after the :
  this.image = ( bookDescription.image != null ) ? bookDescription.image : 'https://i.imgur.com/J5LVHEL.jpg';
  this.description = 'description';
}



app.use(express.static(__dirname + '/public'));

app.listen(PORT,() => console.log(`The ${PORT} is live`))