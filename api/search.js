const { GOOGLE_BOOKS_API_KEY } = require("../config");

var request = require("request");

const GOOGLE_BOOKS_API = `https://www.googleapis.com/books/v1/volumes?key=${GOOGLE_BOOKS_API_KEY}`;

function search_result(volumeInfo) {
    return {
        isbn: volumeInfo.industryIdentifiers.find(function(isbn) {
            return isbn.type === "ISBN_13";
        }).identifier,
        title: volumeInfo.title || "",
        categories: volumeInfo.categories || [],
        author: volumeInfo.authors.join(", ")
    };
}

/* Search by keyword. */
module.exports = function(req, res) {
    console.log("GOOGLE_BOOKS_API", GOOGLE_BOOKS_API);
    request.get(`${GOOGLE_BOOKS_API}&q=${req.query.q}`, (err, result) => {
        var sellable_items = (JSON.parse(result.body).items || [])
            .filter(function(item) {
                return item.saleInfo.saleability === "FOR_SALE";
            })
            .map(function(item) {
                return search_result(item.volumeInfo);
            });

        res.send({
            results: sellable_items,
            results_count: sellable_items.length
        });
    });
};
