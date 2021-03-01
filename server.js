'use strict';

const express = require('express');
require ('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(express.static('.public'));
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');

app.get('/hello', (req, res) => {
  const helloObject = {};
  res.render('/pages/show.ejs', helloObject);
});

app.post('/create', (req, res) => {
  
})

app.use(express.static(__dirname + '/public'));

app.listen(PORT,() => console.log(`The ${PORT} is live`))