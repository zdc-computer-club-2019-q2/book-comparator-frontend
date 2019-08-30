var express = require("express");

var searchRouter = require("./api/search");
var bookRouter = require("./api/book");
var bestsellerRouter = require("./api/bestseller");

var app = express();

app.use("/search", searchRouter);
app.use("/book", bookRouter);
app.use("/bestseller", bestsellerRouter);

app.listen(5000);

module.exports = app;
