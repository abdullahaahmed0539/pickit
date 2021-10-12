const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//Connecting database
mongoose.connect('mongodb+srv://shahmir:disclose@cluster0.zbkg4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
mongoose.connection.on('error',err=> {
    console.log('connection failed');
});

mongoose.connection.on('connected',connected=>{
    console.log('Connected with database');
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());


module.exports = app;