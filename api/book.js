const { GOOGLE_BOOKS_API_KEY } = require("../config");

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const request = require("request");

const GOOGLE_BOOKS_API = `https://www.googleapis.com/books/v1/volumes?key=${GOOGLE_BOOKS_API_KEY}`;

function getFromGoogleBooks(isbn, callback) {
    request.get(`${GOOGLE_BOOKS_API}&q=isbn:${isbn}`, (_err, result) => {
        const body = JSON.parse(result.body);

        if (body.totalItems === 0) {
            return callback();
        }

        const item = body.items[0].volumeInfo;
        callback({
            isbn,
            image: item.imageLinks.thumbnail.replace("http://", "https://"),
            title: item.title,
            author: item.authors[0],
            authors: item.authors,
            categories: item.categories,
            description: item.description
        });
    });
}

function getFromKinokuniya(isbn, callback) {
    const url = `https://singapore.kinokuniya.com/bw/${isbn}`;

    request(url, (err, kino) => {
        if (err) {
            console.error("Error fetching from kinokuniya", err);
            callback();

            return;
        }
        if (kino.statusCode === 404) {
            console.error("Book not found on kinokuniya");
            callback();
        } else {
            const doc = new JSDOM(kino.body).window;

            let price = doc.document.querySelector(".price span").textContent;

            const prices = price.split(" ");
            if (prices.length > 0) {
                price = prices.slice(-1)[0];
            }

            const recommendation = Array.from(doc.document.querySelectorAll(".box")).map(box => ({
                image: box.querySelector(".book-image").src,
                isbn: box.querySelector(".book-image").alt,
                title: box.querySelector(".txt a:nth-child(1)").textContent.trim(),
                author: box
                    .querySelector(".txt a:nth-child(2)")
                    .textContent.slice(3)
                    .trim()
            }));

            callback({
                site: "kinokuniya",
                price: price.replace(/[^\d\.]*/g, ""),
                url: `https://singapore.kinokuniya.com/bw/${isbn}`,
                recommendation
            });
        }
    });
}

function getFromOpenTrolley(isbn, callback) {
    request(`https://opentrolley.com.sg/Book_Detail.aspx?EAN=${isbn}`, (err, trolley) => {
        if (err) {
            console.error("Error fetching from opentrolley", err);
            callback();

            return;
        }

        try {
            const dom = new JSDOM(trolley.body);
            const book_price = dom.window.document.querySelector("span#ctl00_ContentPlaceHolder1_lblDiscountedPrice")
                .textContent;

            callback({
                site: "opentrolley",
                price: book_price.replace(/[^\d\.]*/g, ""),
                url: `https://opentrolley.com.sg/Book_Detail.aspx?EAN=${isbn}`
            });
        } catch (e) {
            callback();
        }
    });
}

function getFromBookDepository(isbn, callback) {
    request(`https://www.bookdepository.com/search?searchTerm=${isbn}`, (err, depo) => {
        if (err) {
            console.error("Error fetching from bookdepository", err);
            callback();

            return;
        }

        try {
            const depo_dom = new JSDOM(depo.body);
            const book_price = depo_dom.window.document.querySelector(".sale-price").textContent;

            callback({
                site: "bookdepository",
                price: book_price.replace(/[^\d\.]*/g, ""),
                url: depo_dom.window.document.querySelector('link[rel="canonical"]').href
            });
        } catch (e) {
            callback();
        }
    });
}

function promisify(fn, isbn) {
    return new Promise(resolve => {
        fn(isbn, result => {
            resolve(result);
        });
    });
}

module.exports = function(req, res) {
    /**
  {
    "title": "1984",
    "image": "http://.../1984.gif",
    author: "",
    "categories": "",
    "offers": [
      { "site": "amazon", "price": 100, "url": "" },
      { "site": "", "price": 95, "url": "" },
      { "site": "", "price": 80, "url": "" },
      { "site": "", "price": 105, "url": "" }
    ],
    "description": "A dystop",
    "authors": [
      "George Orwell",
      "Another author"
    ],
    "recommended": [
      { "isbn": "29384792837", "title": "Another book", "description", "image" },
      { "isbn": "29384792837", "title": "Another book", "description", "image" }
    ],
    "reviews": [
      { "username": "", "rating": 3, "comment": "" }
    ]
  }
  */

    /**
  offers = {
    'bookdepository': {
      price: 100,
      url: 'something'
    },
    'kino': {
      price: 120

    }
  }
  */

    const isbn = req.query.isbn;

    getFromGoogleBooks(isbn, result => {
        if (!result) {
            res.status(404);
            res.send("");
            return;
        }

        let response = { ...result };

        Promise.all([
            promisify(getFromKinokuniya, isbn),
            promisify(getFromBookDepository, isbn),
            promisify(getFromOpenTrolley, isbn)
        ]).then(offers => {
            const kino = offers.find(offer => offer && offer.site === "kinokuniya");
            if (kino) {
                response.recommendation = kino.recommendation;
                delete kino.recommendation;
            }

            response.offers = offers.filter(Boolean);

            res.setHeader("Cache-Control", "public, s-maxage=3600, max-age=3600");
            res.json(response);
        });
    });
};
