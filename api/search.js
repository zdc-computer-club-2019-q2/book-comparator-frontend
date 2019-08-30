var request = require("request");

const GOOGLE_BOOKS_API_KEY = "AIzaSyAcotR8YZ-Zsd6dcREUBhkUA_NE3UC5AIY";
const GOOGLE_BOOKS_API = `https://www.googleapis.com/books/v1/volumes?key=${GOOGLE_BOOKS_API_KEY}`;

/* Search by keyword. */
module.exports = function(req, res, next) {
    // res.send('respond with a resource');
    request.get(`${GOOGLE_BOOKS_API}&q=${req.query.q}`, (err, result) => {
        res.send(result.body);
    });
};
