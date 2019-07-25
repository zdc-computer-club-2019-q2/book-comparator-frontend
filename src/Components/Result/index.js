import React from 'react';
import './result.css';

class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false, //TODO: how to decide whether we're loading, and what to do if it's waiting for result?
            result: {
                "title": "Good Omens",
                "cover": "https://kinokuniya.com.sg/wp-content/uploads/2019/05/9780060853983.jpeg",
                "categories": "novel",
                "offers": [
                    {"site": "amazon", "price": 100, "url": "a"},
                    {"site": "b", "price": 95, "url": "b"},
                    {"site": "c", "price": 80, "url": "c"},
                    {"site": "d", "price": 105, "url": "d"}
                ],
                "description": "There is a distinct hint of Armageddon in the air.",
                "author": "George Orwell",
                "recommended": [
                    {"isbn": "29384792837", "title": "Another book"},
                ],
                "reviews": [
                    {"username": "a", "rating": 3, "comment": "a"},
                    {"username": "b", "rating": 3, "comment": "b"},
                ]
            }
        };
    };

    componentDidMount() {
        //TODO: we could request data from server here and put into page state
        console.log("request the data from server here");

        // TODO: send a request and set state based on response
    }

    render() {
        //TODO: here we render the result fetched from server, with styles
        const {match} = this.props;
        const {result} = this.state;
        const {title, cover, categories, offers, description, author, recommended, reviews} = result;

        const isbn = match.params.isbn;

        if (isbn) {
            // TODO:
            // 1. layout this page
            // 2. maybe build child components for better reuse
            // 3. add more features/contents here
            return (
                <div>
                    <hr/>
                    <p>Book comparison about book: {match.params.isbn}</p>
                    <hr/>
                    <div className="columns">
                        <div className="column">
                            Cover image here: {cover}
                        </div>
                        <div className="column">
                            <p>Title: {title}</p>
                            <p>Categories: {categories}</p>
                            <p>Description: {description}</p>
                            <p>Author: {author}</p>
                        </div>
                    </div>
                    <hr/>
                    <section className="section">
                        <p className="has-text-primary">Offers from websites:</p>
                        <div className="columns">
                            {offers.map(offer => (
                                <div className="column">{JSON.stringify(offer)}</div>
                            ))
                            }
                        </div>
                    </section>
                    <hr/>
                    <div>
                        {/*More things go here*/}
                    </div>
                </div>
            );
        }
        return null;
    }
}

export default Result;
