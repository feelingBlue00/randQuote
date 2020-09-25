import React from "react";
import axios from "axios";

export default class QuoteBox extends React.Component {
  state = {
    loading: false,
    random_quote: {
      quote: "",
      author: "",
    },
  };

  componentDidMount() {
    this.getQuote();
  }

  getQuote = () => {
    const url = "/api/new-quote";
    axios
      .get(url)
      .then((response) => {
        this.setState({
          random_quote: {
            quote: response.data.quoteText,
            author: response.data.quoteAuthor,
          },
          loading: false,
        });
      })
      .catch(() => {
        this.setState({ loading: true });
      });
  };

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    } else {
      return (
        <div id="quote-box">
          <div id="text">{this.state.random_quote.quote}</div>
          <div id="author">{this.state.random_quote.author}</div>
          <div id="new-quote-btn">
            <button type="button" onClick={() => this.getQuote()}>
              New Quote
            </button>
          </div>
        </div>
      );
    }
  }
}
