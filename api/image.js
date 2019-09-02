const { GOOGLE_BOOKS_API_KEY } = require("../config");

const request = require("request");
const path = require("path");

const DEFAULT_IMAGE_PATH = path.resolve(__dirname, "../src/images/placeholder.jpg");
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

/* Get bestseller list. */
module.exports = async function(req, res) {
    if (!req.query.isbn) return;

    let imageURL;
    try {
        imageURL = await getImage(req.query.isbn);
    } catch (error) {}

    res.setHeader("Cache-Control", "public, s-maxage=3600, max-age=3600");

    if (imageURL) {
        const result = await requestGet(imageURL, true);
        const image = result[0];
        const headers = result[1];

        res.setHeader("Content-Type", headers["content-type"]);
        res.setHeader("Content-Length", image.length);
        res.send(image);
    } else {
        res.setHeader("Content-Type", "image/jpeg");
        res.sendFile(DEFAULT_IMAGE_PATH);
    }
};
