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

//Index.ejs route
app.get('/', (req, res) => {
  res.render('./pages/index.ejs')
}

//Routes
app.get('pages/searches/new.ejs', handleNew, (req,res) => {
  res.render('./pages/searches/new.ejs');
});

app.get('/./pages/searches/show.ejs', insertBookValues);

function insertBookValues(req, res) {
  const bookId = req.params.book_id;
  const sqlString = 'SELECT * FROM books WHERE id=$1';
  const sqlArray = [bookId];
  client.query(sqlString, sqlArray)
    .then(result => {
      const skoob = result.rows[0];
      const bookObject = {skoob};
      res.render('./pages/searches/new.ejs', bookObject)
    })
  
}



app.post('/searches', (req, res) => {
  let booksUrl = '';
  switch (req.body.selectionType) {
    case '1':
      booksUrl = 'title';
      break;
    case '2':
      booksUrl = 'author';
      break;
  }
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
 
function grabTheBook(bookSummary) {
  return bookSummary.map(book => {
    return new GetTheBook(
      book.volumeInfo.title,
      book.volumeInfo.authors,
      book.volumeInfo.description,
      book.volumeInfo.imageLinks)
  }
  );
}
//TODO: Need to change to working API, once API key is gotten



function GetTheBook (title, author, image, description) {
  // const booksArray = [];
  this.title = title || 'book title',
  this.author = author,
  // If this condition is true use the condition after the ? if it is not use the condtion after the :
  this.image = (image != null ) ? image : 'https://i.imgur.com/J5LVHEL.jpg',
  this.description = description,
}



app.use(express.static(__dirname + '/public'));

app.listen(PORT,() => console.log(`The ${PORT} is live`))