var request = require("request");

const GOOGLE_BOOKS_API_KEY = "AIzaSyAcotR8YZ-Zsd6dcREUBhkUA_NE3UC5AIY";
const GOOGLE_BOOKS_API = `https://www.googleapis.com/books/v1/volumes?key=${GOOGLE_BOOKS_API_KEY}`;

/* Search by keyword. */
module.exports = function(req, res, next) {
    // res.send('respond with a resource');
    request.get(`${GOOGLE_BOOKS_API}&q=${req.query.q}`, (err, result) => {
        the_result = JSON.parse(result.body)
        sellable_items = the_result.items.filter(function(item){
          return item.saleInfo.saleability == "FOR_SALE";
        })

        formatted_sellable_items = sellable_items.map(function(item){
          return {
            isbn: item.volumeInfo.industryIdentifiers.find(function(isbn){
              return isbn.type == "ISBN_13"
            }).identifier,
            title: item.volumeInfo.title || "",
            categories: item.volumeInfo.categories || [],
            author: item.volumeInfo.authors.join(', '),
          }
        })

        final_result = {
          results: formatted_sellable_items,
          results_count: formatted_sellable_items.length
        }

        //console.log(final_result);

        res.send(final_result);
    });
};
