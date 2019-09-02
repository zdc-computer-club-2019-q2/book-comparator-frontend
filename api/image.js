const { GOOGLE_BOOKS_API_KEY } = require("../config");

const request = require("request");
const fs = require("fs");
const util = require("util");
const path = require("path");

const readFile = util.promisify(fs.readFile);
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

let defaultImage;

/* Get bestseller list. */
module.exports = async function(req, res) {
    if (!req.query.isbn) return;

    let imageURL;
    let image;

    try {
        imageURL = await getImage(req.query.isbn);
    } catch (error) {}

    if (imageURL) {
        const result = await requestGet(imageURL, true);
        const headers = result[1];
        image = result[0];

        res.setHeader("Content-Type", headers["content-type"]);
    } else {
        if (!defaultImage) {
            const imageFile = await readFile(DEFAULT_IMAGE_PATH);
            defaultImage = Buffer.from(imageFile, "base64");
        }

        image = defaultImage;
        res.setHeader("Content-Type", "image/jpeg");
    }

    res.setHeader("Cache-Control", "public, s-maxage=3600, max-age=3600");
    res.setHeader("Content-Length", image.length);
    res.send(image);
};
