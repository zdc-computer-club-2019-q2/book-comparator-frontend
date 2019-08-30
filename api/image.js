const { NYT_API_KEY, GOOGLE_BOOKS_API_KEY } = require("../config");

var request = require("request");

const NYT_API = `https://api.nytimes.com/svc/books/v3/lists.json?api-key=${NYT_API_KEY}`;
const GOOGLE_BOOKS_API = `https://www.googleapis.com/books/v1/volumes?key=${GOOGLE_BOOKS_API_KEY}`;

async function requestGet(url, nullEncoding = false) {
    // Return new promise
    return new Promise((resolve, reject) => {
        // Do async job
        let options = { url };
        if (nullEncoding) {
            options.encoding = null;
        }
        request.get(options, (err, resp, body) => {
            if (err) {
                reject(err);
            } else {
                resolve([body, resp.headers["content-type"]]);
            }
        });
    });
}

async function getImage(isbn) {
    let [data] = await requestGet(`${GOOGLE_BOOKS_API}&q=isbn:${isbn}`);
    data = JSON.parse(data);

    if (data.totalItems === 0) return;

    return data.items[0].volumeInfo.imageLinks.thumbnail;
}

/* Get bestseller list. */
module.exports = async function(req, res) {
    if (!req.query.isbn) return;

    let imageURL;
    try {
        imageURL = await getImage(req.query.isbn);
    } catch (error) {}

    if (imageURL) {
        const [image, contentType] = await requestGet(imageURL, true);
        res.setHeader("Content-Type", contentType);
        res.setHeader("Content-Length", image.length);
        res.send(image);
    } else {
        res.send("");
    }
};
