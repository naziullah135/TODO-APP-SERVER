const express = require('express');
const mongoose = require('mongoose');
const todoHandler = require('./routeHandler/todoHandler');

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost/todos",{ useNewUrlParser: true , useUnifiedTopology: true})
    .then(() => console.log("connection successful"))
    .catch(err => console.log(err));

// application routes
app.use('/todo', todoHandler)


function errorHandler(err, req, res, next) {
    if(res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error : err});
}

app.listen(3000,() => {
    console.log("app listening on port 3000");
})