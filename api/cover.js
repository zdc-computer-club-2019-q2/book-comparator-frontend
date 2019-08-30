var request = require("request");

const GOOGLE_BOOKS_API_KEY = "AIzaSyAcotR8YZ-Zsd6dcREUBhkUA_NE3UC5AIY";
const GOOGLE_BOOKS_API = `https://www.googleapis.com/books/v1/volumes?key=${GOOGLE_BOOKS_API_KEY}`;

async function requestGet(url) {
    const options = {
        url: url,
        method: "GET"
    };

    // Return new promise
    return new Promise((resolve, reject) => {
        // Do async job
        request.get(options, (err, resp) => {
            if (err) {
                reject(err);
            } else {
                resolve(resp);
            }
        });
    });
}

module.exports = async (req, res) => {
    const data = JSON.parse(await requestGet(`${GOOGLE_BOOKS_API}?q=isbn:${req.query.isbn}`));

    if (data.totalItems === 0) {
        res.status(404);
        res.send("");
        return;
    }

    const imageURL = data.items[0].volumeInfo.imageLinks.thumbnail;
    const response = await requestGet(imageURL);

    res.setHeader("Content-Type", response.headers["Content-Type"]);
    res.send(response.body);
};
