'use strict';

const express = require('express');
require ('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(express.static('.public'));
app.use(express.urlencoded({extended:true}));

app.get('');

