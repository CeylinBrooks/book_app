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



app.use(express.static('./public'));
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');

//Routes
app.get('pages/searches/new.ejs', handleNew, (req,res) => {
  res.render('./pages/searches/new.ejs');
});

//TODO: render to home route
app.get('/views/pages/index.ejs')

app.post('/searches', (req, res) => {
  let booksUrl = '';
  let url = `https://www.googleapis.com/books/v1/volumes?q=${booksUrl}:${req.body.query}`;
  superagent.get(url)
  .then(data => {
    const newBook = grabTheBook(data.body.items);
    console.log(url);
    const bookObject = {books: newBook};
    res.render('./pages/searches/show.ejs', bookObject);
  })
  .catch(error => {
    console.log(error);
    res.status(500).send('Houston we have a problem!');
  
  // booksArr.push(req.body);
});

//TODO: Need to change to working API, once API key is gotten
//TODO: superagent.get(url)


function grabTheBook (bookDescription) {
  const booksArray = [];
  this.title = bookDescription.title || 'book title';
  this.author = 'author';
  // If this condition is true use the condition after the ? if it is not use the condtion after the :
  this.image = ( bookDescription.image != null ) ? bookDescription.image : 'https://i.imgur.com/J5LVHEL.jpg';
  this.description = 'description';
}



app.use(express.static(__dirname + '/public'));

app.listen(PORT,() => console.log(`The ${PORT} is live`))