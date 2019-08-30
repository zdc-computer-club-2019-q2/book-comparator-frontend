var express = require("express");
var cors = require("cors");

var searchRouter = require("./api/search");
var bookRouter = require("./api/book");
var bestsellerRouter = require("./api/bestseller");

var app = express();
app.use(cors());

app.use("/api/search", searchRouter);
app.use("/api/book", bookRouter);
app.use("/api/bestseller", bestsellerRouter);

app.listen(5000);

module.exports = app;
