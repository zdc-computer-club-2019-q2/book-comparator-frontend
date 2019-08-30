var request = require("request");

const NYT_API_KEY = "6ad84e249d054efeaefe1abb8f89df5b";
const NYT_API = `https://api.nytimes.com/svc/books/v3/lists.json?api-key=${NYT_API_KEY}`;

const GOOGLE_BOOKS_API_KEY = "AIzaSyAcotR8YZ-Zsd6dcREUBhkUA_NE3UC5AIY";
const GOOGLE_BOOKS_API = `https://www.googleapis.com/books/v1/volumes?key=${GOOGLE_BOOKS_API_KEY}`;

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

async function getCover(isbn) {
    const data = JSON.parse(await requestGet(`${GOOGLE_BOOKS_API}?q=isbn:${isbn}`));

    if (data.totalItems === 0) return;

    return data.items[0].volumeInfo.imageLinks.thumbnail;
}

/* Get bestseller list. */
module.exports = async function(req, res) {
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

    const data = JSON.parse(await requestGet(`${NYT_API}&list-name=${listName}`));

    const promises = [];

    for (let i = 0; i < data.num_results; i++) {
        const book = data.results[i];
        promises.push(getCover(book.isbns[0].isbn13));
    }

    const result = await Promise.all(
        data.results.map(async book => {
            const image = await getCover(book.book_details.primary_isbn13);
            return {
                ...book.book_details,
                image,
                weeks_on_list: book.weeks_on_list
            };
        })
    );

    res.json(result);
};
