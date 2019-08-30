var request = require("request");

const NYT_API_KEY = "6ad84e249d054efeaefe1abb8f89df5b";
const NYT_API = `https://api.nytimes.com/svc/books/v3/lists.json?api-key=${NYT_API_KEY}`;

/* Get bestseller list. */
module.exports = function(req, res, next) {
    // res.send('respond with a resource');
    const category = req.query.category || "fiction";
    let listName;

    switch (category) {
        case "fiction":
            listName = "combined-print-and-e-book-fiction";
            break;
        case "nonfiction":
        default:
            listName = "combined-print-and-e-book-nonfiction";
    }

    request.get(`${NYT_API}&list-name=${listName}`, (err, result) => {
        res.send(result.body);
    });
};
