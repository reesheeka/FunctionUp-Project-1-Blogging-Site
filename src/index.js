const express = require('express');
const mongoose = require('mongoose');
const route = require('./routes/route.js');
const app = express();

app.use(express.json());

mongoose.connect("mongodb+srv://aarurajpoot1999:8650148233@cluster0.x0csqqn.mongodb.net/project1", { UseNewUrlParser: true }, mongoose.set("strictQuery", false))
    .then(() => console.log("MongoDb is Connected😊"))
    .catch(err => console.log(err))

app.use('/', route);

app.listen(3000, function () {
    console.log('Express app running on port' + (3000))
});
