const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
require("dotenv").config();

app.use(bodyParser.urlencoded({extended: true})); {useNewUrlParser: true} {useUnifiedTopolgy: true}

mongoose.connect('mongodb+://localhost:27017/doubts')

//data schema
const notesSchema = {
    title: String,
    content: String
}

const Note = mongoose.model('Note', notesSchema);

app.get('/',function (req, res) {
    res.sendFile(_dirname + '/index.html');
})

app.post('/', function (req, res) {
    let newNote = new Note({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        Doubt: req.body.Doubt,
    });
    newNote.save();
    res.redirect('/');
})

app.listen(3000, function(){
    console.log("server is running on 3000");
})