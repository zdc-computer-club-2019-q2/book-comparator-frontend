const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var request = require("request");

module.exports = function(req, res, next) {
    const response = {};
    /**
  {
    "title": "1984",
    "cover": "http://.../1984.gif",
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
      { "isbn": "29384792837", "title": "Another book", "description", "cover" },
      { "isbn": "29384792837", "title": "Another book", "description", "cover" }
    ],
    "reviews": [
      { "username": "", "rating": 3, "comment": "" }
    ]
  }
  */

    const offers = {};
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
    function done() {
        if (Object.keys(offers).length === 3) {
            response.offers = Object.keys(offers).map(key => {
                const value = offers[key];
                return {
                    ...value,
                    site: key
                };
            });
            res.json(response);
        }
    }

    const url = `https://singapore.kinokuniya.com/bw/${req.query.isbn}`;
    request(url, (err, kino) => {
        if (err) {
            console.error("Error fetching from kinokuniya", err);
            offers.kinokuniya = {
                error: true
            };

            done();

            return;
        }
        const doc = new JSDOM(kino.body).window;

        const kino_title = doc.document.querySelector(".dContent h1").innerText;
        const kino_desc = doc.document.querySelector("#product_description_box .long_description").innerText;
        const kino_authors = doc.document.querySelectorAll(".author a");
        const price = doc.document.querySelector(".price span").innerText;
        const img = doc.document.querySelector(".slider3 img");

        //     let recommendation = Array.from(doc.document.querySelectorAll('#customers_also_bought .slider_pager.bx-clone .box'));
        //     recommendation.map((box) => ({
        //       cover: box.querySelector('.book-image').src,
        //       isbn: box.querySelector('.book-image').alt

        //     }));

        response.isbn = req.query.isbn;
        response.title = kino_title;
        response.cover = img.src;
        response.description = kino_desc ? kino_desc.trim() : "No description";
        response.author = Array.from(kino_authors).map(author => author.text);

        offers.kinokuniya = { price, url }; // { price: price, url: url }

        done();
    });

    request(`https://opentrolley.com.sg/Book_Detail.aspx?EAN=${req.query.isbn}`, (err, trolley) => {
        if (err) {
            console.error("Error fetching from opentrolley", err);
            offers.opentrolley = {
                error: true
            };

            done();

            return;
        }

        try {
            const dom = new JSDOM(trolley.body);
            const book_price = dom.window.document.querySelector("span#ctl00_ContentPlaceHolder1_lblDiscountedPrice")
                .textContent;

            offers.opentrolley = {
                price: book_price,
                url: `https://opentrolley.com.sg/Book_Detail.aspx?EAN=${req.query.isbn}`
            };
        } catch (e) {
            offers.opentrolley = {
                error: true
            };
        }

        done();
    });

    request(`https://www.bookdepository.com/search?searchTerm=${req.query.isbn}`, (err, depo) => {
        if (err) {
            console.error("Error fetching from bookdepository", err);
            offers.bookdepository = {
                error: true
            };

            done();

            return;
        }

        try {
            const depo_dom = new JSDOM(depo.body);
            const book_price = depo_dom.window.document.querySelector(".sale-price").textContent;

            response.categories = [...depo_dom.window.document.querySelector(".breadcrumb").children]
                .slice(1)
                .map(el => el.textContent.trim());

            offers.bookdepository = {
                price: book_price,
                url:
                    "https://www.bookdepository.com" +
                    depo_dom.window.document.querySelector('link[rel="canonical"]').href
            };
        } catch (e) {
            offers.bookdepository = {
                error: true
            };
        }

        done();
    });
};