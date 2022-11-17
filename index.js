const express = require('express');
const route = require('./routes/route.js');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

mongoose.connect("mongodb+srv://aarurajpoot1999:8650148233@cluster0.x0csqqn.mongodb.net/project1",{ UseNewUrlParser: true })
    .then(() => console.log("MongoDb is Connected"))
    .catch(err => console.log(err))

app.use('/', route);

app.listen(3000, function () {
    console.log('Express app running on port' + (3000))
});


