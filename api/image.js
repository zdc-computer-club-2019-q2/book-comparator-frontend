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
                resolve([body, resp.headers]);
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

const defaultImageURL = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/387928/book%20placeholder.png";

/* Get bestseller list. */
module.exports = async function(req, res) {
    if (!req.query.isbn) return;

    let imageURL;
    try {
        imageURL = await getImage(req.query.isbn);
    } catch (error) {}

    imageURL = imageURL || defaultImageURL;

    const [image, headers] = await requestGet(imageURL, true);
    res.setHeader("content-type", headers["content-type"]);
    res.setHeader("cache-control", headers["cache-control"]);
    res.setHeader("date", headers["date"]);
    res.setHeader("expires", headers["expires"]);
    res.setHeader("Content-Length", image.length);
    res.send(image);
};
