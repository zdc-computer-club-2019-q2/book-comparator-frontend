import React from "react";
import "./result.css";

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false, //TODO: how to decide whether we're loading, and what to do if it's waiting for result?
      error: false,
      result: {
        title: "Good Omens",
        cover:
          "https://kinokuniya.com.sg/wp-content/uploads/2019/05/9780060853983.jpeg",
        categories: "novel",
        offers: [
          { site: "amazon", price: 100, url: "a" },
          { site: "b", price: 95, url: "b" },
          { site: "c", price: 80, url: "c" },
          { site: "d", price: 105, url: "d" }
        ],
        description: "There is a distinct hint of Armageddon in the air.",
        author: "George Orwell",
        recommended: [
          { isbn: "29384792837", title: "Another book" },
          { isbn: "293", title: "Aer book" },
          { isbn: "29384792837", title: "Another book" }
        ],
        reviews: [
          { username: "a", rating: 3, comment: "a" },
          { username: "b", rating: 3, comment: "b" }
        ]
      }
    };
  }

  componentDidMount() {
    //TODO: we could request data from server here and put into page state
    console.log("request the data from server here");
    const { match } = this.props;
    fetch("https://127.0.0.1:5000/" + match.params.isbn.toString())
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        if (myJson) {
          this.setState({ loading: false, error: false, result: myJson });
        }
      })
      .catch(response => {
        this.setState({ loading: false, error: true, result: null });
      });

    // TODO: send a request and set state based on response
  }

  render() {
    //TODO: here we render the result fetched from server, with styles
    const { match } = this.props;
    const { loading } = this.state;
    if (loading) {
      return null;
    }
    const { result, error } = this.state;
    if (error) {
      return (
        <div>
          <h1>No results found</h1>
        </div>
      );
    }
    const {
      title,
      cover,
      categories,
      offers,
      description,
      author,
      recommended,
      reviews
    } = result;

    const isbn = match.params.isbn;

    if (isbn) {
      // TODO:
      // 1. layout this page
      // 2. maybe build child components for better reuse
      // 3. add more features/contents here
      return (
        <div>
          <hr />
          <p>Book comparison about book: {match.params.isbn}</p>
          <hr />
          <div className="columns">
            <div className="column right_align">
              <img src="https://kinokuniya.com.sg/wp-content/uploads/2019/05/9780060853983.jpeg" />
            </div>
            <div className="column">
              <p className="title_book">{title}</p>
              <p>
                <b>Author:</b> {author}
              </p>
              <p>Categories: {categories}</p>
              <p>{description}</p>
            </div>
          </div>
          <hr />
          <section className="section">
            <p className="has-text-primary">Offers from websites:</p>
            <div className="columns">
              {offers.map(offer => (
                <div className="column">{JSON.stringify(offer)}</div>
              ))}
            </div>
          </section>
          <hr />
          <div className="columns">
            {recommended.map(item => (
              <div className="column">
                <p>ISBN: {item["isbn"]}</p>
                <p>Title: {item["title"]}</p>
              </div>
            ))}
          </div>

          <div className="columns">
            {reviews.map(item => (
              <div className="column">
                <p>Username: {item["username"]}</p>
                <p>Rating: {item["rating"]}</p>
                <p>Comment: {item["comment"]}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  }
}

export default Result;
