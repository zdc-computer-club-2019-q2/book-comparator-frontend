const { NYT_API_KEY } = require("../config");

var request = require("request");

const NYT_API = `https://api.nytimes.com/svc/books/v3/lists.json?api-key=${NYT_API_KEY}`;

async function requestGet(url) {
    // Return new promise
    return new Promise((resolve, reject) => {
        // Do async job
        request.get(url, (err, resp) => {
            if (err) {
                reject(err);
            } else {
                resolve(resp.body);
            }
        });
    });
}

/* Get bestseller list. */
module.exports = async function(req, res) {
    const type = req.query.type || "fiction"; // default fiction
    let listName;

    switch (type) {
        case "fiction":
            listName = "hardcover-fiction";
            break;
        case "nonfiction":
        default:
            listName = "hardcover-nonfiction";
    }

    const data = JSON.parse(await requestGet(`${NYT_API}&list-name=${listName}`));

    const results = [];

    for (let i = 0; i < data.num_results; i++) {
        const book = data.results[i];
        const new_book = {
            isbn: book.book_details[0].primary_isbn13,
            title: book.book_details[0].title,
            author: book.book_details[0].author,
            bestseller_weeks: book.weeks_on_list
        };

        results.push(new_book);
    }

    // Cache for result for 1 hour
    res.setHeader("Cache-Control", "public, s-maxage=3600, max-age=3600");
    res.json({ results });
};
